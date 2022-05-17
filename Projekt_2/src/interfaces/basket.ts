import { AddProductDto } from 'src/basket/dto/add-product.dto';

// export default interface AddProductToBasketResponse {
//   isSuccess: boolean;
//   index?: number;

// }
export type AddProductToBasketResponse =
  | {
      isSuccess: true;
      index: number;
    }
  | {
      isSuccess: false;
    };

export interface RemoveProductFromBasketResponse {
  isSuccess: boolean;
}

export type ListProductsInBasketResponse = AddProductDto[];

export type GetTotalPriceResponse =
  | number
  | { isSuccess: false; alternativeBasket: AddProductDto[] };
