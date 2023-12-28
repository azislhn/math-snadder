class HistoryScene extends Phaser.Scene {
  constructor () {
    super({ key: 'HistoryScene' });
  }

  init (data) {
    this.dataList = database.ref('score');
  }

  preload () {

  }

  create () {
    const bg = this.add.sprite(0, 0, 'background');
    bg.setOrigin(0);

    const box = this.add.sprite(config.width / 2, config.height / 2, 'pick-menu');

    const title = this.add.text(
      box.x,
      box.y / 2,
      'Win History',
      { ...FONT_STYLE, fontSize: '48px' }
    ).setOrigin(0.5);

    this.dataList.on('value', (snapshot) => {
      const dataList = snapshot.val();
      const arrays = Object.entries(dataList);
      arrays.map((arr, i) => {
        console.log(arr);
        this.add.text(box.x / 2, box.y + i * 100, arr, { ...FONT_STYLE });
      })
    });

    // this.dataList.map((log, i) => {
    //   const name = log.winner;
    //   const date = log.startDate;
    //   const moves = log.movementTotal;
    //   const container = this.add.container(box.x / 2 - 50, box.y + i * 100 - 150);

    //   const t1 = this.add.text(0, 0, date, { ...FONT_STYLE, fontSize: '20px' });
    //   const t2 = this.add.text(0, -30, `${name} wins in ${moves} moves`, { ...FONT_STYLE, fontSize: '24px' });
    //   container.add([t1, t2]);
    // });

    // console.log(this.data);

    const close = this.add.sprite(box.x + 10 + box.width / 2, box.y - 10 - box.height / 2, 'close');
    close.setScale(0.5);
    close.setInteractive({ cursor: 'pointer' });
    close.on('pointerup', () => {
      this.scene.start('MainMenuScene');
    });
  }
}