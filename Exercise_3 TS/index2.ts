{
  // * Klasy w TS
  class Vehicle {
    run() {
      console.log("Brum, brum...");
    }
  }

  class Car extends Vehicle {
    brand: string;
    name: string;
    hp: number;
    drivenKms: number = 0;
    constructor(brand: string, name: string, hp: number) {
      super();
      this.brand = brand;
      this.name = name;
      this.hp = hp;
    }
    showInfo() {
      console.log(this.brand, this.name, `has pawer of ${this.hp}`, this.drivenKms);
    }
  }

  const lanos = new Car("Daewoo", "Lanos", 90); //* 0 -> wartość domyślna
  lanos.showInfo();
}

{
  //* Inny sposób definiowania klasy
  class Vehicle {
    run() {
      console.log("Brum, brum...");
    }
  }

  class Car extends Vehicle {
    drivenKms: number = 0;
    constructor(public brand: string, public name: string, public hp: number) {
      super();
    }
    showInfo() {
      console.log(this.brand, this.name, `has pawer of ${this.hp}`, this.drivenKms);
    }
  }

  const lanos = new Car("Daewoo", "Lanos", 90);
  lanos.showInfo();
}

{
  //* Czyste Klasy
  class Vehicle {
    run() {
      console.log("Brum, brum...");
    }
  }

  class Car extends Vehicle {
    drivenKms: number = 0;
    constructor(public readonly brand: string, public readonly name: string, public readonly hp: number) {
      super();
    }
    showInfo() {
      console.log(this.brand, this.name, `has pawer of ${this.hp}`, this.drivenKms);
    }
  }

  const lanos = new Car("Daewoo", "Lanos", 90);
  lanos.showInfo();
}
