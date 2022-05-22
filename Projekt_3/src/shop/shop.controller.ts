import { Controller, Get } from '@nestjs/common';

@Controller('/shop')
export class ShopController {
  @Get('/test')
  getHello(): string {
    return '<div><h2>Hello World!</h2></div>';
  }
}
