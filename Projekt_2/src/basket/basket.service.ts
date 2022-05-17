import { Inject, Injectable } from '@nestjs/common';
import {
  AddProductToBasketResponse,
  GetTotalPriceResponse,
  ListProductsInBasketResponse,
  RemoveProductFromBasketResponse,
} from 'src/interfaces/basket';
import { ShopService } from 'src/shop/shop.service';
import { AddProductDto } from './dto/add-product.dto';

@Injectable()
export class BasketService {
  private items: AddProductDto[] = [];

  constructor(@Inject(ShopService) private shopService: ShopService) {}

  // add(item: AddProductDto): AddProductToBasketResponse {
  //   if (
  //     typeof item.name !== 'string' ||
  //     typeof item.count !== 'number' ||
  //     item.name === '' ||
  //     item.count < 1
  //   ) {
  //     return { isSuccess: false };
  //   }

  //   this.items.push(item);
  //   console.log('this.items:', this.items);
  //   return {
  //     isSuccess: true,
  //     index: this.items.length - 1,
  //   };
  // }
  add(item: AddProductDto): AddProductToBasketResponse {
    const { count, name } = item;
    console.log('count:', count, 'name:', name, 'item:', item);
    if (
      typeof name !== 'string' ||
      typeof count !== 'number' ||
      name === '' ||
      count < 1 ||
      !this.shopService.hasProduct(name)
    ) {
      return { isSuccess: false };
    }

    this.items.push(item);
    console.log('this.items:', this.items);
    return {
      isSuccess: true,
      index: this.items.length - 1,
    };
  }

  // remove(index: number): RemoveProductFromBasketResponse {
  //   if (index < 0 || index >= this.items.length) {
  //     return { isSuccess: false };
  //   } else {
  //     this.items.splice(index, 1);
  //     console.log('this.items:', this.items);
  //     return { isSuccess: true };
  //   }
  // }
  remove(index: number): RemoveProductFromBasketResponse {
    const { items } = this;

    if (index < 0 || index >= items.length) {
      return { isSuccess: false };
    } else {
      items.splice(index, 1);
      console.log('items:', items);
      return { isSuccess: true };
    }
  }
  list(): ListProductsInBasketResponse {
    return this.items;
  }
  getTotalPrice(): GetTotalPriceResponse {
    console.log('this.items:', this.items);
    return this.items
      .map(
        (item) =>
          this.shopService.getPriceOfProduct(item.name) * item.count * 1.23,
      )
      .reduce((prev, curr) => prev + curr, 0);
  }
}
