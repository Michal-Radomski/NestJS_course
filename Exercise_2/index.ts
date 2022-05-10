//* Imperative programming

interface Shopping {
  name: string;
  count: number;
  price: number;
}

const basket: Shopping[] = [];

basket.push({name: "bread", count: 1, price: 2.5});

basket.push({name: "cucumber", count: 5, price: 4});

const names: string[] = [];
let sum: number = 0;

for (let i = 0; i < basket.length; i++) {
  names.push(basket[i].name);
  sum += basket[i].price * basket[i].count;
}

console.log("names:", names);
console.log("sum:", sum);
