import { createClient } from 'redis';
import { EventEmitter } from 'events';

interface RedisMessage {
    channel: string;
    message: string;
    timestamp: string;
}

export class RedisEventOrchestrator extends EventEmitter {
    private subscriber;
    private publisher;
    private isConnected: boolean = false;

    constructor() {
        super();
        this.subscriber = createClient();
        this.publisher = createClient();
        this.initialize();
    }

    private async initialize() {
        try {
            // Handle Redis connection events
            this.subscriber.on('error', (err) => {
                console.error('Redis Orchestrator Error:', err);
                this.isConnected = false;
            });

            this.subscriber.on('connect', () => {
                console.log('Redis Orchestrator Connected');
                this.isConnected = true;
            });

            await this.subscriber.connect();
            await this.publisher.connect();
            await this.setupSubscriptions();
        } catch (error) {
            console.error('Failed to initialize Redis Orchestrator:', error);
        }
    }

    private async setupSubscriptions() {
        // Subscribe to specific channels
        await this.subscriber.pSubscribe('*', this.handleMessage.bind(this));

        // You can add more specific subscriptions as needed
        await this.subscriber.subscribe('user:*', this.handleUserEvents.bind(this));
        await this.subscriber.subscribe('chat:*', this.handleChatEvents.bind(this));
        await this.subscriber.subscribe('system:*', this.handleSystemEvents.bind(this));
    }

    private handleMessage(message: string, channel: string) {
        try {
            const parsedMessage = JSON.parse(message);
            console.log(`[${channel}] Received message:`, parsedMessage);

            // Emit event for external listeners
            this.emit('message', { channel, message: parsedMessage });

            // Route message to appropriate handler based on channel
            switch (true) {
                case channel.startsWith('user:'):
                    this.handleUserEvents(message, channel);
                    break;
                case channel.startsWith('chat:'):
                    this.handleChatEvents(message, channel);
                    break;
                case channel.startsWith('manager_reviews:'):
                    this.handleChatEvents(message, channel);
                    break;
                case channel.startsWith('llm_response:'):
                    this.handleLLMResponseEvents(message, channel);
                    break;
                case channel.startsWith('system:'):
                    this.handleSystemEvents(message, channel);
                    break;
                default:
                    console.log(`No specific handler for channel: ${channel}`);
            }
        } catch (error) {
            console.error('Error handling message:', error);
        }
    }

    private handleUserEvents(message: string, channel: string) {
        try {
            const data = JSON.parse(message);
            console.log(`Processing user event on ${channel}:`, data);

            switch (channel) {
                case 'user:login':
                    this.handleUserLogin(data);
                    break;
                case 'user:logout':
                    this.handleUserLogout(data);
                    break;
                // Add more user-related event handlers
            }
        } catch (error) {
            console.error('Error handling user event:', error);
        }
    }

    private handleLLMResponseEvents(message: string, channel: string) {
        try {
            const data = JSON.parse(message);
            console.log(`Processing LLM response event on ${channel}:`, data);
        } catch (error) {
            console.error('Error handling LLM response event:', error);
        }
    }

    private handleChatEvents(message: string, channel: string) {
        try {
            const data = JSON.parse(message);
            console.log(`Processing chat event on ${channel}:`, data);

            switch (channel) {
                case 'chat:message':
                    this.handleChatMessage(data);
                    break;
                case 'chat:typing':
                    this.handleTypingIndicator(data);
                    break;
                // Add more chat-related event handlers
            }
        } catch (error) {
            console.error('Error handling chat event:', error);
        }
    }

    private handleSystemEvents(message: string, channel: string) {
        try {
            const data = JSON.parse(message);
            console.log(`Processing system event on ${channel}:`, data);

            switch (channel) {
                case 'system:maintenance':
                    this.handleMaintenanceMode(data);
                    break;
                // Add more system-related event handlers
            }
        } catch (error) {
            console.error('Error handling system event:', error);
        }
    }

    // Example event handlers
    private handleUserLogin(data: any) {
        console.log('User logged in:', data);
        // Implement login logic
    }

    private handleUserLogout(data: any) {
        console.log('User logged out:', data);
        // Implement logout logic
    }

    private handleChatMessage(data: any) {
        console.log('New chat message:', data);
        // Implement chat message logic
    }

    private handleTypingIndicator(data: any) {
        console.log('Typing indicator:', data);
        // Implement typing indicator logic
    }

    private handleMaintenanceMode(data: any) {
        console.log('Maintenance mode:', data);
        // Implement maintenance mode logic
    }

