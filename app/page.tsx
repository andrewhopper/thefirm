'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { ReportArtifact } from '../src/artifacts/artifacts';
import { LinkedInPreviews } from '@automattic/social-previews';
import { Button } from '../components/ui/button';
import { roles } from '../src/actors/team/team';
import { UserProfile } from '../src/user_profile';
import ReactMarkdown from 'react-markdown';
import { getArtifactSchema, artifacts } from '../src/artifacts/artifact_metadata';
import parseMessage from './parser';

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

    return (
        <div className="w-full grid grid-cols-3 gap-4">
            <div className="col-span-1 p-4 border rounded shadow">
                <h2 className="text-xl font-bold mb-4">Column 1</h2>
                <div className="space-y-4">

                    <div className="p-4">
                        <h1 className="text-2xl font-bold">Welcome to Next.js</h1>
                        <h2 className="text-lg font-bold">CEO</h2>

                        <Button
                            className="mb-4"
                            onClick={() => redisWs.sendMessage('test_channel', {
                                action: 'button_clicked',
                                timestamp: new Date().toISOString()
                            })}

                        >
                            Send Test WebSocket Message
                        </Button>




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
                                    {Object.entries(roles).map(([key, role]: [string, UserProfile], index: number) => (
                                        <option key={index} value={key}>
                                            {role.name} - {role.attributes.role}
                                        </option>
                                    ))}
                                </select>
                                To:
                                <select className="w-full p-2 mb-4 border rounded" name="to" value={to} onChange={(e) => setTo(e.target.value)}>
                                    {Object.entries(roles).map(([key, role]: [string, UserProfile], index: number) => (
                                        <option key={index} value={key}>
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



            <div className="col-span-2 p-4 border rounded shadow">
                <h2 className="text-xl font-bold mb-4">Column 3</h2>
                <div className="space-y-4">
                    <h1>Events</h1>
                    {events && events.length > 0 && (
                        events.map((event, index) => {

                            if (event.message) {
                                return (

                                    <div>
                                        {typeof parseMessage(event) === 'object' && (
                                            <>
                                                <div>{JSON.stringify(parseMessage(event), null, 2)}</div>
                                                <div className="prose">
                                                    {(() => {
                                                        const jsonContent = parseMessage(event);
                                                        let markdown = '';

                                                        let colors: any;
                                                        // Convert JSON object to markdown
                                                        for (const [key, value] of Object.entries(jsonContent)) {
                                                            markdown += `## ${key}\n${value}\n\n`;
                                                            if (key === 'color_palette') {
                                                                colors = value;
                                                            }
                                                        }

                                                        // Use a markdown parser library if available
                                                        // For now, just render with basic formatting
                                                        return (
                                                            <div
                                                                style={{ whiteSpace: 'pre-wrap' }}
                                                                className="markdown-content"
                                                            >
                                                                {colors && (
                                                                    <div>
                                                                        <h4>Color Palette</h4>
                                                                        <div>{colors.map((color: any) => (
                                                                            <div key={color} style={{
                                                                                width: '50px',
                                                                                height: '50px',
                                                                                backgroundColor: color.trim(),
                                                                                display: 'inline-block',
                                                                                margin: '5px',
                                                                                border: '1px solid #ddd'
                                                                            }}></div>
                                                                        ))}</div>
                                                                    </div>
                                                                )}
                                                                <ReactMarkdown
                                                                    components={{
                                                                        h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mb-4" {...props} />,
                                                                        h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mb-3" {...props} />,
                                                                        h3: ({ node, ...props }) => <h3 className="text-xl font-medium mb-2" {...props} />
                                                                    }}
                                                                >
                                                                    {markdown}
                                                                </ReactMarkdown>
                                                            </div>
                                                        );
                                                    })()}
                                                </div>
                                            </>
                                        )}
                                        {typeof parseMessage(event) === 'string' && (
                                            <div>
                                                {/* <div>{parseMessage(event)}</div> */}
                                            </div>
                                        )}
                                        {/* <div>{JSON.parse(JSON.parse(event.message).content.replace(/```json|```/g, '').replace(/```/g, ''))}</div>

                                        <div>{JSON.parse(event.message).content}</div> */}
                                    </div>

                                );
                            }
                            else {
                                return (
                                    <div>
                                        <div>x{JSON.stringify(event)}</div>
                                    </div>
                                );
                            }
                        })
                    )}
                    <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
                        <h3>WebSocket Events</h3>
                        <div id="events-container" style={{ height: '1000px', overflowY: 'auto' }}>
                            {(() => {

                                useEffect(() => {
                                    const ws = new WebSocket('ws://localhost:8080');

                                    ws.onmessage = (event) => {
                                        const data = JSON.parse(event.data);

                                        setEvents(prev => [...prev, {
                                            ...data,
                                            timestamp: new Date().toISOString()
                                        }]);


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
                </div>
            </div>
        </div>


    );
} 