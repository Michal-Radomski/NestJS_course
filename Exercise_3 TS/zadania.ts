function sum3(a: number, b: number): number {
  return a + b;
}

function getHello(name: string, surname: string): string {
  return `Hello! ${name} ${surname}`;
}

function formatPrice(price: number, currency: string): string {
  return price.toFixed(2) + currency;
}

enum Gender {
  female = "female",
  male = "male",
}

interface Kitty {
  name: string;
  gender: Gender;
  age: number | "Unknown";
  isAdopted: boolean;
  specialNeeds?: string[];
}

const kitties: Kitty[] = [
  {
    name: "Mruczek",
    gender: Gender.male,
    age: 3,
    isAdopted: true,
    specialNeeds: ["Drinks only water"],
  },
  {
    name: "Simon",
    gender: Gender.male,
    age: "Unknown",
    isAdopted: false,
  },
  {
    name: "Łatka",
    gender: Gender.female,
    age: 4,
    isAdopted: true,
  },
];
