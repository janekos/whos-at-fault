"use strict";

const modal = (function() {
  let modalEl = null;
  let modalTypes = {
    about: null,
    add: null,
    locale: null,
  };

  function toggle(event, srcEl, open, type) {
    if(!event || (!!srcEl && event.target !== srcEl))
      return;
    
    event.preventDefault();

    if (open) {
      if (!type || !modalTypes[type])
      throw new Error('Modal type is required when opening modal');
    
      modalTypes[type].style.visibility = 'visible';
      modalTypes[type].style.opacity = 1;
    } else {
      Object.keys(modalTypes).forEach(key => {
        modalTypes[key].style.visibility = 'collapse';
        modalTypes[key].style.opacity = 0;
      });
    }

    modalEl.style.visibility = open ? 'visible' : 'collapse';
    modalEl.style.opacity = open ? 1 : 0;
  }

  function init() {
    modalEl = document.getElementById('modal-wrapper');
    modalTypes = Array.from(modalEl.childNodes).reduce((acc, curr) => {
      if(curr.dataset && curr.dataset.type) {
        acc[curr.dataset.type] = curr;
      }
      return acc;
    }, {});
  }

  return {
    init,
    toggle,
  }
})();