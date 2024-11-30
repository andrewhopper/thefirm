import { createClient } from 'redis';
import { RedisEventOrchestrator } from '../services/RedisEventOrchestrator';
import marketing_manager from '../actors/team/marketing-strategist/profile';
import social_media_expert from '../actors/team/social-media-marketer/profile';
import PromptComposer from '../utils/prompt_composer';
import { getArtifactSchema } from '../artifacts/artifact_metadata';

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

            if (Object.keys(message).includes("message")) {
                if (Object.keys(message.message).includes("artifact_type")) {

                    try {
                        const artifact = message.message.artifact;
                        const prompt = PromptComposer("reviewing a LinkedIn post", "Grow thought leadership.  Revise this post to be more engaging and thought provoking.<POST>" + message.message.artifact + "</POST>", "Feedback", getArtifactSchema("Feedback"), social_media_expert, marketing_manager, "json")
                        console.log(prompt);
                        console.log("Calling OpenAI..."
                        );
                        // remove message from redis to prevent infinite loop
                        // Delete the processed message to prevent reprocessing

                        const result = await model.invoke(prompt);

                        // const result = "mocked LLM response";

                        await orchestrator.deleteAllEvents();
                        await orchestrator.publish('llm_response', {
                            // originalMessage: message,
                            message_type: "Feedback",
                            content: result
                        });
                        console.log(result);
                    }
                    catch (error) {
                        console.log(message)
                        console.error('Error in worker:', error);
                    }
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