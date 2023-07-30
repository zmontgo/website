import { Redis } from "ioredis";

export default function get_redis(): Redis | null { 
  if (!process.env.REDIS_URL) {
    return null;
  }
  
  var redis: Redis;
  if (process.env.REDIS_PASSWORD) {
    redis = new Redis(process.env.REDIS_URL, {
      password: process.env.REDIS_PASSWORD
    });
  } else {
    redis = new Redis(process.env.REDIS_URL);
  }

  return redis;
}
