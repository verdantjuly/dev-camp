import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UserRepository } from '../repositories';
import { UserType } from '../types';
import argon2 from 'argon2';
import { Mail } from 'src/common';
import { RedisModule } from 'src/common/redis';

@Injectable()
export class UserService {
  constructor(
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
    if ((await this.redisModule.getValue(`isverified_${email}`)) == 'true') {
      await this.redisModule.deleteValue(`isverified_${email}`);
    } else {
      throw new BadRequestException();
    }

    if (email) {
      const user = await this.userRepository.findByEmail(email);
      if (user) {
        throw new ConflictException();
      }
    }

    const hashedPassword = await this.hashPassword(password);
    const result = await this.userRepository.createUser(
      email,
      name,
      hashedPassword,
      type,
      phone,
    );
    delete result.password;
    return result;
  }

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return argon2.verify(hashedPassword, plainPassword);
  }
}
