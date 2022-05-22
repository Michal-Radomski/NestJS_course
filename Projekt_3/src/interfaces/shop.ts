export interface ShopItemInterface {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
}

export type GetListOfProductsResponse = ShopItemInterface[];

export type GetOneProductResponse = ShopItemInterface;

export type CreateProductResponse = ShopItemInterface;
