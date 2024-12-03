import type { NextApiRequest, NextApiResponse } from "next";
import { b } from "../../src/baml_client/sync_client";
import { marked } from 'marked';
import andrew_context from "../../src/context/context";
import social_media_marketer from "../../src/actors/team/social-media-marketer/profile";
import marketing_strategist from "../../src/actors/team/marketing-strategist/profile";
import ceo from "../../src/actors/team/ceo/profile";
import cmo from "../../src/actors/team/cmo/profile";
import cpo from "../../src/actors/team/cpo/profile";
import product_manager from "../../src/actors/team/product-manager/profile";
import ux_researcher from "../../src/actors/team/ux-researcher/profile";
import promptComposer from "../../src/utils/prompt_composer";

function marketResearch(context: string, task: string) {
    const result = b.MarketResearch(context, task);
    return result;
}


function marketResearchTest() {
    const context = "You are a market research expert.";
    const task = "Generate a market research report on the topic of 'AI in healthcare'.";
    const result = marketResearch(context, task);
    console.log(result);
}

export type Data = {
    prompt: string;
    result_type: string;
    result: JSON | null | string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    if (req.method === 'GET') { // Check if the request method is POST

        const { content } = req.query;

        let final_content = content;

        const context = "You are a marketing manager.";

        const task = `Review the following content and provide feedback: ${final_content}`;

        const requestor_actor = social_media_marketer;
        const producer_agent = marketing_strategist;

        // res.status(200).json({ result });

        const artifact_type = 'MemoArtifact';
        const prompt = promptComposer(task, artifact_type, artifact_type, andrew_context, requestor_actor, producer_agent, "JSON");


        const result = marketResearch(context, prompt);
        console.log(result);
        res.status(200).json({ prompt: prompt, result_type: artifact_type, result: result });
        return;

    } else {
        console.log(req.body);
        res.status(400).json({ prompt: "", result_type: "Error", result: null }); // Handle invalid case
    }
}