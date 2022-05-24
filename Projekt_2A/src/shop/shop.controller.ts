import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ImATeapotException,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { MulterDiskUploadedFiles } from 'src/interfaces/files';
import { ShopItemInterface } from 'src/interfaces/shop';
import { CheckAgePipe } from 'src/pipes/check-age.pipe';
import { multerStorage, storageDir } from 'src/utils/storage';
import { AddProductDto } from './dto/add-product.dto';
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
    _index?: number,
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
    _age?: number,
  ) {
    // console.log('age:', age, typeof age);
    return null;
  }
  @Get('/test3')
  test3() {
    //  throw new Error('Ups');
    throw new ImATeapotException('ha ha ha');
  }

  @Post('/')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'photo',
          maxCount: 1,
        },
      ],
      // { dest: path.join(storageDir(), 'product-photos') },
      { storage: multerStorage(path.join(storageDir(), 'product-photos')) },
    ),
  )
  addProduct(
    @Body() req: AddProductDto,
    @UploadedFile() files: MulterDiskUploadedFiles,
  ): Promise<ShopItemInterface> {
    return this.shopService.addProduct(req, files);
  }

  @Get('/photo/:id')
  async getPhoto(@Param('id') id: string, @Res() res: any): Promise<any> {
    return this.shopService.getPhoto(id, res);
  }
}
