import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities';
import { JwtModule } from '@nestjs/jwt';
import dotenv from 'dotenv';
import { RedisModule } from 'src/common/redis';

dotenv.config();

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [],
  providers: [RedisModule],
  exports: [RedisModule],
})
export class AuthModule {}
