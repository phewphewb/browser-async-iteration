import { AsyncArray } from "./async-array.js";
import { delaySync } from "./utils.js";

const li = (value) => `<li>${value}</li>`;
const span = (value, className) => `<span class=${className}>${value}</span>`;

const leftCol = document.getElementById("left-col");
const rightCol = document.getElementById("right-col");
const intervalCol = document.getElementById("interval-col");
const startButton = document.getElementById("start-button");
const concModeSwitch = document.getElementById("conc-mode-switch");

const clearColumns = () => {
  leftCol.innerHTML = "";
  rightCol.innerHTML = "";
  intervalCol.innerHTML = "";
};

const renderInterval = (index) =>
  (intervalCol.innerHTML += li(
    span("set interval takes time") + span("order: " + index, "order")
  ));

const iterateAsync = () => {
  const leftColDataAsync = new AsyncArray(100)
    .interval(100)
    .fill("async array #1");
  const rightColDataAsync = new AsyncArray(100)
    .interval(100)
    .fill("async array #2");
  let j = 0;
  const timer = setInterval(() => {
    renderInterval(j);
    j++;
  }, 100);
  (async () => {
    let i = 0;
    for await (const item of leftColDataAsync) {
      leftCol.innerHTML += li(
        span("index: " + i++) + span("order: " + j++, "order")
      );
    }
    clearInterval(timer);
  })();
  (async () => {
    let i = 0;
    for await (const item of rightColDataAsync) {
      rightCol.innerHTML += li(
        span("index: " + i++) + span("order: " + j++, "order")
      );
    }
    clearInterval(timer);
  })();
};

const iterateSync = () => {
  const leftColData = new Array(100).fill("sync array #1");
  const rightColData = new Array(100).fill("sync array #2");
  let i = 0;
  let timer = setInterval(() => {
    renderInterval(i);
    i++;
  }, 100);
  for (const item of leftColData) {
    const s = li("index: " + i++);
    delaySync(() => (leftCol.innerHTML += s));
  }
  for (const item of rightColData) {
    const s = li("index: " + i++);
    delaySync(() => (rightCol.innerHTML += s));
  }
  clearInterval(timer);
};

startButton.addEventListener("click", () => {
  clearColumns();
  if (concModeSwitch.checked) {
    iterateAsync();
  } else {
    iterateSync();
  }
});
