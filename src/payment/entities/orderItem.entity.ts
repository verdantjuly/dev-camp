import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/enitty';
import { Order } from './order.entity';

@Entity()
export class OrderItem extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'bigint', default: 0 })
  price: number;

  @OneToMany(() => Order, order => order.id)
  order: Order[];
}
