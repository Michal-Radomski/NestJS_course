function sum(a: number, b: number): number {
  return a + b;
}

console.log(sum(2, parseFloat("3")));

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

//* Any lepiej unikać

function test7(): void {
  console.log("Hello World!");
}

//* null, undefined oddzielne typy

//* Rzutowanie lub <...>
fetch("xyz.com")
  .then((r) => r.json)
  .then((data) => {
    console.log(data as unknown as string);
  });

interface UserHelloResponse extends Response {
  hello: string;
  age: number;
  name: string;
  isEnabled: boolean;
  accountType: UserType;
}

fetch("abc.pl/users")
  .then((r) => r.json)
  .then((data: UserHelloResponse | any) => {
    console.log(data.name);
  });
