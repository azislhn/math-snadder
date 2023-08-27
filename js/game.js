var FONT_FAMILY = 'Verdana, "Times New Roman", Tahoma, serif'; // Replace with your desired font family
var FONT_SIZE = '32px'; // Replace with your desired font size
var FONT_STYLE = {
  fontFamily: FONT_FAMILY,
  fontSize: FONT_SIZE,
  fill: '#fff',
  fontStyle: 'bold'
};

var colors = {
  black: 0x000000,
  white: 0xffffff,
  gray: 0x808080
};

// var uid = new Date().getTime();

var historyData = []
var logs = localStorage.getItem('game-log');

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 1200,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: 0x000000,
  scene: [MainMenuScene, PickPlayerMenu, HistoryScene, HowtoPlayMenu, InGameScene, QuestionMenu],
  // scene: [InGameScene, QuestionScene]
};

var game = new Phaser.Game(config);