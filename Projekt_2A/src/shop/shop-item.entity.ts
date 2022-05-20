import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}
