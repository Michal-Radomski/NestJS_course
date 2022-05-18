import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketService } from 'src/basket/basket.service';
import { GetListOfProductsResponse } from 'src/interfaces/shop';
import { Repository } from 'typeorm';
import { ShopItem } from './shop-item.entity';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService,
    @InjectRepository(ShopItem)
    private shopItemRepository: Repository<ShopItem>,
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

  async getProducts(): Promise<GetListOfProductsResponse> {
    return await this.shopItemRepository.find();
  }

  async hasProduct(name: string): Promise<boolean> {
    return (await this.getProducts()).some((item) => item.name === name);
  }
  async getPriceOfProduct(name: string): Promise<number> {
    return (await this.getProducts()).find((item) => item.name === name).price;
  }
}
