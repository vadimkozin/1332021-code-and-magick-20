'use strict';
// функции для разных 'случайных' вещей

window.random = (function () {
  return {
    getFromArray: function (array) {
      var index = Math.floor(Math.random() * array.length); // range: 0.. array.length
      return array[index];
    },

    getFromArrayNewValue: function (array, oldValue) {
      do {
        var value = this.getFromArray(array);
      } while (value === oldValue);

      return value;
    },

    getFromArrays: function (array1, array2) {

      var item1 = this.getFromArray(array1);
      var item2 = this.getFromArray(array2);

      var index = Math.floor(Math.random() * 2); // 0 or 1

      return (index)
        ? item1 + ' ' + item2
        : item2 + ' ' + item1;
    },

    getSetValues: function (count, max) {
      var array = [];

      if (count > max) {
        throw new Error('Ошибка: количество значений превышает максимальное.');
      }

      do {
        var value = Math.floor(Math.random() * max); // 0 .. max
        if (array.indexOf(value) === -1) {
          array.push(value);
        }
      } while (array.length < count);

      return array;
    }
  };

})();
