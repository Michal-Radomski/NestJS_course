import { forwardRef, Inject, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
import { BasketService } from 'src/basket/basket.service';
import {
  GetListOfProductsResponse,
  GetPaginatedListOfProductsResponse,
} from 'src/interfaces/shop';
import {
  Between,
  getConnection,
  In,
  LessThan,
  LessThanOrEqual,
  Like,
  Not,
  Raw,
} from 'typeorm';
import { ShopItemDetails } from './shop-item-details.entity';
// import { Repository } from 'typeorm';
import { ShopItem } from './shop-item.entity';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService, // @InjectRepository(ShopItem) // private shopItemRepository: Repository<ShopItem>,
  ) {}

  // getProducts(): GetListOfProductsResponse {
  //   return [
  //     {
  //       name: 'Ogórki kiszone',
  //       description: 'Bardzo dobre ogórki kiszone',
  //       price: 4,
  //     },
  //     {
  //       name: 'Kapusta kiszona z promocją',
  //       description: 'Bardzo dobra kapusta kiszona',
  //       price: 6 - this.basketService.countPromo(),
  //     },
  //     {
  //       name: 'Cytryny kiszone',
  //       description: 'Bardzo dobre cytryny kiszone',
  //       price: 5,
  //     },
  //   ];
  // }

  // async getProducts(): Promise<GetListOfProductsResponse> { //* Data Mapper
  //   return await this.shopItemRepository.find();
  // }

  // async getProducts(): Promise<GetListOfProductsResponse> {
  //   //* Active Record
  //   const countNumber = await ShopItem.count();
  //   console.log('countNumber:', countNumber);
  //   return await ShopItem.find();
  // }

  // async getProducts(): Promise<GetListOfProductsResponse> {
  //   //* Active Record
  //   const maxPerPage = 2;
  //   const currentPage = 2;
  //   const [items, count] = await ShopItem.findAndCount({
  //     skip: maxPerPage * (currentPage - 1),
  //     take: maxPerPage,
  //   });
  //   const totalPages = Math.ceil(count / maxPerPage);
  //   console.log({ count: count, totalPages: totalPages });
  //   // const countNumber = await ShopItem.count();
  //   // console.log('countNumber:', countNumber);
  //   // return await ShopItem.find();
  //   //* Paginacja
  //   // return await ShopItem.find({
  //   //   take: 2,
  //   //   skip: 2,
  //   // });
  //   //* Paginacja v2
  //   return await items;
  // }

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
    // const countNumber = await ShopItem.count();
    // console.log('countNumber:', countNumber);
    // return await ShopItem.find();
    //* Paginacja
    // return await ShopItem.find({
    //   take: 2,
    //   skip: 2,
    // });
    //* Paginacja v2
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

  async createDummyProduct(): Promise<ShopItem> {
    const newItem = new ShopItem();
    newItem.name = 'Nowy ogórek';
    newItem.price = 15.95;
    newItem.description = 'Nowy ogórek - naprawdę nowy';
    // await this.shopItemRepository.save(newItem);  //* Data Mapper
    await newItem.save(); //* Active Record

    const details = new ShopItemDetails();
    details.color = 'green';
    details.width = 20;
    await details.save();

    newItem.details = details;
    // newItem.details=null //* Do usuwania
    await newItem.save();

    return newItem;
  }

  async addBoughtCounter(id: string): Promise<void> {
    // await this.shopItemRepository.update(id, {  //* Data Mapper
    //   wasEverBought: true,
    // });
    await ShopItem.update(id, {
      //*Active Record
      wasEverBought: true,
    });
    // const item = await this.shopItemRepository.findOne(id);  //* Data Mapper
    const item = await ShopItem.findOne(id); //* Active Record
    item.boughtCounter++;
    // await this.shopItemRepository.save(item);  //* Data Mapper
    await ShopItem.save(item); //* Active Record
  }

  // async findProducts(): Promise<GetListOfProductsResponse> {
  //   //* Active Record
  //   return await ShopItem.find({
  //     description: 'Jeszcze lepsze ogórki',
  //   });
  // }
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

  // async findProducts2(searchTerm: string): Promise<GetListOfProductsResponse> {
  //   //* Active Record
  //   return await ShopItem.find({
  //     description: searchTerm,
  //     price: 10.99,
  //   });
  // }

  // async findProducts2(searchTerm: string): Promise<GetListOfProductsResponse> {
  //   //* Active Record
  //   console.log('searchTerm:', searchTerm);
  //   return await ShopItem.find({
  //     // select: ['id', 'price'], //* w ORM tylko gdy problemu z wydajnością
  //     where: {
  //       name: searchTerm,
  //       price: 9.99,
  //     },
  //   });
  // }

  // async findProducts2(searchTerm: string): Promise<GetListOfProductsResponse> {
  //   //* Active Record
  //   console.log('searchTerm:', searchTerm);
  //   return await ShopItem.find({
  //     // select: ['id', 'price'], //* w ORM tylko gdy problemu z wydajnością
  //     order: {
  //       // price: 'DESC',
  //       price: 'ASC',
  //     },
  //   });
  // }

  async findProducts2(searchTerm: string): Promise<GetListOfProductsResponse> {
    //* Active Record
    console.log('searchTerm:', searchTerm);
    return await ShopItem.find({
      // where: [{ description: 'Włoskie ogórki' }, { price: 100, name: 'test' }], //* description or (price and name)
      // where: { price: LessThanOrEqual(100) },
      // where: { price: Between(10, 100) },
      // where: { description: Like(`%${searchTerm}%`) }, //* w środku searchTerm
      // where: {
      //   id: In(['4c768c41-d79b-11ec-83fc-b4a9fce70b24']),
      // },
      // where: { price: Not(LessThan(12)) },
      where: { price: Raw((field) => `${field}=10.99`) },
    });
  }
}

//* Examples
//* WHERE CustomerName LIKE 'a_%' -> Finds any values that start with "a" and are at least 2 characters in length
