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
import { JwtModule, JwtService } from '@nestjs/jwt';
import dotenv from 'dotenv';

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
    UserRepository,
    AccessTokenRepository,
    RefreshTokenRepository,

    KakaoStrategy,
    UserService,
    AuthService,
  ],
  exports: [
    UserRepository,
    AccessTokenRepository,
    RefreshTokenRepository,

    KakaoStrategy,
    UserService,
    AuthService,
  ],
})
export class AuthModule {}
