import { ItemInBasket } from 'src/basket/item-in-basket.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShopItemInterface } from '../interfaces/shop';

@Entity()
export class ShopItem extends BaseEntity implements ShopItemInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    length: 200,
  })
  description: string;

  @Column({
    type: 'float',
    precision: 7,
    scale: 2,
  })
  price: number;

  @Column({
    default: null,
    nullable: true,
  })
  photoFn: string;

  @OneToMany((_type) => ItemInBasket, (entity) => entity.shopItem)
  itemsInBasket: ItemInBasket;
}
