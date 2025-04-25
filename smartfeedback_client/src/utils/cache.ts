import { LRUCache } from 'lru-cache';

// Create a cache with a maximum of 100 items and 1 hour TTL
const cache = new LRUCache<string, Record<string, unknown>>({
  max: 100,
  ttl: 1000 * 60 * 60, // 1 hour in milliseconds
});

export const apiCache = {
  get: <T>(key: string): T | null => {
    return cache.get(key) as T || null;
  },
  set: <T>(key: string, value: T): void => {
    cache.set(key, value as Record<string, unknown>);
  },
  clear: (): void => {
    cache.clear();
  }
}; 