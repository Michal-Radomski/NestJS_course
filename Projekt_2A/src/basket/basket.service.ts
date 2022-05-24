import { Inject, Injectable } from '@nestjs/common';
import {
  AddToBasketResponse,
  GetBasketStatsResponse,
  RemoveFromBasketResponse,
} from 'src/interfaces/basket';
import { MailService } from 'src/mail/mail.service';
import { ShopService } from 'src/shop/shop.service';
import { addedToBasketInfoEmailTemplate } from 'src/templates/email/added-to-basket-info';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { getConnection } from 'typeorm';
import { AddItemDto } from './dto/add-item.dto';
import { ItemInBasket } from './item-in-basket.entity';

@Injectable()
export class BasketService {
  constructor(
    @Inject(ShopService) private shopService: ShopService,
    @Inject(UserService) private userService: UserService,
    @Inject(MailService) private mailService: MailService,
  ) {}

  async addProduct(
    product: AddItemDto,
    user: User,
  ): Promise<AddToBasketResponse> {
    // const { count, productId, userId } = product;
    const { count, productId } = product;
    const shopItem = await this.shopService.getOneItem(productId);
    // const user = await this.userService.getOneUser(userId);

    if (
      // typeof userId !== 'string' ||
      typeof productId !== 'string' ||
      typeof count !== 'number' ||
      productId === '' ||
      count < 1 ||
      !shopItem ||
      !user
    ) {
      return {
        isSuccess: false,
      };
    }

    const item = new ItemInBasket();

    item.count = count;

    await item.save();
    item.shopItem = shopItem;
    item.user = user;

    await item.save();

    // await this.mailService.sendMail(
    //   user.email,
    //   'Dziękujemy za dodanie do koszyka',
    //   `Dodano do koszyka: ${shopItem.description}!`,
    // );
    await this.mailService.sendMail(
      user.email,
      'Dziękujemy za dodanie do koszyka',
      addedToBasketInfoEmailTemplate(),
    );

    return {
      isSuccess: true,
      id: item.id,
    };
  }

  async remove(
    itemInBasketId: string,
    userId: string,
  ): Promise<RemoveFromBasketResponse> {
    const user = await this.userService.getOneUser(userId);

    if (!user) {
      throw new Error('User not found');
    }
    const item = await ItemInBasket.findOne({
      where: {
        id: itemInBasketId,
        user: user,
      },
    });

    if (item) {
      await item.remove();
      return { isSuccess: true };
    }
    return { isSuccess: false };
  }
  // async getAll(): Promise<ItemInBasket[]> {
  //   return ItemInBasket.find({
  //     relations: ['shopItem'],
  //   });
  // }
  async getAllForUser(userId: string): Promise<ItemInBasket[]> {
    const user = await this.userService.getOneUser(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return ItemInBasket.find({
      where: {
        user: user,
      },

      relations: ['shopItem'],
    });
  }

  async getAllForAdmin(): Promise<ItemInBasket[]> {
    return ItemInBasket.find({
      relations: ['shopItem', 'user'],
    });
  }

  async clearBasket(userId: string): Promise<void> {
    const user = await this.userService.getOneUser(userId);

    if (!user) {
      throw new Error('User not found');
    }

    await ItemInBasket.delete({ user: user });
  }

  async getTotalPrice(userId: string): Promise<number> {
    const items = await this.getAllForUser(userId);

    return (
      await Promise.all(
        items.map(async (item) => item.shopItem.price * item.count * 1.23),
      )
    ).reduce((prev, curr) => prev + curr, 0);
  }
  async getStats(): Promise<GetBasketStatsResponse> {
    const { itemInBasketAvgPrice }: { itemInBasketAvgPrice: number } =
      await getConnection()
        .createQueryBuilder()
        .select('AVG(shopItem.price)', 'itemInBasketPrice')
        .from(ItemInBasket, 'itemInBasket')
        .leftJoinAndSelect('itemInBasket.shopItem', 'shopItem')
        .getRawOne();

    const allItemsInBasket = await this.getAllForAdmin();
    const baskets: {
      [userId: string]: number;
    } = {};
    for (const oneItemInBasket of allItemsInBasket) {
      baskets[oneItemInBasket.user.id] = baskets[oneItemInBasket.user.id] || 0;

      (baskets[oneItemInBasket.user.id] +=
        oneItemInBasket.shopItem.price * oneItemInBasket.count * 1),
        23;
    }

    const basketValues = Object.values(baskets);

    const basketAvgPrice: number =
      basketValues.reduce((prev, curr) => prev + curr, 0) / basketValues.length;

    return {
      itemInBasketAvgPrice: itemInBasketAvgPrice,
      basketAvgPrice: basketAvgPrice,
    };
  }
}