    public async publish(channel: string, message: any) {
        try {
            const messageString = typeof message === 'string' ? message : JSON.stringify(message);
            await this.publisher.publish(channel, messageString);
            console.log(`Published to ${channel}:`, message);
        } catch (error) {
            console.error('Error publishing message:', error);
            throw error;
        }
    }

    public async shutdown() {
        try {
            await this.subscriber.quit();
            await this.publisher.quit();
            this.isConnected = false;
            console.log('Redis Orchestrator shut down successfully');
        } catch (error) {
            console.error('Error shutting down Redis Orchestrator:', error);
        }
    }

    /**
     * Deletes a message or multiple messages using keys or patterns
     * @param pattern The key or pattern to match messages for deletion
     * @returns Number of keys deleted
     */
    public async deleteMessages(pattern: string): Promise<number> {
        try {
            // Get all keys matching the pattern
            const keys = await this.publisher.keys(pattern);

            if (keys.length === 0) {
                console.log(`No messages found matching pattern: ${pattern}`);
                return 0;
            }

            // Delete all matching keys
            const deleted = await this.publisher.del(keys);
            console.log(`Deleted ${deleted} messages matching pattern: ${pattern}`);

            // Emit deletion event
            this.emit('messages:deleted', {
                pattern,
                count: deleted,
                timestamp: new Date().toISOString()
            });

            return deleted;
        } catch (error) {
            console.error('Error deleting messages:', error);
            throw error;
        }
    }

    /**
     * Deletes messages older than the specified timestamp
     * @param pattern The key pattern to match messages
     * @param olderThan Timestamp in milliseconds
     * @returns Number of messages deleted
     */
    public async deleteOldMessages(pattern: string, olderThan: number): Promise<number> {
        try {
            const keys = await this.publisher.keys(pattern);
            let deletedCount = 0;

            for (const key of keys) {
                const message = await this.publisher.get(key);
                if (message) {
                    try {
                        const parsed = JSON.parse(message);
                        if (parsed.timestamp && new Date(parsed.timestamp).getTime() < olderThan) {
                            await this.publisher.del(key);
                            deletedCount++;
                        }
                    } catch (e) {
                        console.warn(`Skipping non-JSON message for key: ${key}`);
                    }
                }
            }

            console.log(`Deleted ${deletedCount} old messages matching pattern: ${pattern}`);

            // Emit deletion event
            this.emit('messages:deleted', {
                pattern,
                count: deletedCount,
                olderThan: new Date(olderThan).toISOString(),
                timestamp: new Date().toISOString()
            });

            return deletedCount;
        } catch (error) {
            console.error('Error deleting old messages:', error);
            throw error;
        }
    }

    /**
     * Deletes a specific message by its unique ID
     * @param messageId The unique identifier of the message
     * @returns boolean indicating if the message was deleted
     */
    public async deleteMessageById(messageId: string): Promise<boolean> {
        try {
            // First, try to find the message key that contains this ID
            const allKeys = await this.publisher.keys('*');
            let deletedMessage = null;

            for (const key of allKeys) {
                const message = await this.publisher.get(key);
                if (message) {
                    try {
                        const parsed = JSON.parse(message);
                        if (parsed.id === messageId || key.includes(messageId)) {
                            deletedMessage = parsed;
                            await this.publisher.del(key);
                            break;
                        }
                    } catch (e) {
                        console.warn(`Skipping non-JSON message for key: ${key}`);
                    }
                }
            }

            if (deletedMessage) {
                console.log(`Deleted message with ID: ${messageId}`);

                // Emit deletion event
                this.emit('message:deleted', {
                    messageId,
                    message: deletedMessage,
                    timestamp: new Date().toISOString()
                });

                return true;
            }

            console.log(`No message found with ID: ${messageId}`);
            return false;

        } catch (error) {
            console.error('Error deleting message by ID:', error);
            throw error;
        }
    }

    /**
     * Deletes multiple messages by their IDs
     * @param messageIds Array of message IDs to delete
     * @returns Object containing successful and failed deletions
     */
    public async deleteMessagesByIds(messageIds: string[]): Promise<{
        successful: string[];
        failed: string[];
    }> {
        const results = {
            successful: [] as string[],
            failed: [] as string[]
        };

        for (const messageId of messageIds) {
            try {
                const deleted = await this.deleteMessageById(messageId);
                if (deleted) {
                    results.successful.push(messageId);
                } else {
                    results.failed.push(messageId);
                }
            } catch (error) {
                console.error(`Failed to delete message ${messageId}:`, error);
                results.failed.push(messageId);
            }
        }

        // Emit batch deletion event
        this.emit('messages:batch-deleted', {
            successful: results.successful,
            failed: results.failed,
            timestamp: new Date().toISOString()
        });

        return results;
    }
}