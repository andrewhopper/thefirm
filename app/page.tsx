'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { ReportArtifact } from '../src/artifacts/artifacts';
import { Button } from '../components/ui/button';
import { roles, getUserProfile } from '../src/actors/team/team';
import { UserProfile } from '../src/user_profile';
import { getArtifactSchema, artifacts } from '../src/artifacts/artifact_metadata';
import parseMessage from './parser';
import ReactMarkdown from 'react-markdown';
import EventView from '../components/event_view';
import RenderArtifact from '../components/render_artifact';
import marketing_strategist from '@/src/actors/team/marketing_analyst/profile';
import RedisWebSocket from '../src/services/websocker-client';




const testCases = [
    { from: 'ceo', to: 'marketing_strategist', requestArtifact: 'MemoArtifact', responseArtifact: 'ReportArtifact', details: 'research on the latest trends in the mental health app market' },
    { from: 'ceo', to: 'product_manager', requestArtifact: 'MemoArtifact', responseArtifact: 'ReportArtifact', details: 'create a report on the latest trends in the mental health app market' },
    { from: 'ceo', to: 'chief_of_staff', requestArtifact: 'MemoArtifact', responseArtifact: 'LinkedIn', details: 'create a linkedin post about AI and mental health' },
    { from: 'ceo', to: 'brand_director', requestArtifact: 'MemoArtifact', responseArtifact: 'Brand', details: 'create a brand concept for a new mindfulness app' },
    { from: 'cmo', to: 'social_media_marketer', requestArtifact: 'MemoArtifact', responseArtifact: 'ReportArtifact', details: 'create a campaign plan to launch our new mindfulness app on Twitter, Tiktok, and Instagram' },
    { from: 'cpo', to: 'ux_researcher', requestArtifact: 'MemoArtifact', responseArtifact: 'ReportArtifact', details: 'research the key customer segments for our new mindfulness app' },
]

function parseResult(result: string) {
    const parsedResult = result.replace(/```json|```/g, '').replace(/^\n|\n$/g, '');
    const jsonResult = JSON.parse(parsedResult);
    return jsonResult;
}


// Usage
const redisWs = new RedisWebSocket();

// Add this before the Home component
function handleSubmitRequest(to: string, from: string, requestArtifact: string, responseArtifact: string, details: string) {
    const data = {
        direction: "inbound",
        from: from,
        to: to,
        requestArtifact: requestArtifact,
        responseArtifact: responseArtifact,
        details: details,
        timestamp: new Date().toISOString()
    }

    redisWs.sendMessage(data);
    console.log('--- STEP 1 ----');
    console.log('line 199 - page.tsx');
    console.log('Request submitted with:', data);
}

