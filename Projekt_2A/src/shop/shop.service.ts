import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import path from 'path';
import { MulterDiskUploadedFiles } from 'src/interfaces/files';
import { ShopItemInterface } from 'src/interfaces/shop';
import { storageDir } from 'src/utils/storage';
import { AddProductDto } from './dto/add-product.dto';
import { ShopItem } from './shop-item.entity';

@Injectable()
export class ShopService {
  filter(shopItem: ShopItem): ShopItemInterface {
    const { id, price, description, name } = shopItem;
    return { id, price, description, name };
  }

  async getItems(): Promise<ShopItemInterface[]> {
    // return ShopItem.find();
    // return (await ShopItem.find()).map((shopItem) => {
    //   const { id, price, description, name } = shopItem;
    //   return { id, price, description, name };
    // });
    return (await ShopItem.find()).map(this.filter);
  }

  async hasItem(name: string): Promise<boolean> {
    return (await this.getItems()).some((item) => item.name === name);
  }
  async getPrice(name: string): Promise<number> {
    return (await this.getItems()).find((item) => item.name === name).price;
  }

  async getOneItem(id: string): Promise<ShopItem> {
    return await ShopItem.findOne(id);
  }

  async addProduct(
    req: AddProductDto,
    files: MulterDiskUploadedFiles,
  ): Promise<ShopItemInterface> {
    //  console.log('req:', req, "files:", files);

    // const photo=(files && files?.photo) ? files.photo[0]: null //* Stary sposób
    const photo = files?.photo?.[0] ?? null; //* Nowy sposób
    console.log('photo:', photo);

    try {
      const shopItem = new ShopItem();
      shopItem.name = req.name;
      shopItem.description = req.description;
      shopItem.price = req.price;
      if (photo) {
        shopItem.photoFn = photo.filename;
      }
      await shopItem.save();

      // return {
      //   id: shopItem.description,
      //   name: shopItem.name,
      //   description: shopItem.description,
      //   price: shopItem.price,
      // };
      return this.filter(shopItem);
    } catch (error) {
      console.log({ error });
      try {
        if (photo) {
          fs.unlinkSync(
            path.join(storageDir(), 'product-photos', photo.filename),
          );
        }
      } catch (error2) {
        // console.log("error2:", error2)
        console.log({ error2 });
      }

      throw error;
    } finally {
      console.log('done');
    }
  }

  async getPhoto(id: string, res: any) {
    try {
      const one = await ShopItem.findOne(id);

      if (!one) {
        throw new Error('No object found!');
      }

      if (!one.photoFn) {
        throw new Error('No photo in this entity!');
      }

      res.sendFile(one.photoFn, {
        root: path.join(storageDir(), 'product-photos'),
      });
    } catch (error) {
      console.log('error:', error);
      res.json({
        error: error.message,
      });
    }
  }
}
