const fs = require("fs");

const inputs = fs
  .readFileSync("./input.txt", { encoding: "utf-8" })
  .split("\n")
  .map((x) => Number(x));

const getIncrwasedCount = (arrayInput) => {
  let counter = 0;
  for (let i = 0; i < arrayInput.length; i++) {
    if (i !== 0 && arrayInput[i - 1] < arrayInput[i]) {
      counter = counter + 1;
    }
  }
  return counter;
};

const getThreeMeasurement = (arrayInput) => {
  let threeMeasurementArr = [];

  for (let i = 0; i < arrayInput.length - 2; i++) {
    let sum = arrayInput[i] + arrayInput[i + 1] + arrayInput[i + 2];
    threeMeasurementArr.push(sum);
  }
  return threeMeasurementArr;
};

const stageOneAnswer = getIncrwasedCount(inputs);

const stageTwoAnswer = getIncrwasedCount(getThreeMeasurement(inputs));

console.log(
  "stageOneAnswer",
  stageOneAnswer,
  "\n",
  "stageTwoAnswer",
  stageTwoAnswer
);
