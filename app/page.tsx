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
    const result = redisWs.sendMessage('chat', {
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


class RedisWebSocket {
    private ws: WebSocket;
    private url: string;
    constructor(url = 'ws://localhost:8080') {
        this.url = url;
        this.connect();
    }

    connect() {
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Redis event:', data);
            // Handle the event here
        };

        this.ws.onclose = () => {
            console.log('Disconnected from WebSocket server');
            // Reconnect after 5 seconds
            setTimeout(() => this.connect(), 5000);
        };
    }

    sendMessage(channel: string, message: any) {
        try {
            this.ws.send(JSON.stringify({
                channel,
                message
            }));
            return true;
        } catch (error) {
            console.error('WebSocket error:', error);
            return false;
        }
    }
}

async function sendRedisMessage(channel: string, message: any): Promise<void> {
    // Try to connect to WebSocket server
    try {
        const ws = new WebSocket('ws://localhost:8080');

        console.log('Sending message to Redis');
        console.log(channel, message);
        // Send message once connected
        ws.onopen = () => {
            ws.send(JSON.stringify({
                channel,
                message
            }));
        };
        console.log('Message sent to Redis');

        // Handle any errors
        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            throw new Error('Failed to send WebSocket message');
        };
    } catch (error) {
        console.error('WebSocket connection failed:', error);
        throw new Error('Failed to connect to WebSocket server');
    }

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
    redisWs.sendMessage(to, {
        direction: "inbound",
        from: from,
        to: to,
        requestArtifact: requestArtifact,
        responseArtifact: responseArtifact,
        details: details,
        timestamp: new Date().toISOString()
    });

    console.log('Request submitted with:', { from, to, requestArtifact, responseArtifact, details });
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
            const data = JSON.parse(event.data);
            console.log('Received WebSocket message:', data);
            setEvents(prev => [...prev, {
                ...data,
                timestamp: new Date().toISOString()
            }]);
            if (typeof parseMessage(data) === 'object') {
                setGeneratedArtifacts(prev => [...prev, parseMessage(data)]);
            }
            else {
                setGeneratedArtifacts(prev => [...prev, data]);
                console.log('Received non-object message:', data);
                console.log(event);

            }

        };

        return () => {
            ws.close();
        };
    }, []);

    useEffect(() => {


        events.map((event) => {
            if (event.message && event.message.message_type === "Feedback") {
                alert(JSON.parse(event.message).content);
                setFeedback(JSON.parse(event.message).content);
            }
        });
    }, [events]);

    return (
        <div className="w-full grid grid-cols-3 gap-4 p-4">
            <div className="col-span-1 p-4 border rounded shadow">
                <h2 className="text-xl font-bold mb-4">BizML</h2>
                <div className="space-y-4">

                    <div className="p-4">


                        <Button
                            className="mb-4"
                            onClick={() => redisWs.sendMessage('test_channel', {
                                action: 'button_clicked',
                                timestamp: new Date().toISOString()
                            })}

                        >
                            Send Test WebSocket Message
                        </Button>


                        <div className="space-y-2">
                            <Button
                                className="w-full"
                                onClick={() => handleSubmitRequest(
                                    'marketing_director',
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
                                    'brand_director',
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
                                    'marketing_director',
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
                                    'marketing_strategist',
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
                                    'LinkedIn',
                                    'create a linkedin post about AI and mental health'
                                )}
                            >
                                CEO → Chief of Staff: AI & Mental Health LinkedIn Post
                            </Button>

                            <Button
                                className="w-full"
                                onClick={() => handleSubmitRequest(
                                    'cmo',
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
                                    'cpo',
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

                            if (event.message) {
                                return (

                                    <div key={index}>
                                        {typeof parseMessage(event) === 'object' && (
                                            <>
                                                <EventView event={event} />
                                                <div className="prose max-w-none">
                                                    {(() => {
                                                        const jsonContent = parseMessage(event);
                                                        let markdown = '';

                                                        let colors: string[] = [];
                                                        // Convert JSON object to markdown
                                                        for (const [key, value] of Object.entries(jsonContent)) {
                                                            markdown += `### ${key}\n${value}\n\n`;
                                                            if (key === "color_palette") {
                                                                colors = value as string[];
                                                            }
                                                        }

                                                        return (
                                                            <>
                                                                {colors && colors.length > 0 && (
                                                                    <div>
                                                                        <h4 className="text-lg font-bold mb-4">Color Palette:</h4>
                                                                        <div>
                                                                            {colors.map((color: string, index: number) => (
                                                                                <div key={index} style={{ backgroundColor: color, width: '100px', height: '100px', display: 'inline-block', marginRight: '5px' }}></div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                <ReactMarkdown
                                                                    components={{
                                                                        h1: (props) => <h1 className="text-4xl font-bold mb-4" {...props} />,
                                                                        h2: (props) => <h2 className="text-3xl font-bold mb-4" {...props} />,
                                                                        h3: (props) => <h3 className="text-2xl font-bold mb-4" {...props} />,
                                                                        h4: (props) => <h4 className="text-xl font-bold mb-4" {...props} />,
                                                                        h5: (props) => <h5 className="text-lg font-bold mb-4" {...props} />,
                                                                        h6: (props) => <h6 className="text-base font-bold mb-4" {...props} />,
                                                                        p: (props) => <p className="text-gray-700 leading-relaxed" {...props} />,
                                                                        pre: (props) => <pre className="bg-gray-100 p-4 rounded-lg text-sm" {...props} />,
                                                                        code: (props) => <code className="bg-gray-100 p-1 rounded-lg text-sm" {...props} />,
                                                                        ul: (props) => <ul className="list-disc list-inside text-gray-700" {...props} />,
                                                                        ol: (props) => <ol className="list-decimal list-inside text-gray-700" {...props} />,
                                                                        li: (props) => <li className="text-gray-700" {...props} />,
                                                                        blockquote: (props) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700" {...props} />,
                                                                        table: (props) => <table className="w-full border-collapse border border-gray-300" {...props} />,
                                                                        thead: (props) => <thead className="bg-gray-100" {...props} />,
                                                                        tbody: (props) => <tbody className="bg-white" {...props} />,
                                                                        tr: (props) => <tr className="border-b border-gray-200" {...props} />,
                                                                        th: (props) => <th className="p-2 text-left font-bold" {...props} />,
                                                                        td: (props) => <td className="p-2 text-left" {...props} />,
                                                                        img: (props) => <img className="w-full h-auto" {...props} />,
                                                                    }}
                                                                >
                                                                    {markdown}
                                                                </ReactMarkdown>
                                                            </>
                                                        );
                                                    })()}
                                                </div>
                                            </>
                                        )}
                                        {typeof parseMessage(event) === 'string' && (
                                            <EventView event={event} />
                                        )}
                                        {/* <div>{JSON.parse(JSON.parse(event.message).content.replace(/```json|```/g, '').replace(/```/g, ''))}</div>

                                        <div>{JSON.parse(event.message).content}</div> */}
                                    </div>

                                );
                            }
                            else {
                                return (
                                    <div>
                                        <EventView event={event} />
                                    </div>
                                );
                            }
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
                                            <div style={{ maxHeight: '1000px', overflowY: 'auto' }}>
                                                {events.map((event, index) => (
                                                    <div key={index} style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                                                        <pre style={{ margin: 0, fontSize: '0.75rem' }}>

                                                            {JSON.stringify({
                                                                key: event.key,
                                                                event: event.event,
                                                                time: new Date(event.timestamp).toLocaleString(),
                                                                message: JSON.parse(event.message)
                                                            }, null, 2)}
                                                        </pre>
                                                    </div>
                                                ))}
                                                {events.length === 0 && (
                                                    <div style={{ padding: '8px', color: '#666' }}>
                                                        No events received yet...
                                                    </div>
                                                )}
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
                    if (JSON.parse(event.message).channel === 'artifacts') {
                        return (
                            <div key={index}>
                                <RenderArtifact type={JSON.parse(event.message).artifact_type} body={JSON.parse(event.message).artifact_body} />
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