export default function Home() {


    const [showPrompt, setShowPrompt] = useState(false);
    const [showJson, setShowJson] = useState(false);
    const [showRevisionUI, setShowRevisionUI] = useState(false);
    const [events, setEvents] = useState<Array<{ key: string, event: string, timestamp: string, message?: any }>>([]);
    const [showRawContent, setShowRawContent] = useState(false);
    const [from, setFrom] = useState('ceo');
    const [to, setTo] = useState('brand_director');
    const [requestArtifact, setRequestArtifact] = useState('MemoArtifact');
    const [responseArtifact, setResponseArtifact] = useState('Brand');
    const [details, setDetails] = useState('please create a brand manifesto for our new mindfulness brand');
    const [rolesData, setRolesData] = useState<{ [key: string]: UserProfile }>({});
    const [websocketDebugger, setWebsocketDebugger] = useState(false);
    const [generatedArtifacts, setGeneratedArtifacts] = useState<Array<any>>([]);

    useEffect(() => {
        setRolesData(roles);
    }, []);

    function deserialize(obj: any): any {
        if (typeof obj === 'string') {
            try {
                return deserialize(JSON.parse(obj));
            } catch {
                return obj;
            }
        }

        if (Array.isArray(obj)) {
            return obj.map(item => deserialize(item));
        }

        if (obj !== null && typeof obj === 'object') {
            const result: { [key: string]: any } = {};
            for (const [key, value] of Object.entries(obj)) {
                result[key] = deserialize(value);
            }
            return result;
        }

        return obj;
    }

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');

        ws.onmessage = (event) => {
            console.log('Received WebSocket message (page.tsx 258):', event);
            const event_data = event.data;

            console.log('STEP 3 - Parsing websocket message and adding to events state ');
            console.log('Line 237 - page.tsx');
            console.log('Parsed message (page.tsx 234) | type :', typeof event_data + " " + event_data);

            let msg = event_data;
            try {
                console.log('STEP 4 - Parsing websocket message- SUCCESS');
                msg = deserialize(JSON.parse(event_data));
                console.log('Successfully parsed websocket message (page.tsx 243):', msg);
            } catch (e) {
                console.log('STEP 4 - Parsing websocket message- FAILURE');
                console.log('Error parsing websocket message (page.tsx 240):', e);
            }





            setEvents(prev => [...prev, {
                ...msg,
                timestamp: new Date().toISOString()
            }]);


            // if (typeof parseMessage(data) === 'object') {
            //     setGeneratedArtifacts(prev => [...prev, parseMessage(data)]);
            // }
            // else {
            // @todo fix artifact extraction
            //     setGeneratedArtifacts(prev => [...prev, data]);
            //     console.log('Received non-object message:', data);
            //     console.log(event);

            // }

        };

        return () => {
            ws.close();
        };
    }, []);



    return (
        <div className="w-full grid grid-cols-3 gap-4 p-4">
            <div className="col-span-1 p-4 border rounded shadow">
                <h2 className="text-xl font-bold mb-4">BizML</h2>
                <div className="space-y-4">

                    <div className="p-4">


                        <Button
                            className="mb-4"
                            onClick={() => handleSubmitRequest(
                                'ceo',
                                'ceo',
                                'MemoArtifact',
                                'MemoArtifact',
                                'Are you there?'
                            )}
                        >
                            Send Test WebSocket Message
                        </Button>


                        <div className="space-y-2">
                            <Button
                                className="w-full"
                                onClick={() => handleSubmitRequest(
                                    'ceo',
                                    'brand_director',
                                    'Brand',
                                    'Brand',
                                    'Create a brand identity for our new product line of eco-friendly office supplies'
                                )}
                            >
                                Marketing Director → Brand Director: Create Brand Identity
                            </Button>

                            <Button
                                className="w-full"
                                onClick={() => handleSubmitRequest(
                                    'ceo',
                                    'ux_designer',
                                    'Brand',
                                    'BrandStyleGuide',
                                    'Design a comprehensive style guide based on our brand identity'
                                )}
                            >
                                Brand Director → UX Designer: Create Style Guide
                            </Button>

                            <Button
                                className="w-full"
                                onClick={() => handleSubmitRequest(
                                    'ceo',
                                    'marketing_strategist',
                                    'Brand',
                                    'ReportArtifact',
                                    'Create a marketing strategy report for Q1 2024'
                                )}
                            >
                                Marketing Director → Marketing Strategist: Generate Marketing Report
                            </Button>

                            <Button
                                className="w-full"
                                onClick={() => handleSubmitRequest(
                                    'ceo',
                                    'marketing_strategist',
                                    'ReportArtifact',
                                    'LinkedInPost',
                                    'Write a LinkedIn post about our new eco-friendly product line'
                                )}
                            >
                                Marketing Strategist → Content Writer: Create LinkedIn Post
                            </Button>
                            <Button
                                className="w-full"
                                onClick={() => handleSubmitRequest(
                                    'ceo',
                                    'product_manager',
                                    'MemoArtifact',
                                    'ReportArtifact',
                                    'create a report on the latest trends in the mental health app market'
                                )}
                            >
                                CEO → Product Manager: Mental Health App Market Report
                            </Button>

                            <Button
                                className="w-full"
                                onClick={() => handleSubmitRequest(
                                    'ceo',
                                    'chief_of_staff',
                                    'MemoArtifact',
                                    'LinkedInPost',
                                    'create a linkedin post about AI and mental health'
                                )}
                            >
                                CEO → Chief of Staff: AI & Mental Health LinkedIn Post
                            </Button>

                            <Button
                                className="w-full"
                                onClick={() => handleSubmitRequest(
                                    'ceo',
                                    'social_media_marketer',
                                    'MemoArtifact',
                                    'ReportArtifact',
                                    'create a campaign plan to launch our new mindfulness app on Twitter, Tiktok, and Instagram'
                                )}
                            >
                                CMO → Social Media Marketer: Social Media Campaign Plan
                            </Button>

                            <Button
                                className="w-full"
                                onClick={() => handleSubmitRequest(
                                    'ceo',
                                    'ux_researcher',
                                    'MemoArtifact',
                                    'ReportArtifact',
                                    'research the key customer segments for our new mindfulness app'
                                )}
                            >
                                CPO → UX Researcher: Customer Segments Research
                            </Button>
                        </div>



                        <div>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmitRequest(
                                    from,
                                    to,
                                    requestArtifact,
                                    responseArtifact,
                                    details
                                );
                            }}>
                                From:
                                <select className="w-full p-2 mb-4 border rounded" name="from" value={from} onChange={(e) => setFrom(e.target.value)}>
                                    {Object.entries(rolesData).map(([roleKey, userProfileRole]: [string, UserProfile]) => (
                                        <option key={roleKey} value={roleKey}>
                                            {userProfileRole.name} - {userProfileRole.attributes.role}
                                        </option>
                                    ))}
                                </select>
                                To:
                                <select className="w-full p-2 mb-4 border rounded" name="to" value={to} onChange={(e) => setTo(e.target.value)}>
                                    {Object.entries(rolesData).map(([key, role]: [string, UserProfile]) => (
                                        <option key={key} value={key}>
                                            {role.name} - {role.attributes.role}
                                        </option>
                                    ))}
                                </select>

                                Request Artifact(s):
                                <select className="w-full p-2 mb-4 border rounded" value={requestArtifact} onChange={(e) => setRequestArtifact(e.target.value)}>
                                    {Object.entries(artifacts).map(([key, artifact]: [string, any], index: number) => (
                                        <option key={index} value={key}>
                                            {key}: {artifact.name} {JSON.stringify(artifact)}
                                        </option>
                                    ))}
                                </select>
                                Response Artifact(s):
                                <select className="w-full p-2 mb-4 border rounded" value={responseArtifact} onChange={(e) => setResponseArtifact(e.target.value)}>
                                    {Object.entries(artifacts).map(([key, artifact]: [string, any], index: number) => (
                                        <option key={index} value={key}>
                                            {key}: {artifact.name} {JSON.stringify(artifact)}
                                        </option>
                                    ))}
                                </select>
                                <textarea
                                    className="w-full p-2 mb-4 border rounded"
                                    placeholder="Type details of your request here"
                                    rows={4}
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                />
                                <Button type="submit" className="w-full mb-4">
                                    Send Request
                                </Button>
                            </form>

                        </div>




                    </div>
                </div>
            </div>



            <div className="col-span-1 p-4 border rounded shadow">
                <h2 className="text-xl font-bold mb-4">Traces</h2>
                <div className="space-y-4">
                    <h1>Events</h1>
                    {events && events.length > 0 && (
                        events.map((event, index) => {
                            return (
                                <div key={index}>


                                    <EventView event={event} />
                                </div>
                            );
                        })
                    )}

                    {!websocketDebugger && <Button
                        onClick={() => setWebsocketDebugger(true)}
                    >
                        Show WebSocket Debugger
                    </Button>
                    }
                    {websocketDebugger && (
                        <>
                            <Button
                                onClick={() => setWebsocketDebugger(false)}
                            >
                                Hide WebSocket Debugger
                            </Button>
                            <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
                                <h3>WebSocket Events</h3>
                                <div id="events-container" style={{ height: '1000px', overflowY: 'auto' }}>
                                    {(() => {
                                        return (
                                            <div>
                                                {events.map((event, index) => (

                                                    <div key={index}>
                                                        <h1>websocket debugger: {typeof event}</h1>
                                                        {JSON.stringify(event)}
                                                    </div>
                                                ))}
                                            </div>
                                        );


                                    })()}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="col-span-1 p-4 border rounded shadow">
                <h2 className="text-xl font-bold mb-4">Artifacts</h2>
                {events.map((event: any, index) => {
                    if (event.message.direction == "outbound") {
                        return (
                            <div key={`artifact-${event.key || index}`} className="p-10">
                                <RenderArtifact type={event.message.message_type} body={event.message.content} />
                            </div>
                        )
                    }
                    else {
                        return (
                            <div key={`debug-${event.key || index}`} className="p-10">
                                <h1>websocket debugger: {typeof event}</h1>
                                {JSON.stringify(event)}
                            </div>
                        )
                    }

                })}
            </div>
        </div>


    );
} 