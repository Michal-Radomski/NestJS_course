import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BasketService } from 'src/basket/basket.service';
import {
  GetListOfProductsResponse,
  GetPaginatedListOfProductsResponse,
  ShopItemInterface,
} from 'src/interfaces/shop';
import { getConnection, Raw } from 'typeorm';
import { ShopItem } from './shop-item.entity';

@Injectable()
export class ShopService {
  async getItems(): Promise<ShopItemInterface[]> {
    return ShopItem.find();
  }

  async getProducts(
    currentPage: number = 1,
  ): Promise<GetPaginatedListOfProductsResponse> {
    //* Active Record
    const maxPerPage = 2;
    // const currentPage = 2;
    const [items, count] = await ShopItem.findAndCount({
      relations: ['details'],
      skip: maxPerPage * (currentPage - 1),
      take: maxPerPage,
    });
    const totalPages = Math.ceil(count / maxPerPage);
    console.log({ count: count, totalPages: totalPages });
    return await {
      items: items,
      totalPages: totalPages,
    };
  }

  async hasProduct(name: string): Promise<boolean> {
    return (await this.getProducts()).some((item) => item.name === name);
  }
  async getPriceOfProduct(name: string): Promise<number> {
    return (await this.getProducts()).find((item) => item.name === name).price;
  }

  async getOneProduct(id: string): Promise<ShopItem> {
    // return this.shopItemRepository.findOne(id);
    // return this.shopItemRepository.findOneOrFail(id); //* Data Mapper
    return ShopItem.findOneOrFail(id); //* Active Record
  }

  async removeProduct(id: string) {
    // await this.shopItemRepository.delete(id); //* Data Mapper
    await ShopItem.delete(id); //* Active Record
  }

  async findProducts(searchTerm: string): Promise<GetListOfProductsResponse> {
    const CountSQL = await getConnection()
      .createQueryBuilder()
      .select('COUNT(shopItem.id)', 'CountSQL')
      .from(ShopItem, 'shopItem')
      .getRawOne();

    console.log('CountSQL: ', CountSQL);

    return await getConnection()
      .createQueryBuilder()
      .select('shopItem')
      .from(ShopItem, 'shopItem')
      .where('shopItem.description LIKE :searchTerm', {
        searchTerm: `%${searchTerm}%`,
      })
      .orderBy('shopItem.id', 'ASC')
      .skip(0)
      .take(2)
      .getMany();
  }

  async findProducts2(searchTerm: string): Promise<GetListOfProductsResponse> {
    //* Active Record
    console.log('searchTerm:', searchTerm);
    return await ShopItem.find({
      where: { price: Raw((field) => `${field}=10.99`) },
    });
  }
}
