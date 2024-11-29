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

        // Subscribe to Redis for messages
        const subscriber = createClient();
        subscriber.connect().catch(console.error);

        subscriber.subscribe('*', (message: string, channel: string) => {
            console.log('broadcasting message', message, 'to channel', channel);
            try {
                // Send message to all connected clients
                wss.clients.forEach((client: ExtendedWebSocket) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            channel,
                            message,
                            timestamp: new Date().toISOString()
                        }));
                    }
                });
            } catch (error) {
                console.error(`[${clientId}] Error broadcasting Redis message:`, error);
            }
        });

        // Clean up subscriber on client disconnect
        ws.on('close', () => {
            subscriber.quit().catch(console.error);
        });

        // Handle incoming messages
        ws.on('message', (data: Buffer | ArrayBuffer | Buffer[]) => {
            try {
                const message = data.toString();
                console.log(`[${clientId}] Message received:`, {
                    timestamp: new Date().toISOString(),
                    data: message
                });

                // Create Redis client
                const redisClient = createClient();
                redisClient.connect().catch(console.error);

                // Save message to Redis with timestamp
                const timestamp = new Date().toISOString();
                const key = `message:${timestamp}`;
                redisClient.set(key, message).catch((err: Error) => {
                    console.error(`[${clientId}] Error saving to Redis:`, err);
                });

                // Disconnect Redis client
                redisClient.quit().catch(console.error);

                // Try to parse as JSON if possible
                try {
                    const jsonData = JSON.parse(message);
                    // console.log(`[${clientId}] Parsed JSON data:`, jsonData);
                } catch {
                    // Not JSON data, that's fine
                }
            } catch (error) {
                console.error(`[${clientId}] Error processing message:`, error);
            }
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

    return wss;
}

// Usage example
const server = createWebSocketServer();

// Error handling for the server
server.on('error', (error: Error) => {
    console.error('WebSocket server error:', error);
});