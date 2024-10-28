import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IsPublic, Roles } from './auth.decorator';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { RoleNames } from 'src/user/enums';
import { UserDocument } from 'src/user/schema/user.schema';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();

    const publicRoute = this.reflector.get(IsPublic, context.getHandler());
    if (publicRoute) return true;

    const user = await this.validateToken(req);

    req['user'] = user;

    const roles: RoleNames[] = this.reflector.get(Roles, context.getHandler());

    if (roles && roles.length > 0) {
      if (!roles.includes(user.role)) {
        throw new UnauthorizedException(`Only ${roles.join(',')} have access`);
      }
    }

    return true;
  }

  private async validateToken(req: Request) {
    try {
      const authHeader = req.headers['authorization'];

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Unauthorized');
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }

      const payload = await this.jwtService.verifyAsync<UserDocument>(token, {
        secret: this.configService.get<string>('jwtSecret'),
      });

      if (!payload) {
        throw new ForbiddenException('Session is invalid or has expired');
      }

      return payload as UserDocument;
    } catch (error) {
      throw new ForbiddenException('Session is invalid or has expired');
    }
  }
}
