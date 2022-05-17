import { Controller, Get } from '@nestjs/common';

@Controller('/shop')
export class ShopController {
  @Get('/')
  getListOfProducts() {
    return [
      {
        name: 'Ogórki kiszone',
        description: 'Bardzo dobre ogórki kiszone',
        price: 4,
      },
      {
        name: 'Kapusta kiszona',
        description: 'Bardzo dobra kapusta kiszona',
        price: 6,
      },
      {
        name: 'Cytryny kiszone',
        description: 'Bardzo dobre cytryny kiszone',
        price: 5,
      },
    ];
  }
}
