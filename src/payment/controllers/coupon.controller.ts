import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CouponService } from '../services/coupon.service';
import { CreateCouponDto } from '../dto/create-coupon.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/guard/auth.guard';

@Controller('api/coupon')
export class AuthController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles('admin')
  async createCoupon(@Body() createCouponDto: CreateCouponDto) {
    return this.couponService.createCoupon(createCouponDto);
  }
}
