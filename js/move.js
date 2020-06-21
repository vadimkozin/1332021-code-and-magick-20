'use strict';
window.move = (function () {
  /**
   * Инициализация передвижения объекта
   * @param {HTMLElement} movableObject - передвигаемый объект
   * @param {HTMLElement} handle - ручка для перетаскивания
   * @param {boolean} isReturnAsItWas - вернуть как было?
   */

  function init(movableObject, handle, isReturnAsItWas) {

    isReturnAsItWas = isReturnAsItWas || false;

    // изначальные координаты передвигаемого объекта
    // в них нужно вернуть объект при отпускании мыши если isReturnAsItWas=true
    var style = getComputedStyle(movableObject);

    var originalCoords = {
      left: style.left,
      top: style.top
    };

    handle.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var dragged = false;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        dragged = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        movableObject.style.top = (movableObject.offsetTop - shift.y) + 'px';
        movableObject.style.left = (movableObject.offsetLeft - shift.x) + 'px';

      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragged) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            handle.removeEventListener('click', onClickPreventDefault);
          };
          handle.addEventListener('click', onClickPreventDefault);
        }

        if (isReturnAsItWas) {
          movableObject.style.top = originalCoords.top;
          movableObject.style.left = originalCoords.left;
        }

      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  return {
    init: init
  };

})();
