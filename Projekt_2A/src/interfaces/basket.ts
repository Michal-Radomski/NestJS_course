// export type GetTotalBasketPriceResponse = number;

export type AddToBasketResponse =
  | {
      isSuccess: true;
      id: string;
    }
  | {
      isSuccess: false;
    };

export interface RemoveFromBasketResponse {
  isSuccess: boolean;
}

interface OneItemInBasket {
  id: string;
  count: number;
}

export type GetBasketResponse = OneItemInBasket[];
