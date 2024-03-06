import { ConflictException, Injectable, Req } from '@nestjs/common';
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
    const user = await this.userService.findByKakaoPassword(req.user.password);

    if (!user) {
      const userData = await this.userService.createUser(
        null,
        req.user.name,
        req.user.password,
        'kakao',
        null,
      );
      const accessToken = this.createAccessToken(userData.id, userData);
      const refreshToken = this.createRefreshToken(userData.id, userData);
      return { accessToken, refreshToken };
    } else {
      throw new ConflictException();
    }
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
