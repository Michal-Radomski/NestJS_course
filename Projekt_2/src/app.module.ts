import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// import { ShopController } from './shop/shop.controller';
// import { ShopService } from './shop/shop.service';
// import { BasketController } from './basket/basket.controller';
// import { BasketService } from './basket/basket.service';
import { BasketModule } from './basket/basket.module';
import { ShopModule } from './shop/shop.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [BasketModule, ShopModule, UsersModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
