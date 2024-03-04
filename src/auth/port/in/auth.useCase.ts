import { Auth } from 'src/auth/adapter/out/auth.entity';

export interface authUseCase {
  signup(): Promise<Auth>;
}
