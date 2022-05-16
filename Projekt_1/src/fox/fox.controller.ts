/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Header,
  Headers,
  HttpCode,
  Inject,
  Ip,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';

import { Request, Response } from 'express';

import { FoxService } from './fox.service';

@Controller('/fox')
export class FoxController {
  constructor(@Inject(FoxService) private foxService: FoxService) {}

  @Get('/') //* http://localhost:3000/fox?name=Mich&surname=Rad
  @HttpCode(200)
  @Header('X-My-Test', 'My Test')
  // @Redirect('/test')
  async myFirstAction(
    @Headers('accept-encoding') encoding: string,
    @Ip() ip: string,
    @Query('name') name: string,
    @Query('surname') surname: string,
    @Req() req: Request,

    // @Res() response: Response, //* Res wyłącza wszystko inne!!!
  ): Promise<any> {
    // response.status(200).send('Hello');
    setTimeout(() => {
      console.log('waiting'), 1000;
    });
    await console.log('encoding:', encoding);
    console.log('ip:', ip);
    console.log('req.protocol', req.protocol);
    return (
      `<h1>Hello, World!</h1>
    <h2>Hi, ${name} ${surname}!</h2>
    <h2>Your IP is: ${ip}</h2>
    ` + [1, 2, 3]
    );
    // return [1, 2, 3];
  }
  @Get('/second') //* http://localhost:3000/fox/second
  mySecondAction(): string {
    return 'Hello World2';
  }
  // @Post('/')
  // postItem(): string {
  //   return 'Ok';
  // }
}
