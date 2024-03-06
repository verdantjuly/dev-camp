import { createClient } from 'redis';
import { Injectable } from '@nestjs/common';
import dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class RedisModule {
  private readonly redisClient;

  constructor() {
    this.redisClient = createClient({
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
      legacyMode: true,
    });

    this.redisClient.on('connect', () => {
      console.info('Redis connected!');
    });

    this.redisClient.on('error', err => {
      console.error('Redis Client Error', err);
    });

    this.redisClient.connect().then();
  }

  async setValue(key: string, value: string): Promise<void> {
    await this.redisClient.v4.set(key, value, 'EX', 300);
  }

  async getValue(key: string): Promise<string | null> {
    return await this.redisClient.v4.get(key);
  }
  async deleteValue(key: string): Promise<void> {
    await this.redisClient.v4.del(key);
  }
}
