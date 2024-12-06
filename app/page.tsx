'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { ReportArtifact } from '../src/artifacts/artifacts';
import { LinkedInPreviews } from '@automattic/social-previews';
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
interface MarketingReport {
    result: string;
    prompt: string;
    result_type: string;
}

async function fetchMarketingReport(topic: string, requester: string, dryrun = false): Promise<MarketingReport> {
    const response = await fetch(`/api/marketing_report?topic=${encodeURIComponent(topic)}&requester=${requester}&dryrun=${dryrun}`);
    const data = await response.json();
    return data;
}


function renderBrand(brand: string) {
    return <div>{brand}</div>;
}

function renderBrandStyleGuide(brandStyleGuide: string) {
    return <div>{brandStyleGuide}</div>;
}


async function sendManagerReviewNotification(from: string, to: string, artifact_type: string, artifact_guid: string, artifact: string, context: string, task: string) {
    // Send a notification about the manager review request
    console.log('Sending manager review notification via ws');
    const result = redisWs.sendMessage({
        action: 'new_review_requested',
        from: from,
        to: to,
        artifact_type: artifact_type,
        artifact_guid: artifact_guid,
        artifact: artifact,
        context: context,
        task: task,
        timestamp: new Date().toISOString()
    });
    console.log(result);
}


async function managerReview(content: string): Promise<MarketingReport> {



    const response = await fetch(`/api/manager_review?content=${encodeURIComponent(content)}`);
    const data = await response.json();
    alert(data.result);
    return data;
}

async function fetchLinkedInPost(topic: string, requester: string, dryrun = false): Promise<MarketingReport> {
    const response = await fetch(`/api/linkedin_post?topic=${encodeURIComponent(topic)}&requester=${requester}&dryrun=${dryrun}`);
    const data = await response.json();
    return data;
}




