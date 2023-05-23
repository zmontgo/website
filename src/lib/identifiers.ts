import { ulid } from 'ulid';
import redis from '@/lib/redis';

export async function createIdentifier() {
  // Generate a unique ID for this request
  const id = ulid();

  // Store the requests:<id> : <timestamp> in Redis with a TTL of 1 hour
  await redis.set(`requests:${id}`, Date.now(), 'EX', 60 * 60);

  return id;
}

export async function verifyIdentifier(hash: string) {
  // Search for the requests:<id> key in Redis
  const timestamp = await redis.get(`requests:${hash}`);

  if (!timestamp) throw new Error('Invalid hash');

  return timestamp;
}