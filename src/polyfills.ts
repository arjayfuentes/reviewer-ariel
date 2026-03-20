declare global {
  interface PromiseConstructor {
    try<T>(fn: () => T | Promise<T>): Promise<T>;
  }
}

if (typeof Promise.try === 'undefined') {
  Promise.try = function <T>(fn: () => T | Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      try {
        resolve(fn());
      } catch (e) {
        reject(e);
      }
    });
  };
}

export {};
