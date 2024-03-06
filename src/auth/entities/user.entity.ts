import { BaseEntity } from 'src/common/enitty';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserRole, UserType } from '../types';
import { AccessToken } from './access-token.entity';
import { RefreshToken } from './refresh-token.entity';
import { AccessLog } from './access-log.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 30, default: 'user' })
  role: UserRole;

  @Column({ type: 'varchar', length: 30, default: 'local' })
  type: UserType;

  @OneToMany(() => AccessToken, token => token.user)
  accessToken: AccessToken[];

  @OneToMany(() => RefreshToken, token => token.user)
  refreshToken: RefreshToken[];

  @OneToMany(() => AccessLog, log => log.user)
  accessLogs: AccessLog[];
}
