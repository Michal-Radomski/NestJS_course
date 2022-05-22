import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import {
  CreateProductResponse,
  GetOneProductResponse,
  PaginatedListOfProductsResponse,
} from 'src/interfaces/shop';
import { ShopService } from './shop.service';

@Controller('/shop')
export class ShopController {
  constructor(@Inject(ShopService) private shopService: ShopService) {}
  // @Get('/test')
  // getHello(): string {
  //   return '<div><h2>Hello World!</h2></div>';
  // }

  @Get('/:pageNumber')
  getListOfProducts(
    @Param('pageNumber') pageNumber: string,
  ): Promise<PaginatedListOfProductsResponse> {
    return this.shopService.getProducts(Number(pageNumber));
  }

  @Get('/one/:id')
  getOneProduct(@Param('id') id: string): Promise<GetOneProductResponse> {
    return this.shopService.getOneProduct(id);
  }

  @Get('/name/:name')
  getNameProduct(@Param('name') name: string): Promise<GetOneProductResponse> {
    return this.shopService.getNameProduct(name);
  }

  @Post('/')
  createNewProduct(): Promise<CreateProductResponse> {
    return this.shopService.createDummyProduct();
  }
}
