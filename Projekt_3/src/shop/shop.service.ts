import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  GetListOfProductsResponse,
  PaginatedListOfProductsResponse,
  ShopItemInterface,
} from 'src/interfaces/shop';
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

  async getOneProduct(id: string): Promise<ShopItemInterface> {
    return await this.itemShopModel.findById(id).exec();
  }

  async getNameProduct(name: string): Promise<ShopItemInterface> {
    return await this.itemShopModel.findOne({ name: name }).exec();
  }

  async getProducts(
    pageNumber: number,
  ): Promise<PaginatedListOfProductsResponse> {
    const PRODUCT_QUANTITY_PER_PAGE = 3;
    const totalNumber = await this.itemShopModel.countDocuments();

    const products: GetListOfProductsResponse = await this.itemShopModel
      .find()
      .limit(PRODUCT_QUANTITY_PER_PAGE)
      .skip((pageNumber - 1) * PRODUCT_QUANTITY_PER_PAGE)
      .exec();
    return {
      items: products,
      pageCount: Math.ceil(totalNumber / PRODUCT_QUANTITY_PER_PAGE),
    };
  }

  async removeProductById(id: string): Promise<void> {
    await this.itemShopModel.findByIdAndDelete(id).exec();
  }

  async removeOneProduct(name: string): Promise<void> {
    await this.itemShopModel.deleteOne({ name: name }).exec();
  }

  async deleteMany(name: string): Promise<void> {
    await this.itemShopModel.deleteMany({ name: name }).exec();
  }

  async updateProductById(id: string, price: number): Promise<void> {
    await this.itemShopModel.findByIdAndUpdate(id, { price: price }).exec();
  }
  async updateOneProduct(id: string, price: number): Promise<void> {
    await this.itemShopModel.updateOne({ _id: id }, { price: price }).exec();
  }
  async updateManyProducts(name: string, price: number): Promise<void> {
    await this.itemShopModel
      .updateMany({ name: name }, { price: price })
      .exec();
  }

  async replaceOneProduct(id: string, name: string): Promise<void> {
    await this.itemShopModel.replaceOne({ _id: id }, { name: name }).exec(); //* replaceOne() może usunąć dane!
  }
}
