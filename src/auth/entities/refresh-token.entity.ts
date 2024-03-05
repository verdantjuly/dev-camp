import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from 'src/common/enitty';

@Entity()
export class RefreshToken extends BaseEntity {
  @ManyToOne(() => User, user => user.refreshToken)
  user: User;

  @PrimaryColumn()
  token: string;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @Column({ default: false })
  isRevoked: boolean;
}
