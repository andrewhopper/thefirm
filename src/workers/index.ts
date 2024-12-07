import { createClient } from 'redis';
import winston from 'winston';

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

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

// Add development console logging
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

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
            let data;
            try {
                // Check if message is already an object
                data = typeof message === 'object' ? message : JSON.parse(message);
            } catch (error) {
                console.error('Error parsing message:', error);
                return;
            }

            console.log("--------------------------------");
            console.log("--------------------------------");
            console.log("--------------------------------");
            console.log("--------------------------------");
            console.log(typeof message);
            console.log("--------------------------------");
            console.log("--------------------------------");
            console.log("--------------------------------");
            console.log("--------------------------------");

            console.log(message);
            console.log("--------------------------------");
            console.log("--------------------------------");
            console.log("--------------------------------");
            console.log("--------------------------------");

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
                logger.info(`Prompt: ${prompt}`);
                console.log("Calling OpenAI..."
                );
                // remove message from redis to prevent infinite loop
                // Delete the processed message to prevent reprocessing

                const result = await model.invoke(prompt);
                logger.info(`Result: ${result}`);


                // const result = "mocked LLM response";

                await orchestrator.deleteAllEvents();

                const data1 = {
                    // originalMessage: message,
                    direction: "outbound",
                    from: data.to,
                    to: data.from,
                    message_type: data.responseArtifact,
                    content: result
                }
                logger.info(`Chat data: ${JSON.stringify(data1)}`);
                await orchestrator.publish("chat", data1);

                const data2 = {
                    // originalMessage: message,
                    direction: "outbound",
                    has_artifact: true,
                    from: data.to,
                    to: data.from,
                    message_type: data.responseArtifact,
                    content: result
                }
                logger.info(`Artifacts data: ${JSON.stringify(data2)}`);
                await orchestrator.publish("artifacts", data2);



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