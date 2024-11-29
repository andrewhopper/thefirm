import { redis } from './redis';
import Redis from 'ioredis';
type EventCallback = (data: any) => void;
const subscribers: Record<string, EventCallback[]> = {};

// Create separate client for subscription (Redis requirement)
const subscriber = new Redis(process.env.REDIS_URL);

export const pubsub = {
    publish: async (channel: string, data: any) => {
        await redis.publish(channel, JSON.stringify(data));
    },

    subscribe: (channel: string, callback: EventCallback) => {
        if (!subscribers[channel]) {
            subscribers[channel] = [];
            subscriber.subscribe(channel);
        }
        subscribers[channel].push(callback);
    },

    unsubscribe: (channel: string, callback: EventCallback) => {
        if (subscribers[channel]) {
            subscribers[channel] = subscribers[channel].filter(cb => cb !== callback);
            if (subscribers[channel].length === 0) {
                subscriber.unsubscribe(channel);
                delete subscribers[channel];
            }
        }
    }
};

// Handle incoming messages
subscriber.on('message', (channel, message) => {
    if (subscribers[channel]) {
        const data = JSON.parse(message);
        subscribers[channel].forEach(callback => callback(data));
    }
}); 