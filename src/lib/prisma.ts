import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  // In development, if Prisma was regenerated while Next.js dev server was running,
  // purge require cache and load directly to get updated schema models
  if (process.env.NODE_ENV !== 'production') {
    try {
      const dynamicRequire = typeof eval !== 'undefined' ? eval('require') : require;
      if (dynamicRequire && dynamicRequire.cache) {
        Object.keys(dynamicRequire.cache).forEach((key) => {
          if (key.includes('@prisma') || key.includes('.prisma')) {
            delete dynamicRequire.cache[key];
          }
        });
      }
      const { PrismaClient: FreshClient } = dynamicRequire('@prisma/client');
      const client = new FreshClient({
        log: ['error', 'warn'],
      });
      if ((client as any).companyDocument) {
        return client;
      }
    } catch (e) {
      console.warn('Could not dynamically require fresh PrismaClient:', e);
    }
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
}

// If running in dev and the existing singleton lacks the new model, drop it
if (
  process.env.NODE_ENV !== 'production' &&
  globalForPrisma.prisma &&
  !(globalForPrisma.prisma as any).companyDocument
) {
  try {
    (globalForPrisma.prisma as any).$disconnect?.();
  } catch {}
  globalForPrisma.prisma = undefined;
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;

