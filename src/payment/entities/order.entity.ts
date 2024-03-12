import { Entity, ManyToOne, OneToOne } from 'typeorm';
import { User } from 'src/auth/entities';
import { BaseEntity } from 'src/common/enitty';
import { OrderItem } from './orderItem.entity';
import { PointLog } from './point-log.entity';

@Entity()
export class Order extends BaseEntity {
  @ManyToOne(() => User, user => user.id)
  user: User;

  @ManyToOne(() => OrderItem, orderitem => orderitem.id)
  orderitem: OrderItem;

  @OneToOne(() => PointLog, pointlog => pointlog.order)
  pointlog: PointLog[];
}
