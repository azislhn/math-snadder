const closeButton = (scene, x, y, container) => {
  const close = scene.add.sprite(x, y, 'close');
  close.setScale(0.1);

  close.setInteractive({ cursor: 'pointer' });
  close.on('pointerup', () => {
    scene.tweens.add({
      targets: container,
      y: -500,
      duration: 700,
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
  }

  create () {
    const container = this.add.container(config.width / 2, -500);

    const bg = this.add.sprite(0, 0, 'pick-menu');
    const title = this.add.text(0, -200, 'How many players?', { ...FONT_STYLE, fontSize: '40px' });
    title.setOrigin(0.5);

    container.add([bg, title]);

    this.options.map((option, index) => {
      const btnX = bg.x;
      const btnY = bg.y - 100 + index * 150;
      const btnWidth = 400;
      const btnHeight = 100;

      const btn = this.add.rectangle(btnX, btnY, btnWidth, btnHeight, colors.white, 0);
      btn.setInteractive({ cursor: 'pointer' });
      btn.on('pointerover', () => {
        btn.fillAlpha = 0.2;
      });
      btn.on('pointerout', () => {
        btn.fillAlpha = 0;
      });
      btn.on('pointerup', () => {
        this.scene.start('InGameScene', { option: option, playerColors: this.playerColors });
      });

      const numText = this.add.text(
        btnX - btnWidth / 2 + 80,
        btnY,
        option,
        { ...FONT_STYLE, fontSize: '40px' }
      ).setOrigin(0.5);

      container.add([btn, numText]);

      // this.playerPawn(option, bg.x, bg.y);
      for (let i = 0; i < option; i++) {
        const color = this.playerColors[i].key;
        const cX = btnX - 50;
        const pawn = this.add.circle(cX + i * 60, btnY, 20, color);
        pawn.setStrokeStyle(2, 0xffffff);
        container.add(pawn);
      }
    });

    const close = closeButton(this, bg.x + bg.width / 2, bg.y - bg.height / 2, container);
    container.add(close);

    this.tweens.add({
      targets: container,
      y: config.height / 2,
      duration: 700,
      ease: 'Cubic.easeOut'
    });
  }
}