const ARRAY_INTERVAL = 0;
export class AsyncArray extends Array {
  interval(ms) {
    this._interval = ms;
    return this;
  }
  [Symbol.asyncIterator]() {
    let i = 0;
    const interval = this._interval || ARRAY_INTERVAL;
    return {
      next: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              value: this[i],
              done: i++ === this.length,
            });
          }, interval);
        });
      },
    };
  }
}