import { describe, it, expect } from 'vitest';
import { hashPassword, verifyPassword, createAccessToken, verifyToken, checkRateLimit } from '../src/auth';

describe('Auth Service Logic', () => {
    it('should hash and verify password correctly', async () => {
        const password = 'secure-password-123';
        const { hash, salt } = await hashPassword(password);

        expect(hash).toBeDefined();
        expect(salt).toBeDefined();

        const isValid = await verifyPassword(password, hash, salt);
        expect(isValid).toBe(true);

        const isInvalid = await verifyPassword('wrong-password', hash, salt);
        expect(isInvalid).toBe(false);
    });

    it('should create and verify access tokens', async () => {
        const user = { id: 'user-123', email: 'test@example.com' };
        const token = await createAccessToken(user);

        expect(token).toBeDefined();

        const payload = await verifyToken(token);
        expect(payload).toBeDefined();
        expect(payload?.sub).toBe(user.id);
        expect(payload?.email).toBe(user.email);
    });

    it('should enforce rate limiting', () => {
        const ip = '127.0.0.1';

        // 5 attempts allowed in 60s window (default)
        for (let i = 0; i < 5; i++) {
            expect(checkRateLimit(ip)).toBe(true);
        }

        // 6th attempt should fail
        expect(checkRateLimit(ip)).toBe(false);
    });
});
