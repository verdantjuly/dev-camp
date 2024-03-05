import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login/kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoCallback(@Req() req) {
    await this.authService.OAuthLogin(req);
  }
  @Post('kakaokey')
  async kakaoKey() {
    return await this.authService.kakaoKey();
  }
}
