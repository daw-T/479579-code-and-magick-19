'use strict';

var CLOUD_WIDTH = 420; //ширина облака со статистикой
var CLOUD_HEIGHT = 270; //высота облака со статистикой
var CLOUD_X = 100; //координата по Х верхнего левого угла облака со статистикой
var CLOUD_Y = 10; //координата по У верхнего левого угла облака со статистикой
var GAP = 10; //отступ
var GAP_BETWEEN_BAR = 50; //отступ между колонками
var TEXT_HEIGHT = 15;
var BAR_WIDTH = 40; //ширина столбика гистограммы
var BAR_HEIGHT = 150; //высота самого большого столбика гистограммы

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
}

function getHsl(h, s, l) { //получает строку 'hsl()' с округленными к меньшему целому значениями h, s, l
  h = Math.floor(h);
  s = Math.floor(s);
  l = Math.floor(l);
  return 'hsl(' + h + ',' + s + '%' + ',' + l + '%' + ')';
}

var getColorforBar = function (namePlayer) {//выводит столбик диаграммы с именем Вы красного цвета, остальные - случайных синиx цветов
  if (namePlayer === 'Вы') {
    return 'rgb(255, 0, 0)';
  }
  return getHsl(
    Math.random() * (300 - 180) + 180,//случайное число от 180 до 300 (Math.random() - случайное от 0 до 1)
    Math.random() * (100 - 50) + 50,
    50
  );
}

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)'); //тень облака со статистикой
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff'); //облако со статистикой

  ctx.fillStyle = '#000'; //цвет текста
  ctx.fillText('Ура, вы победили!',
    CLOUD_X + GAP,
    CLOUD_Y + GAP + TEXT_HEIGHT
  );

  ctx.fillStyle = '#000'; //цвет текста
  ctx.fillText('Список результатов:',
    CLOUD_X + GAP,
    CLOUD_Y + (GAP + TEXT_HEIGHT) * 2
  );

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000'; //цвет имени игрока
    ctx.fillText(players[i],
      CLOUD_X + GAP_BETWEEN_BAR + (BAR_WIDTH + GAP_BETWEEN_BAR) * i,
      CLOUD_Y + GAP + (TEXT_HEIGHT + GAP) * 3 + BAR_HEIGHT + GAP);

    var differenceHeightMaxBarEndBar = (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime); //считает, на сколько столбец меньше максимального столбца

    ctx.fillStyle = getColorforBar(players[i]);
    ctx.fillRect(
      CLOUD_X + GAP_BETWEEN_BAR + (BAR_WIDTH + GAP_BETWEEN_BAR) * i,
      CLOUD_Y + (TEXT_HEIGHT + GAP) * 3 + differenceHeightMaxBarEndBar,
      BAR_WIDTH,
      (BAR_HEIGHT * times[i]) / maxTime);

    ctx.fillStyle = '#000'; //цвет времени прохождения игры
    ctx.fillText(
      Math.round(times[i]),
      CLOUD_X + GAP_BETWEEN_BAR + (BAR_WIDTH + GAP_BETWEEN_BAR) * i,
      CLOUD_Y + GAP * 2 + (TEXT_HEIGHT + GAP) * 2 + differenceHeightMaxBarEndBar);
  }
};
