import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemShop, ItemShopSchema } from 'src/interfaces/shop-item.schema';
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
})
export class ShopModule {}
