import {
  Controller,
  DefaultValuePipe,
  Get,
  Inject,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ShopItemInterface } from 'src/interfaces/shop';
import { CheckAgePipe } from 'src/pipes/check-age.pipe';
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
    // console.log('index:', index);
    return null;
  }
  @Get('/test2/:age')
  testAge(
    @Param(
      'age',
      new CheckAgePipe({
        minAge: 21,
      }),
    )
    age?: number,
  ) {
    // console.log('age:', age, typeof age);
    return null;
  }
}
