import { b } from "../../baml_client/sync_client";


function marketResearch(context: string, task: string) {
    return b.MarketResearch(context, task);
}


function marketResearchTest() {
    const context = "You are a market research expert.";
    const task = "Generate a market research report on the topic of 'AI in healthcare'.";
    const result = marketResearch(context, task);
    console.log(result);
}

export { marketResearchTest };