function sum(a: number, b: number): number {
  return a + b;
}

console.log(sum(2, parseFloat("3")));

{
  //* Typy
  const test: string = "test";
  const test2: boolean = true;
  const test3: number = 0x1234; //*dowolny format (tu hex)

  const test4: Array<number> = [1, 2, 3, 4];
  const test5: number[] = [1, 2, 3]; //* ten sam typ co wyżej

  enum UserType {
    admin,
    user,
    guest,
  }
  const test6: UserType = UserType.admin;

  //* Any -> lepiej unikać

  function test7(): void {
    console.log("Hello World!");
  }

  //* null, undefined oddzielne typy

  //* Rzutowanie lub <...>
  // fetch("xyz.com")
  //   .then((r) => r.json)
  //   .then((data) => {
  //     console.log(data as unknown as string);
  //   });

  //* Interface'y
  interface UserHelloResponse {
    hello: string;
    age: number;
    name: string;
    isEnabled: boolean;
    accountType: UserType;
    adminName?: string; //* Opcjonalne pola sprawdzić czy istnieją np if (adminName)
    sayHello: (anotherPerson: string) => void;
  }

  // fetch("abc.pl/users")
  //   .then((r) => r.json)
  //   .then((data: UserHelloResponse | any) => {
  //     console.log(data.name);
  //   });

  const _test8: UserHelloResponse = {
    hello: "Hello World!",
    age: 100,
    name: "User Testowy",
    isEnabled: true,
    accountType: UserType.user,
    sayHello: function (anotherPerson: string) {
      console.log("Hello World", anotherPerson);
    },
  };
}

{
  //* Interface'y ciąg dalszy
  interface UserHelloResponse {
    hello: string | string[];
    sayHello: (anotherPerson: string) => void;
  }

  class User implements UserHelloResponse {
    name: string;
    constructor(name: string) {
      this.name = name = name;
    }
    hello!: string;
    sayHello(anotherPerson: string) {
      console.log(this.name, "says hello to", anotherPerson);
    }
  }

  const myUser = new User("Tester");
  myUser.sayHello("Testerka");

  interface SpecialUserHelloResponse extends UserHelloResponse {
    age: number;
    name: string[];
  }
}
