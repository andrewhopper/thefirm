import type { NextApiRequest, NextApiResponse } from "next";
import { b } from "../../src/baml_client/sync_client";
import { marked } from 'marked';
import andrew_context from "../../src/context/context";
import ceo from "../../src/actors/team/ceo/profile";
import chief_of_staff from "../../src/actors/team/chief-of-staff/profile";
import promptComposer from "../../src/utils/prompt_composer";

function dailyPlan(prompt: string) {
    const result = b.DailyPlan(prompt);
    return result;
}


function marketResearchTest() {
    const prompt = "Brush teeth, eat breakfast, go to work.";
    const result = dailyPlan(prompt);
    console.log(result);
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === 'GET') { // Check if the request method is POST

        const { todos, dryrun } = req.query;

        let final_todos = todos;

        if (!final_todos) {
            final_todos = "Brush teeth, eat breakfast, go to work.";
        }

        const context = "You are a market research expert.";


        const task = `Generate a plan for the day to accomplish the following tasks: ${final_todos}`;

        console.log(context, task);

        if (typeof final_todos === 'string') {


            // res.status(200).json({ result });

            const prompt = promptComposer(task, 'TaskList', 'TaskList', andrew_context, ceo, chief_of_staff, "markdown");


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
                const result = dailyPlan(prompt);
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
                            ${JSON.stringify(result.tasks)}
                            ${result.tasks.map((task: any) => {
                    return `<h2>${task.name}</h2>
                                 <p>${task.description}</p>
                                 <p>${task.eh_importance}</p>
                                 <p>${task.eh_urgency}</p>
                                 <p>${task.eh_matrix}</p>
                                  <p>${task.eh_urgency}</p>
                                 <p>${task.steps}</p>`
                })}
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
