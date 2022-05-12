// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller, Get, Headers, Ip, Query, Req, Res } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request, Response } from 'express';

@Controller('fox')
export class FoxController {
  @Get()
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
}
