import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/enitty';
import { User } from './user.entity';

@Entity()
export class AccessLog extends BaseEntity {
  @Column({ type: 'varchar', length: 512, nullable: true })
  ua: string;

  @Column()
  endpoint: string;

  @Column()
  ip: string;

  @ManyToOne(() => User, user => user.accessLogs, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  user: User[];
}
