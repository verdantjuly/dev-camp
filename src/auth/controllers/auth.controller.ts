import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService, UserService } from '../services';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../dto';
import { LoginDto } from '../dto/login.dto';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('login/kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoCallback(@Req() req) {
    await this.authService.OAuthLogin(req);
  }

  @Post('kakaokey')
  async kakaoKey() {
    return await this.authService.kakaoKey();
  }

  @Post('email')
  async email(@Body() body) {
    return await this.userService.sendEmail(body.email);
  }

  @Post('verify')
  async verify(@Body() body) {
    return await this.userService.verifyEmail(body.email, body.number);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const { email, name, password, phone } = createUserDto;
    return await this.userService.createUser(
      email,
      name,
      password,
      'local',
      phone,
    );
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
