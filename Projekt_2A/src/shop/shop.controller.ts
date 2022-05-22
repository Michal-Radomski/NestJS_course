import {
  Controller,
  DefaultValuePipe,
  Get,
  Inject,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ShopItemInterface } from 'src/interfaces/shop';
import { ShopService } from './shop.service';

@Controller('/shop')
export class ShopController {
  constructor(@Inject(ShopService) private shopService: ShopService) {}

  @Get('/')
  getShopList(): Promise<ShopItemInterface[]> {
    return this.shopService.getItems();
  }

  @Get('/test/:index?')
  test(
    @Param('index', new DefaultValuePipe(0), ParseIntPipe)
    index?: number,
  ) {
    console.log('index:', index);
    return null;
  }
}
