const createBoard = (scene, size, offset) => {
  const width = config.width - offset;
  const tileSize = width / size;
  const tileList = [];
  // const tileNumber = [];
  let counter = 1;

  for (let i = size - 1; i >= 0; i--) {
    const isEven = size % 2 === 0 ? true : false;
    const isReverse = isEven ? (i % 2 === 0 ? true : false) : (i % 2 === 0 ? false : true);

    for (let j = 0; j < size; j++) {
      const x = isReverse ? (size - j - 1) * tileSize : j * tileSize;
      const y = i * tileSize;

      const color = counter % 2 == 0 ? 0x808080 : 0xffffff;
      const tile = scene.add.rectangle(x, y, tileSize, tileSize, color).setOrigin(0);
      tile.setAlpha(0)
      tile.setName(counter);
      tileList.push(tile);

      // const fontSize = tileSize * 0.2;
      // const text = scene.add.text(x + fontSize, y + fontSize, counter.toString(), { fontSize: `${fontSize}px`, fill: '#000', fontStyle: 'bold' });
      // tileNumber.push(text);
      // text.bringToTop()
      counter++;
    }
  }

  return { tileList };
};

const createSnakeAndLadder = (scene, board, snakeAndLadderArray = []) => {
  let datas = [];

  if (snakeAndLadderArray.length) {
    // let index = snakeAndLadderArray.length - 1;
    snakeAndLadderArray.map((data, i) => {
      const startIndex = board[data.from - 1];
      const endIndex = board[data.to - 1];
      // const color = data.type === 'snake' ? '#f00' : (data.type === 'ladder' ? '#0f0' : null);

      startIndex.setData({ moveTo: endIndex.name });

      // const text = scene.add.text(startIndex.x + 10, startIndex.y + 10, `to ${endIndex.name}`, { fontSize: '20px', fill: color, fontStyle: 'bold' });
      datas.push(startIndex);
    });
  } else {
    console.warn('Snakes and Ladders failed to load');
  };

  return datas;
};

const createPlayer = (scene, board, color, sprite) => {
  const initPosition = board[0];
  const initX = initPosition.x + initPosition.width / 2;
  const initY = initPosition.y + initPosition.height / 2;

  const pawn = scene.add.circle(initX, initY, initPosition.width / 5, color.key);
  pawn.setStrokeStyle(2, 0xffffff)
  pawn.setName(color.name);
  pawn.setData({ name: color.name, position: initPosition.name, movementTotal: 0 });

  return pawn;
};

class InGameScene extends Phaser.Scene {
  constructor () {
    super("InGameScene");
  }

  init (data) {
    const date = new Date();
    this.locale = date.toLocaleDateString('id-ID');
    this.time = {
      hours: date.getHours(),
      minutes: date.getMinutes()
    };

    this.numPlayers = data.option || 2;
    this.playerColors = [
      { name: 'Red', key: 0xff0000 },
      { name: 'Green', key: 0x00ff00 },
      { name: 'Blue', key: 0x0000ff },
      { name: 'Yellow', key: 0xffff00 }
    ];
    this.boardSize = 6;
    this.snakesAndLadders = [
      { type: 'snake', from: 11, to: 3 },
      { type: 'snake', from: 22, to: 18 },
      { type: 'snake', from: 35, to: 27 },
      { type: 'ladder', from: 8, to: 16 },
      { type: 'ladder', from: 13, to: 24 },
      { type: 'ladder', from: 29, to: 32 },
    ];
  }

  preload () {
    this.load.image("dice-albedo", "/math-snadder/js/elements/dice-albedo.png");
    this.load.obj("dice-obj", "/math-snadder/js/elements/dice.obj");
    this.load.image("correct-alert", "/math-snadder/img/alert-correct.webp");
    this.load.image("wrong-alert", "/math-snadder/img/alert-wrong.webp");
  }

