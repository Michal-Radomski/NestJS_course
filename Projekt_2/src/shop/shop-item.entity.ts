import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShopItem {
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
}
