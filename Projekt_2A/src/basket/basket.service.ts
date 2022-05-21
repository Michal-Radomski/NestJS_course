import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  AddToBasketResponse,
  GetBasketResponse,
  RemoveFromBasketResponse,
} from 'src/interfaces/basket';
import { ShopService } from 'src/shop/shop.service';
import { AddItemDto } from './dto/add-item.dto';

@Injectable()
export class BasketService {
  private items: AddItemDto[] = [];

  constructor(
    @Inject(forwardRef(() => ShopService)) private shopService: ShopService,
  ) {}

  async add(product: AddItemDto): Promise<AddToBasketResponse> {
    const { count, name } = product;

    if (
      typeof name !== 'string' ||
      typeof count !== 'number' ||
      name === '' ||
      count < 1 ||
      !(await this.shopService.hasItem(name))
    ) {
      return {
        isSuccess: false,
      };
    }
  }

  remove(number: number): RemoveFromBasketResponse {
    if (this.items[number]) {
      this.items.splice(number, 1);

      return { isSuccess: true };
    }

    return { isSuccess: false };
  }
  getAll(): GetBasketResponse {
    return this.items;
  }

  async getTotalPrice(): Promise<number> {
    return (
      await Promise.all(
        this.items.map(
          async (item) =>
            (await this.shopService.getPrice(item.name)) * item.count * 1.23,
        ),
      )
    ).reduce((prev, curr) => prev + curr, 0);
  }
}