  create () {
    this.cameras.main.setBackgroundColor('#000');
    this.add.image(0, 0, 'forest-board').setOrigin(0);
    this.add.text(20, this.game.config.height - 40, `ID: ${uid}`, { fontSize: '20px', fill: '#fff', fontStyle: 'bold' });
    this.playerIndex = 0;
    this.diceValue = 1;

    const offset = 50;
    const boardContainer = this.add.container(offset / 2, 100);
    this.playerContainer = this.add.container(offset / 2, 100);

    this.board = createBoard(this, this.boardSize, offset);
    boardContainer.add(this.board.tileList);
    // boardContainer.add(this.board.tileNumber);

    const snakesAndLadders = createSnakeAndLadder(this, this.board.tileList, this.snakesAndLadders);
    boardContainer.add(snakesAndLadders);

    this.players = [];
    for (let i = 0; i < this.numPlayers; i++) {
      const player = createPlayer(this, this.board.tileList, this.playerColors[i]);
      console.log(player.data.list);
      this.players.push(player);

      this.updateStorage(player.name, player.getData('position'), player.getData('movementTotal'));
    }
    this.playerContainer.add(this.players);
    this.playerContainer.bringToTop(this.players[this.playerIndex]);

    this.helperText = this.add.text(
      this.game.config.width / 2,
      this.game.config.height - 100,
      `${this.players[this.playerIndex].name}'s Turn`,
      { ...FONT_STYLE, fill: "#fff", fontSize: "24px" }
    ).setOrigin(0.5);

    const dice = createDice(config.width / 2, config.height - 200, this, 1000);
    // Dice hit area
    this.diceArea = this.add.rectangle(config.width / 2, config.height - 200, 100, 100, 0xffffff, 0);
    this.diceArea.setInteractive();
    this.diceArea.on('pointerup', () => {
      dice((value) => {
        this.diceValue = value;
        setTimeout(() => {
          this.checkQuest(this.players[this.playerIndex], this.diceValue);
          // this.scene.pause(this);
          // this.scene.launch('QuestionScene');
        }, 500);
      });
    });

    this.events.on('resume', (scene, data) => {
      if (data) {
        this.updatePlayer(this.players[this.playerIndex], this.diceValue);
      } else {
        this.updatePlayer(this.players[this.playerIndex], null);
      }
    });
  }

  checkQuest (target, diceValue) {
    const position = target.getData('position');
    const finish = this.boardSize * this.boardSize;

    if (position + diceValue <= finish && diceValue !== null) {
      this.scene.pause(this);
      this.scene.launch('QuestionScene');
    } else {
      this.updateIndex();
    }
  }

  updatePlayer (target, diceValue) {
    this.helperText.setAlpha(0);
    this.diceArea.removeInteractive();

    const position = target.getData('position');
    const finish = this.boardSize * this.boardSize;

    if (position + diceValue <= finish && diceValue !== null) {
      this.movePlayer(target, position, diceValue, this.board.tileList);
    } else {
      this.updateIndex();
    }
  }

  movePlayer (target, position, steps, tiles) {
    const tile = tiles[position];
    this.tweens.add({
      targets: target,
      x: tile.x + tile.width / 2,
      y: tile.y + tile.width / 2,
      ease: 'Linear',
      duration: 300,
      onComplete: () => {
        steps--;
        target.setData('position', tile.name);
        if (steps > 0) {
          position++;
          this.movePlayer(target, position, steps, tiles);
        } else {
          if (tile.getData('moveTo')) {
            const moveTo = tile.getData('moveTo');
            setTimeout(() => {
              this.forceMove(target, moveTo, tiles);
            }, 500);
          } else {
            const moveTotal = target.getData('movementTotal') + 1;
            target.setData('movementTotal', moveTotal);
            this.updateStorage(target.name, target.getData('position'), target.getData('movementTotal'));

            const currentPosition = target.getData('position');
            if (currentPosition >= this.boardSize * this.boardSize) {
              this.winCondition(target);
              return;
            }

            this.updateIndex();
          }
        }
      }
    });
  }

  forceMove (target, position, tiles) {
    const tile = tiles[position - 1];
    this.tweens.add({
      targets: target,
      x: tile.x + tile.width / 2,
      y: tile.y + tile.width / 2,
      ease: 'Linear',
      duration: 300,
      onComplete: () => {
        target.setData('position', tile.name);
        const moveTotal = target.getData('movementTotal') + 1;
        target.setData('movementTotal', moveTotal);
        this.updateStorage(target.name, target.getData('position'), target.getData('movementTotal'));
        this.updateIndex();
      }
    });
  }

  updateIndex () {
    this.playerIndex = (this.playerIndex + 1) % this.numPlayers;

    setTimeout(() => {
      this.helperText.setText(`${this.players[this.playerIndex].name}'s Turn`).setAlpha(1);
      this.playerContainer.bringToTop(this.players[this.playerIndex]);
      this.diceArea.setInteractive();
    }, 500);
  }

  updateStorage (playerName, position, movementTotal) {
    const json = { name: playerName, position, movementTotal };
    window.localStorage.setItem(playerName, JSON.stringify(json));
  }

  winCondition (player) {
    const data = {
      winner: player.name,
      movementTotal: player.getData('movementTotal'),
      startDate: `${this.locale} ${this.time.hours}:${this.time.minutes}`
    };
    historyData.push(data);
    window.localStorage.setItem('game-log', JSON.stringify(historyData));

    // Implementasi tampilan pesan kemenangan (misalnya, tampilkan pesan di layar)
    this.helperText.setText(`${this.players[this.playerIndex].name} Win`);

    setTimeout(() => {
      this.scene.stop(this);
      this.scene.start('MainMenuScene');
    }, 2000);
  }
}
