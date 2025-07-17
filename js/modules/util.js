function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower) + lower;

  return Math.floor(result);
}

function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;

  return +result.toFixed(digits);
}

function getRandomArrayElement (array) {
  return array[getRandomPositiveInteger(0, array.length - 1)];
}

function getRandomId (min, max, isAvatar = false) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomPositiveInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomPositiveInteger(min, max);
    }
    previousValues.push(currentValue);
    if (currentValue < 10 && isAvatar) {
      currentValue = `0${currentValue}`;
    }
    return currentValue;
  };
}

const createAvatar = getRandomId(1, 11, true);

export {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, createAvatar};
