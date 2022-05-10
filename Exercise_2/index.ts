//* Imperative Programming

interface Item {
  name: string;
  count: number;
  price: number;
}

const basket: Item[] = [];

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

//* Object Oriented Programming

class Basket {
  items: any[];

  constructor() {
    this.items = [];
  }
  add(name: string, price: number, count: number = 1) {
    this.items.push({
      name: name,
      price: price,
      count: count,
    });
  }
  names2() {
    return this.items.map((item) => item.name);
  }
  sum2() {
    return this.items.reduce((prev, current) => prev + current.price * current.count, 0);
  }
}

const basket2 = new Basket();
// console.log("basket2:", basket2);
basket2.add("bread", 1, 2.5);
basket2.add("cucumber", 5, 4);

console.log("basket2:", basket2);
console.log("basket2.names2():", basket2.names2());
console.log("basket2.sum2():", basket2.sum2());
