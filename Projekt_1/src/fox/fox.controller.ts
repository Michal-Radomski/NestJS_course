import { Controller, Get, Headers, Ip, Query, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('fox')
export class FoxController {
  @Get()
  myFirstAction(
    @Headers('accept-encoding') encoding: string,
    @Ip() ip: string,
    @Query('name') name: string,
    @Query('surname') surname: string,
    @Req() req: Request,
  ) {
    console.log('encoding:', encoding);
    console.log('ip:', ip);
    console.log('req', req);
    return `<h1>Hello, World!</h1>
    <h2>Hi, ${name} ${surname}!</h2>
    <h2>Your IP is: ${ip}</h2>
    `;
  }
}
