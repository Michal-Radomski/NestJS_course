import { forwardRef, Inject, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
import { BasketService } from 'src/basket/basket.service';
import { GetListOfProductsResponse } from 'src/interfaces/shop';
// import { Repository } from 'typeorm';
import { ShopItem } from './shop-item.entity';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService, // @InjectRepository(ShopItem) // private shopItemRepository: Repository<ShopItem>,
  ) {}

  // getProducts(): GetListOfProductsResponse {
  //   return [
  //     {
  //       name: 'Ogórki kiszone',
  //       description: 'Bardzo dobre ogórki kiszone',
  //       price: 4,
  //     },
  //     {
  //       name: 'Kapusta kiszona z promocją',
  //       description: 'Bardzo dobra kapusta kiszona',
  //       price: 6 - this.basketService.countPromo(),
  //     },
  //     {
  //       name: 'Cytryny kiszone',
  //       description: 'Bardzo dobre cytryny kiszone',
  //       price: 5,
  //     },
  //   ];
  // }

  // async getProducts(): Promise<GetListOfProductsResponse> { //* Data Mapper
  //   return await this.shopItemRepository.find();
  // }
  async getProducts(): Promise<GetListOfProductsResponse> {
    //* Active Record
    return await ShopItem.find();
  }

  async hasProduct(name: string): Promise<boolean> {
    return (await this.getProducts()).some((item) => item.name === name);
  }
  async getPriceOfProduct(name: string): Promise<number> {
    return (await this.getProducts()).find((item) => item.name === name).price;
  }

  async getOneProduct(id: string): Promise<ShopItem> {
    // return this.shopItemRepository.findOne(id);
    // return this.shopItemRepository.findOneOrFail(id); //* Data Mapper
    return ShopItem.findOneOrFail(id); //* Active Record
  }

  async removeProduct(id: string) {
    // await this.shopItemRepository.delete(id); //* Data Mapper
    await ShopItem.delete(id); //* Active Record
  }

  async createDummyProduct(): Promise<ShopItem> {
    const newItem = new ShopItem();
    newItem.name = 'Bardzo duży ogórek';
    newItem.price = 100;
    newItem.description = 'Naprawdę duży i drogi ogórek';
    // await this.shopItemRepository.save(newItem);  //* Data Mapper
    await newItem.save(); //* Active Record
    return newItem;
  }

  async addBoughtCounter(id: string): Promise<void> {
    // await this.shopItemRepository.update(id, {  //* Data Mapper
    //   wasEverBought: true,
    // });
    await ShopItem.update(id, {
      //*Active Record
      wasEverBought: true,
    });
    // const item = await this.shopItemRepository.findOne(id);  //* Data Mapper
    const item = await ShopItem.findOne(id); //* Active Record
    item.boughtCounter++;
    // await this.shopItemRepository.save(item);  //* Data Mapper
    await ShopItem.save(item); //* Active Record
  }

  async findProducts(): Promise<GetListOfProductsResponse> {
    //* Active Record
    return await ShopItem.find({
      description: 'Jeszcze lepsze ogórki',
    });
  }
  // async findProducts2(searchTerm: string): Promise<GetListOfProductsResponse> {
  //   //* Active Record
  //   return await ShopItem.find({
  //     description: searchTerm,
  //     price: 10.99,
  //   });
  // }
  // async findProducts2(searchTerm: string): Promise<GetListOfProductsResponse> {
  //   //* Active Record
  //   console.log('searchTerm:', searchTerm);
  //   return await ShopItem.find({
  //     // select: ['id', 'price'], //* w ORM tylko gdy problemu z wydajnością
  //     where: {
  //       name: searchTerm,
  //       price: 9.99,
  //     },
  //   });
  // }
  async findProducts2(searchTerm: string): Promise<GetListOfProductsResponse> {
    //* Active Record
    console.log('searchTerm:', searchTerm);
    return await ShopItem.find({
      // select: ['id', 'price'], //* w ORM tylko gdy problemu z wydajnością
      order: {
        // price: 'DESC',
        price: 'ASC',
      },
    });
  }
}
