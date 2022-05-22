export interface ShopItemInterface {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
}

export type CreateProductResponse = ShopItemInterface;
