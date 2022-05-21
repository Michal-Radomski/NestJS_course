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
  AddToBasketResponse,
  GetBasketResponse,
  RemoveFromBasketResponse,
} from 'src/interfaces/basket';
import { BasketService } from './basket.service';
import { AddItemDto } from './dto/add-item.dto';

@Controller('/basket')
export class BasketController {
  constructor(@Inject(BasketService) private basketService: BasketService) {}

  @Get('/test')
  getHello(): string {
    return '<div><h2>Hello World!</h2></div>';
  }

  @Post('/')
  addProductToBasket(@Body() item: AddItemDto): Promise<AddToBasketResponse> {
    return this.basketService.add(item);
  }

  @Delete('/')
  clearBasket(): void {
    this.basketService.clearBasket();
  }

  @Delete('/:id')
  removeProductFromBasket(
    @Param('id') id: string,
  ): Promise<RemoveFromBasketResponse> {
    return this.basketService.remove(id);
  }

  @Get('/clear_all')
  getBasket(): Promise<GetBasketResponse> {
    return this.basketService.getAll();
  }
  @Get('/total-price')
  getTotalBasketPrice(): Promise<number> {
    return this.basketService.getTotalPrice();
  }
}
