import { Column, Entity, OneToMany } from 'typeorm';
import { IssuedCoupon } from './issued-coupon.entity';
import { BaseEntity } from 'src/common/enitty';

@Entity()
export class Coupon extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'bigint', default: 0 })
  percent: number;

  @Column({ type: 'bigint', default: 0 })
  amount: number;

  @OneToMany(() => IssuedCoupon, issuedCoupon => issuedCoupon.coupon)
  issuedCoupon: IssuedCoupon[];
}
