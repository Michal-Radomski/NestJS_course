import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestowyModule } from './testowy/testowy.module';
import { FoxController } from './fox/fox.controller';
import { FoxService } from './fox/fox.service';
import { Test2Module } from './test2/test2.module';

@Module({
  imports: [TestowyModule, Test2Module],
  controllers: [AppController, FoxController],
  providers: [AppService, FoxService],
})
export class AppModule {}
