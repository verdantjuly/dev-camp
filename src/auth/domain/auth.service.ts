import { authUseCase } from '../port/in/auth.useCase';
import { authPort } from '../port/out/auth.port';

export class AuthService implements authUseCase {
  constructor(private readonly authPort: authPort) {}
  signup() {
    this.authPort.createAuth();
  }
}
