import { Injectable } from '@nestjs/common';
import { User } from '../entities';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

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
  async findByKakaoPassword(password: string) {
    return this.findOneBy({ password });
  }

  async createUser(name: string, password: string) {
    const user = new User();
    user.name = name;
    user.password = password;
    return this.save(user);
  }
}
