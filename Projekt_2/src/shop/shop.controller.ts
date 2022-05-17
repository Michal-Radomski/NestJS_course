import {
  Controller,
  Get,
  HostParam,
  Inject,
  Param,
  Redirect,
} from '@nestjs/common';
import { GetListOfProductsResponse } from 'src/interfaces/shop';
import { ShopService } from './shop.service';

// @Controller('/shop')
@Controller({
  path: '/shop',
  // host: 'zzz.lvh.me',
  host: ':name.localhost',
})
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
  @Get('/test/:age')
  // @Redirect('/test2')
  @Redirect()
  testRedirect(@Param('age') age: string) {
    const url = Number(age) > 18 ? '/site' : '/block';

    return {
      url: url,
      statusCode: 301,
    };
  }

  @Get('/welcome')
  welcome(@HostParam('name') siteName: string): string {
    return `Witaj na sklepie ${siteName}`;
  }
}
