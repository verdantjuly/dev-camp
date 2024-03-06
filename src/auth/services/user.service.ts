import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import {
  AccessTokenRepository,
  RefreshTokenRepository,
  UserRepository,
} from '../repositories';
import { UserType } from '../types';
import argon2 from 'argon2';
import { Mail } from 'src/common';
import { RedisModule } from 'src/common/redis';
import { User } from '../entities';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly accessTokenRepository: AccessTokenRepository,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly mail: Mail,
    private readonly redisModule: RedisModule,
  ) {}

  async findByKakaoPassword(password: string) {
    return this.userRepository.findByKakaoPassword(password);
  }

  async sendEmail(email: string) {
    const verifyNumber =
      Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;

    const param = {
      toEmail: email, // 수신할 이메일

      subject: '[dev-camp] 인증번호를 확인하세요!', // 메일 제목

      text: `
              dev-camp 에 찾아 주셔서 감사합니다!
              회원 가입을 위해 이 숫자를 입력해 주세요. 
              [ ${verifyNumber} ]`, // 메일 내용
    };
    const isEmail = this.mail.sendGmail(param);
    if (isEmail) {
      await this.redisModule.setValue(
        `verifyNumber_${email}`,
        `${verifyNumber}`,
      );
    }
  }

  async verifyEmail(email: string, number: number) {
    if (
      number.toString() !==
      (await this.redisModule.getValue(`verifyNumber_${email}`))
    ) {
      throw new BadRequestException();
    } else {
      await this.redisModule.setValue(`isverified_${email}`, `true`);
    }
  }

  async createUser(
    email: string,
    name: string,
    password: string,
    type: UserType,
    phone: string,
  ) {
    if (email) {
      if ((await this.redisModule.getValue(`isverified_${email}`)) == 'true') {
        await this.redisModule.deleteValue(`isverified_${email}`);
      } else {
        throw new BadRequestException();
      }
      const user = await this.userRepository.findByEmail(email);
      if (user) {
        throw new ConflictException();
      }
      password = await this.hashPassword(password);
    }

    const result = await this.userRepository.createUser(
      email,
      name,
      password,
      type,
      phone,
    );

    const accessToken = this.createAccessToken(result.id, result);
    const refreshToken = this.createRefreshToken(result.id, result);
    return { accessToken, refreshToken };
  }

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  }

  async comparePasswords(
    hashedPassword: string,
    plainPassword: string,
  ): Promise<boolean> {
    return await argon2.verify(hashedPassword, plainPassword);
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
}
