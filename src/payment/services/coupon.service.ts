import { Injectable } from '@nestjs/common';
import { CouponRepository } from '../repositories/coupon.repository';
import { CreateCouponDto } from '../dto/create-coupon.dto';

@Injectable()
export class CouponService {
  constructor(private readonly couponRepository: CouponRepository) {}

  async createCoupon(createCouponDto: CreateCouponDto) {
    return await this.couponRepository.createCoupon(createCouponDto);
  }
}
