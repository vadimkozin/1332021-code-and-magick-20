'use strict';
(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var SHIFT_SHADOW = 10;
  var GAP = 50;
  var BAR_HEIGHT = 150;
  var BAR_WIDTH = 40;
  var TEXT_HEIGHT = 30;
  var TEXT_GAP = 10;
  var TITLE_LEFT = 20;
  var TITLE_TOP = 30;
  var TITLE_GAP = 20;
  var FONT = '16px PT Mono';
  var COLOR_DEFAULT = '#000';

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  var getColor = function () {
    var saturation = Math.floor(Math.random() * 101); // 0..100
    return 'hsl(240,' + saturation + '%, 40%)';
  };

  window.renderStatistics = function (ctx, players, times) {
    renderCloud(ctx, CLOUD_X + SHIFT_SHADOW, CLOUD_Y + SHIFT_SHADOW, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    ctx.fillStyle = '#000';
    ctx.font = FONT;

    var maxTime = getMaxElement(times);

    for (var i = 0; i < players.length; i++) {

      var barHeight = (BAR_HEIGHT * times[i]) / maxTime;

      ctx.fillStyle = (players[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : getColor();

      ctx.fillRect(
          CLOUD_X + GAP + (GAP + BAR_WIDTH) * i,
          CLOUD_HEIGHT - barHeight - TEXT_HEIGHT,
          BAR_WIDTH,
          barHeight);

      ctx.fillStyle = COLOR_DEFAULT;

      ctx.fillText(String(Math.round(times[i])),
          CLOUD_X + GAP + (GAP + BAR_WIDTH) * i,
          CLOUD_HEIGHT - barHeight - TEXT_HEIGHT - TEXT_GAP);

      ctx.fillText(players[i],
          CLOUD_X + GAP + (GAP + BAR_WIDTH) * i,
          CLOUD_HEIGHT - TEXT_GAP);
    }

    ctx.fillText('Ура вы победили!', CLOUD_X + TITLE_LEFT, CLOUD_Y + TITLE_TOP);
    ctx.fillText('Список результатов:', CLOUD_X + TITLE_LEFT, CLOUD_Y + TITLE_TOP + TITLE_GAP);

  };
})();
