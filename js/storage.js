'use strict';

const storage = (function() {
  const keys = {
    WHEEL_SECTORS: 'WHEEL_SECTORS',
  };

  function set(key, value) {
    if (value === undefined)
      window.localStorage.removeItem(key);

    if (typeof value !== 'string')
      value = JSON.stringify(value);

    window.localStorage.setItem(key, value);
  }

  function get(key) {
    const value = window.localStorage.getItem(key);
    if (!value) return value;

    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }

  return { set, get, keys };
})();