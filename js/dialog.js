'use strict';
(function () {

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var handle = setup.querySelector('.upload');
  var form = setup.querySelector('.setup-wizard-form');

  var dialog = (function (movableObject) {

    var style = getComputedStyle(movableObject);

    // изначальные координаты передвигаемого объекта
    // в них нужно вернуть объект при закрытии окна диалога
    var originalCoords = {
      left: style.left,
      top: style.top
    };

    return {
      returnDialogToStartingPosition: function () {
        setup.style.top = originalCoords.top;
        setup.style.left = originalCoords.left;
      }
    };

  })(setup);


  window.move.init(setup, handle);

  function onPopupEscPress(evt) {
    window.util.isEscEvent(evt, closePopup);
  }

  function openPopup() {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  }

  function closePopup() {
    // ТЗ: Если фокус находится на форме ввода имени, то окно закрываться не должно.
    if (document.activeElement.getAttribute('name') !== 'username') {
      setup.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);

      // возвращаем перемещаемый объект в исходное состояние
      dialog.returnDialogToStartingPosition();

    }
  }

  // ТЗ: Окно .setup должно открываться по нажатию на блок .setup-open.
  //     Открытие окна производится удалением класса hidden у блока
  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  // ТЗ: Окно .setup должно закрываться по нажатию на элемент
  //     .setup-close, расположенный внутри окна
  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  // форма
  function onFormSubmit(evt) {

    window.backend.save(new FormData(form), onFormSaved, onFormError);

    evt.preventDefault();

    function onFormSaved() {
      setup.classList.add('hidden');
      window.util.showMessage('Данные сохранены');
    }

    function onFormError(message) {
      window.util.showMessage(message, false, 5000);
    }

  }

  form.addEventListener('submit', onFormSubmit);

})();
