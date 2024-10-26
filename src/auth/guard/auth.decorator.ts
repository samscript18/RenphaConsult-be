import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { RoleNames } from 'src/user/enums';

export const Roles = Reflector.createDecorator<RoleNames[]>();

export const IsPublic = Reflector.createDecorator();

export const Auth = createParamDecorator(
  (props: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    return props ? req['user'][props] : req['user'];
  },
);
