import { describe, expect, it } from "vitest";

describe("Testing test environment config", () => {
  it('should use test env', () => {
    expect(process.env.NODE_ENV).toBe('test');
    expect(process.env.DATABASE_URL).toContain('test_gamerchallenges');
  });
});