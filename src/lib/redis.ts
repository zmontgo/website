import { Redis } from "ioredis";

if (!process.env.REDIS_URL) throw new Error('Missing REDIS_URL env var');

var redis: Redis;
if (process.env.REDIS_PASSWORD) {
  redis = new Redis(process.env.REDIS_URL, {
    password: process.env.REDIS_PASSWORD
  });
} else {
  redis = new Redis(process.env.REDIS_URL);
}

export default redis;
