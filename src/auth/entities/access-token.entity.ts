import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from 'src/common/enitty';

@Entity()
export class AccessToken extends BaseEntity {
  @ManyToOne(() => User, user => user.accessToken)
  user: User;

  @Column({ type: 'varchar' })
  token: string;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @Column({ default: false })
  isRevoked: boolean;
}
