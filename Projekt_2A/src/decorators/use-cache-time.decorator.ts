import { SetMetadata } from '@nestjs/common';

export const UseCacheTimeDecorator = (cacheTimeInSec: number) =>
  SetMetadata('cacheTimeInSec', cacheTimeInSec);
