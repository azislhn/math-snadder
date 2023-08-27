class Alert extends Phaser.GameObjects.Container {
  constructor (scene, x, y) {
    super(scene, x, y);
    // Make pop-up invisible by default
    this.setVisible(false);
  }

  showCorrect () {
    this.correct = this.scene.add.image(0, 0, 'correct-alert');
    this.add(this.correct);
    this.setVisible(true);
  }

  showWrong () {
    this.wrong = this.scene.add.image(0, 0, 'wrong-alert');
    this.add(this.wrong);
    this.setVisible(true);
  }

  hide () {
    this.setVisible(false);
  }
}

class QuestionMenu extends Phaser.Scene {
  constructor () {
    super({ key: 'QuestionMenu' });
  }

  init () {
    this.nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'CLEAR', 0, 'OK'];
    this.ops = ['/', '*', '+', '-'];
    this.buttons = [];
    this.inputValue = '';
  }

  preload () {
    this.operator = this.ops[Math.floor(Math.random() * this.ops.length)];
    // this.load.image('alert-img', '/')
  }

  create () {
    this.alert = new Alert(this, config.width / 2, config.height / 2);

    const buttonColor = 0xffffff;
    const hoverColor = 0x808080;
    let num1;
    let num2;
    const rendered = this.mathOperation(num1, num2);

    // const bg = this.add.rectangle(this.game.config.width / 2, this.game.config.height / 2, 600, 600, 0xffffff);
    // bg.setStrokeStyle(2, 0x000000);
    const bg = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'question-bg');
    const tileX = bg.x / 2 + 10;
    const tileY = bg.height - 85;

    const questionText = this.add.text(
      bg.x - 260,
      bg.y - 260,
      `${rendered.num1} ${this.operator} ${rendered.num2}`,
      { ...FONT_STYLE, fontSize: '40px' });
    const text = this.add.text(bg.x - 260, bg.y - 200, '= ', { ...FONT_STYLE, fontSize: '40px' });

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        const index = i * 3 + j;
        const x = tileX + (j * 190);
        const y = tileY + (i * 100);
        const tile = this.add.rectangle(x, y, 190, 100, buttonColor);
        const text = this.add.text(x, y, this.nums[index], { fontSize: '24px', fill: '#000', fontStyle: 'bold' }).setOrigin(0.5);
        tile.name = this.nums[index];
        tile.setInteractive();
        tile.on('pointerover', () => {
          tile.fillColor = hoverColor;
        });
        tile.on('pointerout', () => {
          tile.fillColor = buttonColor;
        });
        this.buttons.push(tile);
      }
    }

    this.buttons.forEach((btn) => {
      btn.setInteractive();
      btn.on('pointerup', () => {
        btn.fillColor = buttonColor;
        if (btn.name !== 'CLEAR' && btn.name !== 'OK') {
          this.inputValue += btn.name;
        }
        if (btn.name === 'CLEAR') {
          this.inputValue = '';
        }
        if (btn.name === 'OK') {
          this.scene.pause(this);
          const result = this.inputValue == rendered.result;
          if (result) {
            this.alert.showCorrect();
          } else {
            this.alert.showWrong();
          }
          setTimeout(() => {
            this.scene.resume('InGameScene', result);
            this.scene.stop(this);
          }, 1000);
        }
        this.updateValue(this.inputValue, text);
      });
    });

    // setTimeout(() => {
    //   console.log('clicked', this.scene.isPaused('InGameScene'));
    //   this.scene.stop(this);
    //   this.scene.resume('InGameScene', { num });
    //   console.log('stopped');
    // }, 2000);
    this.add.existing(this.alert);
  }

  mathOperation (num1, num2) {
    let result;
    switch (this.operator) {
      case '/':
        num2 = Math.floor(Math.random() * (20 - 2) + 2);
        do {
          num1 = Math.floor(Math.random() * (100 - 2) + 2);
        } while (num1 % num2 !== 0 || num1 == num2);
        result = num1 / num2;
        break;
      case '*':
        do {
          num1 = Math.floor(Math.random() * (100 - 2) + 2);
          num2 = Math.floor(Math.random() * (100 - 2) + 2);
        } while (num1 * num2 >= 501);
        result = num1 * num2;
        break;
      case '+':
        num1 = Math.floor(Math.random() * (100 - 2) + 2);
        num2 = Math.floor(Math.random() * (100 - 2) + 2);
        result = num1 + num2;
        break;
      case '-':
        num2 = Math.floor(Math.random() * (100 - 2) + 2);
        do {
          num1 = Math.floor(Math.random() * (100 - 2) + 2);
        } while (num1 <= num2);
        result = num1 - num2;
        break;
      default:
        break;
    }
    return { num1, num2, result };
  }

  updateValue (value, text) {
    text.setText(`= ${value}`);
  }

}