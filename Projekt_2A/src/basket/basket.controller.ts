import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UseCacheTimeDecorator } from 'src/decorators/use-cache-time.decorator';
import { UsePasswordDecorator } from 'src/decorators/use-password.decorator';
import { PasswordProtectGuard } from 'src/guards/password-protect.guards';
import { CacheInterceptor } from 'src/interceptors/cache.interceptor';
import { TimeoutInterceptor } from 'src/interceptors/timeout.interceptor';
import {
  AddToBasketResponse,
  GetBasketResponse,
  GetBasketStatsResponse,
  RemoveFromBasketResponse,
} from 'src/interfaces/basket';
import { BasketService } from './basket.service';
import { AddItemDto } from './dto/add-item.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserObjDecorator } from '../decorators/user-obj.decorator';
import { User } from 'src/user/user.entity';

@Controller('/basket')
export class BasketController {
  constructor(@Inject(BasketService) private basketService: BasketService) {}

  @Get('/test')
  getHello(): string {
    return '<div><h2>Hello World!</h2></div>';
  }

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  addProductToBasket(
    @Body() product: AddItemDto,
    @UserObjDecorator() user: User,
  ): Promise<AddToBasketResponse> {
    // console.log({ user });
    return this.basketService.addProduct(product, user);
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
  @UseGuards(PasswordProtectGuard)
  @UsePasswordDecorator('admin-password')
  getBasketForAdmin(): Promise<GetBasketResponse> {
    return this.basketService.getAllForAdmin();
  }

  @Get('/stats')
  @UseGuards(PasswordProtectGuard)
  @UsePasswordDecorator('stats-password')
  @UseInterceptors(TimeoutInterceptor, CacheInterceptor)
  @UseCacheTimeDecorator(15)
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