function useMarketingReport() {
    const [report, setReport] = useState<MarketingReport | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);

    const getReport = async (topic: string, requester: string) => {
        try {
            setLoading(true);
            setError(null);
            const result = await fetchMarketingReport(topic, requester);
            setReport(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { report, loading, error, getReport };
}

function useLinkedInPost() {
    const [report, setReport] = useState<MarketingReport | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getLinkedInPost = async (topic: string, requester: string) => {
        try {
            setLoading(true);
            setError(null);
            const result = await fetchLinkedInPost(topic, requester);
            setReport(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { report, loading, error, getLinkedInPost };
}

function handleReviseSection(guid: string) {
    console.log('Revise section with guid:', guid);
    alert('not yet implemented, this will allow user to revise a particular subcomponent of an artifact');
}

function revisionUI(guid: string) {
    return (
        <div className="revision-form" style={{ border: '1px solid #ccc', padding: '16px', margin: '16px 0' }}>
            <h4>Revision Form</h4>
            <div style={{ marginBottom: '16px' }}>
                <label htmlFor="liked">Things you liked:</label>
                <textarea
                    id="liked"
                    style={{
                        width: '100%',
                        minHeight: '100px',
                        marginTop: '8px',
                        padding: '8px'
                    }}
                />
            </div>
            <div style={{ marginBottom: '16px' }}>
                <label htmlFor="changes">Things to change:</label>
                <textarea
                    id="changes"
                    style={{
                        width: '100%',
                        minHeight: '100px',
                        marginTop: '8px',
                        padding: '8px'
                    }}
                />
            </div>
            <button
                onClick={() => handleReviseSection(guid)}
                style={{
                    padding: '8px 16px',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Revise Now
            </button>
        </div>
    );
}

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


    const { report: marketingReport, loading: marketingLoading, error: marketingError, getReport } = useMarketingReport();
    const { report: linkedInReport, loading: linkedInLoading, error: linkedInError, getLinkedInPost } = useLinkedInPost();
    const [feedback, setFeedback] = useState<string | null>(null);
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
                msg = JSON.parse(event_data);
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
                                'foo',
                                'foo',
                                'NoOp',
                                'NoOp',
                                'Test WebSocket Message'
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
                                    'content_writer',
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
                            {/* <Button className="mb-4"
                                onClick={() => getReport('personal mental health apps', 'ceo')}
                                disabled={marketingLoading}
                            >
                                Get Marketing Report for CEO on Personal Mental Health Apps
                            </Button>
                            <br />
                            <Button
                                className="mb-4"
                                onClick={() => getReport('personal mental health apps', 'coo')}
                                disabled={marketingLoading}
                            >
                                Get Marketing Report for COO on Todo <br /> list Apps popular with people with ADHD
                            </Button>
                            <br />
                            <Button
                                className="mb-4"
                                onClick={() => getLinkedInPost('how education can be improved with AI', 'social_media_marketer')}
                                disabled={linkedInLoading}
                            >
                                Create a LinkedIn Post about the latest AI trends
                            </Button> */}
                            {marketingLoading && <p>Loading...</p>}
                            {marketingError && <p>Error: {marketingError}</p>}
                            {linkedInLoading && <p>Loading...</p>}
                            {linkedInError && <p>Error: {linkedInError}</p>}
                        </div>



                        {marketingReport && (
                            <div>
                                {(() => {
                                    try {
                                        // this is json with string ```json as the beginning and ``` at the end
                                        // strip the ```json and ``` at the beginning and end
                                        // then parse the result
                                        // also remove the \n at the beginning and end

                                        // here's an example of the result string"json\n{\n  \"guid\": \"12345-abcde-67890-fghij\"
                                        // update the code below to parse the result into json

                                        const parsedResult = marketingReport.result.replace(/```json|```/g, '').replace(/^\n|\n$/g, '');
                                        const jsonResult = JSON.parse(parsedResult);
                                        return (
                                            <>
                                                <h3>Report Results</h3>
                                                <div>
                                                    <h4>Prompt:</h4>
                                                    <div>
                                                        {marketingReport.prompt && (
                                                            <div>
                                                                <Button
                                                                    onClick={() => setShowPrompt(!showPrompt)}
                                                                    variant="ghost"
                                                                >
                                                                    {showPrompt ? 'Hide Prompt' : 'Show Prompt'}
                                                                </Button>
                                                                {showPrompt && (
                                                                    <pre className="mt-2">{marketingReport.prompt}</pre>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4>Type: {marketingReport.result_type}</h4>
                                                </div>
                                                <div>
                                                    <h4>Results:</h4>
                                                    <div>
                                                        <Button
                                                            onClick={() => setShowJson(!showJson)}
                                                            variant="outline"
                                                        >
                                                            {showJson ? 'Hide Raw JSON' : 'Show Raw JSON'}
                                                        </Button>
                                                        {showJson && (
                                                            <pre className="mt-2">
                                                                {JSON.stringify(jsonResult, null, 2)}
                                                            </pre>
                                                        )}
                                                    </div>
                                                    {jsonResult && marketingReport.result_type === 'ReportArtifact' && jsonResult["sections"] && (
                                                        <div className="mt-4">
                                                            <h2>{jsonResult && jsonResult.title}</h2>
                                                            <h4>Report Sections:</h4>
                                                            {jsonResult.sections.map((section: any, index: number) => (
                                                                <div key={index} className="mt-2">
                                                                    <h5 className="font-bold">{section.section_title}</h5>
                                                                    <p>{section.section_content.content}</p>
                                                                    {!showRevisionUI && (
                                                                        <button
                                                                            onClick={() => {
                                                                                handleReviseSection(section.guid);
                                                                                setShowRevisionUI(true);
                                                                            }}
                                                                            className="mt-2 text-sm text-blue-500 hover:text-blue-700"
                                                                        >
                                                                            Revise Section
                                                                        </button>
                                                                    )}
                                                                    {showRevisionUI && (
                                                                        revisionUI(section.guid)
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        );
                                    } catch (error) {
                                        return (
                                            <div>
                                                Error parsing report: {error instanceof Error ? error.message : 'Unknown error'}
                                            </div>
                                        );
                                    }
                                })()}
                            </div>
                        )}



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
                                    <h1>Event Viewer: {typeof event}</h1>
                                    <div>
                                        <h3>Event Keys:</h3>
                                        {Object.keys(event).map((key, i) => (
                                            <div key={i} className="text-sm text-gray-600">
                                                {key}
                                            </div>
                                        ))}
                                    </div>

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
                {events.map((event, index) => {
                    try {
                        if (JSON.parse(event.message).channel === 'artifacts') {
                            return (
                                <div key={index}>
                                    <RenderArtifact type={JSON.parse(event.message).artifact_type} body={JSON.parse(event.message).artifact_body} />
                                </div>
                            );
                        }
                    } catch (e) {
                        return (
                            <div key={index}>
                                {JSON.stringify(event)}
                            </div>
                        );
                    }
                    // else {
                    //     return (
                    //         // <div key={index}>
                    //         //     type: {JSON.parse(event.message).artifact_type}
                    //         // </div>
                    //     );
                    // }
                })}
            </div>
        </div>


    );
} 