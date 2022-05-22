import { Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateProductResponse } from 'src/interfaces/shop';
import { ShopService } from './shop.service';

@Controller('/shop')
export class ShopController {
  constructor(@Inject(ShopService) private shopService: ShopService) {}
  @Get('/test')
  getHello(): string {
    return '<div><h2>Hello World!</h2></div>';
  }

  @Post('/')
  createNewProduct(): Promise<CreateProductResponse> {
    return this.shopService.createDummyProduct();
  }
}
