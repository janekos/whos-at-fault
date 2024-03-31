"use strict";

const helpers = (function() {
  function randomArrayElement(array, bias = 1) {
    return array[Math.floor(Math.pow(Math.random(), bias) * array.length)];
  }

  function randomColor () {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }

  function randomFloatInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  return {
    randomArrayElement,
    randomColor,
    randomFloatInRange
  };
})();