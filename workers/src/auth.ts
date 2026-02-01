import { SignJWT, jwtVerify } from 'jose';

// Configuration
const JWT_SECRET = new TextEncoder().encode('your-very-secure-secret-change-me');
const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

export interface User {
    id: string;
    email: string;
    passwordHash: string;
    salt: string;
}

/**
 * Hashing logic using PBKDF2
 */
export async function hashPassword(password: string): Promise<{ hash: string; salt: string }> {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const passwordBuffer = new TextEncoder().encode(password);

    const baseKey = await crypto.subtle.importKey(
        'raw',
        passwordBuffer,
        { name: 'PBKDF2' },
        false,
        ['deriveBits', 'deriveKey']
    );

    const derivedKey = await crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 100000,
            hash: 'SHA-256'
        },
        baseKey,
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
    );

    const exportedKey = await crypto.subtle.exportKey('raw', derivedKey) as ArrayBuffer;
    const hash = btoa(String.fromCharCode(...new Uint8Array(exportedKey)));
    const saltStr = btoa(String.fromCharCode(...salt));

    return { hash, salt: saltStr };
}

export async function verifyPassword(password: string, hash: string, saltStr: string): Promise<boolean> {
    const salt = new Uint8Array(atob(saltStr).split('').map(c => c.charCodeAt(0)));
    const passwordBuffer = new TextEncoder().encode(password);

    const baseKey = await crypto.subtle.importKey(
        'raw',
        passwordBuffer,
        { name: 'PBKDF2' },
        false,
        ['deriveBits', 'deriveKey']
    );

    const derivedKey = await crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 100000,
            hash: 'SHA-256'
        },
        baseKey,
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
    );

    const exportedKey = await crypto.subtle.exportKey('raw', derivedKey) as ArrayBuffer;
    const currentHash = btoa(String.fromCharCode(...new Uint8Array(exportedKey)));

    return currentHash === hash;
}

/**
 * JWT logic using jose
 */
export async function createAccessToken(user: Partial<User>): Promise<string> {
    return await new SignJWT({ sub: user.id, email: user.email })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(ACCESS_TOKEN_EXPIRY)
        .sign(JWT_SECRET);
}

export async function createRefreshToken(user: Partial<User>): Promise<string> {
    return await new SignJWT({ sub: user.id, type: 'refresh' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(REFRESH_TOKEN_EXPIRY)
        .sign(JWT_SECRET);
}

export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload;
    } catch (e) {
        return null;
    }
}

/**
 * Simple in-memory rate limiting (per worker instance)
 * For production, use Cloudflare KV or Durable Objects.
 */
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export function checkRateLimit(ip: string, limit = 5, windowMs = 60000): boolean {
    const now = Date.now();
    const data = rateLimitMap.get(ip) || { count: 0, lastReset: now };

    if (now - data.lastReset > windowMs) {
        data.count = 1;
        data.lastReset = now;
        rateLimitMap.set(ip, data);
        return true;
    }

    if (data.count >= limit) {
        return false;
    }

    data.count++;
    rateLimitMap.set(ip, data);
    return true;
}
