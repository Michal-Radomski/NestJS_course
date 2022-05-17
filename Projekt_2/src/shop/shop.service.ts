import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BasketService } from 'src/basket/basket.service';
import { GetListOfProductsResponse } from 'src/interfaces/shop';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService,
  ) {}

  getProducts(): GetListOfProductsResponse {
    return [
      {
        name: 'Ogórki kiszone',
        description: 'Bardzo dobre ogórki kiszone',
        price: 4,
      },
      {
        name: 'Kapusta kiszona z promocją',
        description: 'Bardzo dobra kapusta kiszona',
        price: 6 - this.basketService.countPromo(),
      },
      {
        name: 'Cytryny kiszone',
        description: 'Bardzo dobre cytryny kiszone',
        price: 5,
      },
    ];
  }
  hasProduct(name: string): boolean {
    return this.getProducts().some((item) => item.name === name);
  }
  getPriceOfProduct(name: string): number {
    return this.getProducts().find((item) => item.name === name).price;
  }
}
