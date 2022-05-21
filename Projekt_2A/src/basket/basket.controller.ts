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
  GetBasketStatsResponse,
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

  @Delete('/all/:userId')
  clearBasket(@Param('userId') userId: string): void {
    this.basketService.clearBasket(userId);
  }

  @Delete('/:itemInBasketId/:userId')
  removeProductFromBasket(
    @Param('itemInBasketId') itemInBasketId: string,
    @Param('userId') userId: string,
  ): Promise<RemoveFromBasketResponse> {
    return this.basketService.remove(itemInBasketId, userId);
  }

  @Get('/admin')
  getBasketForAdmin(): Promise<GetBasketResponse> {
    return this.basketService.getAllForAdmin();
  }

  @Get('/stats')
  getStats(): Promise<GetBasketStatsResponse> {
    return this.basketService.getStats();
  }

  @Get('/:userId')
  getBasket(@Param('userId') userId: string): Promise<GetBasketResponse> {
    return this.basketService.getAllForUser(userId);
  }
  @Get('/total-price/:userId')
  getTotalBasketPrice(@Param('userId') userId: string): Promise<number> {
    return this.basketService.getTotalPrice(userId);
  }
}
