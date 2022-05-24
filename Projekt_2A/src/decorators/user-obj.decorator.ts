import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserObjDecorator = createParamDecorator(
  (_data, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user;
  },
);
