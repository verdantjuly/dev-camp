import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from 'src/common/enitty';

@Entity()
export class TokenBlacklist extends BaseEntity {
  @PrimaryColumn()
  token: string;

  @Column()
  tokenType: 'access' | 'refresh';
}
