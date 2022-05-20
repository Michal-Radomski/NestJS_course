export interface ShopItemInterface {
  name: string;
  description: string;
  price: number;
}

export type GetListOfProductsResponse = ShopItemInterface[];

export type GetOneProductResponse = ShopItemInterface;

export type CreateProductResponse = ShopItemInterface;

export interface GetPaginatedListOfProductsResponse {
  find?(arg0: (item: ShopItemInterface) => boolean);
  some?(arg0: (item: ShopItemInterface) => boolean): boolean;
  items: ShopItemInterface[];
  totalPages: number;
}
