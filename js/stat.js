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

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
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

window.renderStatistics = function (ctx, players, times) {
  var comparesArrays = function () {
    if (players.length === times.length) {
      return;
    }

    if (players.length > times.length) {
      players = players.slice(0, times.length);
    } else {
      times = times.slice(0, players.length);
    }
  };

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.fillText('Ура, вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP + TEXT_HEIGHT);

  ctx.fillStyle = '#000';
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + (GAP + TEXT_HEIGHT) * 2);

  comparesArrays();

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + GAP_BETWEEN_BAR + (BAR_WIDTH + GAP_BETWEEN_BAR) * i, CLOUD_Y + GAP + (TEXT_HEIGHT + GAP) * 3 + BAR_HEIGHT + GAP);

    var differenceHeightMaxBarEndBar = (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime);

    ctx.fillStyle = getColorforBar(players[i]);
    ctx.fillRect(CLOUD_X + GAP_BETWEEN_BAR + (BAR_WIDTH + GAP_BETWEEN_BAR) * i, CLOUD_Y + (TEXT_HEIGHT + GAP) * 3 + differenceHeightMaxBarEndBar, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);

    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP_BETWEEN_BAR + (BAR_WIDTH + GAP_BETWEEN_BAR) * i, CLOUD_Y + GAP * 2 + (TEXT_HEIGHT + GAP) * 2 + differenceHeightMaxBarEndBar);
  }
};
