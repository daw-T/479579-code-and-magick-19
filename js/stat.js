'use strict';

var CLOUD_WIDTH = 500; //ширина облака со статистикой
var CLOUD_HEIGHT = 260; //высота облака со статистикой
var CLOUD_X = 100; //координата по Х верхнего левого угла облака со статистикой
var CLOUD_Y = 20; //координата по У верхнего левого угла облака со статистикой
var GAP = 10; //отступ
var TEXT_HEIGHT = 15;
var BAR_WIDTH = 50; //ширина столбика гистограммы
var barHeight = CLOUD_HEIGHT - GAP -  (TEXT_HEIGHT + GAP) * 4; //высота самого большого столбика гистограммы

var renderCloud = function (ctx, x, y, color) { //выводит текст цвета color и рисует прямоугольник
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

var getMaxElement = function (arr) {//ищет max массива и возвращает максимальный элемент
   if (arr.length === 0) {//если массив пустой, возвращает 0
     return 0;
   }

  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var compareArrays = function () { //сравнивает 2 массива. делает их одинаковой длины
  if (players.length === times.length) {
    return;
  }

  if (players.length > times.length) {
    players = players.slice(0, times.length)
  } else {
    times = times.slice(0, players.length)
  }
  console.log(players, times);
}

var getXForBarAndText = function (countPlayers, currentNumberPlayer) { //получает коорд. X столбца диаграммы при равномерном их распределении по ширине
  return (CLOUD_X + (CLOUD_WIDTH / countPlayers * currentNumberPlayer) + (CLOUD_WIDTH / countPlayers / 2 - BAR_WIDTH / 2));
}

function getRgb(r, g, b) { //получает строку 'rgb()' с округленными к меньшему целому значениями r, g, b
  r = Math.floor(r);
  g = Math.floor(g);
  b = Math.floor(b);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

var getColorforBar = function (namePlayer) {//выводит столбик диаграммы с именем Вы красного цвета, остальные - случайных синие цветов
  if (namePlayer === 'Вы') {
    return 'red';
  }
  return getRgb(
    Math.random() * 51,//случайное число от 0 до 51 (Math.random() - случайное от 0 до 1)
    Math.random() * (102 - 51) + 51,
    Math.random() * (255 - 102) + 102
  );
}

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.5)'); //тень облака со статистикой
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff'); //облако со статистикой

  ctx.fillStyle = '#000'; //цвет текста
  ctx.fillText ('Ура, вы победили!',
    CLOUD_X + GAP,
    CLOUD_Y + GAP + TEXT_HEIGHT
  );

  ctx.fillStyle = '#000'; //цвет текста
  ctx.fillText ('Список результатов:',
    CLOUD_X + GAP,
    CLOUD_Y + (GAP + TEXT_HEIGHT) * 2
  );

  var maxTime = getMaxElement(times);

  console.log(players, times); //временно, для отладки

  for (var i = 0; i < players.length; i++) { //выводит имя i-го игрока с координатой Х getXForBarAndText(players.length, i)
    ctx.fillStyle = '#000'; //цвет имени игрока
    ctx.fillText (players[i], getXForBarAndText(players.length, i),
      // CLOUD_X + GAP + (BAR_WIDTH + GAP) * i,
      CLOUD_Y + GAP + (TEXT_HEIGHT + GAP) * 3 + barHeight + GAP
    );

    var differenceHeightMaxBarEndBar = (barHeight - (barHeight * times[i]) / maxTime); //считает, на сколько столбец меньше максимального столбца

    ctx.fillStyle = getColorforBar(players[i]);
    ctx.fillRect(
      getXForBarAndText(players.length, i),
      // CLOUD_X + GAP + (BAR_WIDTH + GAP) * i,
      CLOUD_Y + (TEXT_HEIGHT + GAP) * 3 + differenceHeightMaxBarEndBar,
      BAR_WIDTH,
      (barHeight * times[i]) / maxTime);

    ctx.fillStyle = '#000'; //цвет времени прохождения игры
    ctx.fillText(
      // Math.round(times[i] / 1000) + ' c',
      ((times[i] / 1000).toFixed(1)) + ' c',//переводит милисекунды в секунды и округляет до 1 десятичного знака
      getXForBarAndText(times.length, i),
      CLOUD_Y + GAP *2 + (TEXT_HEIGHT + GAP) * 2 + differenceHeightMaxBarEndBar);
  }
};



