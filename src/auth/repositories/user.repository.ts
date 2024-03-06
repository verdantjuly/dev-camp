import { Injectable } from '@nestjs/common';
import { User } from '../entities';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { UserType } from '../types';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async findByEmail(email: string) {
    return this.findOneBy({ email });
  }

  async findByKakaoPassword(password: string) {
    return this.findOne({ where: { password, type: 'kakao' } });
  }

  async createUser(
    email: string,
    name: string,
    password: string,
    type: UserType,
    phone: string,
  ) {
    const user = new User();
    user.email = email;
    user.name = name;
    user.password = password;
    user.type = type;
    user.phone = phone;
    return this.save(user);
  }
}
