import { Module } from '@nestjs/common';
import { TestowyController } from './testowy.controller';

@Module({
  controllers: [TestowyController]
})
export class TestowyModule {}
