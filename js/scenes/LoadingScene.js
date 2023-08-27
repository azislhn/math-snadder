class LoadingScene extends Phaser.Scene {
  constructor () {
    super({ key: 'LoadingScene' });
  }

  preload () {
    this.load.on('fileprogress', (file, value) => {
      console.log('loading');
    });
    this.load.on('complete', () => {
      // All assets are loaded, transition to the next scene
      this.scene.start('MainMenuScene');
    });
  }
}