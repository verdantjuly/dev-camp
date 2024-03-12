import { Entity, ManyToOne, OneToOne } from 'typeorm';
import { User } from 'src/auth/entities';
import { BaseEntity } from 'src/common/enitty';
import { Coupon } from './coupon.entity';
import { PointLog } from './point-log.entity';

@Entity()
export class IssuedCoupon extends BaseEntity {
  @ManyToOne(() => User, user => user.id)
  user: User;

  @ManyToOne(() => Coupon, coupon => coupon.id)
  coupon: Coupon;

  @OneToOne(() => PointLog, pointlog => pointlog.issuedCoupon)
  pointlog: PointLog[];
}
