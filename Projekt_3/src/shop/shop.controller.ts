import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
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

  @Delete('/del/:id')
  removeProductById(@Param('id') id: string): Promise<void> {
    return this.shopService.removeProductById(id);
  }

  @Delete('/del/:name')
  removeOneProduct(@Param('name') name: string): Promise<void> {
    return this.shopService.removeOneProduct(name);
  }

  @Post('/')
  createNewProduct(): Promise<CreateProductResponse> {
    return this.shopService.createDummyProduct();
  }

  @Post('/del_many')
  async deleteMany(@Body() req: { name: string }): Promise<void> {
    await this.shopService.deleteMany(req.name);
  }
}
