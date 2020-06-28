'use strict';
// волшебник(и)

window.wizard = (function () {

  var wizardsSaved = [];
  var coatColor = window.cfg.COAT_COLORS[0];
  var eyesColor = window.cfg.EYES_COLORS[0];

  // возвращает ранг персонажа
  function getRank(wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  }

  // сравнение по имени
  function namesComparator(left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }

  // обновление цвета составляющих частей персонажа
  function updateColor(options) {
    if (options) {
      var value = options.value;
      switch (options.name) {
        case 'eyes-color':
          eyesColor = value;
          break;
        case 'coat-color':
          coatColor = value;
          break;
        case 'fireball-color':
          // ..
          break;
      }
    }
  }

  // обновление персонажей
  function updateWizards(options) {
    updateColor(options);
    window.render.render(wizardsSaved.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  }

  // загрузка волшебников
  function loadWizards() {

    window.backend.load(window.cfg.URL_DATA, onLoad, onError);

    function onLoad(data) {
      wizardsSaved = data;
      updateWizards();
    }

    function onError(message) {
      window.util.showMessage(message, false, 5000);
    }

  }


  return {
    load: loadWizards,
    update: updateWizards,
  };

})();
