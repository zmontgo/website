import { Redis } from "ioredis";
import 'server-only'

export const redis: Redis = new Redis(process.env.REDIS_URL!, {
  password: process.env.REDIS_PASSWORD,
});