'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var GAP_BETWEEN_BAR = 50;
var TEXT_HEIGHT = 15;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;

var renderCloud = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height, color);
};

var renderText = function (ctx, text, x, y, color, font) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) {
  if (arr.length === 0) {
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

function getHsl(h, s, l) {
  h = Math.floor(h);
  s = Math.floor(s);
  l = Math.floor(l);
  return 'hsl(' + h + ',' + s + '%' + ',' + l + '%' + ')';
}

var getColorforBar = function (namePlayer) {
  if (namePlayer === 'Вы') {
    return 'rgb(255, 0, 0)';
  }
  return getHsl(Math.random() * (250 - 180) + 180, Math.random() * (100 - 50) + 50, 50);
};

var renderBar = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height, color);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#fff');

  renderText(ctx, 'Ура, вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP + TEXT_HEIGHT, '#000', '16px PT Mono');
  renderText(ctx, 'Список результатов:', CLOUD_X + GAP, CLOUD_Y + (GAP + TEXT_HEIGHT) * 2, '#000', '16px PT Mono');

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    renderText(ctx, names[i], CLOUD_X + GAP_BETWEEN_BAR + (BAR_WIDTH + GAP_BETWEEN_BAR) * i, CLOUD_Y + GAP + (TEXT_HEIGHT + GAP) * 3 + BAR_HEIGHT + GAP, '#000', '16px PT Mono');

    var differenceHeightMaxBarEndBar = (BAR_HEIGHT - BAR_HEIGHT * times[i] / maxTime);

    renderBar(ctx, CLOUD_X + GAP_BETWEEN_BAR + (BAR_WIDTH + GAP_BETWEEN_BAR) * i, CLOUD_Y + (TEXT_HEIGHT + GAP) * 3 + differenceHeightMaxBarEndBar, BAR_WIDTH, BAR_HEIGHT * times[i] / maxTime, getColorforBar(names[i]));
    renderText(ctx, Math.round(times[i]), CLOUD_X + GAP_BETWEEN_BAR + (BAR_WIDTH + GAP_BETWEEN_BAR) * i, CLOUD_Y + GAP * 2 + (TEXT_HEIGHT + GAP) * 2 + differenceHeightMaxBarEndBar, '#000', '16px PT Mono');
  }
};
