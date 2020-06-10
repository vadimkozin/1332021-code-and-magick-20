'use strict';

var cfg = {
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
  FIREBOLL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
  WIZARD_COUNT: 4,
};

var random = {
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
  }
};

function createWizards() {
  var wizards = [];
  for (var i = 0; i < cfg.WIZARD_COUNT; i++) {
    wizards.push(createWizard(cfg.NAMES, cfg.SURNAMES, cfg.COAT_COLORS, cfg.EYES_COLORS));
  }

  return wizards;
}

function createWizard(names, surnames, coatColors, eyesColors) {
  var obj = {};
  obj.name = random.getFromArrays(names, surnames);
  obj.coatColor = random.getFromArray(coatColors);
  obj.eyesColor = random.getFromArray(eyesColors);
  return obj;
}

function renderWizard(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

function createSimilarListWizards(wizardList) {

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizardList.length; i++) {
    fragment.appendChild(renderWizard(wizardList[i]));
  }
  return fragment;
}

// ссылка на блок настройки игры
var dialog = document.querySelector('.setup');

// ссылка на блок похожих персонажей
var similarListElement = dialog.querySelector('.setup-similar-list');

// ссылка на шаблон построения волшебника
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

// создание волшебников
var wizards = createWizards();

// добавление волшебников в блок похожих персонажей
similarListElement.appendChild(createSimilarListWizards(wizards));

// отображение волшебников в DOM
dialog.querySelector('.setup-similar').classList.remove('hidden');


// ---------------------------------------------------------
// #4. Обработка событий (10. Учебный проект: одеть Надежду)

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = document.querySelector('.setup-close');
var form = document.querySelector('.setup-wizard-form');

function onPopupEscPress(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
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

  }
}

// ТЗ: Окно .setup должно открываться по нажатию на блок .setup-open.
//     Открытие окна производится удалением класса hidden у блока
setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

// ТЗ: Окно .setup должно закрываться по нажатию на элемент
//     .setup-close, расположенный внутри окна
setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

// Ссылки для назначения цвета мантии, глаз волщебника и цвета фаерболов
var setupWizardCoat = form.querySelector('.setup-wizard .wizard-coat');
var setupWizardEyes = form.querySelector('.setup-wizard .wizard-eyes');
var setupFireball = form.querySelector('.setup-fireball-wrap');

// Ссылки для сохранения цвета мантии, глаз волщебника и цвета фаерболов
var coatColor = form.querySelector('input[name="coat-color"]');
var eyesColor = form.querySelector('input[name="eyes-color"]');
var fireballColor = form.querySelector('input[name="fireball-color"]');

// назначение нового цвета для element из диапазона цветов colors
function setNewValue(element, item, colors, styleField) {
  item.value = random.getFromArrayNewValue(colors, item.value);
  element.style[styleField] = item.value;
}

// ТЗ: Изменение цвета мантии персонажа по нажатию.
setupWizardCoat.addEventListener('click', function () {
  setNewValue(setupWizardCoat, coatColor, cfg.COAT_COLORS, 'fill');
});

// ТЗ: Изменение цвета глаз персонажа по нажатию
setupWizardEyes.addEventListener('click', function () {
  setNewValue(setupWizardEyes, eyesColor, cfg.EYES_COLORS, 'fill');
});

// ТЗ: Изменение цвета фаерболов по нажатию
setupFireball.addEventListener('click', function () {
  setNewValue(setupFireball, fireballColor, cfg.FIREBOLL_COLORS, 'backgroundColor');
});
