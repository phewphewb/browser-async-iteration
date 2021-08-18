import { AsyncArray } from "./async-array.js";
import { delaySync } from "./delay.js";

const DEFAULT_ASYNC_INTERVAL = 0;

const ValueClassName = "value";
const OrderClassName = "order";

export class App {
  constructor(html, ui) {
    this.html = html;
    this.ui = ui;
    this._asyncInterval = DEFAULT_ASYNC_INTERVAL;
  }

  asyncInterval(ms) {
    this._asyncInterval = ms;
  }

  run() {
    this.ui.buttons.start.addEventListener("click", () => {
      this.ui.cols.clearColumns();
      if (this.ui.switches.concMode.checked) {
        this.iterateAsync();
      } else {
        this.iterateSync();
      }
    });
  }

  iterateAsync() {
    const leftColDataAsync = new AsyncArray(100)
      .interval(this._asyncInterval)
      .fill("async array #1");
    const rightColDataAsync = new AsyncArray(100)
      .interval(this._asyncInterval)
      .fill("async array #2");

    let order = 0;

    const timer = setInterval(() => {
      this.renderInterval(order);
      order++;
    }, 100);

    const iterate = async (data, col) => {
      let i = 0;
      for await (const item of data) {
        col.innerHTML += this.html.li(this.renderSpans(i, order, item));
        i++;
        order++;
      }
      clearInterval(timer);
    };

    iterate(leftColDataAsync, this.ui.cols.left);
    iterate(rightColDataAsync, this.ui.cols.right);
  }

  iterateSync() {
    const leftColData = new Array(100).fill("sync array #1");
    const rightColData = new Array(100).fill("sync array #2");

    let i = 0;

    let timer = setInterval(() => {
      this.renderInterval(i);
      i++;
    }, 100);

    const iterate = (data, col) => {
      for (const value of data) {
        const renderString = this.html.li(
          this.renderSpans("index: " + i, i, value)
        );
        i++;
        delaySync(() => (col.innerHTML += renderString));
      }
    };

    iterate(leftColData, this.ui.cols.left);
    iterate(rightColData, this.ui.cols.right);

    clearInterval(timer);
  }

  renderInterval(index) {
    const spans = this.html
      .span("value: no value", ValueClassName)
      .span("set interval takes time", ValueClassName)
      .span("order: " + index, OrderClassName);
    return (this.ui.cols.interval.innerHTML += this.html.li(spans));
  }
  renderSpans(index, order, value) {
    const spans = this.html
      .span("value: " + value, ValueClassName)
      .span("index: " + index, ValueClassName)
      .span("order: " + order, OrderClassName);
    return spans;
  }
}
