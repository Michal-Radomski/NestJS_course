import { Controller, Get, Inject } from '@nestjs/common';
import { GetListOfProductsResponse } from 'src/interfaces/shop';
import { ShopService } from './shop.service';

@Controller('/shop')
export class ShopController {
  constructor(@Inject(ShopService) private shopService: ShopService) {}

  @Get('/')
  getListOfProducts(): GetListOfProductsResponse {
    // return [
    //   {
    //     name: 'Ogórki kiszone',
    //     description: 'Bardzo dobre ogórki kiszone',
    //     price: 4,
    //   },
    //   {
    //     name: 'Kapusta kiszona',
    //     description: 'Bardzo dobra kapusta kiszona',
    //     price: 6,
    //   },
    //   {
    //     name: 'Cytryny kiszone',
    //     description: 'Bardzo dobre cytryny kiszone',
    //     price: 5,
    //   },
    // ];
    return this.shopService.getProducts();
  }
}
