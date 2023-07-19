import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as any;
    if (!user?.sub && !user.req.sub)
      throw new BadRequestException('Невалидный id пользователя');

    return user?.sub ?? user.req.sub;
  },
);
