class HowtoPlayMenu extends Phaser.Scene {
  constructor () {
    super({ key: 'HowtoPlayMenu' });
  }

  create () {
    const bg = this.add.rectangle(0, 0, 600, 800, 0xffffff);

    bg.setInteractive();
    bg.on('pointerup', () => {
      this.scene.stop(this);
      this.scene.resume('MainMenuScene');
    });
  }
}