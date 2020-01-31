'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

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
  return randomArrayElement(names) + ' ' + randomArrayElement(surnames);
};

var getCoatColor = function (coat) {
  return randomArrayElement(coat);
};

var getEyesColor = function (eyesColor) {
  return randomArrayElement(eyesColor);
};

var wizards = [
  {
    name: getFullName(WIZARD_NAMES, WIZARD_SURNAMES),
    coatColor: getCoatColor(COAT_COLOR),
    eyesColor: getEyesColor(EYES_COLOR)
  },
  {
    name: getFullName(WIZARD_NAMES, WIZARD_SURNAMES),
    coatColor: getCoatColor(COAT_COLOR),
  },
  {
    name: getFullName(WIZARD_NAMES, WIZARD_SURNAMES),
    coatColor: getCoatColor(COAT_COLOR),
    eyesColor: getEyesColor(EYES_COLOR)
  },
  {
    name: getFullName(WIZARD_NAMES, WIZARD_SURNAMES),
    coatColor: getCoatColor(COAT_COLOR),
    eyesColor: getEyesColor(EYES_COLOR)
  }
];

var creatWizard = function (item) {
  item.querySelector('.setup-similar-label').textContent = wizards[i].name;
  item.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
  item.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;

  return wizardElement;
};

for (var i = 0; i < wizards.length; i++) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  creatWizard(wizardElement);
  similarListElement.appendChild(wizardElement);
}
