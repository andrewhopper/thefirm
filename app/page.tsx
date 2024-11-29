'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { ReportArtifact } from '../src/artifacts/artifacts';
import { LinkedInPreviews } from '@automattic/social-previews';

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

export default function Home() {
    const { report: marketingReport, loading: marketingLoading, error: marketingError, getReport } = useMarketingReport();
    const { report: linkedInReport, loading: linkedInLoading, error: linkedInError, getLinkedInPost } = useLinkedInPost();
    const [feedback, setFeedback] = useState<string | null>(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [showJson, setShowJson] = useState(false);
    const [showRevisionUI, setShowRevisionUI] = useState(false);
    return (
        <>
            <h1>Welcome to Next.js</h1>
            <h2>CEO</h2>

            <button
                onClick={() => redisWs.sendMessage('test_channel', {
                    action: 'button_clicked',
                    timestamp: new Date().toISOString()
                })}
                style={{
                    padding: '8px 16px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginBottom: '16px'
                }}
            >
                Send Test WebSocket Message
            </button>

            <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
                <h3>WebSocket Events</h3>
                <div id="events-container">
                    {(() => {
                        const [events, setEvents] = useState<Array<{ key: string, event: string, timestamp: string }>>([]);

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

                        return (
                            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                {events.map((event, index) => (
                                    <div key={index} style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                                        <div><strong>Key:</strong> {event.key}</div>
                                        <div><strong>Event:</strong> {event.event}</div>
                                        <div><strong>Time:</strong> {new Date(event.timestamp).toLocaleString()}</div>
                                        <div><strong>Message:</strong> {JSON.stringify(event)}</div>
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

            <div>
                <button
                    onClick={() => getReport('personal mental health apps', 'ceo')}
                    disabled={marketingLoading}
                >
                    Get Marketing Report for CEO on Personal Mental Health Apps
                </button>
                <br />
                <button
                    onClick={() => getReport('personal mental health apps', 'coo')}
                    disabled={marketingLoading}
                >
                    Get Marketing Report for COO on Todo list Apps popular with people with ADHD
                </button>
                <br />
                <button
                    onClick={() => getLinkedInPost('how education can be improved with AI', 'social_media_marketer')}
                    disabled={linkedInLoading}
                >
                    Create a LinkedIn Post about the latest AI trends
                </button>
                {marketingLoading && <p>Loading...</p>}
                {marketingError && <p>Error: {marketingError}</p>}
                {linkedInLoading && <p>Loading...</p>}
                {linkedInError && <p>Error: {linkedInError}</p>}
            </div>
            {linkedInReport && (
                <div>
                    <h3>LinkedIn Post</h3>
                    <div>
                        <h4>Prompt:</h4>
                        <div>
                            {linkedInReport.prompt && (
                                <div>
                                    <button
                                        onClick={() => setShowPrompt(!showPrompt)}
                                        className="text-sm text-gray-500 hover:text-gray-700"
                                    >
                                        {showPrompt ? 'Hide Prompt' : 'Show Prompt'}
                                    </button>
                                    {showPrompt && (
                                        <pre className="mt-2">{linkedInReport.prompt}</pre>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <h4>Post Preview:</h4>
                        <div style={{ maxWidth: '600px', margin: '20px 0' }}>
                            <LinkedInPreviews
                                url="example.com"
                                title="LinkedIn Post"
                                description={parseResult(linkedInReport.result).post}
                                name="AI Generated Post"
                                profileImage="https://placehold.co/200x200"
                            />
                        </div>
                        <div>
                            <h4>Raw Content:</h4>
                            {linkedInReport.result && (
                                <>
                                    <pre className="mt-2">{JSON.stringify(parseResult(linkedInReport.result), null, 2)}</pre>
                                    {parseResult(linkedInReport.result).post.split('\n').map((line: any, i: number) => (

                                        <span key={i}>{line}</span>
                                    ))}
                                </>
                            )}


                            {linkedInReport.result && (
                                <button
                                    onClick={() => sendManagerReviewNotification('ceo', 'marketing_manager', 'LinkedInPost', parseResult(linkedInReport.result).guid, parseResult(linkedInReport.result).post, 'Trying to grow thought leadership', 'review linkedin post')}
                                    className="text-sm text-gray-500 hover:text-gray-700 mt-4"
                                >
                                    Get Manager Review
                                </button>
                            )}
                            {feedback && (
                                <div>
                                    <h4>Manager Review:</h4>
                                    <p>{feedback}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}


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
                                                    <button
                                                        onClick={() => setShowPrompt(!showPrompt)}
                                                        className="text-sm text-gray-500 hover:text-gray-700"
                                                    >
                                                        {showPrompt ? 'Hide Prompt' : 'Show Prompt'}
                                                    </button>
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
                                            <button
                                                onClick={() => setShowJson(!showJson)}
                                                className="text-sm text-gray-500 hover:text-gray-700"
                                            >
                                                {showJson ? 'Hide Raw JSON' : 'Show Raw JSON'}
                                            </button>
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
        </>
    );
} 