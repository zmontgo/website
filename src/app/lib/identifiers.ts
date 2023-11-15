"use server";

import { ulid } from 'ulid';
import { redis } from '@/app/lib/redis';
import 'server-only'

export async function createIdentifier() {
  // Generate a unique ID for this request
  const id = ulid();

  // Store the requests:<id> : <timestamp> in Redis with a TTL of 1 hour
  try {
    if (!redis) throw new Error('Redis is not configured');

    await redis.set(`requests:${id}`, Date.now(), 'EX', 60 * 60);

    return id;
  } catch (err) {
    console.error(err)
    return null;
  }

}

export async function verifyIdentifier(hash: string) {
  // Search for the requests:<id> key in Redis
  try {
    if (!redis) throw new Error('Redis is not configured');

    const timestamp = await redis.get(`requests:${hash}`);

    if (!timestamp) throw new Error('Invalid hash');

    return timestamp;
  } catch (err) {
    throw new Error('Failed to verify identifier');
  }
}