class HistoryMenu extends Phaser.Scene {
  constructor () {
    super({ key: 'HistoryMenu' });
  }

  init (data) {
    this.dataList = data.reverse();
  }

  create () {
    const bg = this.add.sprite(0, 0, 'background');
    bg.setOrigin(0);

    const box = this.add.rectangle(config.width / 2, config.height / 2, 600, 800, 0x000000);
    box.setAlpha(0.8);

    const title = this.add.text(
      box.x,
      box.y / 2,
      'Win History',
      { ...FONT_STYLE, fontSize: '48px' }
    ).setOrigin(0.5);

    this.dataList.map((log, i) => {
      const name = log.winner;
      const date = log.startDate;
      const moves = log.movementTotal;
      const container = this.add.container(box.x / 2 - 50, box.y + i * 100 - 150);

      const t1 = this.add.text(0, 0, date, { ...FONT_STYLE, fontSize: '20px' });
      const t2 = this.add.text(0, -30, `${name} wins in ${moves} moves`, { ...FONT_STYLE, fontSize: '24px' });
      container.add([t1, t2]);
    });

    console.log(this.data);

    const close = this.add.sprite(box.x + box.width / 2, box.y - box.height / 2, 'close');
    close.setScale(0.1);
    close.setInteractive({ cursor: 'pointer' })
    close.on('pointerup', () => {
      this.scene.start('MainMenuScene');
    });
  }
}