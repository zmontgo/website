import { ulid } from 'ulid';
import get_redis from '@/lib/redis';

export async function createIdentifier() {
  // Generate a unique ID for this request
  const id = ulid();

  // Store the requests:<id> : <timestamp> in Redis with a TTL of 1 hour
  try {
    const redis = get_redis();
    if (!redis) throw new Error('Redis is not configured');

    await redis.set(`requests:${id}`, Date.now(), 'EX', 60 * 60);

    return id;
  } catch (err) {
    throw new Error('Failed to create identifier');
  }

}

export async function verifyIdentifier(hash: string) {
  // Search for the requests:<id> key in Redis
  try {
    const redis = get_redis();
    if (!redis) throw new Error('Redis is not configured');

    const timestamp = await redis.get(`requests:${hash}`);

    if (!timestamp) throw new Error('Invalid hash');

    return timestamp;
  } catch (err) {
    throw new Error('Failed to verify identifier');
  }
}