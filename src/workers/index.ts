import { createClient } from 'redis';
import { RedisEventOrchestrator } from '../services/RedisEventOrchestrator';
import marketing_manager from '../actors/team/marketing-strategist/profile';
import PromptComposer from '../utils/prompt_composer';
import { getArtifactSchema } from '../artifacts/artifact_metadata';
import { getUserProfile, roles } from '../actors/team/team';
import { OpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';


import dotenv from 'dotenv';

// Load environment variables from .env file
require('dotenv').config({
    path: '.env.local'
});

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

console.log(OPENAI_API_KEY);


const model = new OpenAI({
    modelName: "gpt-4-turbo-preview",
    temperature: 0.7,
    maxTokens: 2000,
});



async function initializeWorker() {
    const orchestrator = new RedisEventOrchestrator();

    try {
        // Listen for specific events that require team member actions
        orchestrator.on('message', async ({ channel, message }) => {

            console.log("Received message on channel:", channel);
            console.log("Message:", message);
            console.log("--------------------------------");
            console.log("--------------------------------");
            console.log("--------------------------------");
            console.log("--------------------------------");

            console.log(message);
            console.log("--------------------------------");
            console.log("--------------------------------");
            console.log("--------------------------------");
            console.log("--------------------------------");

            if (message.message.direction === "inbound") {
                try {
                    const prompt = PromptComposer(
                        message.message.details,  // task
                        "n/a",                       // @todo - pull from memory requester_context
                        message.message.responseArtifact,                    // artifact
                        getArtifactSchema(message.message.responseArtifact),  // artifact_schema
                        getUserProfile(message.message.from),     // from
                        getUserProfile(message.message.to),       // to
                        "json" // schema for output
                    );
                    console.log(prompt);
                    console.log("Calling OpenAI..."
                    );
                    // remove message from redis to prevent infinite loop
                    // Delete the processed message to prevent reprocessing

                    const result = await model.invoke(prompt);

                    // const result = "mocked LLM response";

                    await orchestrator.deleteAllEvents();


                    await orchestrator.publish(message.message.from, {
                        // originalMessage: message,
                        direction: "outbound",
                        message_type: message.message.responseArtifact,
                        content: result,
                        message: result
                    });

                    if (message.message.responseArtifact === "Brand") {
                        await orchestrator.publish("ux-designer", {
                            message: {
                                direction: "inbound",
                                details: "Please create the visual identity for the brand",
                                message: "",
                                responseArtifact: "BrandStyleGuide",
                                requestArtifact: "Brand",
                                from: 'brand_director',
                                to: 'ux_designer'
                            }
                        });
                    }

                    // if (message.message.responseArtifact === "BrandStyleGuide") {
                    //     await orchestrator.publish("ux-designer", {
                    //         direction: "outbound",
                    //         details: "Here's the style guide for the brand",
                    //         responseArtifact: "BrandStyleGuide",
                    //         requestArtifact: "Brand",
                    //         from: 'ux-designer',
                    //         to: 'brand_director'
                    //     });
                    // }
                    console.log(result);
                }
                catch (error) {
                    console.log(message)
                    console.error('Error in worker:', error);
                }
            }


        });
    } catch (error) {
        console.error('Error in worker:', error);
    }

    // Handle graceful shutdown
    process.on('SIGTERM', async () => {
        console.log('Worker shutting down...');
        await orchestrator.shutdown();
        process.exit(0);
    });

    return orchestrator;
}

// Start the worker
initializeWorker().catch(console.error);

export default initializeWorker; 