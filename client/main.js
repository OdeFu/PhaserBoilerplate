Game = null;

const getViewportSize = () => {
  // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
  if (typeof window.innerWidth !== 'undefined') {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
  // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
  else if (typeof document.documentElement !== 'undefined' &&
           typeof document.documentElement.clientWidth !== 'undefined' && document.documentElement.clientWidth !== 0) {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    };
  }

  // older versions of IE
  const body = document.getElementsByTagName('body')[0];
  return {
    width: body.clientWidth,
    height: body.clientHeight
  };
};

const resize = () => {
  const viewportSize = getViewportSize();
  Game.width = viewportSize.width;
  Game.height = viewportSize.height;
  Game.stage.bounds.width = viewportSize.width;
  Game.stage.bounds.height = viewportSize.height;

  if (Game.renderType === Phaser.WEBGL) {
    Game.renderer.resize(viewportSize.width, viewportSize.height);
  }
};

const loadGame = () => {
  const viewportSize = getViewportSize();
  Game = new Phaser.Game(viewportSize.width, viewportSize.height, Phaser.AUTO);

  window.onresize = resize;
};

Meteor.startup(function () {
  $('body').addClass('mainWindow');

  loadGame();
});
