import { Auth } from 'src/auth/adapter/out/auth.entity';

export interface authPort {
  createAuth(): Promise<Auth>;
}
