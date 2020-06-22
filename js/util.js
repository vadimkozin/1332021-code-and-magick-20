'use strict';

window.util = (function () {
  return {
    isEscEvent: function (evt, action) {
      if (evt.key === 'Escape') {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.key === 'Enter') {
        action();
      }
    },
    showMessage: function (message, isOk, timeout) {

      isOk = (isOk === undefined) ? true : false;
      timeout = timeout || 3000;

      var node = document.createElement('div');
      node.style = 'z-index:100; margin:0 auto; text-align:center; padding:1em;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';
      node.style.opacity = 0.85;
      node.style.whiteSpace = 'pre-wrap';
      node.style.backgroundColor = isOk ? 'green' : 'red';
      node.textContent = message;
      document.body.insertAdjacentElement('afterbegin', node);

      setTimeout(function () {
        node.remove();
      }, timeout);
    },
  };
})();
