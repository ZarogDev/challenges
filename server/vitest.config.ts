import dotenv from 'dotenv';
import { defineConfig } from "vitest/config";

dotenv.config({
  path: './tests/config/.env.test'
});

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/config/setup.ts'],
    maxWorkers: 1,
  }
});