import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { SetMetadata } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      throw new ForbiddenException();
    }

    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization;
    const user = this.jwtService.verify(token);

    if (!token || !user) {
      throw new ForbiddenException();
    }

    const hasRole = () => roles.includes(user.role);

    return hasRole();
  }
}

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
