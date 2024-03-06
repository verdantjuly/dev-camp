import { Module } from '@nestjs/common';
import { KakaoStrategy } from './strategies';
import { AuthController } from './controllers';
import { AuthService, UserService } from './services';
import {
  AccessTokenRepository,
  RefreshTokenRepository,
  UserRepository,
} from './repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AccessLog,
  AccessToken,
  RefreshToken,
  TokenBlacklist,
  User,
} from './entities';
import { JwtModule } from '@nestjs/jwt';
import dotenv from 'dotenv';
import { RedisModule } from 'src/common/redis';
import { Mail } from 'src/common';

dotenv.config();

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    TypeOrmModule.forFeature([
      User,
      AccessToken,
      RefreshToken,
      AccessLog,
      TokenBlacklist,
    ]),
  ],
  controllers: [AuthController],
  providers: [
    RedisModule,
    Mail,
    UserRepository,
    AccessTokenRepository,
    RefreshTokenRepository,

    KakaoStrategy,
    UserService,
    AuthService,
  ],
  exports: [
    RedisModule,
    Mail,
    UserRepository,
    AccessTokenRepository,
    RefreshTokenRepository,

    KakaoStrategy,
    UserService,
    AuthService,
  ],
})
export class AuthModule {}
