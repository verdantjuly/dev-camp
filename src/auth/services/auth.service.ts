import { BadRequestException, Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities';
import { AccessTokenRepository, UserRepository } from '../repositories';
import { RefreshTokenRepository } from '../repositories';
import { UserService } from './user.service';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly accessTokenRepository: AccessTokenRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
  ) {}

  async OAuthLogin(@Req() req) {
    const user = await this.userService.findByKakaoPassword(req.user.password);

    if (!user) {
      await this.userService.createUser(
        null,
        req.user.name,
        req.user.password,
        'kakao',
        null,
      );
    }
    const user2 = await this.userRepository.findByKakaoPassword(
      req.user.password,
    );
    const accessToken = await this.createAccessToken(user2.id, user2);
    const refreshToken = await this.createRefreshToken(user2.id, user2);
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

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findByEmail(loginDto.email);
    if (!user) {
      throw new BadRequestException();
    }
    const result = await this.userService.comparePasswords(
      user.password,
      loginDto.password,
    );
    if (!result) {
      throw new BadRequestException();
    }
    const accessToken = await this.createAccessToken(user.id, user);
    const refreshToken = await this.createRefreshToken(user.id, user);
    return { accessToken, refreshToken };
  }

  async kakaoKey() {
    return {
      kakaoJSKey: process.env.KAKAO_CLIENT_ID,
      kakaoRedirectURI: process.env.KAKAO_CALLBACK_URL,
    };
  }
}
