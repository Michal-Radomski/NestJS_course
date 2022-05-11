export function countTime(): any {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    if (typeof original === "function") {
      descriptor.value = function (...args: any) {
        const startTime = new Date();
        let result;
        try {
          result = original.apply(this, args);
        } finally {
          const endTime = new Date();
          console.log(`Execution time: ${+endTime - +startTime} ms`);
          return result;
        }
      };
    }
    return descriptor;
  };
}
