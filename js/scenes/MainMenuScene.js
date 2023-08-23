const createMainButton = (scene, x, y, text, callback) => {
  const btnWidth = 500;
  const btnHeight = 100;

  // const btn = scene.add.rectangle(x, y, btnWidth, btnHeight, colors.black);
  const btn = scene.add.sprite(x, y, 'button');
  btn.setScale(0.8, 0.6);
  btn.setInteractive({ cursor: 'pointer' });
  btn.on('pointerdown', () => {
    scene.tweens.add({
      targets: btn,
      scaleX: 0.7,
      scaleY: 0.5,
      duration: 200,
      yoyo: true,
      ease: 'Sine.easeInOut',
      onComplete: callback
    });
  });
  // btn.on('pointerup', callback);

  scene.add.text(
    x,
    y,
    text,
    { ...FONT_STYLE, fill: '#fff' }
  ).setOrigin(0.5);
};

class MainMenuScene extends Phaser.Scene {
  constructor () {
    super({ key: 'MainMenuScene' });
  }

  preload () {
    historyData = [];
    this.logs = localStorage.getItem('game-log');
    if (this.logs) {
      this.historyList = JSON.parse(this.logs);
      this.historyList.map((list, i) => {
        historyData.push(list);
      });
    }
    this.load.image('background', './math-snadder/img/main-bg.jpg');
    this.load.image('close', '/math-snadder/img/icons/cancel.png');
    this.load.image('button', '/math-snadder/img/icons/button.png');
    this.load.image('pick-menu', '/math-snadder/img/pick-bg.png');
    this.load.image('forest-board', '/math-snadder/img/board1.webp');
  }

  create () {
    const bg = this.add.sprite(0, 0, 'background').setOrigin(0);
    // const bg = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0xdddddd).setOrigin(0);

    const title = this.add.text(
      this.game.config.width / 2,
      this.game.config.height / 4,
      'SnadderMath',
      { ...FONT_STYLE, fontSize: '60px' }
    ).setOrigin(0.5).setStroke(0x000000, 5);

    this.tweens.add({
      targets: title,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })

    const btnX = bg.width / 2;
    const initBtnY = bg.height / 2;
    createMainButton(this, btnX, initBtnY - 100, "Play Game", () => {
      this.scene.pause(this);
      this.scene.launch('PickPlayerMenu');
    });
    createMainButton(this, btnX, initBtnY + 75, "Win History", () => {
      // this.scene.pause(this);
      this.scene.start('HistoryMenu', historyData);
    });
    createMainButton(this, btnX, initBtnY + 250, "How to Play", () => {
      this.scene.pause(this);
      this.scene.launch('HowtoPlayMenu');
    });

    this.add.text(20, this.game.config.height - 40, `ID: ${uid}`, { fontSize: '20px', fill: '#fff', fontStyle: 'bold' });
  }
}
