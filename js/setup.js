'use strict';

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var randomArrayElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getFullName = function (names, surnames) {
  return [names, surnames].map(randomArrayElement).join(' ');
};

var getCoatColor = function (coat) {
  return randomArrayElement(coat);
};

var getEyesColor = function (eyesColor) {
  return randomArrayElement(eyesColor);
};

var getObject = function () {
  return {
    'name': getFullName(WIZARD_NAMES, WIZARD_SURNAMES),
    'coatColor': getCoatColor(COAT_COLOR),
    'eyesColor': getEyesColor(EYES_COLOR)
  };
};

var wizards = [];
for (var i = 0; i < 4; i++) {
  wizards[i] = getObject();
}

var changePropertiesWizard = function (item, wizard) {
  item.querySelector('.setup-similar-label').textContent = wizard.name;
  item.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  item.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < wizards.length; j++) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  changePropertiesWizard(wizardElement, wizards[j]);
  fragment.appendChild(wizardElement);
}
similarListElement.appendChild(fragment);

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');
