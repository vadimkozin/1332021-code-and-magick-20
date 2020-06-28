'use strict';
// отрисовка волшебников

window.render = (function () {
  // ссылка на блок настройки игры
  var dialog = document.querySelector('.setup');
  // ссылка на блок похожих персонажей
  var similarListElement = dialog.querySelector('.setup-similar-list');
  // ссылка на шаблон построения волшебника
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // отрисовка волшебника
  function renderWizard(wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  }

  // создание списка похожих волшебников
  function createSimilarListWizards(wizardList) {

    var fragment = document.createDocumentFragment();

    var size = wizardList.length > window.cfg.WIZARD_COUNT ? window.cfg.WIZARD_COUNT : wizardList.length;
    for (var i = 0; i < size; i++) {
      // fragment.appendChild(renderWizard(wizardList[i]));
      fragment.appendChild(renderWizard(createOne(wizardList[i])));

    }
    return fragment;
  }

  // отрисовка волшебников
  function render(wizards) {
    similarListElement.innerHTML = '';
    // добавление волшебников в блок похожих персонажей
    similarListElement.appendChild(createSimilarListWizards(wizards));

    // отображение волшебников в DOM
    dialog.querySelector('.setup-similar').classList.remove('hidden');
  }

  function createOne(item) {
    var obj = {};
    obj.name = item.name;
    obj.coatColor = item.colorCoat;
    obj.eyesColor = item.colorEyes;
    return obj;
  }

  return {
    render: render,
  };

})();
