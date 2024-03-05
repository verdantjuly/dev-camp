import { Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities';
import { AccessTokenRepository } from '../repositories';
import { RefreshTokenRepository } from '../repositories';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly accessTokenRepository: AccessTokenRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly userService: UserService,
  ) {}

  async OAuthLogin(@Req() req) {
    let user = await this.userService.findByKakaoPassword(req.user.password);

    if (!user)
      user = await this.userService.createUser(
        req.user.name,
        req.user.password,
      );

    const accessToken = this.createAccessToken(user.id, user);
    const refreshToken = this.createRefreshToken(user.id, user);

    return { accessToken, refreshToken };
  }

  async createAccessToken(payload: string, user: User): Promise<string> {
    const expiresIn = process.env.ACCESS_EXPIRES_IN;
    const token = this.jwtService.sign({ payload }, { expiresIn });
    const expiresAt = new Date(new Date().getTime() + Number(expiresIn));

    await this.accessTokenRepository.saveAccessToken(user, token, expiresAt);
    return token;
  }

  async createRefreshToken(payload: string, user: User): Promise<string> {
    const expiresIn = process.env.ACCESS_EXPIRES_IN;
    const token = this.jwtService.sign({ payload }, { expiresIn });
    const expiresAt = new Date(new Date().getTime() + Number(expiresIn));

    await this.refreshTokenRepository.saveAccessToken(user, token, expiresAt);
    return token;
  }
  async kakaoKey() {
    return {
      kakaoJSKey: process.env.KAKAO_CLIENT_ID,
      kakaoRedirectURI: process.env.KAKAO_CALLBACK_URL,
    };
  }
}
