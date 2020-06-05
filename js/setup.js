'use strict';
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_COUNT = 4;

function createWizards() {
  var wizards = [];
  for (var i = 0; i < WIZARD_COUNT; i++) {
    wizards.push(createWizard(NAMES, SURNAMES, COAT_COLORS, EYES_COLORS));
  }

  return wizards;
}

function createWizard(names, surnames, coatColors, eyesColors) {
  var obj = {};
  obj.name = getRandomFromArrays(names, surnames);
  obj.coatColor = getRandomFromArray(coatColors);
  obj.eyesColor = getRandomFromArray(eyesColors);
  return obj;
}

function getRandomFromArray(array) {
  var index = Math.floor(Math.random() * array.length); // reange: 0.. array.length
  return array[index];
}

function getRandomFromArrays(array1, array2) {

  var item1 = getRandomFromArray(array1);
  var item2 = getRandomFromArray(array2);

  var index = Math.floor(Math.random() * 2); // 0 or 1

  return (index)
    ? item1 + ' ' + item2
    : item2 + ' ' + item1;
}

var dialog = document.querySelector('.setup');
dialog.classList.remove('hidden');

var similarListElement = dialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

function renderWizard(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

var wizards = createWizards();

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

dialog.querySelector('.setup-similar').classList.remove('hidden');
