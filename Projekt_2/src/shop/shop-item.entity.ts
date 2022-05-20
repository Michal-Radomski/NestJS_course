import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShopItemDetails } from './shop-item-details.entity';

// @Entity()  //* Data Mapper
// export class ShopItem {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column({
//     length: 60,
//   })
//   // name: string | null;
//   name: string;

//   @Column({
//     type: 'text',
//     // length: 1000,
//     default: '(brak opisu)',
//     // default: null,
//     // nullable: true,
//   })
//   description: string;

//   @Column({
//     type: 'float',
//     precision: 6,
//     scale: 2,
//   })
//   price: number;

//   @Column({
//     default: () => 'CURRENT_TIMESTAMP',
//   })
//   createdAt: Date;

//   @Column({
//     default: 0,
//   })
//   boughtCounter: number;

//   @Column({
//     default: false,
//     type: 'boolean',
//   })
//   wasEverBought: boolean;
// }
@Entity() //* Active Record
export class ShopItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 60,
  })
  // name: string | null;
  name: string;

  @Column({
    type: 'text',
    // length: 1000,
    default: '(brak opisu)',
    // default: null,
    // nullable: true,
  })
  description: string;

  @Column({
    type: 'float',
    precision: 6,
    scale: 2,
  })
  price: number;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    default: 0,
  })
  boughtCounter: number;

  @Column({
    default: false,
    type: 'boolean',
  })
  wasEverBought: boolean;

  @OneToOne((_type) => ShopItemDetails)
  @JoinColumn()
  details: ShopItemDetails;

  //* Subprodukt
  @ManyToOne((_type) => ShopItem, (entity) => entity.subShopItems)
  mainShopItem: ShopItem;

  //* Produkt Główny
  @OneToMany((_type) => ShopItem, (entity) => entity.mainShopItem)
  subShopItems: ShopItem[];
}
