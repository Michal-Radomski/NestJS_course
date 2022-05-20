import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShopItemDetails } from './shop-item-details.entity';
import { ShopSet } from './shop-set.entity';

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

  @OneToOne((_type) => ShopItemDetails, { eager: true }) //* Raczej nie stosować
  @JoinColumn()
  details: ShopItemDetails;

  //* Subprodukt
  @ManyToOne((_type) => ShopItem, (entity) => entity.subShopItems)
  mainShopItem: ShopItem;

  //* Produkt Główny
  @OneToMany((_type) => ShopItem, (entity) => entity.mainShopItem)
  subShopItems: ShopItem[];

  @ManyToMany((_type) => ShopSet, (entity) => entity.items)
  @JoinColumn()
  sets: ShopSet[];
}
