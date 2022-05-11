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

{
  //* Asynchroniczność
  //- Metoda 1
  // function goToPKP(clb: () => void) {
  //   setTimeout(clb, 1000);
  // }
  // function waitForTrain(clb: () => void) {
  //   setTimeout(clb, 1500);
  // }
  // function travelToDestination(clb: () => void) {
  //   setTimeout(clb, 2000);
  // }

  // goToPKP(() => {
  //   console.log("Dodarłem do PKP");
  //   waitForTrain(() => {
  //     console.log("Pociąg przyjechał");
  //     travelToDestination(() => {
  //       console.log("Dojechałem");
  //     });
  //   });
  // });

  //- Metoda 2
  // function goToPKP(): Promise<void> {
  //   return new Promise((resolve, _reject) => setTimeout(resolve, 1000));
  // }
  // function waitForTrain(): Promise<void> {
  //   return new Promise((resolve, _reject) => setTimeout(resolve, 1500));
  // }
  // function travelToDestination(): Promise<void> {
  //   return new Promise((resolve, _reject) => setTimeout(resolve, 2000));
  // }

  // goToPKP().then(() => {
  //   console.log("Dotarłem do PKP");
  //   waitForTrain().then(() => {
  //     console.log("Pociąg przyjechał");
  //     travelToDestination().then(() => {
  //       console.log("Dojechałem");
  //     });
  //   });
  // });

  //- Metoda 3

  function goToPKP(): Promise<void> {
    return new Promise((resolve, _reject) => setTimeout(resolve, 1000));
  }
  function waitForTrain(): Promise<void> {
    return new Promise((resolve, _reject) => setTimeout(resolve, 1500));
  }
  function travelToDestination(): Promise<void> {
    return new Promise((resolve, _reject) => setTimeout(resolve, 2000));
  }

  (async () => {
    await goToPKP();
    console.log("Dotarłem do PKP");
    await waitForTrain();
    console.log("Pociąg przyjechał");
    await travelToDestination();
    console.log("Dojechałem");
  })();
}
