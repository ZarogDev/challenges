import "dotenv/config";
import { PrismaClient } from './reset/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
export const prisma = globalThis.prisma ||
    new PrismaClient({ adapter });
if (process.env.NODE_ENV !== 'production')
    globalThis.prisma = prisma;
