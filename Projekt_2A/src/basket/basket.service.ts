import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  AddToBasketResponse,
  RemoveFromBasketResponse,
} from 'src/interfaces/basket';
import { ShopService } from 'src/shop/shop.service';
import { AddItemDto } from './dto/add-item.dto';
import { ItemInBasket } from './item-in-basket.entity';

@Injectable()
export class BasketService {
  constructor(
    @Inject(forwardRef(() => ShopService)) private shopService: ShopService,
  ) {}

  async add(product: AddItemDto): Promise<AddToBasketResponse> {
    const { count, id } = product;
    const shopItem = await this.shopService.getOneItem(id);
    if (
      typeof id !== 'string' ||
      typeof count !== 'number' ||
      id === '' ||
      count < 1 ||
      !shopItem
    ) {
      const item = new ItemInBasket();

      item.count = count;

      await item.save();
      item.shopItem = shopItem;
      await item.save();
      return {
        isSuccess: true,
        id: item.id,
      };
    }
  }

  async remove(id: string): Promise<RemoveFromBasketResponse> {
    const item = await ItemInBasket.findOne(id);

    if (item) {
      await item.remove();
      return { isSuccess: true };
    }
    return { isSuccess: false };
  }
  async getAll(): Promise<ItemInBasket[]> {
    return ItemInBasket.find({
      relations: ['shopItem'],
    });
  }

  async clearBasket(): Promise<void> {
    await ItemInBasket.delete({});
  }

  async getTotalPrice(): Promise<number> {
    const items = await this.getAll();

    return (
      await Promise.all(
        items.map(async (item) => item.shopItem.price * item.count * 1.23),
      )
    ).reduce((prev, curr) => prev + curr, 0);
  }
}
