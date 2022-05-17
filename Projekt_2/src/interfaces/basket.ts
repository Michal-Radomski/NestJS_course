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
