import { BaseEntity } from 'src/common/enitty';
import { Column, Entity, OneToOne } from 'typeorm';
import { Order } from './order.entity';
import { IssuedCoupon } from './issued-coupon.entity';

@Entity()
export class PointLog extends BaseEntity {
  @Column({ type: 'bigint', default: 0 })
  amount: number;

  @OneToOne(() => Order, order => order.id)
  order: Order[];

  @OneToOne(() => IssuedCoupon, issuedCoupon => issuedCoupon.id)
  issuedCoupon: IssuedCoupon[];
}
