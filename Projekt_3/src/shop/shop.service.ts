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
      name: 'Ogórek - promocja',
      description: 'Ogórek z promocji',
      price: 3,
      boughtCounter: 100,
      createdAt: new Date(),
      wasEverBought: true,
    });
    return newDummyProduct.save();
  }
}
