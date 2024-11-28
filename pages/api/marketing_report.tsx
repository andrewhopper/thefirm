import type { NextApiRequest, NextApiResponse } from "next";
import { b } from "../../src/baml_client/sync_client";
import { marked } from 'marked';


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

        const { topic } = req.query;

        let final_topic = topic;

        if (!final_topic) {
            final_topic = "personal mental health apps";
        }

        const context = "You are a market research expert.";


        const task = `Generate a market research report on the topic of '${final_topic}'`;

        console.log(context, task);

        if (typeof final_topic === 'string') {
            const result = marketResearch(context, task);
            console.log(result);


            // res.status(200).json({ result });


            // Convert the result to HTML format
            const formattedResult = `<div class="market-research">
                <h1>Market Research Report</h1>
                ${marked(result)}
            </div>`;
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
                        ${formattedResult}
                    </body>
                </html>
            `);


            return;

        } else {
            console.log(req.body);
            res.status(400).json({ result: { options: ["Invalid todo parameter"] } }); // Handle invalid case
        }
    } else {
        res.setHeader('Allow', ['POST']); // Set allowed methods
        res.status(405).end(`Method ${req.method} Not Allowed`); // Handle method not allowed
    }
}
