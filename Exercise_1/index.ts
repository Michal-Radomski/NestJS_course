class Test {
  //* @countTime() - this would be a decorator
  someMethod(): void {
    for (let i: number = 0; i <= 1000; i++) {
      console.log("Hello World!", i);
    }
  }
}

const test = new Test();
test.someMethod();
