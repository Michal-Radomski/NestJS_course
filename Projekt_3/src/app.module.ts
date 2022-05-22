import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopController } from './shop/shop.controller';
import { ShopModule } from './shop/shop.module';

import { config } from './config';

const dbUri = config.db;
console.log({ dbUri });

@Module({
  imports: [MongooseModule.forRoot(dbUri), ShopModule],
  controllers: [AppController, ShopController],
  providers: [AppService],
})
export class AppModule {}
