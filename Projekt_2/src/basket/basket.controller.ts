import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AddProductToBasketResponse } from 'src/interfaces/basket';
import { BasketService } from './basket.service';
import { AddProductDto } from './dto/add-product.dto';

@Controller('/basket')
export class BasketController {
  constructor(@Inject(BasketService) private basketService: BasketService) {}

  @Get('/test')
  getHello(): string {
    return '<div><h2>Hello World!</h2></div>';
  }

  @Post('/')
  addProductToBasket(@Body() item: AddProductDto): AddProductToBasketResponse {
    return this.basketService.add(item);
  }
}
