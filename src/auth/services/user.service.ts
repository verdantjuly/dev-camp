import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByKakaoPassword(password: string) {
    return this.userRepository.findByKakaoPassword(password);
  }

  async createUser(name: string, password: string) {
    return this.userRepository.createUser(name, password);
  }
}
