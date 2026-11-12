type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const attempts = new Map<string, RateLimitEntry>();

export function checkRateLimit(
  key: string,
  options: { limit: number; windowMs: number },
) {
  const now = Date.now();
  const current = attempts.get(key);

  if (!current || current.resetAt <= now) {
    const entry = { count: 0, resetAt: now + options.windowMs };
    attempts.set(key, entry);
    return { allowed: true, remaining: options.limit };
  }

  return {
    allowed: current.count < options.limit,
    remaining: Math.max(0, options.limit - current.count),
    retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000),
  };
}

export function recordRateLimitFailure(
  key: string,
  options: { limit: number; windowMs: number },
) {
  const now = Date.now();
  const current = attempts.get(key);

  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + options.windowMs });
    return;
  }

  current.count += 1;
}

export function clearRateLimit(key: string) {
  attempts.delete(key);
}

