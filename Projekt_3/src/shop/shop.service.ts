import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShopItemInterface } from 'src/interfaces/shop';
import { ItemShop } from 'src/interfaces/shop-item.schema';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel(ItemShop.name) private itemShopModel: Model<ItemShop>,
  ) {}

  async createDummyProduct(): Promise<ShopItemInterface> {
    const newDummyProduct = await this.itemShopModel.create({
      name: 'Ostatni ogórek',
      description: 'Ostatni ogórek z kolekcji',
      price: 5,
      boughtCounter: 13,
      createdAt: new Date(),
      wasEverBought: true,
    });
    return newDummyProduct.save();
  }
}
