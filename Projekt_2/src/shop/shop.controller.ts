import {
  Controller,
  Delete,
  Get,
  HostParam,
  Inject,
  Param,
  Post,
  Redirect,
  Scope,
} from '@nestjs/common';
import {
  CreateProductResponse,
  GetListOfProductsResponse,
  GetOneProductResponse,
} from 'src/interfaces/shop';
import { ShopService } from './shop.service';

// @Controller('/shop')
@Controller({
  path: '/shop',
  // host: 'zzz.lvh.me',
  // host: ':name.localhost',
  scope: Scope.REQUEST,
})
export class ShopController {
  onModuleInit() {
    console.log('onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('onApplicationBootstrap');
  }

  onApplicationShutdown() {
    console.log('onApplicationShutdown');
  }

  constructor(@Inject(ShopService) private shopService: ShopService) {}

  @Get('/')
  getListOfProducts(): Promise<GetListOfProductsResponse> {
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

  @Get('/:id')
  getOneProduct(@Param('id') id: string): Promise<GetOneProductResponse> {
    return this.shopService.getOneProduct(id);
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

  @Delete('/:id')
  removeProduct(@Param('id') id: string): void {
    this.shopService.removeProduct(id);
  }

  @Post('/')
  createNewProduct(): Promise<CreateProductResponse> {
    return this.shopService.createDummyProduct();
  }
}
