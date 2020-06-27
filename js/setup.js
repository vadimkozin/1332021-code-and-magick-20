'use strict';
// настройка Персонажа (волшебника)

(function () {

  var form = document.querySelector('.setup-wizard-form');
  // Ссылки для назначения цвета мантии, глаз волщебника и цвета фаербола
  var setupWizardCoat = form.querySelector('.setup-wizard .wizard-coat');
  var setupWizardEyes = form.querySelector('.setup-wizard .wizard-eyes');
  var setupFireball = form.querySelector('.setup-fireball-wrap');

  // Ссылки для сохранения цвета мантии, глаз волшебника и цвета фаербола
  var coatColor = form.querySelector('input[name="coat-color"]');
  var eyesColor = form.querySelector('input[name="eyes-color"]');
  var fireballColor = form.querySelector('input[name="fireball-color"]');

  // назначение нового цвета для element из диапазона цветов colors
  function setNewValue(element, item, colors, styleField) {
    item.value = window.random.getFromArrayNewValue(colors, item.value);
    element.style[styleField] = item.value;
    window.wizard.update({name: item.getAttribute('name'), value: item.value});
  }

  // ТЗ: Изменение цвета мантии персонажа по нажатию.
  setupWizardCoat.addEventListener('click', window.debounce(function () {
    setNewValue(setupWizardCoat, coatColor, window.cfg.COAT_COLORS, 'fill');
  }));

  // ТЗ: Изменение цвета глаз персонажа по нажатию
  setupWizardEyes.addEventListener('click', window.debounce(function () {
    setNewValue(setupWizardEyes, eyesColor, window.cfg.EYES_COLORS, 'fill');
  }));

  // ТЗ: Изменение цвета фаербола по нажатию
  setupFireball.addEventListener('click', function () {
    setNewValue(setupFireball, fireballColor, window.cfg.FIREBOLL_COLORS, 'backgroundColor');
  });

  // останавливаю всплытие на dblclick из-за некоректного поведения в расширении Kumquat Kernel в браузере Хром
  // так как на двойной клик это расширение выводит в консоль ошибку: at onDoubleClick (eval at success (kernel.js:210), <anonymous>:62:48)
  setupWizardCoat.addEventListener('dblclick', function (evt) {
    evt.stopPropagation();
  });
  setupWizardEyes.addEventListener('dblclick', function (evt) {
    evt.stopPropagation();
  });


  window.wizard.load();

})();
