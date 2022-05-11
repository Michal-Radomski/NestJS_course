import {sum2} from "./index4";
import sum3 from "./index4";

import {countTime} from "./count-time.decorator";

console.log("sum2:", sum2(3, 4));
console.log("sum3:", sum3(3, 4));

{
  //* Dekoratory
  class Test {
    @countTime()
    someMethod() {
      let x = 100;
      for (let i: number = 0; i < 1000000; i++) {
        x += i;
      }
      return x;
    }
  }
  const test = new Test();
  console.log(test.someMethod());
}
