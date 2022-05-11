{
  //* Typy generyczne
  const array: Array<number> = [1, 2, 3]; //* Typ generyczny

  interface ApiResponse<T> {
    httpCode: number;
    isOk: boolean;
    payload: T;
  }

  const answer: ApiResponse<string> = {
    httpCode: 200,
    isOk: true,
    payload: "Bonifacy",
  };
  const isItemBought: ApiResponse<boolean> = {
    httpCode: 200,
    isOk: true,
    payload: true,
  };
}

{
  //* Type Enum
  enum ApiInfoResult {
    Ok = 10, //* Domyślne wartości: 0,1,2...
    Error = 15,
    Warning = "Warning",
  }
  console.log(ApiInfoResult.Error);
  console.log(ApiInfoResult[15]);
}
