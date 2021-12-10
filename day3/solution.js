const fs = require("fs");

const inputs = fs
  .readFileSync("./input.txt", { encoding: "utf-8" })
  .split("\n");

const binaryInputLength = inputs.length;

const getGamma = (arrayInput) => {
  let counterArr = new Array(arrayInput[0].length).fill(0);
  for (let i = 0; i < arrayInput.length; i++) {
    const arrayOfBinaryVal = arrayInput[i].split("");
    for (let j = 0; j < arrayOfBinaryVal.length; j++) {
      counterArr[j] += Number(arrayOfBinaryVal[j]);
    }
  }
  for (let k = 0; k < counterArr.length; k++) {
    counterArr[k] = counterArr[k] < binaryInputLength / 2 ? 0 : 1;
  }

  return parseInt(counterArr.join("").replace(",", ""), 2);
};

const getEpsilon = (gamma) => {
  // simply flipping the bits of gamma
  // 12 is the leangth of each binary
  return ~gamma & (Math.pow(2, 12) - 1);
};

const stageOneAnswer = getGamma(inputs) * getEpsilon(getGamma(inputs));
console.log(stageOneAnswer);

// Stage 2
const getBitToConsider = (arrayInput, position) => {
  let bitOccuranceRate = 0;
  for (let i = 0; i < arrayInput.length; i++) {
    if (Number(arrayInput[i][position]) === 1) {
      bitOccuranceRate += 1;
    }
  }

  // + here converts boolean to binary
  return +(bitOccuranceRate >= arrayInput.length / 2);
};

const getBitsToUse = (arrayInput, position, bit) => {
  let bitsToUseArray = [];

  for (let i = 0; i < arrayInput.length; i++) {
    if (Number(arrayInput[i][position]) === bit) {
      bitsToUseArray.push(arrayInput[i]);
    }
  }
  return bitsToUseArray;
};

const getOxygenGeneratorRating = (arrayInput, position) => {
  if (position === arrayInput[0].length) {
    if (arrayInput.length === 1) {
      return parseInt(arrayInput[0], 2);
    } else {
      return "Error";
    }
  } else {
    const bitToConsider = getBitToConsider(arrayInput, position);
    const newInputArray = getBitsToUse(arrayInput, position, bitToConsider);
    return getOxygenGeneratorRating(newInputArray, ++position);
  }
};

const getCO2ScrubberRating = (arrayInput, position) => {
  console.log(position, arrayInput);
  if (arrayInput.length === 1) {
    return parseInt(arrayInput[0], 2);
  }

  if (position === arrayInput[0].length) {
    if (arrayInput.length === 1) {
      return parseInt(arrayInput[0], 2);
    } else {
      return "Error";
    }
  } else {
    const bitToConsider = getBitToConsider(arrayInput, position);
    const newInputArray = getBitsToUse(arrayInput, position, +!+bitToConsider);
    return getCO2ScrubberRating(newInputArray, ++position);
  }
};

const oxygenGeneratorRating = getOxygenGeneratorRating(inputs, 0);
const co2ScrubberRating = getCO2ScrubberRating(inputs, 0);

console.log(oxygenGeneratorRating * co2ScrubberRating);
