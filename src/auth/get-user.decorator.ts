import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './schemas/user.schema';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    try {
      const req = ctx.switchToHttp().getRequest();
      delete req.user.password;
      delete req.user.salt;
      return req.user;
    } catch (error) {
      return null;
    }
  },
);
