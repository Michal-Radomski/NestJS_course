import { ShopItem } from 'src/shop/shop-item.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AddItemDto } from './dto/add-item.dto';

@Entity()
export class ItemInBasket extends BaseEntity implements AddItemDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 50,
  })
  name: string;

  @Column()
  count: number;

  @OneToOne((_type) => ShopItem, (entity) => entity.itemInBaseBasket)
  @JoinColumn()
  shopItem: ShopItem;
}
