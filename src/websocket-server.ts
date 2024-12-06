const WebSocket = require('ws');
const { Server } = require('ws');
const Redis = require('redis');
const { createClient } = Redis;
import { IncomingMessage } from 'http';

interface ExtendedWebSocket extends WebSocket {
    clientId?: string;
    on(event: 'ping' | 'pong' | 'close' | 'error' | 'message', listener: (...args: any[]) => void): void;
}

function createWebSocketServer(port: number = 8080) {
    const wss = new Server({ port });

    // Connection counter to assign unique IDs to clients
    let connectionCounter = 0;

    // Create a single Redis subscriber for the server
    const subscriber = createClient();
    subscriber.connect().catch(console.error);

    // Subscribe to all Redis channels
    subscriber.pSubscribe('*', (message: string, channel: string) => {
        console.log(`Broadcasting message from Redis channel ${channel}:`, message);

        // Broadcast to all connected WebSocket clients
        wss.clients.forEach((client: ExtendedWebSocket) => {
            if (client.readyState === WebSocket.OPEN) {
                const data = {
                    channel,
                    message,
                    timestamp: new Date().toISOString()
                };
                // stringify data to send to client
                // websockets only supports strings and blobs
                console.log('Broadcasting message to client (websocket-server.ts 36):', data);
                client.send(JSON.stringify(data));
            }
        });
    });

    wss.on('listening', () => {
        console.log(`WebSocket server is listening on port ${port}`);
    });

    wss.on('connection', (ws: ExtendedWebSocket, req: IncomingMessage) => {
        // Assign unique ID to this connection
        const clientId = `client_${++connectionCounter}`;
        ws.clientId = clientId;

        const clientIp = req.socket.remoteAddress;
        console.log(`[${clientId}] New connection from ${clientIp}`);

        // Log when client connects
        console.log(`[${clientId}] Connected at ${new Date().toISOString()}`);

        // Handle incoming messages
        ws.on('message', async (data: Buffer | ArrayBuffer | Buffer[]) => {
            try {
                const message = JSON.stringify(data.toString());
                console.log('--------------------------------');
                console.log('line 37 - websocket-server.ts');
                console.log(message);
                console.log(typeof message);
                console.log('--------------------------------');
                console.log(`[${clientId}] Message received:`, {
                    timestamp: new Date().toISOString(),
                    data: message
                });

                // Create Redis publisher client
                const publisher = createClient();
                await publisher.connect();

                // Publish message to Redis
                await publisher.publish('chat', message);

                // Clean up publisher
                await publisher.quit();

            } catch (error) {
                console.error(`[${clientId}] Error processing message:`, error);
            }
        });

        // Subscribe to all Redis channels
        subscriber.pSubscribe('*', (message: string, channel: string) => {
            console.log(`Broadcasting message from Redis channel ${channel}:`, message);

            // Broadcast to all connected WebSocket clients
            const data = {
                channel,
                message: message,
                timestamp: new Date().toISOString()
            };
            console.log('Broadcasting message to client (websocket-server.ts 85):', data);
            ws.send(message);
        });

        // Handle client errors
        ws.on('error', (error) => {
            console.error(`[${clientId}] WebSocket error:`, error);
        });

        // Handle client disconnection
        ws.on('close', (code: number, reason: Buffer) => {
            console.log(`[${clientId}] Client disconnected:`, {
                timestamp: new Date().toISOString(),
                code,
                reason: reason.toString()
            });
        });

        // Handle pings from client
        ws.on('ping', () => {
            console.log(`[${clientId}] Received ping`);
        });

        // Handle pongs from client
        ws.on('pong', () => {
            console.log(`[${clientId}] Received pong`);
        });
    });

    // Clean up Redis subscriber when server closes
    wss.on('close', () => {
        subscriber.quit().catch(console.error);
    });

    return wss;
}

// Usage example
const server = createWebSocketServer();

// Error handling for the server
server.on('error', (error: Error) => {
    console.error('WebSocket server error:', error);
});