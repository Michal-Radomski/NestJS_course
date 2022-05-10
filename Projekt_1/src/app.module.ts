import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestowyModule } from './testowy/testowy.module';

@Module({
  imports: [TestowyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
