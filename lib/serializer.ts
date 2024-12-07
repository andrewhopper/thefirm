// Type definitions for serializable data
type Primitive = string | number | boolean | null;
type SerializableValue = Primitive | SerializableArray | SerializableObject | Date;
interface SerializableObject {
    [key: string]: SerializableValue;
}
type SerializableArray = SerializableValue[];

// Custom type for serialized data
interface SerializedData {
    type: 'primitive' | 'array' | 'object' | 'date';
    value: any;
}

/**
 * Serializes a value into a format safe for JSON transmission
 * Handles nested objects, arrays, and special types like Date
 */
export function serialize(data: SerializableValue): string {
    function serializeValue(value: SerializableValue): SerializedData {
        if (value === null || ['string', 'number', 'boolean'].includes(typeof value)) {
            return {
                type: 'primitive',
                value: value
            };
        }

        if (Array.isArray(value)) {
            return {
                type: 'array',
                value: value.map(item => serializeValue(item))
            };
        }

        if (value instanceof Date) {
            return {
                type: 'date',
                value: value.toISOString()
            };
        }

        if (typeof value === 'object') {
            const serializedObj: { [key: string]: SerializedData } = {};
            for (const [key, val] of Object.entries(value)) {
                serializedObj[key] = serializeValue(val as SerializableValue);
            }
            return {
                type: 'object',
                value: serializedObj
            };
        }

        throw new Error(`Unsupported type: ${typeof value}`);
    }

    return JSON.stringify(serializeValue(data));
}

/**
 * Deserializes a JSON string back into its original form
 * Restores nested objects, arrays, and special types
 */
export function deserialize<T extends SerializableValue>(serializedData: string): T {
    function deserializeValue(data: SerializedData): any {
        switch (data.type) {
            case 'primitive':
                return data.value;

            case 'array':
                return data.value.map((item: SerializedData) => deserializeValue(item));

            case 'date':
                return new Date(data.value);

            case 'object': {
                const obj: { [key: string]: any } = {};
                for (const [key, value] of Object.entries(data.value)) {
                    obj[key] = deserializeValue(value as SerializedData);
                }
                return obj;
            }

            default:
                throw new Error(`Unknown type: ${(data as SerializedData).type}`);
        }
    }

    return deserializeValue(JSON.parse(serializedData));
}

/**
 * Type guard to check if a value is serializable
 */
export function isSerializable(value: any): value is SerializableValue {
    if (value === null || ['string', 'number', 'boolean'].includes(typeof value)) {
        return true;
    }

    if (value instanceof Date) {
        return true;
    }

    if (Array.isArray(value)) {
        return value.every(item => isSerializable(item));
    }

    if (typeof value === 'object') {
        return Object.values(value).every(item => isSerializable(item));
    }

    return false;
}

/**
 * Helper function to safely serialize and deserialize data for Redis
 */
export const RedisUtils = {
    /**
     * Serialize data for storing in Redis
     */
    serialize(key: string, data: SerializableValue): { key: string; value: string } {
        return {
            key,
            value: serialize(data)
        };
    },

    /**
     * Deserialize data retrieved from Redis
     */
    deserialize<T extends SerializableValue>(value: string): T {
        return deserialize<T>(value);
    }
};

/**
 * Helper functions for WebSocket communication
 */
export const WebSocketUtils = {
    /**
     * Prepare message for sending over WebSocket
     */
    prepareMessage(type: string, payload: SerializableValue): string {
        return serialize({
            type,
            payload,
            timestamp: new Date()
        });
    },

    /**
     * Parse received WebSocket message
     */
    parseMessage<T extends SerializableValue>(message: string): {
        type: string;
        payload: T;
        timestamp: Date;
    } {
        return deserialize(message);
    }
};