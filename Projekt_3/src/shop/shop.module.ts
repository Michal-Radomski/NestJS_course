import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemShop, ItemShopSchema } from 'src/interfaces/shop-item.schema';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ItemShop.name,
        schema: ItemShopSchema,
      },
    ]),
  ],
  providers: [ShopService],
  controllers: [ShopController],
  exports: [ShopService],
})
export class ShopModule {}
