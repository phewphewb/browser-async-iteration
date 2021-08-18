const leftCol = document.getElementById("left-col");
const rightCol = document.getElementById("right-col");
const intervalCol = document.getElementById("interval-col");
const startButton = document.getElementById("start-button");
const concModeSwitch = document.getElementById("conc-mode-switch");

export const ui = {
  cols: {
    left: leftCol,
    right: rightCol,
    interval: intervalCol,
    clearColumns: () => {
      leftCol.innerHTML = "";
      rightCol.innerHTML = "";
      intervalCol.innerHTML = "";
    },
  },
  buttons: { start: startButton },
  switches: {
    concMode: concModeSwitch,
  },
};
