import { b } from "../baml_client/sync_client";
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);
console.log("PERPLEXITY_API_KEY:", process.env.PERPLEXITY_API_KEY);


function marketResearch(context: string, task: string) {
    return b.MarketResearch(context, task);
}


function marketResearchTest() {
    const context = "You are a market research expert.";
    const task = "Generate a market research report on the topic of 'AI in healthcare'.";
    const result = marketResearch(context, task);
    console.log(result);
}


marketResearchTest();