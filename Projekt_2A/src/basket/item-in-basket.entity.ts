import { ShopItem } from 'src/shop/shop-item.entity';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ItemInBasket extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  count: number;

  @OneToMany((_type) => ShopItem, (entity) => entity.itemsInBasket)
  @JoinColumn()
  shopItem: ShopItem;

  @ManyToOne((_type) => User, (entity) => entity.itemsInBasket)
  @JoinColumn()
  user: User;
}
