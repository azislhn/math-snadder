const closeButton = (scene, x, y, container) => {
  const close = scene.add.sprite(x, y, 'close');
  close.setScale(0.5);

  close.setInteractive({ cursor: 'pointer' });
  close.on('pointerup', () => {
    scene.tweens.add({
      targets: container,
      y: -500,
      duration: 500,
      ease: 'Cubic.easeIn',
      onComplete: () => {
        scene.scene.stop(scene);
        scene.scene.resume('MainMenuScene');
      }
    });
  });

  return close;
};

class PickPlayerMenu extends Phaser.Scene {
  constructor () {
    super({ key: 'PickPlayerMenu' });
  }

  init () {
    this.options = [2, 3, 4];
    this.playerColors = [
      { name: 'Red', key: 0xff0000 },
      { name: 'Green', key: 0x00ff00 },
      { name: 'Blue', key: 0x0000ff },
      { name: 'Yellow', key: 0xffff00 }
    ];
    // this.boards = ['forest-board', 'space-board'];
    this.boardTheme = 'forest-board';
  }

  create () {
    const container = this.add.container(config.width / 2, -500);

    const bg = this.add.sprite(0, 0, 'pick-menu');
    container.add(bg);

    const board1 = this.boardOption(bg.x - 120, -200, 'forest-img');
    const board2 = this.boardOption(bg.x + 120, -200, 'space-img');
    board1[1].on('pointerup', () => {
      this.updateView(board1[0], board2[0], 'forest-board');
      // console.log(this.boardTheme);
    });
    board2[1].on('pointerup', () => {
      this.updateView(board2[0], board1[0], 'space-board');
      // console.log(this.boardTheme);
    });
    container.add(board1);
    container.add(board2);

    this.options.map((option, index) => {
      const btnX = bg.x;
      const btnY = bg.y + 50 + index * 120;
      const btnWidth = 500;
      const btnHeight = 100;

      const btn = this.add.rectangle(btnX, btnY, btnWidth, btnHeight, COLORS.white, 0);
      btn.setInteractive({ cursor: 'pointer' });
      btn.on('pointerover', () => {
        btn.fillAlpha = 0.2;
      });
      btn.on('pointerout', () => {
        btn.fillAlpha = 0;
      });
      btn.on('pointerup', () => {
        this.scene.start('InGameScene', { theme: this.boardTheme, option: option, playerColors: this.playerColors.slice(0, option) });
      });

      const numText = this.add.text(
        btnX - btnWidth / 2 + 100,
        btnY,
        `${option} players`,
        { ...FONT_STYLE }
      ).setOrigin(0.5);

      container.add([btn, numText]);

      // this.playerPawn(option, bg.x, bg.y);
      for (let i = 0; i < option; i++) {
        const color = this.playerColors[i].key;
        const cX = btnX;
        const pawn = this.add.circle(cX + i * 60, btnY, 20, color);
        pawn.setStrokeStyle(2, 0xffffff);
        container.add(pawn);
      }
    });

    const close = closeButton(this, bg.x + 10 + bg.width / 2, bg.y - 10 - bg.height / 2, container);
    container.add(close);

    this.tweens.add({
      targets: container,
      y: config.height / 2,
      duration: 700,
      ease: 'Cubic.easeOut'
    });
  }

  boardOption (x, y, theme) {
    const stroke = this.add.rectangle(x, y, 200, 300, 0x000000);
    const img = this.add.image(x, y, theme);
    img.setInteractive({ cursor: 'pointer' });
    return [stroke, img];
  }

  updateView (targetTrue, targetFalse, theme) {
    this.boardTheme = theme;
    targetTrue.setStrokeStyle(5, COLORS.white);
    targetFalse.isStroked = false;

  }
}