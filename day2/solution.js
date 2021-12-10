const fs = require("fs");

const inputs = fs
  .readFileSync("./input.txt", { encoding: "utf-8" })
  .split("\n");

const getStageOneAnswer = (arrayInput) => {
  let downCounter = 0;
  let forwardCounter = 0;

  for (let i = 0; i < arrayInput.length; i++) {
    let [direction, x] = arrayInput[i].split(" ");
    switch (direction) {
      case "forward": {
        forwardCounter += Number(x);
        break;
      }
      case "down": {
        downCounter += Number(x);
        break;
      }
      case "up": {
        downCounter -= Number(x);
        break;
      }
      default: {
        console.log("default", direction);
      }
    }
  }

  return downCounter * forwardCounter;
};

const getStageTwoAnswer = (arrayInput) => {
  let downCounter1 = 0;
  let forwardCounter1 = 0;
  let aim1 = 0;

  for (let i = 0; i < arrayInput.length; i++) {
    let [direction, x] = arrayInput[i].split(" ");
    switch (direction) {
      case "forward": {
        forwardCounter1 += Number(x);
        downCounter1 += aim1 !== 0 ? aim1 * Number(x) : aim1;
        break;
      }
      case "down": {
        aim1 += Number(x);
        break;
      }
      case "up": {
        aim1 -= Number(x);
        break;
      }
      default: {
        console.log("default", direction);
      }
    }
  }

  return downCounter1 * forwardCounter1;
};

const stageOneAnswer = getStageOneAnswer(inputs);
const stageTwoAnswer = getStageTwoAnswer(inputs);

console.log(
  "stageOneAnswer",
  stageOneAnswer,
  "\n",
  "stageTwoAnswer",
  stageTwoAnswer
);
