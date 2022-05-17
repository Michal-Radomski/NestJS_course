import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// import { ShopController } from './shop/shop.controller';
// import { ShopService } from './shop/shop.service';
// import { BasketController } from './basket/basket.controller';
// import { BasketService } from './basket/basket.service';
import { BasketModule } from './basket/basket.module';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [BasketModule, ShopModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
