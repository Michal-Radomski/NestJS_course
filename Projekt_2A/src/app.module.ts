import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BasketModule } from './basket/basket.module';
import { CacheModule } from './cache/cache.module';
import { ShopModule } from './shop/shop.module';
import { UserModule } from './user/user.module';
import { DiscountCodeModule } from './discount-code/discount-code.module';
import { CronModule } from './cron/cron.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    BasketModule,
    ShopModule,
    TypeOrmModule.forRoot(),
    UserModule,
    CacheModule,
    DiscountCodeModule,
    CronModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
