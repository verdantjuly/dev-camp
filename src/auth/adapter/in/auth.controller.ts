import { Controller, Post, Body } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { Auth } from '../out/auth.entity';
import { AuthService } from 'src/auth/domain/auth.service';

@Controller('users')
export class UsersController {
  constructor(private readonly authservice: AuthService) {}

  @Post('signup')
  signup(@Body() signupDto: SignupDto): Promise<Auth> {
    return this.authservice.signup(signupDto);
  }
}
