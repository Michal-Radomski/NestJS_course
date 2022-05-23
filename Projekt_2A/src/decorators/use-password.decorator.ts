import { SetMetadata } from '@nestjs/common';

export const UsePasswordDecorator = (pass: string) =>
  SetMetadata('passwordProtectGoodPassword', pass);
