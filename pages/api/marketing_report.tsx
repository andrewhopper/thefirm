import type { NextApiRequest, NextApiResponse } from "next";
import { b } from "../../src/baml_client/sync_client";
import { marked } from 'marked';
import andrew_context from "../../src/context/context";
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


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === 'GET') { // Check if the request method is POST

        const { topic, dryrun, requester, agent } = req.query;

        let final_topic = topic;

        if (!final_topic) {
            final_topic = "personal mental health apps";
        }

        const context = "You are a market research expert.";


        const task = `Generate a market research report on the topic of '${final_topic}'`;

        console.log(context, task);

        if (typeof final_topic === 'string') {

            let requester_actor = ceo;
            if (requester == 'ceo') {
                requester_actor = ceo;
            }
            else if (requester == 'cmo') {
                requester_actor = cmo;
            }
            else if (requester == 'cpo') {
                requester_actor = cpo;
            }

            let producer_agent = marketing_strategist;
            if (agent == 'ux_researcher') {
                producer_agent = ux_researcher;
            }
            else if (agent == 'product_manager') {
                producer_agent = product_manager;
            }
            else {
                producer_agent = marketing_strategist;
            }

            // res.status(200).json({ result });

            const prompt = promptComposer(task, 'MarketResearchArtifact', 'MarketResearchArtifact', andrew_context, requester_actor, producer_agent, "markdown");


            if (dryrun === "true") {
                res.setHeader('Content-Type', 'text/html');
                res.status(200).send(`
                    <html>
                        <head>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    line-height: 1.6;
                                    max-width: 800px;
                                    margin: 0 auto;
                                    padding: 20px;
                                }
                                .market-research {
                                    background: white;
                                    padding: 20px;
                                    border-radius: 8px;
                                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                                }
                            </style>
                        </head>
                        <body>
                        <div width="75%">
                                ${prompt.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')}
                        </div>
                        </body>
                    </html>
                `);
                return;
            }
            else {
                const result = marketResearch(context, prompt);
                console.log(result);


                res.status(200).send(`
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                line-height: 1.6;
                                max-width: 800px;
                                margin: 0 auto;
                                padding: 20px;
                            }
                            .market-research {
                                background: white;
                                padding: 20px;
                                border-radius: 8px;
                                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                            }
                        </style>
                    </head>
                    <body>
                    <div width="75%">
                            <h1>Market Research Report</h1>
                            ${marked(result)}
                            <h2>Prompt</h2>
                            <pre> ${prompt.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')}</pre>
                        </div>
                    </body>
                </html>
            `);
                return;
            }

        } else {
            console.log(req.body);
            res.status(400).json({ result: { options: ["Invalid todo parameter"] } }); // Handle invalid case
        }
    } else {
        res.setHeader('Allow', ['POST']); // Set allowed methods
        res.status(405).end(`Method ${req.method} Not Allowed`); // Handle method not allowed
    }
}
