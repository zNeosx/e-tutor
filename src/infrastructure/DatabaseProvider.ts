import { PrismaClient } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export interface DatabaseProvider {
  getClient(): PrismaClient;
}

export class PrismaProvider implements DatabaseProvider {
  private db: PrismaClient;

  constructor() {
    this.db = prisma;
  }

  getClient() {
    return this.db;
  }
}
