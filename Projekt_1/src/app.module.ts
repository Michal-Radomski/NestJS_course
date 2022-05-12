import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestowyModule } from './testowy/testowy.module';
import { FoxController } from './fox/fox.controller';

@Module({
  imports: [TestowyModule],
  controllers: [AppController, FoxController],
  providers: [AppService],
})
export class AppModule {}
