"use strict";

const floaters = (function() {
  let floatersEl = null;
  let currFloaters = 0;
  const maxFloaters = 20;
  const floaterInterval = 1000;
  const floaterLifespan = 20000;
  const floaterItems = ['🤔', '🤓', '🐔', '🐈'];
  const baseFloaterItemsCount = floaterItems.length;

  function drawFloater() {
    if (currFloaters > maxFloaters)
      return;

    currFloaters++;

    const floater = document.createElement('div');
    floater.innerText = helpers.randomArrayElement(floaterItems, 4);
    if (floater.innerText.length === floaterItems[0].length)
      floater.classList.add('emoji');

    floater.style.top = Math.floor(Math.random() * 101) + '%';
    floater.style.left = Math.floor(Math.random() * 101) + '%';

    floatersEl.appendChild(floater);

    setTimeout(() => {
      floatersEl.removeChild(floater);
      currFloaters--;
    }, floaterLifespan);
  }

  function addFloater(newFloater) {
    console.log('addFloater', newFloater)
    floaterItems.push(`${newFloater}${'?'.repeat(Math.floor(Math.random() * 4))}`);
  }

  function removeFloater() {
    if (floaterItems.length === baseFloaterItemsCount)
      return;

    floaterItems.pop();
  }

  function init() {
    floatersEl = document.getElementById('floaters');

    setInterval(drawFloater, floaterInterval);
  }

  return {
    init,
    addFloater,
    removeFloater
  };
})();