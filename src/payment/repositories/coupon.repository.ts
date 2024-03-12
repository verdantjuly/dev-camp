import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Coupon } from '../entities/coupon.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateCouponDto } from '../dto/create-coupon.dto';

@Injectable()
export class CouponRepository extends Repository<Coupon> {
  constructor(
    @InjectRepository(Coupon)
    private readonly repo: Repository<Coupon>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async createCoupon(createCouponDto: CreateCouponDto) {
    const coupon = new Coupon();
    coupon.name = createCouponDto.name;
    coupon.amount = createCouponDto.amount;
    coupon.percent = createCouponDto.percent;
    return this.repo.save(coupon);
  }
}
