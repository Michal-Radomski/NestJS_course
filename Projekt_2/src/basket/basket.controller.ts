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
  AddProductToBasketResponse,
  GetTotalPriceResponse,
  ListProductsInBasketResponse,
  RemoveProductFromBasketResponse,
} from 'src/interfaces/basket';
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

  @Delete('/:index')
  removeProductFromBasket(
    @Param('index') index: string,
  ): RemoveProductFromBasketResponse {
    return this.basketService.remove(Number(index));
  }

  @Get('/')
  listProductsInBasket(): ListProductsInBasketResponse {
    return this.basketService.list();
  }
  @Get('/total-price')
  getTotalPrice(): GetTotalPriceResponse {
    return this.basketService.getTotalPrice();
  }
}
