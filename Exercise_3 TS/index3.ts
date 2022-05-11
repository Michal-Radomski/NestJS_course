{
  //* Modyfikatory dostępu -> public jest domyślny
  class Vehicle {
    // public createdAt: Date = new Date();
    // private createdAt: Date = new Date(); //* Tylko w obrębie tej klasy
    protected createdAt: Date = new Date(); //* Tylko w obrębie tej klasy + dziedziczone klasy
    run() {
      console.log("Brum, brum...");
    }
  }

  class Car extends Vehicle {
    drivenKms: number = 0;
    constructor(private readonly brand: string, private readonly name: string, private readonly hp: number) {
      super();
    }
    private internal(): string {
      return this.brand;
    }
    showInfo() {
      console.log(this.brand, this.name, `has pawer of ${this.hp}`, this.drivenKms, this.internal());
    }
    showCreatedAt() {
      console.log(this.createdAt.toLocaleString());
    }
  }

  const lanos = new Car("Daewoo", "Lanos", 90);
  lanos.showInfo();
  // console.log(lanos.createdAt); //* błąd bo metoda ma modyfikator dostępu protected
}

{
  //* Gettery i Settery
  class Vehicle {
    protected createdAt: Date = new Date(); //* Tylko w obrębie tej klasy + dziedziczone klasy
    run() {
      console.log("Brum, brum...");
    }
  }

  class Car extends Vehicle {
    private drivenKms: number = 0;
    constructor(private readonly brand: string, private readonly name: string, private readonly hp: number) {
      super();
    }
    get kms(): number {
      //* Getter
      return this.drivenKms;
    }
    set kms(newKms: number) {
      //* Setter
      this.drivenKms = newKms;
    }
  }
  const lanos = new Car("Daewoo", "Lanos", 90);
  console.log(lanos.kms); //*Getter
  lanos.kms = 100; //* Setter
  console.log(lanos.kms); //*Getter
}

{
  //* Klasa abstrakcyjna
  abstract class Vehicle {
    protected createdAt: Date = new Date();
    run() {
      console.log("Brum, brum...");
    }
  }

  class Car extends Vehicle {
    private drivenKms: number = 0;
    constructor(private readonly brand: string, private readonly name: string, private readonly hp: number) {
      super();
    }
  }
  const lanos = new Car("Daewoo", "Lanos", 90);
  // const newCar = new Vehicle() //* Klasa abstrakcyjna -> nie można bezpośrednio tworzyć obiektu na podstawie tej klasy
}
