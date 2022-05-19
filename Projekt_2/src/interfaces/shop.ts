interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
}

export type GetListOfProductsResponse = ShopItem[];

export type GetOneProductResponse = ShopItem;

export type CreateProductResponse = ShopItem;

export interface GetPaginatedListOfProductsResponse {
  find?(arg0: (item: ShopItem) => boolean);
  some?(arg0: (item: ShopItem) => boolean): boolean;
  items: ShopItem[];
  totalPages: number;
}
