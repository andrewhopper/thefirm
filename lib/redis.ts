import Redis from 'ioredis';

// Ensure connection is reused
const globalForRedis = globalThis as unknown as {
    redis: Redis | undefined;
};

export const redis = globalForRedis.redis ?? new Redis(process.env.REDIS_URL);

if (process.env.NODE_ENV !== 'production') {
    globalForRedis.redis = redis;
} 