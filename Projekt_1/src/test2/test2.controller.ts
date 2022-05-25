import { Controller, Get } from '@nestjs/common';
import { Test2Service } from './test2.service';

@Controller('/test2')
export class Test2Controller {
  constructor(private readonly test2Service: Test2Service) {}

  @Get('/test')
  getHello(): string {
    return '<div><h2 style="color: green">Hello World!</h2></div>';
  }
}
