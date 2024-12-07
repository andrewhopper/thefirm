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
    modelName: "gpt-4o",
    temperature: 0.7,
    maxTokens: 2000,
});



async function initializeWorker() {
    const orchestrator = new RedisEventOrchestrator();

    try {
        // Listen for specific events that require team member actions
        orchestrator.on('message', async ({ channel, message }) => {


            console.log("--------------------------------");
            console.log("--------------------------------");
            console.log("--------------------------------");
            console.log("--------------------------------");
            console.log(typeof message);
            console.log("--------------------------------");
            console.log("--------------------------------");
            console.log("--------------------------------");
            console.log("--------------------------------");
            console.log("Received message on channel:", channel);
            console.log("Message:", JSON.parse(message));
            console.log("--------------------------------");
            console.log("--------------------------------");
            console.log("--------------------------------");
            console.log("--------------------------------");

            console.log(message);
            console.log("--------------------------------");
            console.log("--------------------------------");
            console.log("--------------------------------");
            console.log("--------------------------------");

            const data = JSON.parse(message);
            console.log(data['direction']);
            console.log('Iterating through message data keys:');
            Object.keys(data).forEach(key => {
                console.log(`${key}:`, data[key]);
            });



            if (data["direction"] == "inbound") {

                const prompt = PromptComposer(
                    data.details,  // task
                    "n/a",                       // @todo - pull from memory requester_context
                    data.responseArtifact,                    // artifact
                    getArtifactSchema(data.responseArtifact),  // artifact_schema
                    getUserProfile(data.from),     // from
                    getUserProfile(data.to),       // to
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

                await orchestrator.publish("chat", JSON.stringify({
                    // originalMessage: message,
                    direction: "outbound",
                    from: data.to,
                    to: data.from,
                    message_type: data.responseArtifact,
                    content: result,
                    message: result
                }));

                await orchestrator.publish("artifacts", JSON.stringify({
                    // originalMessage: message,
                    direction: "outbound",
                    has_artifact: true,
                    from: data.to,
                    to: data.from,
                    message_type: data.responseArtifact,
                    content: result,
                    message: result
                }));


                // if (message.message.responseArtifact === "Brand") {
                //     await orchestrator.publish("ux-designer", {
                //         direction: "inbound",
                //         details: "Please create the visual identity for the brand",
                //         message: "",
                //         responseArtifact: "BrandStyleGuide",
                //         requestArtifact: "Brand",
                //         from: 'brand_director',
                //         to: 'ux_designer'
                //     });
                // }

                console.log(result);

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