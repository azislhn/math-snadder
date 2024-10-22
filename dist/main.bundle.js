/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game-objects/closeButton.js":
/*!*****************************************!*\
  !*** ./src/game-objects/closeButton.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeButton: () => (/* binding */ closeButton)
/* harmony export */ });
const closeButton = (scene, x, y, callback) => {
  const closeBtn = scene.add.sprite(x, y, 'close-button');
  closeBtn.setScale(0.5);
  closeBtn.setInteractive();
  closeBtn.on('pointerover', () => {
    closeBtn.setScale(0.4);
  });
  closeBtn.on('pointerout', () => {
    closeBtn.setScale(0.5);
  });
  closeBtn.on('pointerup', callback);
  return closeBtn;
};

/***/ }),

/***/ "./src/game-objects/dice.js":
/*!**********************************!*\
  !*** ./src/game-objects/dice.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDice: () => (/* binding */ createDice)
/* harmony export */ });
const createDice = (x, y, scene, duration = 1000) => {

  let diceIsRolling = false;

  const dice = scene.add.mesh(x, y, "dice-albedo").setScale(0.4);
  const shadowFX = dice.postFX.addShadow(0, 0, 0.006, 2, 0x111111, 10, .8);

  dice.addVerticesFromObj("dice-obj", 0.25);
  dice.panZ(6);

  dice.modelRotation.x = Phaser.Math.DegToRad(0);
  dice.modelRotation.y = Phaser.Math.DegToRad(-90);

  return (callback) => {
    if (!diceIsRolling) {
      diceIsRolling = true;
      const diceRoll = Phaser.Math.Between(1, 6);

      // Shadow
      scene.add.tween({
        targets: shadowFX,
        x: -8,
        y: 10,
        duration: duration - 250,
        ease: "Sine.easeInOut",
        yoyo: true,
      });

      scene.add.tween({
        targets: dice,
        from: 0,
        to: 1,
        duration: duration,
        onUpdate: () => {
          dice.modelRotation.x -= .02;
          dice.modelRotation.y -= .08;
        },
        onComplete: () => {
          switch (diceRoll) {
            case 1:
              dice.modelRotation.x = Phaser.Math.DegToRad(0);
              dice.modelRotation.y = Phaser.Math.DegToRad(-90);
              break;
            case 2:
              dice.modelRotation.x = Phaser.Math.DegToRad(90);
              dice.modelRotation.y = Phaser.Math.DegToRad(0);
              break;
            case 3:
              dice.modelRotation.x = Phaser.Math.DegToRad(180);
              dice.modelRotation.y = Phaser.Math.DegToRad(0);
              break;
            case 4:
              dice.modelRotation.x = Phaser.Math.DegToRad(180);
              dice.modelRotation.y = Phaser.Math.DegToRad(180);
              break;
            case 5:
              dice.modelRotation.x = Phaser.Math.DegToRad(-90);
              dice.modelRotation.y = Phaser.Math.DegToRad(0);
              break;
            case 6:
              dice.modelRotation.x = Phaser.Math.DegToRad(0);
              dice.modelRotation.y = Phaser.Math.DegToRad(90);
              break;
          }
        },
        ease: "Sine.easeInOut",
      });

      // Intro dice
      scene.add.tween({
        targets: [dice],
        scale: 0.6,
        duration: duration - duration / 2,
        yoyo: true,
        ease: Phaser.Math.Easing.Quadratic.InOut,
        onComplete: () => {
          dice.scale = 0.4;
          if (callback !== undefined) {
            diceIsRolling = false;
            callback(diceRoll);
          }
        }
      });
    } else {
      console.log("Is rolling");
    }
  };

};

/***/ }),

/***/ "./src/game-objects/loader.js":
/*!************************************!*\
  !*** ./src/game-objects/loader.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadingAssets: () => (/* binding */ loadingAssets)
/* harmony export */ });
/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main.js */ "./src/main.js");


const loadingAssets = (scene, value) => {
  scene.add.rectangle(0, 0, scene.cameras.main.width, scene.cameras.main.height, 0x000000).setOrigin(0);
  const text = value? `Loading... ${Math.floor(value * 100)}%` : 'Loading...';
  scene.add.text(
    scene.cameras.main.width / 2,
    scene.cameras.main.height / 2,
    text,
    { ..._main_js__WEBPACK_IMPORTED_MODULE_0__.FONT_STYLE }
  ).setOrigin(0.5);
};

/***/ }),

/***/ "./src/game-objects/winPopup.js":
/*!**************************************!*\
  !*** ./src/game-objects/winPopup.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   winPopup: () => (/* binding */ winPopup)
/* harmony export */ });
const winPopup = (scene, winner) => {
  const HEX = {
    Red: ['#ff0000', '#fff'],
    Green: ['#00ff00', '#000'],
    Blue: ['#0000ff', '#fff'],
    Yellow: ['#ffff00', '#000'],
  };
  const container = scene.add.container(scene.game.config.width / 2, scene.game.config.height + 100);
  const winnerBg = scene.add.image(0, 0, 'winner-alert');
  const winnerText = scene.add.text(0, -30, winner.name, {
    fontFamily: 'RedHands',
    fontSize: '64px',
    fill: HEX[winner.name][0],
    stroke: HEX[winner.name][1],
    strokeThickness: 4,
  }).setOrigin(0.5);

  container.add([winnerBg, winnerText]);

  scene.tweens.add({
    targets: container,
    y: scene.game.config.height / 2 - 100,
    duration: 700,
    ease: 'Cubic.easeOut'
  });
};

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FONT_STYLE: () => (/* binding */ FONT_STYLE),
/* harmony export */   GAME_CONFIG: () => (/* binding */ GAME_CONFIG),
/* harmony export */   game: () => (/* binding */ game)
/* harmony export */ });
/* harmony import */ var _scenes_LoadingScene_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scenes/LoadingScene.js */ "./src/scenes/LoadingScene.js");
/* harmony import */ var _scenes_MainMenuScene_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scenes/MainMenuScene.js */ "./src/scenes/MainMenuScene.js");
/* harmony import */ var _scenes_HowToPlayScene_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scenes/HowToPlayScene.js */ "./src/scenes/HowToPlayScene.js");
/* harmony import */ var _scenes_GameplayScene_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scenes/GameplayScene.js */ "./src/scenes/GameplayScene.js");
/* harmony import */ var _scenes_PickPlayerMenu_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scenes/PickPlayerMenu.js */ "./src/scenes/PickPlayerMenu.js");
/* harmony import */ var _scenes_QuestionMenu_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scenes/QuestionMenu.js */ "./src/scenes/QuestionMenu.js");







const firebaseConfig = {
  apiKey: "AIzaSyDPsMuvwFXBdS5qJOTXr1WTgiOxIsTZTwM",
  authDomain: "snadder-math.firebaseapp.com",
  databaseURL: "https://snadder-math-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "snadder-math",
  storageBucket: "snadder-math.appspot.com",
  messagingSenderId: "871830286434",
  appId: "1:871830286434:web:8f9c12ac160cc7edcd213b",
  measurementId: "G-HLH4MBM73F"
};

firebase.initializeApp(firebaseConfig);

const GAME_CONFIG = {
  type: Phaser.AUTO,
  width: 800,
  height: 1200,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: 0x3A5367,
  scene: [_scenes_LoadingScene_js__WEBPACK_IMPORTED_MODULE_0__["default"], _scenes_MainMenuScene_js__WEBPACK_IMPORTED_MODULE_1__["default"], _scenes_HowToPlayScene_js__WEBPACK_IMPORTED_MODULE_2__["default"], _scenes_GameplayScene_js__WEBPACK_IMPORTED_MODULE_3__["default"], _scenes_PickPlayerMenu_js__WEBPACK_IMPORTED_MODULE_4__["default"], _scenes_QuestionMenu_js__WEBPACK_IMPORTED_MODULE_5__["default"]],
};

const FONT_STYLE = {
  fontFamily: 'RedHands',
  fontSize: '36px',
  fill: '#fff',
  stroke: '#000',
  strokeThickness: 4
};

WebFont.load({
  custom: {
    families: ['RedHands']
  }
});

const game = new Phaser.Game(GAME_CONFIG);
// game.scene.start('LoadingScene', 'GameplayScene');



/***/ }),

/***/ "./src/scenes/GameplayScene.js":
/*!*************************************!*\
  !*** ./src/scenes/GameplayScene.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameplayScene)
/* harmony export */ });
/* harmony import */ var _game_objects_loader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game-objects/loader.js */ "./src/game-objects/loader.js");
/* harmony import */ var _game_objects_dice_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game-objects/dice.js */ "./src/game-objects/dice.js");
/* harmony import */ var _game_objects_closeButton_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../game-objects/closeButton.js */ "./src/game-objects/closeButton.js");
/* harmony import */ var _game_objects_winPopup_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../game-objects/winPopup.js */ "./src/game-objects/winPopup.js");
/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../main.js */ "./src/main.js");






let DATA_STORE = {
  id: "",
  start: "",
  end: "",
  winner: "",
  dataList: {}
};

const createBoard = (scene, size, offsetX) => {
  const width = scene.game.config.width - offsetX;
  const tileSize = width / size;
  let counter = 1;
  let array = [];
  for (let i = size - 1; i >= 0; i--) {
    const isEven = size % 2 === 0 ? true : false;
    const isReverse = isEven ? (i % 2 === 0 ? true : false) : (i % 2 === 0 ? false : true);
    for (let j = 0; j < size; j++) {
      const x = isReverse ? (size - j - 1) * tileSize : j * tileSize;
      const y = i * tileSize;
      const color = counter % 2 == 0 ? 0x808080 : 0xffffff;
      const tile = scene.add.rectangle(x, y, tileSize, tileSize, color, 0).setOrigin(0);
      tile.setName(counter);
      array.push(tile);
      counter++;
    }
  }
  return array;
};

const setSnakeAndLadder = (tileList, dataList = []) => {
  if (!dataList) {
    console.warn('Snakes and Ladders failed to load');
    return;
  }
  const snakeAndLadderList = dataList.map((data, i) => {
    const index = tileList[data.from - 1];
    const target = tileList[data.to - 1];
    index.setData({ moveTo: target.name });
    return index;
  });
  return snakeAndLadderList;
};

const createPlayer = (scene, tile, color) => {
  const initTile = tile;
  const initX = initTile.x + initTile.width / 2;
  const initY = initTile.y + initTile.height / 2;
  const pawn = scene.add.circle(initX, initY, initTile.width / 5, color.key);
  pawn.setStrokeStyle(2, 0xffffff);
  pawn.setName(color.name);
  pawn.setData({
    position: initTile.name || 1,
    isWon: false,
    rollTotal: 0,
    correctAnswerTotal: 0,
    wrongAnswerTotal: 0,
    quiz: [],
  });
  return pawn;
};

class GameplayScene extends Phaser.Scene {
  constructor () {
    super({ key: 'GameplayScene' });
  }

  init (data) {
    this.theme = data.theme || 'space-board';
    this.numPlayers = data.numberOfPlayers || 2;
    this.colors = data.colors;
  }

  preload () {
    this.load.image("dice-albedo", "./assets/dice-albedo.png");
    this.load.obj("dice-obj", "./assets/dice.obj");
    this.load.image('question-bg', './assets/quiz-bg.webp');
    this.load.image("correct-alert", "./assets/alert-correct.webp");
    this.load.image("wrong-alert", "./assets/alert-wrong.webp");
    this.load.image("winner-alert", "./assets/alert-winner.webp");
    this.load.image("timesup-alert", "./assets/alert-timesup.webp");
    this.gameId = new Date().getTime();
    this.size = 6;
    switch (this.theme) {
      case 'forest-board':
        this.snakesAndLadders = [
          { type: 'snake', from: 11, to: 3 },
          { type: 'snake', from: 22, to: 18 },
          { type: 'snake', from: 35, to: 27 },
          { type: 'ladder', from: 8, to: 16 },
          { type: 'ladder', from: 13, to: 24 },
          { type: 'ladder', from: 29, to: 32 },
        ];
        break;
      case 'space-board':
        this.snakesAndLadders = [
          { type: 'snake', from: 11, to: 4 },
          { type: 'snake', from: 20, to: 15 },
          { type: 'snake', from: 34, to: 26 },
          { type: 'ladder', from: 7, to: 16 },
          { type: 'ladder', from: 13, to: 23 },
          { type: 'ladder', from: 28, to: 31 },
        ];
        break;
      default:
        break;
    }
    this.load.on('progress', (value) => {
      (0,_game_objects_loader_js__WEBPACK_IMPORTED_MODULE_0__.loadingAssets)(this, value);
    });
  }

  create () {
    this.gameRef = firebase.database().ref(`logs/${this.gameId}`);
    if (typeof (Storage) !== "undefined") {
      localStorage.setItem('gameId', this.gameId);
    }

    let diceValue;
    const startDate = new Date().toString().split(' ');
    const startTime = `${startDate[2]} ${startDate[1]} ${startDate[3]}, ${startDate[4]} `;
    DATA_STORE = {
      id: this.gameId,
      start: startTime,
      end: "",
      winner: "",
      dataList: {}
    };
    this.gameRef.set(DATA_STORE);

    this.players = [];
    this.playerIndex = 0;
    this.bg = this.add.image(0, 0, this.theme).setOrigin(0);
    const topLeftInfo = this.add.text(20, 25, `${this.numPlayers} Players`, { ..._main_js__WEBPACK_IMPORTED_MODULE_4__.FONT_STYLE, fontSize: '30px' });

    const boardContainer = this.add.container(50 / 2, 100);
    this.tiles = createBoard(this, this.size, 50);
    const snakesLaddersPosition = setSnakeAndLadder(this.tiles, this.snakesAndLadders);
    boardContainer.add(this.tiles);

    this.playerContainer = this.add.container(50 / 2, 100);
    for (let i = 0; i < this.numPlayers; i++) {
      const player = createPlayer(this, this.tiles[0], this.colors[i]);
      this.players.push(player);
      this.updateDatastore(player);
    }
    this.playerContainer.add(this.players);
    this.playerContainer.bringToTop(this.players[this.playerIndex]);

    this.playerInfo = this.add.text(
      this.game.config.width / 2,
      this.game.config.height - 80,
      `${this.players[this.playerIndex].name}'s Turn`,
      { ..._main_js__WEBPACK_IMPORTED_MODULE_4__.FONT_STYLE, fontSize: "40px", strokeThickness: 6 }
    ).setOrigin(0.5);

    this.helper = this.add.text(
      this.game.config.width / 2,
      this.game.config.height - 280,
      "Click Dice!",
      { ..._main_js__WEBPACK_IMPORTED_MODULE_4__.FONT_STYLE, fontSize: '24px', strokeThickness: 4 }
    ).setOrigin(0.5);

    const dice = (0,_game_objects_dice_js__WEBPACK_IMPORTED_MODULE_1__.createDice)(this.game.config.width / 2, this.game.config.height - 200, this, 1000);
    this.diceArea = this.add.rectangle(this.game.config.width / 2, this.game.config.height - 200, 100, 100, 0xffffff, 0);
    this.diceArea.setInteractive();
    this.diceArea.on('pointerup', () => {
      this.helper.setAlpha(0);
      dice((value) => {
        diceValue = value;
        this.diceArea.removeInteractive();
        setTimeout(() => {
          this.check(this.players[this.playerIndex], diceValue);
        }, 1000);
      });
    });

    const close = (0,_game_objects_closeButton_js__WEBPACK_IMPORTED_MODULE_2__.closeButton)(this, this.game.config.width - 50, 50, () => {
      if (confirm('Quit the game?')) {
        const endDate = new Date().toString().split(' ');
        const endTime = `${endDate[2]} ${endDate[1]} ${endDate[3]}, ${endDate[4]} `;
        DATA_STORE.end = endTime;
        this.gameRef.set(DATA_STORE);

        setTimeout(() => {
          _main_js__WEBPACK_IMPORTED_MODULE_4__.game.destroy(true);
          const newGame = new Phaser.Game(_main_js__WEBPACK_IMPORTED_MODULE_4__.GAME_CONFIG);
        }, 500);
      }
    });

    this.events.on('resume', (scene, data) => {
      this.updatePlayer(this.players[this.playerIndex], data, diceValue);
    });
  }

  check (player, diceValue) {
    const currentPosition = player.data.values.position;
    if (currentPosition + diceValue <= this.size * this.size) {
      this.scene.pause(this);
      this.scene.launch('QuestionMenu');
    } else {
      this.changePlayerIndex();
    }
  }

  updatePlayer (target, quizData, diceValue) {
    let quiz = target.data.values.quiz;
    quiz.push(quizData);
    target.data.values.rollTotal += 1;

    if (quizData.isCorrect) {
      target.data.values.correctAnswerTotal += 1;
      this.movePlayer(target, target.data.values.position, diceValue, this.tiles);
    } else {
      target.data.values.wrongAnswerTotal += 1;
      this.updateDatastore(target);
      this.changePlayerIndex();
    }
  }

  movePlayer (player, currentPosition, value, tileList) {
    if (value > 0) {
      const tile = tileList[currentPosition];
      value--;
      this.tweens.add({
        targets: player,
        x: tile.x + tile.width / 2,
        y: tile.y + tile.width / 2,
        ease: 'Linear',
        duration: 300,
        onComplete: () => {
          currentPosition++;
          this.movePlayer(player, currentPosition, value, tileList);
        }
      });
    } else {
      const tile = tileList[currentPosition - 1];
      if (tile.getData('moveTo')) {
        // if on snake or ladder
        setTimeout(() => {
          this.forceMove(player, tile.getData('moveTo'), tileList);
        }, 300);
      } else {
        player.data.values.position = tile.name;
        if (player.data.values.position >= this.size * this.size) {
          this.winCondition(player);
          return;
        }
        this.updateDatastore(player);
        this.changePlayerIndex();
      }
    }
  }

  forceMove (player, targetPosition, tileList) {
    const tile = tileList[targetPosition - 1];
    this.tweens.add({
      targets: player,
      x: tile.x + tile.width / 2,
      y: tile.y + tile.width / 2,
      ease: 'Linear',
      duration: 600,
      onComplete: () => {
        player.data.values.position = tile.name; // set new position after moved
        this.updateDatastore(player);
        this.changePlayerIndex();
      }
    });
  }

  changePlayerIndex () {
    let index = (this.playerIndex + 1) % this.numPlayers;
    this.playerIndex = index;
    this.playerInfo.setAlpha(0);
    setTimeout(() => {
      this.playerContainer.bringToTop(this.players[index]);
      this.playerInfo.setText(`${this.players[index].name}'s Turn`).setAlpha(1);;
      this.helper.setAlpha(1);
      this.diceArea.setInteractive();
    }, 1000);
  }

  winCondition (player) {
    player.data.values.isWon = true;
    this.updateDatastore(player);

    const endDate = new Date().toString().split(' ');
    const endTime = `${endDate[2]} ${endDate[1]} ${endDate[3]}, ${endDate[4]} `;
    DATA_STORE.end = endTime;
    DATA_STORE.winner = player.name;
    this.gameRef.child('end').set(DATA_STORE.end);
    this.gameRef.child('winner').set(DATA_STORE.winner);

    this.playerInfo.setAlpha(0);
    (0,_game_objects_winPopup_js__WEBPACK_IMPORTED_MODULE_3__.winPopup)(this, player);
    setTimeout(() => {
      this.helper.setText("Click Anywhere to Quit").setAlpha(1);
      this.bg.setInteractive();

      this.bg.on('pointerup', () => {
        _main_js__WEBPACK_IMPORTED_MODULE_4__.game.destroy(true);
        const newGame = new Phaser.Game(_main_js__WEBPACK_IMPORTED_MODULE_4__.GAME_CONFIG);
      });
    }, 2000);
  }

  updateDatastore (player) {
    if (typeof (Storage) !== "undefined") {
      localStorage.setItem(player.name, JSON.stringify(player.data.list));
      const fromStorage = localStorage.getItem(player.name);
      DATA_STORE.dataList[player.name] = JSON.parse(fromStorage);
    } else {
      DATA_STORE.dataList[player.name] = player.data.list;
    }
    this.gameRef.child('dataList').set(DATA_STORE.dataList);
  }
}

/***/ }),

/***/ "./src/scenes/HowToPlayScene.js":
/*!**************************************!*\
  !*** ./src/scenes/HowToPlayScene.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HowToPlayScene)
/* harmony export */ });
/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main.js */ "./src/main.js");
/* harmony import */ var _game_objects_closeButton_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game-objects/closeButton.js */ "./src/game-objects/closeButton.js");



class HowToPlayScene extends Phaser.Scene {
  constructor () {
    super({ key: 'HowToPlayScene' });
  }

  preload () {
    this.load.image('tutorial-id', './assets/tutorial-idn.webp');
    this.load.image('tutorial-en', './assets/tutorial-eng.webp');
  }

  create () {
    this.isEnglish = false;
    const bg = this.add.sprite(0, 0, 'background');
    bg.setOrigin(0);

    const container = this.add.container(this.game.config.width / 2, this.game.config.height / 2);
    const content = this.add.image(0, 0, 'tutorial-id');
    const changeButton = this.add.rectangle(0, 400, 600, 100, 0xffffff, 0);
    const buttonText = this.add.text(changeButton.x, changeButton.y, "Change language", { ..._main_js__WEBPACK_IMPORTED_MODULE_0__.FONT_STYLE, fontSize: '30px' }).setOrigin(0.5);
    changeButton.setInteractive();
    changeButton.on('pointerdown', () => {
      changeButton.fillAlpha = 0.2;
    });
    changeButton.on('pointerup', () => {
      changeButton.fillAlpha = 0;
      this.changeLang(content, buttonText);
    });
    container.add([content, changeButton, buttonText]);

    const close = (0,_game_objects_closeButton_js__WEBPACK_IMPORTED_MODULE_1__.closeButton)(this, this.game.config.width - 50, 50, () => {
      this.scene.stop(this);
      this.scene.resume('MainMenuScene');
    });
  }

  changeLang (content, buttonText) {
    this.isEnglish = !this.isEnglish;
    if (this.isEnglish === true) {
      content.setTexture('tutorial-en');
      buttonText.setText('Ganti bahasa');
    } else {
      content.setTexture('tutorial-id');
      buttonText.setText('Change language');
    }
  }
}

/***/ }),

/***/ "./src/scenes/LoadingScene.js":
/*!************************************!*\
  !*** ./src/scenes/LoadingScene.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LoadingScene)
/* harmony export */ });
/* harmony import */ var _game_objects_loader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game-objects/loader.js */ "./src/game-objects/loader.js");


class LoadingScene extends Phaser.Scene {
  constructor () {
    super({ key: 'LoadingScene' });
  }
  preload () {
    this.load.image('close-button', './assets/close-btn.png');
    this.load.image('main-button', './assets/button-main.png');
    this.load.image('instal-button', './assets/button-addon.png');
    this.load.image('background', './assets/main-background.webp');
    this.load.image('pick-menu', './assets/menu-bg.webp');
    this.load.image('forest-board', './assets/board-forest.webp');
    this.load.image('space-board', './assets/board-space.webp');
    this.load.image('forest-img', './assets/thumbnail-forest.webp');
    this.load.image('space-img', './assets/thumbnail-space.webp');
    this.load.on('progress', (value) => {
      (0,_game_objects_loader_js__WEBPACK_IMPORTED_MODULE_0__.loadingAssets)(this, value);
    });
  }
  create () {
    this.scene.start('MainMenuScene');
  }
}

/***/ }),

/***/ "./src/scenes/MainMenuScene.js":
/*!*************************************!*\
  !*** ./src/scenes/MainMenuScene.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MainMenuScene)
/* harmony export */ });
/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main.js */ "./src/main.js");


const beforeInstallPrompt = (callback) => {
  let installPrompt = null;
  let showButton = false;
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    installPrompt = event;
    showButton = true;
    callback(installPrompt);
  });
};

const createMainButton = (scene, isMain, x, y, text, callback) => {
  const container = scene.add.container(x, y);

  const button = isMain === true ? scene.add.sprite(0, 0, 'main-button') : scene.add.sprite(0, 0, 'instal-button');
  const btnText = isMain === true ? scene.add.text(0, 0, text, { ..._main_js__WEBPACK_IMPORTED_MODULE_0__.FONT_STYLE, fill: '#000', strokeThickness: 0 }) : scene.add.text(0, 0, text, { ..._main_js__WEBPACK_IMPORTED_MODULE_0__.FONT_STYLE, strokeThickness: 0 });
  btnText.setOrigin(0.5);
  button.setInteractive();
  button.on('pointerdown', () => {
    scene.tweens.add({
      targets: container,
      scale: 0.8,
      duration: 100,
      yoyo: true,
      ease: 'Sine.easeInOut',
      onComplete: callback
    });
  });
  container.add([button, btnText]);
  return container;
};

class MainMenuScene extends Phaser.Scene {
  constructor () {
    super({ key: 'MainMenuScene' });
  }
  init (data) {
    this.fontStyle = data;
  }

  preload () {
    this.colorList = [
      { name: 'Red', key: 0xff0000, hex: '#f00' },
      { name: 'Green', key: 0x00ff00, hex: '#0f0' },
      { name: 'Blue', key: 0x0000ff, hex: '#00f' },
      { name: 'Yellow', key: 0xffff00, hex: '#ff0' }
    ];
  }

  create () {
    const fontFamily = 'Verdana, "Times New Roman", Tahoma, serif';
    this.add.sprite(0, 0, 'background').setOrigin(0);

    this.add.text(
      this.game.config.width / 2,
      this.game.config.height / 2 - 220,
      'Snakes and Ladders',
      { fontFamily: fontFamily, fontSize: '30px', fontStyle: 'bold' }
    ).setOrigin(0.5);
    this.add.text(
      this.game.config.width / 2,
      this.game.config.height / 2 - 180,
      'with Simple Math Quizzes',
      { fontFamily: fontFamily, fontSize: '30px', fontStyle: 'bold' }
    ).setOrigin(0.5);

    const btnX = this.game.config.width / 2;
    const initBtnY = this.game.config.height / 2 - 50;
    createMainButton(this, true, btnX, initBtnY, "Play Game", () => {
      this.scene.pause(this);
      this.scene.launch('PickPlayerMenu', this.colorList);
    });
    createMainButton(this, true, btnX, initBtnY + 160, "How to Play", () => {
      this.scene.pause(this);
      this.scene.launch('HowToPlayScene');
    });
    createMainButton(this, true, btnX, initBtnY + 320, "Please Review", () => {
      // window.open('https://forms.gle/wg1Jryosf9FuLTes5', '_blank');
      alert('Form review sedang tidak aktif | Review form is currently inactive');
    });
    beforeInstallPrompt((event) => {
      const installBtn = createMainButton(this, false, btnX, this.game.config.height - 100, "Add to Home", () => {
        event.prompt();
        event.userChoice.then((choice) => {
          if (choice.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
            installBtn.setVisible(false);
            this.scene.restart();
          }
        });
        event = null;
      });
      if (!event) {
        installBtn.setVisible(false);
      }
    });
  }
}


/***/ }),

/***/ "./src/scenes/PickPlayerMenu.js":
/*!**************************************!*\
  !*** ./src/scenes/PickPlayerMenu.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PickPlayerMenu)
/* harmony export */ });
/* harmony import */ var _game_objects_closeButton_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game-objects/closeButton.js */ "./src/game-objects/closeButton.js");
/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../main.js */ "./src/main.js");



class PickPlayerMenu extends Phaser.Scene {
  constructor () {
    super({ key: 'PickPlayerMenu' });
  }

  init (data) {
    this.options = [2, 3, 4];
    this.colors = data;
    this.boardTheme = 'forest-board';
  }

  create () {
    const container = this.add.container(this.game.config.width / 2, -500);

    const background = this.add.sprite(0, 0, 'pick-menu');
    container.add(background);

    const board1 = this.boardCheck(background.x - 120, -200, 'forest-img');
    board1.stroke.setStrokeStyle(5, 0xffffff);
    const board2 = this.boardCheck(background.x + 120, -200, 'space-img');

    board1.img.on('pointerup', () => {
      this.chooseBoard(board1.stroke, board2.stroke, 'forest-board');
    });
    board2.img.on('pointerup', () => {
      this.chooseBoard(board2.stroke, board1.stroke, 'space-board');
    });

    container.add([board1.stroke, board1.img]);
    container.add([board2.stroke, board2.img]);

    this.options.map((option, index) => {
      const btnY = background.y + 50 + index * 120;
      this.startButton(container, background.x, btnY, option, () => {
        this.scene.start('GameplayScene', { theme: this.boardTheme, numberOfPlayers: option, colors: this.colors.slice(0, option) });
      });
    });

    const close = (0,_game_objects_closeButton_js__WEBPACK_IMPORTED_MODULE_0__.closeButton)(this, background.x + 10 + background.width / 2, background.y - 10 - background.height / 2, () => {
      this.tweens.add({
        targets: container,
        y: -500,
        duration: 500,
        ease: 'Cubic.easeIn',
        onComplete: () => {
          this.scene.stop(this);
          this.scene.resume('MainMenuScene');
        }
      });
    });
    container.add(close);

    this.tweens.add({
      targets: container,
      y: this.game.config.height / 2,
      duration: 700,
      ease: 'Cubic.easeOut'
    });
  }

  boardCheck (x, y, theme) {
    const stroke = this.add.rectangle(x, y, 200, 300, 0x000000);
    const img = this.add.image(x, y, theme);
    img.setInteractive();
    return { stroke, img };
  }

  chooseBoard (targetTrue, targetFalse, theme) {
    this.boardTheme = theme;
    targetTrue.setStrokeStyle(5, 0xffffff);
    targetFalse.isStroked = false;
  }

  startButton (container, x, y, option, callback) {
    const width = 500;
    const height = 100;
    const button = this.add.rectangle(x, y, width, height, 0xffffff, 0);
    button.setInteractive();
    button.on('pointerover', () => {
      button.fillAlpha = 0.2;
    });
    button.on('pointerout', () => {
      button.fillAlpha = 0;
    });
    button.on('pointerup', callback);
    container.add(button);

    const numText = this.add.text(
      x - width / 2 + 120,
      y,
      `${option} players`,
      { ..._main_js__WEBPACK_IMPORTED_MODULE_1__.FONT_STYLE }
    ).setOrigin(0.5);
    container.add(numText);

    for (let i = 0; i < option; i++) {
      const color = this.colors[i].key;
      const cX = x + 20;
      const pawn = this.add.circle(cX + i * 60, y, 20, color);
      pawn.setStrokeStyle(2, 0xffffff);
      container.add(pawn);
    }
  }
}

/***/ }),

/***/ "./src/scenes/QuestionMenu.js":
/*!************************************!*\
  !*** ./src/scenes/QuestionMenu.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ QuestionMenu)
/* harmony export */ });
/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main.js */ "./src/main.js");


class Alert extends Phaser.GameObjects.Container {
  constructor (scene, x, y) {
    super(scene, x, y);
    this.fontFamily = 'Verdana, "Times New Roman", Tahoma, serif';
    this.setVisible(false);
  }
  showIsCorrect () {
    this.correct = this.scene.add.image(0, 0, 'correct-alert');
    this.add(this.correct);
    this.setVisible(true);
  }
  showIsWrong (correct) {
    this.wrong = this.scene.add.image(0, 0, 'wrong-alert');
    this.result = this.scene.add.text(0, 40, `The answer is ${correct}`, { fontFamily: this.fontFamily, fontSize: '30px', fill: '#fff', fontStyle: 'bold' }).setOrigin(0.5);
    this.add([this.wrong, this.result]);
    this.setVisible(true);
  }
  showTimesUp (correct) {
    this.timesUp = this.scene.add.image(0, 0, 'timesup-alert');
    this.result = this.scene.add.text(0, 40, `The answer is ${correct}`, { fontFamily: this.fontFamily, fontSize: '30px', fill: '#fff', fontStyle: 'bold' }).setOrigin(0.5);
    this.add([this.timesUp, this.result]);
    this.setVisible(true);
  }
  hide () {
    this.setVisible(false);
  }
}

class Countdown extends Phaser.GameObjects.Container {
  constructor (scene, x, y) {
    super(scene, x, y);
    this.bar = this.scene.add.rectangle(x, y, 600, 40, 0xff0000);
    this.timerText = this.scene.add.text(x, y, "", { ..._main_js__WEBPACK_IMPORTED_MODULE_0__.FONT_STYLE, fontSize: '30px' }).setOrigin(0.5);
  }
  run (duration, alert, math) {
    let bar = this.bar;
    let text = this.timerText;
    text.setText(`Times remaining: ${duration}`);
    this.scene.tweens.add({
      targets: bar,
      width: 0,
      ease: 'Linear',
      duration: duration * 1000,
      onComplete: () => {
        this.scene.scene.pause(this.scene);
        alert.showTimesUp(math.result);
        setTimeout(() => {
          this.scene.scene.resume('GameplayScene', { question: math.question, correctAnswer: math.result, playerAnswer: '', isCorrect: false });
          this.scene.scene.stop(this.scene);
        }, 2000);
      }
    });
    let times = this.scene.time.addEvent({
      delay: 1000,
      repeat: duration - 1,
      callback: () => {
        let remains = times.getRepeatCount();
        text.setText(`Times remaining: ${remains}`);
      },
    });
  }
  stop () {

  }
}

const mathOperation = (operator) => {
  let num1;
  let num2;
  let result;
  switch (operator) {
    case '÷':
      num2 = Math.floor(Math.random() * (20 - 2) + 2);
      do {
        num1 = Math.floor(Math.random() * (100 - 2) + 2);
      } while (num1 % num2 !== 0 || num1 == num2);
      result = num1 / num2;
      break;
    case '×':
      do {
        num1 = Math.floor(Math.random() * (20 - 2) + 2);
        num2 = Math.floor(Math.random() * (100 - 2) + 2);
      } while (num1 * num2 >= 200);
      result = num1 * num2;
      break;
    case '+':
      num1 = Math.floor(Math.random() * (100 - 2) + 2);
      num2 = Math.floor(Math.random() * (100 - 2) + 2);
      result = num1 + num2;
      break;
    case '-':
      num2 = Math.floor(Math.random() * (120 - 2) + 2);
      do {
        num1 = Math.floor(Math.random() * (200 - 2) + 2);
      } while (num1 <= num2);
      result = num1 - num2;
      break;
    default:
      break;
  }
  return { question: `${num1} ${operator} ${num2}`, result: result.toString() };
};

class QuestionMenu extends Phaser.Scene {
  constructor () {
    super({ key: 'QuestionMenu' });
  }

  init () {
    this.nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'CLEAR', 0, 'OK'];
    this.ops = ['÷', '×', '+', '-'];
  }

  preload () {
    this.operator = this.ops[Math.floor(Math.random() * this.ops.length)];
    this.operation = mathOperation(this.operator);
  }

  create () {
    this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x000000).setOrigin(0).setAlpha(0.4);
    let buttonList = [];
    let inputValue = '';

    const timer = new Countdown(this, this.game.config.width / 2, 120);
    const popAlert = new Alert(this, this.game.config.width / 2, this.game.config.height / 2);
    const fontFamily = 'Verdana, "Times New Roman", Tahoma, serif';
    const buttonColor = 0xffffff;
    const hoverColor = 0x808080;
    const math = this.operation;

    const bg = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'question-bg');
    const questionText = this.add.text(bg.x - 260, bg.y - 260, math.question, { fontFamily: fontFamily, fontSize: '40px', fill: '#fff', fontStyle: 'bold' });
    const equal = this.add.text(bg.x - 260, bg.y - 200, '= ', { fontFamily: fontFamily, fontSize: '40px', fill: '#fff', fontStyle: 'bold' });

    const tileX = bg.x / 2 + 10;
    const tileY = bg.height - 85;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        const index = i * 3 + j;
        const x = tileX + (j * 190);
        const y = tileY + (i * 100);
        const buttonTile = this.add.rectangle(x, y, 190, 100, buttonColor);
        const text = this.add.text(x, y, this.nums[index], { fontFamily: fontFamily, fontSize: '24px', fill: '#000', fontStyle: 'bold' }).setOrigin(0.5);
        buttonTile.name = this.nums[index];
        buttonTile.setInteractive();
        buttonTile.on('pointerover', () => {
          buttonTile.fillColor = hoverColor;
        });
        buttonTile.on('pointerout', () => {
          buttonTile.fillColor = buttonColor;
        });
        buttonTile.on('pointerdown', () => {
          buttonTile.fillColor = hoverColor;
        });
        buttonList.push(buttonTile);
      }
    }

    buttonList.forEach((button) => {
      button.on('pointerup', () => {
        button.fillColor = buttonColor;
        if (button.name !== 'CLEAR' && button.name !== 'OK') {
          inputValue += button.name;
        }
        if (button.name === 'CLEAR') {
          inputValue = '';
        }
        if (button.name === 'OK') {
          this.scene.pause(this);
          const isCorrect = inputValue === math.result;
          if (isCorrect) {
            popAlert.showIsCorrect();
          } else {
            popAlert.showIsWrong(math.result);
          }
          setTimeout(() => {
            this.scene.resume('GameplayScene', { question: math.question, correctAnswer: math.result, playerAnswer: inputValue, isCorrect: isCorrect });
            this.scene.stop(this);
          }, 2000);
        }
        equal.setText(`= ${inputValue}`);
      });
    });

    timer.run(10, popAlert, math);

    this.add.existing(popAlert);
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0ZBQWdGLDJFQUEyRTtBQUMzSixnRUFBZ0UsMkVBQTJFO0FBQzNJO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCLHNCQUFzQixPQUFPO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELDJFQUEyRTtBQUN4STtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxxR0FBcUc7QUFDdEo7QUFDQSxXQUFXO0FBQ1g7QUFDQSwyQkFBMkIsV0FBVztBQUN0QyxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDOUxBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc25hZGRlcm1hdGgtbGl0ZS8uL3NyYy9nYW1lLW9iamVjdHMvY2xvc2VCdXR0b24uanMiLCJ3ZWJwYWNrOi8vc25hZGRlcm1hdGgtbGl0ZS8uL3NyYy9nYW1lLW9iamVjdHMvZGljZS5qcyIsIndlYnBhY2s6Ly9zbmFkZGVybWF0aC1saXRlLy4vc3JjL2dhbWUtb2JqZWN0cy9sb2FkZXIuanMiLCJ3ZWJwYWNrOi8vc25hZGRlcm1hdGgtbGl0ZS8uL3NyYy9nYW1lLW9iamVjdHMvd2luUG9wdXAuanMiLCJ3ZWJwYWNrOi8vc25hZGRlcm1hdGgtbGl0ZS8uL3NyYy9tYWluLmpzIiwid2VicGFjazovL3NuYWRkZXJtYXRoLWxpdGUvLi9zcmMvc2NlbmVzL0dhbWVwbGF5U2NlbmUuanMiLCJ3ZWJwYWNrOi8vc25hZGRlcm1hdGgtbGl0ZS8uL3NyYy9zY2VuZXMvSG93VG9QbGF5U2NlbmUuanMiLCJ3ZWJwYWNrOi8vc25hZGRlcm1hdGgtbGl0ZS8uL3NyYy9zY2VuZXMvTG9hZGluZ1NjZW5lLmpzIiwid2VicGFjazovL3NuYWRkZXJtYXRoLWxpdGUvLi9zcmMvc2NlbmVzL01haW5NZW51U2NlbmUuanMiLCJ3ZWJwYWNrOi8vc25hZGRlcm1hdGgtbGl0ZS8uL3NyYy9zY2VuZXMvUGlja1BsYXllck1lbnUuanMiLCJ3ZWJwYWNrOi8vc25hZGRlcm1hdGgtbGl0ZS8uL3NyYy9zY2VuZXMvUXVlc3Rpb25NZW51LmpzIiwid2VicGFjazovL3NuYWRkZXJtYXRoLWxpdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc25hZGRlcm1hdGgtbGl0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc25hZGRlcm1hdGgtbGl0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NuYWRkZXJtYXRoLWxpdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zbmFkZGVybWF0aC1saXRlL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc25hZGRlcm1hdGgtbGl0ZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vc25hZGRlcm1hdGgtbGl0ZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGNsb3NlQnV0dG9uID0gKHNjZW5lLCB4LCB5LCBjYWxsYmFjaykgPT4ge1xyXG4gIGNvbnN0IGNsb3NlQnRuID0gc2NlbmUuYWRkLnNwcml0ZSh4LCB5LCAnY2xvc2UtYnV0dG9uJyk7XHJcbiAgY2xvc2VCdG4uc2V0U2NhbGUoMC41KTtcclxuICBjbG9zZUJ0bi5zZXRJbnRlcmFjdGl2ZSgpO1xyXG4gIGNsb3NlQnRuLm9uKCdwb2ludGVyb3ZlcicsICgpID0+IHtcclxuICAgIGNsb3NlQnRuLnNldFNjYWxlKDAuNCk7XHJcbiAgfSk7XHJcbiAgY2xvc2VCdG4ub24oJ3BvaW50ZXJvdXQnLCAoKSA9PiB7XHJcbiAgICBjbG9zZUJ0bi5zZXRTY2FsZSgwLjUpO1xyXG4gIH0pO1xyXG4gIGNsb3NlQnRuLm9uKCdwb2ludGVydXAnLCBjYWxsYmFjayk7XHJcbiAgcmV0dXJuIGNsb3NlQnRuO1xyXG59OyIsImV4cG9ydCBjb25zdCBjcmVhdGVEaWNlID0gKHgsIHksIHNjZW5lLCBkdXJhdGlvbiA9IDEwMDApID0+IHtcclxuXHJcbiAgbGV0IGRpY2VJc1JvbGxpbmcgPSBmYWxzZTtcclxuXHJcbiAgY29uc3QgZGljZSA9IHNjZW5lLmFkZC5tZXNoKHgsIHksIFwiZGljZS1hbGJlZG9cIikuc2V0U2NhbGUoMC40KTtcclxuICBjb25zdCBzaGFkb3dGWCA9IGRpY2UucG9zdEZYLmFkZFNoYWRvdygwLCAwLCAwLjAwNiwgMiwgMHgxMTExMTEsIDEwLCAuOCk7XHJcblxyXG4gIGRpY2UuYWRkVmVydGljZXNGcm9tT2JqKFwiZGljZS1vYmpcIiwgMC4yNSk7XHJcbiAgZGljZS5wYW5aKDYpO1xyXG5cclxuICBkaWNlLm1vZGVsUm90YXRpb24ueCA9IFBoYXNlci5NYXRoLkRlZ1RvUmFkKDApO1xyXG4gIGRpY2UubW9kZWxSb3RhdGlvbi55ID0gUGhhc2VyLk1hdGguRGVnVG9SYWQoLTkwKTtcclxuXHJcbiAgcmV0dXJuIChjYWxsYmFjaykgPT4ge1xyXG4gICAgaWYgKCFkaWNlSXNSb2xsaW5nKSB7XHJcbiAgICAgIGRpY2VJc1JvbGxpbmcgPSB0cnVlO1xyXG4gICAgICBjb25zdCBkaWNlUm9sbCA9IFBoYXNlci5NYXRoLkJldHdlZW4oMSwgNik7XHJcblxyXG4gICAgICAvLyBTaGFkb3dcclxuICAgICAgc2NlbmUuYWRkLnR3ZWVuKHtcclxuICAgICAgICB0YXJnZXRzOiBzaGFkb3dGWCxcclxuICAgICAgICB4OiAtOCxcclxuICAgICAgICB5OiAxMCxcclxuICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24gLSAyNTAsXHJcbiAgICAgICAgZWFzZTogXCJTaW5lLmVhc2VJbk91dFwiLFxyXG4gICAgICAgIHlveW86IHRydWUsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgc2NlbmUuYWRkLnR3ZWVuKHtcclxuICAgICAgICB0YXJnZXRzOiBkaWNlLFxyXG4gICAgICAgIGZyb206IDAsXHJcbiAgICAgICAgdG86IDEsXHJcbiAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxyXG4gICAgICAgIG9uVXBkYXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICBkaWNlLm1vZGVsUm90YXRpb24ueCAtPSAuMDI7XHJcbiAgICAgICAgICBkaWNlLm1vZGVsUm90YXRpb24ueSAtPSAuMDg7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICBzd2l0Y2ggKGRpY2VSb2xsKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICBkaWNlLm1vZGVsUm90YXRpb24ueCA9IFBoYXNlci5NYXRoLkRlZ1RvUmFkKDApO1xyXG4gICAgICAgICAgICAgIGRpY2UubW9kZWxSb3RhdGlvbi55ID0gUGhhc2VyLk1hdGguRGVnVG9SYWQoLTkwKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgIGRpY2UubW9kZWxSb3RhdGlvbi54ID0gUGhhc2VyLk1hdGguRGVnVG9SYWQoOTApO1xyXG4gICAgICAgICAgICAgIGRpY2UubW9kZWxSb3RhdGlvbi55ID0gUGhhc2VyLk1hdGguRGVnVG9SYWQoMCk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICBkaWNlLm1vZGVsUm90YXRpb24ueCA9IFBoYXNlci5NYXRoLkRlZ1RvUmFkKDE4MCk7XHJcbiAgICAgICAgICAgICAgZGljZS5tb2RlbFJvdGF0aW9uLnkgPSBQaGFzZXIuTWF0aC5EZWdUb1JhZCgwKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgIGRpY2UubW9kZWxSb3RhdGlvbi54ID0gUGhhc2VyLk1hdGguRGVnVG9SYWQoMTgwKTtcclxuICAgICAgICAgICAgICBkaWNlLm1vZGVsUm90YXRpb24ueSA9IFBoYXNlci5NYXRoLkRlZ1RvUmFkKDE4MCk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICBkaWNlLm1vZGVsUm90YXRpb24ueCA9IFBoYXNlci5NYXRoLkRlZ1RvUmFkKC05MCk7XHJcbiAgICAgICAgICAgICAgZGljZS5tb2RlbFJvdGF0aW9uLnkgPSBQaGFzZXIuTWF0aC5EZWdUb1JhZCgwKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgIGRpY2UubW9kZWxSb3RhdGlvbi54ID0gUGhhc2VyLk1hdGguRGVnVG9SYWQoMCk7XHJcbiAgICAgICAgICAgICAgZGljZS5tb2RlbFJvdGF0aW9uLnkgPSBQaGFzZXIuTWF0aC5EZWdUb1JhZCg5MCk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlYXNlOiBcIlNpbmUuZWFzZUluT3V0XCIsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gSW50cm8gZGljZVxyXG4gICAgICBzY2VuZS5hZGQudHdlZW4oe1xyXG4gICAgICAgIHRhcmdldHM6IFtkaWNlXSxcclxuICAgICAgICBzY2FsZTogMC42LFxyXG4gICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbiAtIGR1cmF0aW9uIC8gMixcclxuICAgICAgICB5b3lvOiB0cnVlLFxyXG4gICAgICAgIGVhc2U6IFBoYXNlci5NYXRoLkVhc2luZy5RdWFkcmF0aWMuSW5PdXQsXHJcbiAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgZGljZS5zY2FsZSA9IDAuNDtcclxuICAgICAgICAgIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGRpY2VJc1JvbGxpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2FsbGJhY2soZGljZVJvbGwpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIklzIHJvbGxpbmdcIik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbn07IiwiaW1wb3J0IHsgRk9OVF9TVFlMRSB9IGZyb20gXCIuLi9tYWluLmpzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgbG9hZGluZ0Fzc2V0cyA9IChzY2VuZSwgdmFsdWUpID0+IHtcclxuICBzY2VuZS5hZGQucmVjdGFuZ2xlKDAsIDAsIHNjZW5lLmNhbWVyYXMubWFpbi53aWR0aCwgc2NlbmUuY2FtZXJhcy5tYWluLmhlaWdodCwgMHgwMDAwMDApLnNldE9yaWdpbigwKTtcclxuICBjb25zdCB0ZXh0ID0gdmFsdWU/IGBMb2FkaW5nLi4uICR7TWF0aC5mbG9vcih2YWx1ZSAqIDEwMCl9JWAgOiAnTG9hZGluZy4uLic7XHJcbiAgc2NlbmUuYWRkLnRleHQoXHJcbiAgICBzY2VuZS5jYW1lcmFzLm1haW4ud2lkdGggLyAyLFxyXG4gICAgc2NlbmUuY2FtZXJhcy5tYWluLmhlaWdodCAvIDIsXHJcbiAgICB0ZXh0LFxyXG4gICAgeyAuLi5GT05UX1NUWUxFIH1cclxuICApLnNldE9yaWdpbigwLjUpO1xyXG59OyIsImV4cG9ydCBjb25zdCB3aW5Qb3B1cCA9IChzY2VuZSwgd2lubmVyKSA9PiB7XHJcbiAgY29uc3QgSEVYID0ge1xyXG4gICAgUmVkOiBbJyNmZjAwMDAnLCAnI2ZmZiddLFxyXG4gICAgR3JlZW46IFsnIzAwZmYwMCcsICcjMDAwJ10sXHJcbiAgICBCbHVlOiBbJyMwMDAwZmYnLCAnI2ZmZiddLFxyXG4gICAgWWVsbG93OiBbJyNmZmZmMDAnLCAnIzAwMCddLFxyXG4gIH07XHJcbiAgY29uc3QgY29udGFpbmVyID0gc2NlbmUuYWRkLmNvbnRhaW5lcihzY2VuZS5nYW1lLmNvbmZpZy53aWR0aCAvIDIsIHNjZW5lLmdhbWUuY29uZmlnLmhlaWdodCArIDEwMCk7XHJcbiAgY29uc3Qgd2lubmVyQmcgPSBzY2VuZS5hZGQuaW1hZ2UoMCwgMCwgJ3dpbm5lci1hbGVydCcpO1xyXG4gIGNvbnN0IHdpbm5lclRleHQgPSBzY2VuZS5hZGQudGV4dCgwLCAtMzAsIHdpbm5lci5uYW1lLCB7XHJcbiAgICBmb250RmFtaWx5OiAnUmVkSGFuZHMnLFxyXG4gICAgZm9udFNpemU6ICc2NHB4JyxcclxuICAgIGZpbGw6IEhFWFt3aW5uZXIubmFtZV1bMF0sXHJcbiAgICBzdHJva2U6IEhFWFt3aW5uZXIubmFtZV1bMV0sXHJcbiAgICBzdHJva2VUaGlja25lc3M6IDQsXHJcbiAgfSkuc2V0T3JpZ2luKDAuNSk7XHJcblxyXG4gIGNvbnRhaW5lci5hZGQoW3dpbm5lckJnLCB3aW5uZXJUZXh0XSk7XHJcblxyXG4gIHNjZW5lLnR3ZWVucy5hZGQoe1xyXG4gICAgdGFyZ2V0czogY29udGFpbmVyLFxyXG4gICAgeTogc2NlbmUuZ2FtZS5jb25maWcuaGVpZ2h0IC8gMiAtIDEwMCxcclxuICAgIGR1cmF0aW9uOiA3MDAsXHJcbiAgICBlYXNlOiAnQ3ViaWMuZWFzZU91dCdcclxuICB9KTtcclxufTsiLCJpbXBvcnQgTG9hZGluZ1NjZW5lIGZyb20gXCIuL3NjZW5lcy9Mb2FkaW5nU2NlbmUuanNcIjtcclxuaW1wb3J0IE1haW5NZW51U2NlbmUgZnJvbSBcIi4vc2NlbmVzL01haW5NZW51U2NlbmUuanNcIjtcclxuaW1wb3J0IEhvd1RvUGxheVNjZW5lIGZyb20gXCIuL3NjZW5lcy9Ib3dUb1BsYXlTY2VuZS5qc1wiO1xyXG5pbXBvcnQgR2FtZXBsYXlTY2VuZSBmcm9tIFwiLi9zY2VuZXMvR2FtZXBsYXlTY2VuZS5qc1wiO1xyXG5pbXBvcnQgUGlja1BsYXllck1lbnUgZnJvbSBcIi4vc2NlbmVzL1BpY2tQbGF5ZXJNZW51LmpzXCI7XHJcbmltcG9ydCBRdWVzdGlvbk1lbnUgZnJvbSBcIi4vc2NlbmVzL1F1ZXN0aW9uTWVudS5qc1wiO1xyXG5cclxuY29uc3QgZmlyZWJhc2VDb25maWcgPSB7XHJcbiAgYXBpS2V5OiBwcm9jZXNzLmVudi5BUElfS0VZLFxyXG4gIGF1dGhEb21haW46IHByb2Nlc3MuZW52LkFVVEhfRE9NQUlOLFxyXG4gIGRhdGFiYXNlVVJMOiBwcm9jZXNzLmVudi5EQVRBQkFTRV9VUkwsXHJcbiAgcHJvamVjdElkOiBwcm9jZXNzLmVudi5QUk9KRUNUX0lELFxyXG4gIHN0b3JhZ2VCdWNrZXQ6IHByb2Nlc3MuZW52LlNUT1JBR0VfQlVDS0VULFxyXG4gIG1lc3NhZ2luZ1NlbmRlcklkOiBwcm9jZXNzLmVudi5NRVNTQUdJTkdfU0VOREVSX0lELFxyXG4gIGFwcElkOiBwcm9jZXNzLmVudi5BUFBfSUQsXHJcbiAgbWVhc3VyZW1lbnRJZDogcHJvY2Vzcy5lbnYuTUVBU1VSRU1FTlRfSURcclxufTtcclxuXHJcbmZpcmViYXNlLmluaXRpYWxpemVBcHAoZmlyZWJhc2VDb25maWcpO1xyXG5cclxuY29uc3QgR0FNRV9DT05GSUcgPSB7XHJcbiAgdHlwZTogUGhhc2VyLkFVVE8sXHJcbiAgd2lkdGg6IDgwMCxcclxuICBoZWlnaHQ6IDEyMDAsXHJcbiAgc2NhbGU6IHtcclxuICAgIG1vZGU6IFBoYXNlci5TY2FsZS5GSVQsXHJcbiAgICBhdXRvQ2VudGVyOiBQaGFzZXIuU2NhbGUuQ0VOVEVSX0JPVEgsXHJcbiAgfSxcclxuICBiYWNrZ3JvdW5kQ29sb3I6IDB4M0E1MzY3LFxyXG4gIHNjZW5lOiBbTG9hZGluZ1NjZW5lLCBNYWluTWVudVNjZW5lLCBIb3dUb1BsYXlTY2VuZSwgR2FtZXBsYXlTY2VuZSwgUGlja1BsYXllck1lbnUsIFF1ZXN0aW9uTWVudV0sXHJcbn07XHJcblxyXG5jb25zdCBGT05UX1NUWUxFID0ge1xyXG4gIGZvbnRGYW1pbHk6ICdSZWRIYW5kcycsXHJcbiAgZm9udFNpemU6ICczNnB4JyxcclxuICBmaWxsOiAnI2ZmZicsXHJcbiAgc3Ryb2tlOiAnIzAwMCcsXHJcbiAgc3Ryb2tlVGhpY2tuZXNzOiA0XHJcbn07XHJcblxyXG5XZWJGb250LmxvYWQoe1xyXG4gIGN1c3RvbToge1xyXG4gICAgZmFtaWxpZXM6IFsnUmVkSGFuZHMnXVxyXG4gIH1cclxufSk7XHJcblxyXG5jb25zdCBnYW1lID0gbmV3IFBoYXNlci5HYW1lKEdBTUVfQ09ORklHKTtcclxuLy8gZ2FtZS5zY2VuZS5zdGFydCgnTG9hZGluZ1NjZW5lJywgJ0dhbWVwbGF5U2NlbmUnKTtcclxuXHJcbmV4cG9ydCB7IGdhbWUsIEZPTlRfU1RZTEUsIEdBTUVfQ09ORklHIH07IiwiaW1wb3J0IHsgbG9hZGluZ0Fzc2V0cyB9IGZyb20gXCIuLi9nYW1lLW9iamVjdHMvbG9hZGVyLmpzXCI7XHJcbmltcG9ydCB7IGNyZWF0ZURpY2UgfSBmcm9tIFwiLi4vZ2FtZS1vYmplY3RzL2RpY2UuanNcIjtcclxuaW1wb3J0IHsgY2xvc2VCdXR0b24gfSBmcm9tIFwiLi4vZ2FtZS1vYmplY3RzL2Nsb3NlQnV0dG9uLmpzXCI7XHJcbmltcG9ydCB7IHdpblBvcHVwIH0gZnJvbSBcIi4uL2dhbWUtb2JqZWN0cy93aW5Qb3B1cC5qc1wiO1xyXG5pbXBvcnQgeyBnYW1lLCBGT05UX1NUWUxFLCBHQU1FX0NPTkZJRyB9IGZyb20gXCIuLi9tYWluLmpzXCI7XHJcblxyXG5sZXQgREFUQV9TVE9SRSA9IHtcclxuICBpZDogXCJcIixcclxuICBzdGFydDogXCJcIixcclxuICBlbmQ6IFwiXCIsXHJcbiAgd2lubmVyOiBcIlwiLFxyXG4gIGRhdGFMaXN0OiB7fVxyXG59O1xyXG5cclxuY29uc3QgY3JlYXRlQm9hcmQgPSAoc2NlbmUsIHNpemUsIG9mZnNldFgpID0+IHtcclxuICBjb25zdCB3aWR0aCA9IHNjZW5lLmdhbWUuY29uZmlnLndpZHRoIC0gb2Zmc2V0WDtcclxuICBjb25zdCB0aWxlU2l6ZSA9IHdpZHRoIC8gc2l6ZTtcclxuICBsZXQgY291bnRlciA9IDE7XHJcbiAgbGV0IGFycmF5ID0gW107XHJcbiAgZm9yIChsZXQgaSA9IHNpemUgLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgY29uc3QgaXNFdmVuID0gc2l6ZSAlIDIgPT09IDAgPyB0cnVlIDogZmFsc2U7XHJcbiAgICBjb25zdCBpc1JldmVyc2UgPSBpc0V2ZW4gPyAoaSAlIDIgPT09IDAgPyB0cnVlIDogZmFsc2UpIDogKGkgJSAyID09PSAwID8gZmFsc2UgOiB0cnVlKTtcclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2l6ZTsgaisrKSB7XHJcbiAgICAgIGNvbnN0IHggPSBpc1JldmVyc2UgPyAoc2l6ZSAtIGogLSAxKSAqIHRpbGVTaXplIDogaiAqIHRpbGVTaXplO1xyXG4gICAgICBjb25zdCB5ID0gaSAqIHRpbGVTaXplO1xyXG4gICAgICBjb25zdCBjb2xvciA9IGNvdW50ZXIgJSAyID09IDAgPyAweDgwODA4MCA6IDB4ZmZmZmZmO1xyXG4gICAgICBjb25zdCB0aWxlID0gc2NlbmUuYWRkLnJlY3RhbmdsZSh4LCB5LCB0aWxlU2l6ZSwgdGlsZVNpemUsIGNvbG9yLCAwKS5zZXRPcmlnaW4oMCk7XHJcbiAgICAgIHRpbGUuc2V0TmFtZShjb3VudGVyKTtcclxuICAgICAgYXJyYXkucHVzaCh0aWxlKTtcclxuICAgICAgY291bnRlcisrO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gYXJyYXk7XHJcbn07XHJcblxyXG5jb25zdCBzZXRTbmFrZUFuZExhZGRlciA9ICh0aWxlTGlzdCwgZGF0YUxpc3QgPSBbXSkgPT4ge1xyXG4gIGlmICghZGF0YUxpc3QpIHtcclxuICAgIGNvbnNvbGUud2FybignU25ha2VzIGFuZCBMYWRkZXJzIGZhaWxlZCB0byBsb2FkJyk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGNvbnN0IHNuYWtlQW5kTGFkZGVyTGlzdCA9IGRhdGFMaXN0Lm1hcCgoZGF0YSwgaSkgPT4ge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aWxlTGlzdFtkYXRhLmZyb20gLSAxXTtcclxuICAgIGNvbnN0IHRhcmdldCA9IHRpbGVMaXN0W2RhdGEudG8gLSAxXTtcclxuICAgIGluZGV4LnNldERhdGEoeyBtb3ZlVG86IHRhcmdldC5uYW1lIH0pO1xyXG4gICAgcmV0dXJuIGluZGV4O1xyXG4gIH0pO1xyXG4gIHJldHVybiBzbmFrZUFuZExhZGRlckxpc3Q7XHJcbn07XHJcblxyXG5jb25zdCBjcmVhdGVQbGF5ZXIgPSAoc2NlbmUsIHRpbGUsIGNvbG9yKSA9PiB7XHJcbiAgY29uc3QgaW5pdFRpbGUgPSB0aWxlO1xyXG4gIGNvbnN0IGluaXRYID0gaW5pdFRpbGUueCArIGluaXRUaWxlLndpZHRoIC8gMjtcclxuICBjb25zdCBpbml0WSA9IGluaXRUaWxlLnkgKyBpbml0VGlsZS5oZWlnaHQgLyAyO1xyXG4gIGNvbnN0IHBhd24gPSBzY2VuZS5hZGQuY2lyY2xlKGluaXRYLCBpbml0WSwgaW5pdFRpbGUud2lkdGggLyA1LCBjb2xvci5rZXkpO1xyXG4gIHBhd24uc2V0U3Ryb2tlU3R5bGUoMiwgMHhmZmZmZmYpO1xyXG4gIHBhd24uc2V0TmFtZShjb2xvci5uYW1lKTtcclxuICBwYXduLnNldERhdGEoe1xyXG4gICAgcG9zaXRpb246IGluaXRUaWxlLm5hbWUgfHwgMSxcclxuICAgIGlzV29uOiBmYWxzZSxcclxuICAgIHJvbGxUb3RhbDogMCxcclxuICAgIGNvcnJlY3RBbnN3ZXJUb3RhbDogMCxcclxuICAgIHdyb25nQW5zd2VyVG90YWw6IDAsXHJcbiAgICBxdWl6OiBbXSxcclxuICB9KTtcclxuICByZXR1cm4gcGF3bjtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVwbGF5U2NlbmUgZXh0ZW5kcyBQaGFzZXIuU2NlbmUge1xyXG4gIGNvbnN0cnVjdG9yICgpIHtcclxuICAgIHN1cGVyKHsga2V5OiAnR2FtZXBsYXlTY2VuZScgfSk7XHJcbiAgfVxyXG5cclxuICBpbml0IChkYXRhKSB7XHJcbiAgICB0aGlzLnRoZW1lID0gZGF0YS50aGVtZSB8fCAnc3BhY2UtYm9hcmQnO1xyXG4gICAgdGhpcy5udW1QbGF5ZXJzID0gZGF0YS5udW1iZXJPZlBsYXllcnMgfHwgMjtcclxuICAgIHRoaXMuY29sb3JzID0gZGF0YS5jb2xvcnM7XHJcbiAgfVxyXG5cclxuICBwcmVsb2FkICgpIHtcclxuICAgIHRoaXMubG9hZC5pbWFnZShcImRpY2UtYWxiZWRvXCIsIFwiLi9hc3NldHMvZGljZS1hbGJlZG8ucG5nXCIpO1xyXG4gICAgdGhpcy5sb2FkLm9iaihcImRpY2Utb2JqXCIsIFwiLi9hc3NldHMvZGljZS5vYmpcIik7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3F1ZXN0aW9uLWJnJywgJy4vYXNzZXRzL3F1aXotYmcud2VicCcpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKFwiY29ycmVjdC1hbGVydFwiLCBcIi4vYXNzZXRzL2FsZXJ0LWNvcnJlY3Qud2VicFwiKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZShcIndyb25nLWFsZXJ0XCIsIFwiLi9hc3NldHMvYWxlcnQtd3Jvbmcud2VicFwiKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZShcIndpbm5lci1hbGVydFwiLCBcIi4vYXNzZXRzL2FsZXJ0LXdpbm5lci53ZWJwXCIpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKFwidGltZXN1cC1hbGVydFwiLCBcIi4vYXNzZXRzL2FsZXJ0LXRpbWVzdXAud2VicFwiKTtcclxuICAgIHRoaXMuZ2FtZUlkID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICB0aGlzLnNpemUgPSA2O1xyXG4gICAgc3dpdGNoICh0aGlzLnRoZW1lKSB7XHJcbiAgICAgIGNhc2UgJ2ZvcmVzdC1ib2FyZCc6XHJcbiAgICAgICAgdGhpcy5zbmFrZXNBbmRMYWRkZXJzID0gW1xyXG4gICAgICAgICAgeyB0eXBlOiAnc25ha2UnLCBmcm9tOiAxMSwgdG86IDMgfSxcclxuICAgICAgICAgIHsgdHlwZTogJ3NuYWtlJywgZnJvbTogMjIsIHRvOiAxOCB9LFxyXG4gICAgICAgICAgeyB0eXBlOiAnc25ha2UnLCBmcm9tOiAzNSwgdG86IDI3IH0sXHJcbiAgICAgICAgICB7IHR5cGU6ICdsYWRkZXInLCBmcm9tOiA4LCB0bzogMTYgfSxcclxuICAgICAgICAgIHsgdHlwZTogJ2xhZGRlcicsIGZyb206IDEzLCB0bzogMjQgfSxcclxuICAgICAgICAgIHsgdHlwZTogJ2xhZGRlcicsIGZyb206IDI5LCB0bzogMzIgfSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdzcGFjZS1ib2FyZCc6XHJcbiAgICAgICAgdGhpcy5zbmFrZXNBbmRMYWRkZXJzID0gW1xyXG4gICAgICAgICAgeyB0eXBlOiAnc25ha2UnLCBmcm9tOiAxMSwgdG86IDQgfSxcclxuICAgICAgICAgIHsgdHlwZTogJ3NuYWtlJywgZnJvbTogMjAsIHRvOiAxNSB9LFxyXG4gICAgICAgICAgeyB0eXBlOiAnc25ha2UnLCBmcm9tOiAzNCwgdG86IDI2IH0sXHJcbiAgICAgICAgICB7IHR5cGU6ICdsYWRkZXInLCBmcm9tOiA3LCB0bzogMTYgfSxcclxuICAgICAgICAgIHsgdHlwZTogJ2xhZGRlcicsIGZyb206IDEzLCB0bzogMjMgfSxcclxuICAgICAgICAgIHsgdHlwZTogJ2xhZGRlcicsIGZyb206IDI4LCB0bzogMzEgfSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgdGhpcy5sb2FkLm9uKCdwcm9ncmVzcycsICh2YWx1ZSkgPT4ge1xyXG4gICAgICBsb2FkaW5nQXNzZXRzKHRoaXMsIHZhbHVlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlICgpIHtcclxuICAgIHRoaXMuZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBsb2dzLyR7dGhpcy5nYW1lSWR9YCk7XHJcbiAgICBpZiAodHlwZW9mIChTdG9yYWdlKSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZ2FtZUlkJywgdGhpcy5nYW1lSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBkaWNlVmFsdWU7XHJcbiAgICBjb25zdCBzdGFydERhdGUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCkuc3BsaXQoJyAnKTtcclxuICAgIGNvbnN0IHN0YXJ0VGltZSA9IGAke3N0YXJ0RGF0ZVsyXX0gJHtzdGFydERhdGVbMV19ICR7c3RhcnREYXRlWzNdfSwgJHtzdGFydERhdGVbNF19IGA7XHJcbiAgICBEQVRBX1NUT1JFID0ge1xyXG4gICAgICBpZDogdGhpcy5nYW1lSWQsXHJcbiAgICAgIHN0YXJ0OiBzdGFydFRpbWUsXHJcbiAgICAgIGVuZDogXCJcIixcclxuICAgICAgd2lubmVyOiBcIlwiLFxyXG4gICAgICBkYXRhTGlzdDoge31cclxuICAgIH07XHJcbiAgICB0aGlzLmdhbWVSZWYuc2V0KERBVEFfU1RPUkUpO1xyXG5cclxuICAgIHRoaXMucGxheWVycyA9IFtdO1xyXG4gICAgdGhpcy5wbGF5ZXJJbmRleCA9IDA7XHJcbiAgICB0aGlzLmJnID0gdGhpcy5hZGQuaW1hZ2UoMCwgMCwgdGhpcy50aGVtZSkuc2V0T3JpZ2luKDApO1xyXG4gICAgY29uc3QgdG9wTGVmdEluZm8gPSB0aGlzLmFkZC50ZXh0KDIwLCAyNSwgYCR7dGhpcy5udW1QbGF5ZXJzfSBQbGF5ZXJzYCwgeyAuLi5GT05UX1NUWUxFLCBmb250U2l6ZTogJzMwcHgnIH0pO1xyXG5cclxuICAgIGNvbnN0IGJvYXJkQ29udGFpbmVyID0gdGhpcy5hZGQuY29udGFpbmVyKDUwIC8gMiwgMTAwKTtcclxuICAgIHRoaXMudGlsZXMgPSBjcmVhdGVCb2FyZCh0aGlzLCB0aGlzLnNpemUsIDUwKTtcclxuICAgIGNvbnN0IHNuYWtlc0xhZGRlcnNQb3NpdGlvbiA9IHNldFNuYWtlQW5kTGFkZGVyKHRoaXMudGlsZXMsIHRoaXMuc25ha2VzQW5kTGFkZGVycyk7XHJcbiAgICBib2FyZENvbnRhaW5lci5hZGQodGhpcy50aWxlcyk7XHJcblxyXG4gICAgdGhpcy5wbGF5ZXJDb250YWluZXIgPSB0aGlzLmFkZC5jb250YWluZXIoNTAgLyAyLCAxMDApO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bVBsYXllcnM7IGkrKykge1xyXG4gICAgICBjb25zdCBwbGF5ZXIgPSBjcmVhdGVQbGF5ZXIodGhpcywgdGhpcy50aWxlc1swXSwgdGhpcy5jb2xvcnNbaV0pO1xyXG4gICAgICB0aGlzLnBsYXllcnMucHVzaChwbGF5ZXIpO1xyXG4gICAgICB0aGlzLnVwZGF0ZURhdGFzdG9yZShwbGF5ZXIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wbGF5ZXJDb250YWluZXIuYWRkKHRoaXMucGxheWVycyk7XHJcbiAgICB0aGlzLnBsYXllckNvbnRhaW5lci5icmluZ1RvVG9wKHRoaXMucGxheWVyc1t0aGlzLnBsYXllckluZGV4XSk7XHJcblxyXG4gICAgdGhpcy5wbGF5ZXJJbmZvID0gdGhpcy5hZGQudGV4dChcclxuICAgICAgdGhpcy5nYW1lLmNvbmZpZy53aWR0aCAvIDIsXHJcbiAgICAgIHRoaXMuZ2FtZS5jb25maWcuaGVpZ2h0IC0gODAsXHJcbiAgICAgIGAke3RoaXMucGxheWVyc1t0aGlzLnBsYXllckluZGV4XS5uYW1lfSdzIFR1cm5gLFxyXG4gICAgICB7IC4uLkZPTlRfU1RZTEUsIGZvbnRTaXplOiBcIjQwcHhcIiwgc3Ryb2tlVGhpY2tuZXNzOiA2IH1cclxuICAgICkuc2V0T3JpZ2luKDAuNSk7XHJcblxyXG4gICAgdGhpcy5oZWxwZXIgPSB0aGlzLmFkZC50ZXh0KFxyXG4gICAgICB0aGlzLmdhbWUuY29uZmlnLndpZHRoIC8gMixcclxuICAgICAgdGhpcy5nYW1lLmNvbmZpZy5oZWlnaHQgLSAyODAsXHJcbiAgICAgIFwiQ2xpY2sgRGljZSFcIixcclxuICAgICAgeyAuLi5GT05UX1NUWUxFLCBmb250U2l6ZTogJzI0cHgnLCBzdHJva2VUaGlja25lc3M6IDQgfVxyXG4gICAgKS5zZXRPcmlnaW4oMC41KTtcclxuXHJcbiAgICBjb25zdCBkaWNlID0gY3JlYXRlRGljZSh0aGlzLmdhbWUuY29uZmlnLndpZHRoIC8gMiwgdGhpcy5nYW1lLmNvbmZpZy5oZWlnaHQgLSAyMDAsIHRoaXMsIDEwMDApO1xyXG4gICAgdGhpcy5kaWNlQXJlYSA9IHRoaXMuYWRkLnJlY3RhbmdsZSh0aGlzLmdhbWUuY29uZmlnLndpZHRoIC8gMiwgdGhpcy5nYW1lLmNvbmZpZy5oZWlnaHQgLSAyMDAsIDEwMCwgMTAwLCAweGZmZmZmZiwgMCk7XHJcbiAgICB0aGlzLmRpY2VBcmVhLnNldEludGVyYWN0aXZlKCk7XHJcbiAgICB0aGlzLmRpY2VBcmVhLm9uKCdwb2ludGVydXAnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuaGVscGVyLnNldEFscGhhKDApO1xyXG4gICAgICBkaWNlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIGRpY2VWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuZGljZUFyZWEucmVtb3ZlSW50ZXJhY3RpdmUoKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuY2hlY2sodGhpcy5wbGF5ZXJzW3RoaXMucGxheWVySW5kZXhdLCBkaWNlVmFsdWUpO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGNsb3NlID0gY2xvc2VCdXR0b24odGhpcywgdGhpcy5nYW1lLmNvbmZpZy53aWR0aCAtIDUwLCA1MCwgKCkgPT4ge1xyXG4gICAgICBpZiAoY29uZmlybSgnUXVpdCB0aGUgZ2FtZT8nKSkge1xyXG4gICAgICAgIGNvbnN0IGVuZERhdGUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCkuc3BsaXQoJyAnKTtcclxuICAgICAgICBjb25zdCBlbmRUaW1lID0gYCR7ZW5kRGF0ZVsyXX0gJHtlbmREYXRlWzFdfSAke2VuZERhdGVbM119LCAke2VuZERhdGVbNF19IGA7XHJcbiAgICAgICAgREFUQV9TVE9SRS5lbmQgPSBlbmRUaW1lO1xyXG4gICAgICAgIHRoaXMuZ2FtZVJlZi5zZXQoREFUQV9TVE9SRSk7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgZ2FtZS5kZXN0cm95KHRydWUpO1xyXG4gICAgICAgICAgY29uc3QgbmV3R2FtZSA9IG5ldyBQaGFzZXIuR2FtZShHQU1FX0NPTkZJRyk7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5ldmVudHMub24oJ3Jlc3VtZScsIChzY2VuZSwgZGF0YSkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBsYXllcih0aGlzLnBsYXllcnNbdGhpcy5wbGF5ZXJJbmRleF0sIGRhdGEsIGRpY2VWYWx1ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNoZWNrIChwbGF5ZXIsIGRpY2VWYWx1ZSkge1xyXG4gICAgY29uc3QgY3VycmVudFBvc2l0aW9uID0gcGxheWVyLmRhdGEudmFsdWVzLnBvc2l0aW9uO1xyXG4gICAgaWYgKGN1cnJlbnRQb3NpdGlvbiArIGRpY2VWYWx1ZSA8PSB0aGlzLnNpemUgKiB0aGlzLnNpemUpIHtcclxuICAgICAgdGhpcy5zY2VuZS5wYXVzZSh0aGlzKTtcclxuICAgICAgdGhpcy5zY2VuZS5sYXVuY2goJ1F1ZXN0aW9uTWVudScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jaGFuZ2VQbGF5ZXJJbmRleCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlUGxheWVyICh0YXJnZXQsIHF1aXpEYXRhLCBkaWNlVmFsdWUpIHtcclxuICAgIGxldCBxdWl6ID0gdGFyZ2V0LmRhdGEudmFsdWVzLnF1aXo7XHJcbiAgICBxdWl6LnB1c2gocXVpekRhdGEpO1xyXG4gICAgdGFyZ2V0LmRhdGEudmFsdWVzLnJvbGxUb3RhbCArPSAxO1xyXG5cclxuICAgIGlmIChxdWl6RGF0YS5pc0NvcnJlY3QpIHtcclxuICAgICAgdGFyZ2V0LmRhdGEudmFsdWVzLmNvcnJlY3RBbnN3ZXJUb3RhbCArPSAxO1xyXG4gICAgICB0aGlzLm1vdmVQbGF5ZXIodGFyZ2V0LCB0YXJnZXQuZGF0YS52YWx1ZXMucG9zaXRpb24sIGRpY2VWYWx1ZSwgdGhpcy50aWxlcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0YXJnZXQuZGF0YS52YWx1ZXMud3JvbmdBbnN3ZXJUb3RhbCArPSAxO1xyXG4gICAgICB0aGlzLnVwZGF0ZURhdGFzdG9yZSh0YXJnZXQpO1xyXG4gICAgICB0aGlzLmNoYW5nZVBsYXllckluZGV4KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtb3ZlUGxheWVyIChwbGF5ZXIsIGN1cnJlbnRQb3NpdGlvbiwgdmFsdWUsIHRpbGVMaXN0KSB7XHJcbiAgICBpZiAodmFsdWUgPiAwKSB7XHJcbiAgICAgIGNvbnN0IHRpbGUgPSB0aWxlTGlzdFtjdXJyZW50UG9zaXRpb25dO1xyXG4gICAgICB2YWx1ZS0tO1xyXG4gICAgICB0aGlzLnR3ZWVucy5hZGQoe1xyXG4gICAgICAgIHRhcmdldHM6IHBsYXllcixcclxuICAgICAgICB4OiB0aWxlLnggKyB0aWxlLndpZHRoIC8gMixcclxuICAgICAgICB5OiB0aWxlLnkgKyB0aWxlLndpZHRoIC8gMixcclxuICAgICAgICBlYXNlOiAnTGluZWFyJyxcclxuICAgICAgICBkdXJhdGlvbjogMzAwLFxyXG4gICAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcclxuICAgICAgICAgIGN1cnJlbnRQb3NpdGlvbisrO1xyXG4gICAgICAgICAgdGhpcy5tb3ZlUGxheWVyKHBsYXllciwgY3VycmVudFBvc2l0aW9uLCB2YWx1ZSwgdGlsZUxpc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCB0aWxlID0gdGlsZUxpc3RbY3VycmVudFBvc2l0aW9uIC0gMV07XHJcbiAgICAgIGlmICh0aWxlLmdldERhdGEoJ21vdmVUbycpKSB7XHJcbiAgICAgICAgLy8gaWYgb24gc25ha2Ugb3IgbGFkZGVyXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmZvcmNlTW92ZShwbGF5ZXIsIHRpbGUuZ2V0RGF0YSgnbW92ZVRvJyksIHRpbGVMaXN0KTtcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHBsYXllci5kYXRhLnZhbHVlcy5wb3NpdGlvbiA9IHRpbGUubmFtZTtcclxuICAgICAgICBpZiAocGxheWVyLmRhdGEudmFsdWVzLnBvc2l0aW9uID49IHRoaXMuc2l6ZSAqIHRoaXMuc2l6ZSkge1xyXG4gICAgICAgICAgdGhpcy53aW5Db25kaXRpb24ocGxheWVyKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVEYXRhc3RvcmUocGxheWVyKTtcclxuICAgICAgICB0aGlzLmNoYW5nZVBsYXllckluZGV4KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZvcmNlTW92ZSAocGxheWVyLCB0YXJnZXRQb3NpdGlvbiwgdGlsZUxpc3QpIHtcclxuICAgIGNvbnN0IHRpbGUgPSB0aWxlTGlzdFt0YXJnZXRQb3NpdGlvbiAtIDFdO1xyXG4gICAgdGhpcy50d2VlbnMuYWRkKHtcclxuICAgICAgdGFyZ2V0czogcGxheWVyLFxyXG4gICAgICB4OiB0aWxlLnggKyB0aWxlLndpZHRoIC8gMixcclxuICAgICAgeTogdGlsZS55ICsgdGlsZS53aWR0aCAvIDIsXHJcbiAgICAgIGVhc2U6ICdMaW5lYXInLFxyXG4gICAgICBkdXJhdGlvbjogNjAwLFxyXG4gICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgcGxheWVyLmRhdGEudmFsdWVzLnBvc2l0aW9uID0gdGlsZS5uYW1lOyAvLyBzZXQgbmV3IHBvc2l0aW9uIGFmdGVyIG1vdmVkXHJcbiAgICAgICAgdGhpcy51cGRhdGVEYXRhc3RvcmUocGxheWVyKTtcclxuICAgICAgICB0aGlzLmNoYW5nZVBsYXllckluZGV4KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlUGxheWVySW5kZXggKCkge1xyXG4gICAgbGV0IGluZGV4ID0gKHRoaXMucGxheWVySW5kZXggKyAxKSAlIHRoaXMubnVtUGxheWVycztcclxuICAgIHRoaXMucGxheWVySW5kZXggPSBpbmRleDtcclxuICAgIHRoaXMucGxheWVySW5mby5zZXRBbHBoYSgwKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLnBsYXllckNvbnRhaW5lci5icmluZ1RvVG9wKHRoaXMucGxheWVyc1tpbmRleF0pO1xyXG4gICAgICB0aGlzLnBsYXllckluZm8uc2V0VGV4dChgJHt0aGlzLnBsYXllcnNbaW5kZXhdLm5hbWV9J3MgVHVybmApLnNldEFscGhhKDEpOztcclxuICAgICAgdGhpcy5oZWxwZXIuc2V0QWxwaGEoMSk7XHJcbiAgICAgIHRoaXMuZGljZUFyZWEuc2V0SW50ZXJhY3RpdmUoKTtcclxuICAgIH0sIDEwMDApO1xyXG4gIH1cclxuXHJcbiAgd2luQ29uZGl0aW9uIChwbGF5ZXIpIHtcclxuICAgIHBsYXllci5kYXRhLnZhbHVlcy5pc1dvbiA9IHRydWU7XHJcbiAgICB0aGlzLnVwZGF0ZURhdGFzdG9yZShwbGF5ZXIpO1xyXG5cclxuICAgIGNvbnN0IGVuZERhdGUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCkuc3BsaXQoJyAnKTtcclxuICAgIGNvbnN0IGVuZFRpbWUgPSBgJHtlbmREYXRlWzJdfSAke2VuZERhdGVbMV19ICR7ZW5kRGF0ZVszXX0sICR7ZW5kRGF0ZVs0XX0gYDtcclxuICAgIERBVEFfU1RPUkUuZW5kID0gZW5kVGltZTtcclxuICAgIERBVEFfU1RPUkUud2lubmVyID0gcGxheWVyLm5hbWU7XHJcbiAgICB0aGlzLmdhbWVSZWYuY2hpbGQoJ2VuZCcpLnNldChEQVRBX1NUT1JFLmVuZCk7XHJcbiAgICB0aGlzLmdhbWVSZWYuY2hpbGQoJ3dpbm5lcicpLnNldChEQVRBX1NUT1JFLndpbm5lcik7XHJcblxyXG4gICAgdGhpcy5wbGF5ZXJJbmZvLnNldEFscGhhKDApO1xyXG4gICAgd2luUG9wdXAodGhpcywgcGxheWVyKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmhlbHBlci5zZXRUZXh0KFwiQ2xpY2sgQW55d2hlcmUgdG8gUXVpdFwiKS5zZXRBbHBoYSgxKTtcclxuICAgICAgdGhpcy5iZy5zZXRJbnRlcmFjdGl2ZSgpO1xyXG5cclxuICAgICAgdGhpcy5iZy5vbigncG9pbnRlcnVwJywgKCkgPT4ge1xyXG4gICAgICAgIGdhbWUuZGVzdHJveSh0cnVlKTtcclxuICAgICAgICBjb25zdCBuZXdHYW1lID0gbmV3IFBoYXNlci5HYW1lKEdBTUVfQ09ORklHKTtcclxuICAgICAgfSk7XHJcbiAgICB9LCAyMDAwKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZURhdGFzdG9yZSAocGxheWVyKSB7XHJcbiAgICBpZiAodHlwZW9mIChTdG9yYWdlKSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShwbGF5ZXIubmFtZSwgSlNPTi5zdHJpbmdpZnkocGxheWVyLmRhdGEubGlzdCkpO1xyXG4gICAgICBjb25zdCBmcm9tU3RvcmFnZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHBsYXllci5uYW1lKTtcclxuICAgICAgREFUQV9TVE9SRS5kYXRhTGlzdFtwbGF5ZXIubmFtZV0gPSBKU09OLnBhcnNlKGZyb21TdG9yYWdlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIERBVEFfU1RPUkUuZGF0YUxpc3RbcGxheWVyLm5hbWVdID0gcGxheWVyLmRhdGEubGlzdDtcclxuICAgIH1cclxuICAgIHRoaXMuZ2FtZVJlZi5jaGlsZCgnZGF0YUxpc3QnKS5zZXQoREFUQV9TVE9SRS5kYXRhTGlzdCk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgRk9OVF9TVFlMRSB9IGZyb20gXCIuLi9tYWluLmpzXCI7XHJcbmltcG9ydCB7IGNsb3NlQnV0dG9uIH0gZnJvbSBcIi4uL2dhbWUtb2JqZWN0cy9jbG9zZUJ1dHRvbi5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG93VG9QbGF5U2NlbmUgZXh0ZW5kcyBQaGFzZXIuU2NlbmUge1xyXG4gIGNvbnN0cnVjdG9yICgpIHtcclxuICAgIHN1cGVyKHsga2V5OiAnSG93VG9QbGF5U2NlbmUnIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJlbG9hZCAoKSB7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3R1dG9yaWFsLWlkJywgJy4vYXNzZXRzL3R1dG9yaWFsLWlkbi53ZWJwJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3R1dG9yaWFsLWVuJywgJy4vYXNzZXRzL3R1dG9yaWFsLWVuZy53ZWJwJyk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGUgKCkge1xyXG4gICAgdGhpcy5pc0VuZ2xpc2ggPSBmYWxzZTtcclxuICAgIGNvbnN0IGJnID0gdGhpcy5hZGQuc3ByaXRlKDAsIDAsICdiYWNrZ3JvdW5kJyk7XHJcbiAgICBiZy5zZXRPcmlnaW4oMCk7XHJcblxyXG4gICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5hZGQuY29udGFpbmVyKHRoaXMuZ2FtZS5jb25maWcud2lkdGggLyAyLCB0aGlzLmdhbWUuY29uZmlnLmhlaWdodCAvIDIpO1xyXG4gICAgY29uc3QgY29udGVudCA9IHRoaXMuYWRkLmltYWdlKDAsIDAsICd0dXRvcmlhbC1pZCcpO1xyXG4gICAgY29uc3QgY2hhbmdlQnV0dG9uID0gdGhpcy5hZGQucmVjdGFuZ2xlKDAsIDQwMCwgNjAwLCAxMDAsIDB4ZmZmZmZmLCAwKTtcclxuICAgIGNvbnN0IGJ1dHRvblRleHQgPSB0aGlzLmFkZC50ZXh0KGNoYW5nZUJ1dHRvbi54LCBjaGFuZ2VCdXR0b24ueSwgXCJDaGFuZ2UgbGFuZ3VhZ2VcIiwgeyAuLi5GT05UX1NUWUxFLCBmb250U2l6ZTogJzMwcHgnIH0pLnNldE9yaWdpbigwLjUpO1xyXG4gICAgY2hhbmdlQnV0dG9uLnNldEludGVyYWN0aXZlKCk7XHJcbiAgICBjaGFuZ2VCdXR0b24ub24oJ3BvaW50ZXJkb3duJywgKCkgPT4ge1xyXG4gICAgICBjaGFuZ2VCdXR0b24uZmlsbEFscGhhID0gMC4yO1xyXG4gICAgfSk7XHJcbiAgICBjaGFuZ2VCdXR0b24ub24oJ3BvaW50ZXJ1cCcsICgpID0+IHtcclxuICAgICAgY2hhbmdlQnV0dG9uLmZpbGxBbHBoYSA9IDA7XHJcbiAgICAgIHRoaXMuY2hhbmdlTGFuZyhjb250ZW50LCBidXR0b25UZXh0KTtcclxuICAgIH0pO1xyXG4gICAgY29udGFpbmVyLmFkZChbY29udGVudCwgY2hhbmdlQnV0dG9uLCBidXR0b25UZXh0XSk7XHJcblxyXG4gICAgY29uc3QgY2xvc2UgPSBjbG9zZUJ1dHRvbih0aGlzLCB0aGlzLmdhbWUuY29uZmlnLndpZHRoIC0gNTAsIDUwLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuc2NlbmUuc3RvcCh0aGlzKTtcclxuICAgICAgdGhpcy5zY2VuZS5yZXN1bWUoJ01haW5NZW51U2NlbmUnKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlTGFuZyAoY29udGVudCwgYnV0dG9uVGV4dCkge1xyXG4gICAgdGhpcy5pc0VuZ2xpc2ggPSAhdGhpcy5pc0VuZ2xpc2g7XHJcbiAgICBpZiAodGhpcy5pc0VuZ2xpc2ggPT09IHRydWUpIHtcclxuICAgICAgY29udGVudC5zZXRUZXh0dXJlKCd0dXRvcmlhbC1lbicpO1xyXG4gICAgICBidXR0b25UZXh0LnNldFRleHQoJ0dhbnRpIGJhaGFzYScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29udGVudC5zZXRUZXh0dXJlKCd0dXRvcmlhbC1pZCcpO1xyXG4gICAgICBidXR0b25UZXh0LnNldFRleHQoJ0NoYW5nZSBsYW5ndWFnZScpO1xyXG4gICAgfVxyXG4gIH1cclxufSIsImltcG9ydCB7IGxvYWRpbmdBc3NldHMgfSBmcm9tIFwiLi4vZ2FtZS1vYmplY3RzL2xvYWRlci5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZGluZ1NjZW5lIGV4dGVuZHMgUGhhc2VyLlNjZW5lIHtcclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICBzdXBlcih7IGtleTogJ0xvYWRpbmdTY2VuZScgfSk7XHJcbiAgfVxyXG4gIHByZWxvYWQgKCkge1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdjbG9zZS1idXR0b24nLCAnLi9hc3NldHMvY2xvc2UtYnRuLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdtYWluLWJ1dHRvbicsICcuL2Fzc2V0cy9idXR0b24tbWFpbi5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnaW5zdGFsLWJ1dHRvbicsICcuL2Fzc2V0cy9idXR0b24tYWRkb24ucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ2JhY2tncm91bmQnLCAnLi9hc3NldHMvbWFpbi1iYWNrZ3JvdW5kLndlYnAnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgncGljay1tZW51JywgJy4vYXNzZXRzL21lbnUtYmcud2VicCcpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdmb3Jlc3QtYm9hcmQnLCAnLi9hc3NldHMvYm9hcmQtZm9yZXN0LndlYnAnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnc3BhY2UtYm9hcmQnLCAnLi9hc3NldHMvYm9hcmQtc3BhY2Uud2VicCcpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdmb3Jlc3QtaW1nJywgJy4vYXNzZXRzL3RodW1ibmFpbC1mb3Jlc3Qud2VicCcpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdzcGFjZS1pbWcnLCAnLi9hc3NldHMvdGh1bWJuYWlsLXNwYWNlLndlYnAnKTtcclxuICAgIHRoaXMubG9hZC5vbigncHJvZ3Jlc3MnLCAodmFsdWUpID0+IHtcclxuICAgICAgbG9hZGluZ0Fzc2V0cyh0aGlzLCB2YWx1ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgY3JlYXRlICgpIHtcclxuICAgIHRoaXMuc2NlbmUuc3RhcnQoJ01haW5NZW51U2NlbmUnKTtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBGT05UX1NUWUxFIH0gZnJvbSBcIi4uL21haW4uanNcIjtcclxuXHJcbmNvbnN0IGJlZm9yZUluc3RhbGxQcm9tcHQgPSAoY2FsbGJhY2spID0+IHtcclxuICBsZXQgaW5zdGFsbFByb21wdCA9IG51bGw7XHJcbiAgbGV0IHNob3dCdXR0b24gPSBmYWxzZTtcclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JlaW5zdGFsbHByb21wdCcsIGV2ZW50ID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBpbnN0YWxsUHJvbXB0ID0gZXZlbnQ7XHJcbiAgICBzaG93QnV0dG9uID0gdHJ1ZTtcclxuICAgIGNhbGxiYWNrKGluc3RhbGxQcm9tcHQpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgY3JlYXRlTWFpbkJ1dHRvbiA9IChzY2VuZSwgaXNNYWluLCB4LCB5LCB0ZXh0LCBjYWxsYmFjaykgPT4ge1xyXG4gIGNvbnN0IGNvbnRhaW5lciA9IHNjZW5lLmFkZC5jb250YWluZXIoeCwgeSk7XHJcblxyXG4gIGNvbnN0IGJ1dHRvbiA9IGlzTWFpbiA9PT0gdHJ1ZSA/IHNjZW5lLmFkZC5zcHJpdGUoMCwgMCwgJ21haW4tYnV0dG9uJykgOiBzY2VuZS5hZGQuc3ByaXRlKDAsIDAsICdpbnN0YWwtYnV0dG9uJyk7XHJcbiAgY29uc3QgYnRuVGV4dCA9IGlzTWFpbiA9PT0gdHJ1ZSA/IHNjZW5lLmFkZC50ZXh0KDAsIDAsIHRleHQsIHsgLi4uRk9OVF9TVFlMRSwgZmlsbDogJyMwMDAnLCBzdHJva2VUaGlja25lc3M6IDAgfSkgOiBzY2VuZS5hZGQudGV4dCgwLCAwLCB0ZXh0LCB7IC4uLkZPTlRfU1RZTEUsIHN0cm9rZVRoaWNrbmVzczogMCB9KTtcclxuICBidG5UZXh0LnNldE9yaWdpbigwLjUpO1xyXG4gIGJ1dHRvbi5zZXRJbnRlcmFjdGl2ZSgpO1xyXG4gIGJ1dHRvbi5vbigncG9pbnRlcmRvd24nLCAoKSA9PiB7XHJcbiAgICBzY2VuZS50d2VlbnMuYWRkKHtcclxuICAgICAgdGFyZ2V0czogY29udGFpbmVyLFxyXG4gICAgICBzY2FsZTogMC44LFxyXG4gICAgICBkdXJhdGlvbjogMTAwLFxyXG4gICAgICB5b3lvOiB0cnVlLFxyXG4gICAgICBlYXNlOiAnU2luZS5lYXNlSW5PdXQnLFxyXG4gICAgICBvbkNvbXBsZXRlOiBjYWxsYmFja1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgY29udGFpbmVyLmFkZChbYnV0dG9uLCBidG5UZXh0XSk7XHJcbiAgcmV0dXJuIGNvbnRhaW5lcjtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5NZW51U2NlbmUgZXh0ZW5kcyBQaGFzZXIuU2NlbmUge1xyXG4gIGNvbnN0cnVjdG9yICgpIHtcclxuICAgIHN1cGVyKHsga2V5OiAnTWFpbk1lbnVTY2VuZScgfSk7XHJcbiAgfVxyXG4gIGluaXQgKGRhdGEpIHtcclxuICAgIHRoaXMuZm9udFN0eWxlID0gZGF0YTtcclxuICB9XHJcblxyXG4gIHByZWxvYWQgKCkge1xyXG4gICAgdGhpcy5jb2xvckxpc3QgPSBbXHJcbiAgICAgIHsgbmFtZTogJ1JlZCcsIGtleTogMHhmZjAwMDAsIGhleDogJyNmMDAnIH0sXHJcbiAgICAgIHsgbmFtZTogJ0dyZWVuJywga2V5OiAweDAwZmYwMCwgaGV4OiAnIzBmMCcgfSxcclxuICAgICAgeyBuYW1lOiAnQmx1ZScsIGtleTogMHgwMDAwZmYsIGhleDogJyMwMGYnIH0sXHJcbiAgICAgIHsgbmFtZTogJ1llbGxvdycsIGtleTogMHhmZmZmMDAsIGhleDogJyNmZjAnIH1cclxuICAgIF07XHJcbiAgfVxyXG5cclxuICBjcmVhdGUgKCkge1xyXG4gICAgY29uc3QgZm9udEZhbWlseSA9ICdWZXJkYW5hLCBcIlRpbWVzIE5ldyBSb21hblwiLCBUYWhvbWEsIHNlcmlmJztcclxuICAgIHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAnYmFja2dyb3VuZCcpLnNldE9yaWdpbigwKTtcclxuXHJcbiAgICB0aGlzLmFkZC50ZXh0KFxyXG4gICAgICB0aGlzLmdhbWUuY29uZmlnLndpZHRoIC8gMixcclxuICAgICAgdGhpcy5nYW1lLmNvbmZpZy5oZWlnaHQgLyAyIC0gMjIwLFxyXG4gICAgICAnU25ha2VzIGFuZCBMYWRkZXJzJyxcclxuICAgICAgeyBmb250RmFtaWx5OiBmb250RmFtaWx5LCBmb250U2l6ZTogJzMwcHgnLCBmb250U3R5bGU6ICdib2xkJyB9XHJcbiAgICApLnNldE9yaWdpbigwLjUpO1xyXG4gICAgdGhpcy5hZGQudGV4dChcclxuICAgICAgdGhpcy5nYW1lLmNvbmZpZy53aWR0aCAvIDIsXHJcbiAgICAgIHRoaXMuZ2FtZS5jb25maWcuaGVpZ2h0IC8gMiAtIDE4MCxcclxuICAgICAgJ3dpdGggU2ltcGxlIE1hdGggUXVpenplcycsXHJcbiAgICAgIHsgZm9udEZhbWlseTogZm9udEZhbWlseSwgZm9udFNpemU6ICczMHB4JywgZm9udFN0eWxlOiAnYm9sZCcgfVxyXG4gICAgKS5zZXRPcmlnaW4oMC41KTtcclxuXHJcbiAgICBjb25zdCBidG5YID0gdGhpcy5nYW1lLmNvbmZpZy53aWR0aCAvIDI7XHJcbiAgICBjb25zdCBpbml0QnRuWSA9IHRoaXMuZ2FtZS5jb25maWcuaGVpZ2h0IC8gMiAtIDUwO1xyXG4gICAgY3JlYXRlTWFpbkJ1dHRvbih0aGlzLCB0cnVlLCBidG5YLCBpbml0QnRuWSwgXCJQbGF5IEdhbWVcIiwgKCkgPT4ge1xyXG4gICAgICB0aGlzLnNjZW5lLnBhdXNlKHRoaXMpO1xyXG4gICAgICB0aGlzLnNjZW5lLmxhdW5jaCgnUGlja1BsYXllck1lbnUnLCB0aGlzLmNvbG9yTGlzdCk7XHJcbiAgICB9KTtcclxuICAgIGNyZWF0ZU1haW5CdXR0b24odGhpcywgdHJ1ZSwgYnRuWCwgaW5pdEJ0blkgKyAxNjAsIFwiSG93IHRvIFBsYXlcIiwgKCkgPT4ge1xyXG4gICAgICB0aGlzLnNjZW5lLnBhdXNlKHRoaXMpO1xyXG4gICAgICB0aGlzLnNjZW5lLmxhdW5jaCgnSG93VG9QbGF5U2NlbmUnKTtcclxuICAgIH0pO1xyXG4gICAgY3JlYXRlTWFpbkJ1dHRvbih0aGlzLCB0cnVlLCBidG5YLCBpbml0QnRuWSArIDMyMCwgXCJQbGVhc2UgUmV2aWV3XCIsICgpID0+IHtcclxuICAgICAgLy8gd2luZG93Lm9wZW4oJ2h0dHBzOi8vZm9ybXMuZ2xlL3dnMUpyeW9zZjlGdUxUZXM1JywgJ19ibGFuaycpO1xyXG4gICAgICBhbGVydCgnRm9ybSByZXZpZXcgc2VkYW5nIHRpZGFrIGFrdGlmIHwgUmV2aWV3IGZvcm0gaXMgY3VycmVudGx5IGluYWN0aXZlJyk7XHJcbiAgICB9KTtcclxuICAgIGJlZm9yZUluc3RhbGxQcm9tcHQoKGV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IGluc3RhbGxCdG4gPSBjcmVhdGVNYWluQnV0dG9uKHRoaXMsIGZhbHNlLCBidG5YLCB0aGlzLmdhbWUuY29uZmlnLmhlaWdodCAtIDEwMCwgXCJBZGQgdG8gSG9tZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgZXZlbnQucHJvbXB0KCk7XHJcbiAgICAgICAgZXZlbnQudXNlckNob2ljZS50aGVuKChjaG9pY2UpID0+IHtcclxuICAgICAgICAgIGlmIChjaG9pY2Uub3V0Y29tZSA9PT0gJ2FjY2VwdGVkJykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnVXNlciBhY2NlcHRlZCB0aGUgQTJIUyBwcm9tcHQnKTtcclxuICAgICAgICAgICAgaW5zdGFsbEJ0bi5zZXRWaXNpYmxlKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5yZXN0YXJ0KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZXZlbnQgPSBudWxsO1xyXG4gICAgICB9KTtcclxuICAgICAgaWYgKCFldmVudCkge1xyXG4gICAgICAgIGluc3RhbGxCdG4uc2V0VmlzaWJsZShmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBjbG9zZUJ1dHRvbiB9IGZyb20gXCIuLi9nYW1lLW9iamVjdHMvY2xvc2VCdXR0b24uanNcIjtcclxuaW1wb3J0IHsgRk9OVF9TVFlMRSB9IGZyb20gXCIuLi9tYWluLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaWNrUGxheWVyTWVudSBleHRlbmRzIFBoYXNlci5TY2VuZSB7XHJcbiAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgc3VwZXIoeyBrZXk6ICdQaWNrUGxheWVyTWVudScgfSk7XHJcbiAgfVxyXG5cclxuICBpbml0IChkYXRhKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBbMiwgMywgNF07XHJcbiAgICB0aGlzLmNvbG9ycyA9IGRhdGE7XHJcbiAgICB0aGlzLmJvYXJkVGhlbWUgPSAnZm9yZXN0LWJvYXJkJztcclxuICB9XHJcblxyXG4gIGNyZWF0ZSAoKSB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmFkZC5jb250YWluZXIodGhpcy5nYW1lLmNvbmZpZy53aWR0aCAvIDIsIC01MDApO1xyXG5cclxuICAgIGNvbnN0IGJhY2tncm91bmQgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ3BpY2stbWVudScpO1xyXG4gICAgY29udGFpbmVyLmFkZChiYWNrZ3JvdW5kKTtcclxuXHJcbiAgICBjb25zdCBib2FyZDEgPSB0aGlzLmJvYXJkQ2hlY2soYmFja2dyb3VuZC54IC0gMTIwLCAtMjAwLCAnZm9yZXN0LWltZycpO1xyXG4gICAgYm9hcmQxLnN0cm9rZS5zZXRTdHJva2VTdHlsZSg1LCAweGZmZmZmZik7XHJcbiAgICBjb25zdCBib2FyZDIgPSB0aGlzLmJvYXJkQ2hlY2soYmFja2dyb3VuZC54ICsgMTIwLCAtMjAwLCAnc3BhY2UtaW1nJyk7XHJcblxyXG4gICAgYm9hcmQxLmltZy5vbigncG9pbnRlcnVwJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLmNob29zZUJvYXJkKGJvYXJkMS5zdHJva2UsIGJvYXJkMi5zdHJva2UsICdmb3Jlc3QtYm9hcmQnKTtcclxuICAgIH0pO1xyXG4gICAgYm9hcmQyLmltZy5vbigncG9pbnRlcnVwJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLmNob29zZUJvYXJkKGJvYXJkMi5zdHJva2UsIGJvYXJkMS5zdHJva2UsICdzcGFjZS1ib2FyZCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29udGFpbmVyLmFkZChbYm9hcmQxLnN0cm9rZSwgYm9hcmQxLmltZ10pO1xyXG4gICAgY29udGFpbmVyLmFkZChbYm9hcmQyLnN0cm9rZSwgYm9hcmQyLmltZ10pO1xyXG5cclxuICAgIHRoaXMub3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IHtcclxuICAgICAgY29uc3QgYnRuWSA9IGJhY2tncm91bmQueSArIDUwICsgaW5kZXggKiAxMjA7XHJcbiAgICAgIHRoaXMuc3RhcnRCdXR0b24oY29udGFpbmVyLCBiYWNrZ3JvdW5kLngsIGJ0blksIG9wdGlvbiwgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2NlbmUuc3RhcnQoJ0dhbWVwbGF5U2NlbmUnLCB7IHRoZW1lOiB0aGlzLmJvYXJkVGhlbWUsIG51bWJlck9mUGxheWVyczogb3B0aW9uLCBjb2xvcnM6IHRoaXMuY29sb3JzLnNsaWNlKDAsIG9wdGlvbikgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgY2xvc2UgPSBjbG9zZUJ1dHRvbih0aGlzLCBiYWNrZ3JvdW5kLnggKyAxMCArIGJhY2tncm91bmQud2lkdGggLyAyLCBiYWNrZ3JvdW5kLnkgLSAxMCAtIGJhY2tncm91bmQuaGVpZ2h0IC8gMiwgKCkgPT4ge1xyXG4gICAgICB0aGlzLnR3ZWVucy5hZGQoe1xyXG4gICAgICAgIHRhcmdldHM6IGNvbnRhaW5lcixcclxuICAgICAgICB5OiAtNTAwLFxyXG4gICAgICAgIGR1cmF0aW9uOiA1MDAsXHJcbiAgICAgICAgZWFzZTogJ0N1YmljLmVhc2VJbicsXHJcbiAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zY2VuZS5zdG9wKHRoaXMpO1xyXG4gICAgICAgICAgdGhpcy5zY2VuZS5yZXN1bWUoJ01haW5NZW51U2NlbmUnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBjb250YWluZXIuYWRkKGNsb3NlKTtcclxuXHJcbiAgICB0aGlzLnR3ZWVucy5hZGQoe1xyXG4gICAgICB0YXJnZXRzOiBjb250YWluZXIsXHJcbiAgICAgIHk6IHRoaXMuZ2FtZS5jb25maWcuaGVpZ2h0IC8gMixcclxuICAgICAgZHVyYXRpb246IDcwMCxcclxuICAgICAgZWFzZTogJ0N1YmljLmVhc2VPdXQnXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGJvYXJkQ2hlY2sgKHgsIHksIHRoZW1lKSB7XHJcbiAgICBjb25zdCBzdHJva2UgPSB0aGlzLmFkZC5yZWN0YW5nbGUoeCwgeSwgMjAwLCAzMDAsIDB4MDAwMDAwKTtcclxuICAgIGNvbnN0IGltZyA9IHRoaXMuYWRkLmltYWdlKHgsIHksIHRoZW1lKTtcclxuICAgIGltZy5zZXRJbnRlcmFjdGl2ZSgpO1xyXG4gICAgcmV0dXJuIHsgc3Ryb2tlLCBpbWcgfTtcclxuICB9XHJcblxyXG4gIGNob29zZUJvYXJkICh0YXJnZXRUcnVlLCB0YXJnZXRGYWxzZSwgdGhlbWUpIHtcclxuICAgIHRoaXMuYm9hcmRUaGVtZSA9IHRoZW1lO1xyXG4gICAgdGFyZ2V0VHJ1ZS5zZXRTdHJva2VTdHlsZSg1LCAweGZmZmZmZik7XHJcbiAgICB0YXJnZXRGYWxzZS5pc1N0cm9rZWQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHN0YXJ0QnV0dG9uIChjb250YWluZXIsIHgsIHksIG9wdGlvbiwgY2FsbGJhY2spIHtcclxuICAgIGNvbnN0IHdpZHRoID0gNTAwO1xyXG4gICAgY29uc3QgaGVpZ2h0ID0gMTAwO1xyXG4gICAgY29uc3QgYnV0dG9uID0gdGhpcy5hZGQucmVjdGFuZ2xlKHgsIHksIHdpZHRoLCBoZWlnaHQsIDB4ZmZmZmZmLCAwKTtcclxuICAgIGJ1dHRvbi5zZXRJbnRlcmFjdGl2ZSgpO1xyXG4gICAgYnV0dG9uLm9uKCdwb2ludGVyb3ZlcicsICgpID0+IHtcclxuICAgICAgYnV0dG9uLmZpbGxBbHBoYSA9IDAuMjtcclxuICAgIH0pO1xyXG4gICAgYnV0dG9uLm9uKCdwb2ludGVyb3V0JywgKCkgPT4ge1xyXG4gICAgICBidXR0b24uZmlsbEFscGhhID0gMDtcclxuICAgIH0pO1xyXG4gICAgYnV0dG9uLm9uKCdwb2ludGVydXAnLCBjYWxsYmFjayk7XHJcbiAgICBjb250YWluZXIuYWRkKGJ1dHRvbik7XHJcblxyXG4gICAgY29uc3QgbnVtVGV4dCA9IHRoaXMuYWRkLnRleHQoXHJcbiAgICAgIHggLSB3aWR0aCAvIDIgKyAxMjAsXHJcbiAgICAgIHksXHJcbiAgICAgIGAke29wdGlvbn0gcGxheWVyc2AsXHJcbiAgICAgIHsgLi4uRk9OVF9TVFlMRSB9XHJcbiAgICApLnNldE9yaWdpbigwLjUpO1xyXG4gICAgY29udGFpbmVyLmFkZChudW1UZXh0KTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbjsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jb2xvcnNbaV0ua2V5O1xyXG4gICAgICBjb25zdCBjWCA9IHggKyAyMDtcclxuICAgICAgY29uc3QgcGF3biA9IHRoaXMuYWRkLmNpcmNsZShjWCArIGkgKiA2MCwgeSwgMjAsIGNvbG9yKTtcclxuICAgICAgcGF3bi5zZXRTdHJva2VTdHlsZSgyLCAweGZmZmZmZik7XHJcbiAgICAgIGNvbnRhaW5lci5hZGQocGF3bik7XHJcbiAgICB9XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgRk9OVF9TVFlMRSB9IGZyb20gXCIuLi9tYWluLmpzXCI7XHJcblxyXG5jbGFzcyBBbGVydCBleHRlbmRzIFBoYXNlci5HYW1lT2JqZWN0cy5Db250YWluZXIge1xyXG4gIGNvbnN0cnVjdG9yIChzY2VuZSwgeCwgeSkge1xyXG4gICAgc3VwZXIoc2NlbmUsIHgsIHkpO1xyXG4gICAgdGhpcy5mb250RmFtaWx5ID0gJ1ZlcmRhbmEsIFwiVGltZXMgTmV3IFJvbWFuXCIsIFRhaG9tYSwgc2VyaWYnO1xyXG4gICAgdGhpcy5zZXRWaXNpYmxlKGZhbHNlKTtcclxuICB9XHJcbiAgc2hvd0lzQ29ycmVjdCAoKSB7XHJcbiAgICB0aGlzLmNvcnJlY3QgPSB0aGlzLnNjZW5lLmFkZC5pbWFnZSgwLCAwLCAnY29ycmVjdC1hbGVydCcpO1xyXG4gICAgdGhpcy5hZGQodGhpcy5jb3JyZWN0KTtcclxuICAgIHRoaXMuc2V0VmlzaWJsZSh0cnVlKTtcclxuICB9XHJcbiAgc2hvd0lzV3JvbmcgKGNvcnJlY3QpIHtcclxuICAgIHRoaXMud3JvbmcgPSB0aGlzLnNjZW5lLmFkZC5pbWFnZSgwLCAwLCAnd3JvbmctYWxlcnQnKTtcclxuICAgIHRoaXMucmVzdWx0ID0gdGhpcy5zY2VuZS5hZGQudGV4dCgwLCA0MCwgYFRoZSBhbnN3ZXIgaXMgJHtjb3JyZWN0fWAsIHsgZm9udEZhbWlseTogdGhpcy5mb250RmFtaWx5LCBmb250U2l6ZTogJzMwcHgnLCBmaWxsOiAnI2ZmZicsIGZvbnRTdHlsZTogJ2JvbGQnIH0pLnNldE9yaWdpbigwLjUpO1xyXG4gICAgdGhpcy5hZGQoW3RoaXMud3JvbmcsIHRoaXMucmVzdWx0XSk7XHJcbiAgICB0aGlzLnNldFZpc2libGUodHJ1ZSk7XHJcbiAgfVxyXG4gIHNob3dUaW1lc1VwIChjb3JyZWN0KSB7XHJcbiAgICB0aGlzLnRpbWVzVXAgPSB0aGlzLnNjZW5lLmFkZC5pbWFnZSgwLCAwLCAndGltZXN1cC1hbGVydCcpO1xyXG4gICAgdGhpcy5yZXN1bHQgPSB0aGlzLnNjZW5lLmFkZC50ZXh0KDAsIDQwLCBgVGhlIGFuc3dlciBpcyAke2NvcnJlY3R9YCwgeyBmb250RmFtaWx5OiB0aGlzLmZvbnRGYW1pbHksIGZvbnRTaXplOiAnMzBweCcsIGZpbGw6ICcjZmZmJywgZm9udFN0eWxlOiAnYm9sZCcgfSkuc2V0T3JpZ2luKDAuNSk7XHJcbiAgICB0aGlzLmFkZChbdGhpcy50aW1lc1VwLCB0aGlzLnJlc3VsdF0pO1xyXG4gICAgdGhpcy5zZXRWaXNpYmxlKHRydWUpO1xyXG4gIH1cclxuICBoaWRlICgpIHtcclxuICAgIHRoaXMuc2V0VmlzaWJsZShmYWxzZSk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBDb3VudGRvd24gZXh0ZW5kcyBQaGFzZXIuR2FtZU9iamVjdHMuQ29udGFpbmVyIHtcclxuICBjb25zdHJ1Y3RvciAoc2NlbmUsIHgsIHkpIHtcclxuICAgIHN1cGVyKHNjZW5lLCB4LCB5KTtcclxuICAgIHRoaXMuYmFyID0gdGhpcy5zY2VuZS5hZGQucmVjdGFuZ2xlKHgsIHksIDYwMCwgNDAsIDB4ZmYwMDAwKTtcclxuICAgIHRoaXMudGltZXJUZXh0ID0gdGhpcy5zY2VuZS5hZGQudGV4dCh4LCB5LCBcIlwiLCB7IC4uLkZPTlRfU1RZTEUsIGZvbnRTaXplOiAnMzBweCcgfSkuc2V0T3JpZ2luKDAuNSk7XHJcbiAgfVxyXG4gIHJ1biAoZHVyYXRpb24sIGFsZXJ0LCBtYXRoKSB7XHJcbiAgICBsZXQgYmFyID0gdGhpcy5iYXI7XHJcbiAgICBsZXQgdGV4dCA9IHRoaXMudGltZXJUZXh0O1xyXG4gICAgdGV4dC5zZXRUZXh0KGBUaW1lcyByZW1haW5pbmc6ICR7ZHVyYXRpb259YCk7XHJcbiAgICB0aGlzLnNjZW5lLnR3ZWVucy5hZGQoe1xyXG4gICAgICB0YXJnZXRzOiBiYXIsXHJcbiAgICAgIHdpZHRoOiAwLFxyXG4gICAgICBlYXNlOiAnTGluZWFyJyxcclxuICAgICAgZHVyYXRpb246IGR1cmF0aW9uICogMTAwMCxcclxuICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2NlbmUuc2NlbmUucGF1c2UodGhpcy5zY2VuZSk7XHJcbiAgICAgICAgYWxlcnQuc2hvd1RpbWVzVXAobWF0aC5yZXN1bHQpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zY2VuZS5zY2VuZS5yZXN1bWUoJ0dhbWVwbGF5U2NlbmUnLCB7IHF1ZXN0aW9uOiBtYXRoLnF1ZXN0aW9uLCBjb3JyZWN0QW5zd2VyOiBtYXRoLnJlc3VsdCwgcGxheWVyQW5zd2VyOiAnJywgaXNDb3JyZWN0OiBmYWxzZSB9KTtcclxuICAgICAgICAgIHRoaXMuc2NlbmUuc2NlbmUuc3RvcCh0aGlzLnNjZW5lKTtcclxuICAgICAgICB9LCAyMDAwKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBsZXQgdGltZXMgPSB0aGlzLnNjZW5lLnRpbWUuYWRkRXZlbnQoe1xyXG4gICAgICBkZWxheTogMTAwMCxcclxuICAgICAgcmVwZWF0OiBkdXJhdGlvbiAtIDEsXHJcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHJlbWFpbnMgPSB0aW1lcy5nZXRSZXBlYXRDb3VudCgpO1xyXG4gICAgICAgIHRleHQuc2V0VGV4dChgVGltZXMgcmVtYWluaW5nOiAke3JlbWFpbnN9YCk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcbiAgc3RvcCAoKSB7XHJcblxyXG4gIH1cclxufVxyXG5cclxuY29uc3QgbWF0aE9wZXJhdGlvbiA9IChvcGVyYXRvcikgPT4ge1xyXG4gIGxldCBudW0xO1xyXG4gIGxldCBudW0yO1xyXG4gIGxldCByZXN1bHQ7XHJcbiAgc3dpdGNoIChvcGVyYXRvcikge1xyXG4gICAgY2FzZSAnw7cnOlxyXG4gICAgICBudW0yID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDIwIC0gMikgKyAyKTtcclxuICAgICAgZG8ge1xyXG4gICAgICAgIG51bTEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAwIC0gMikgKyAyKTtcclxuICAgICAgfSB3aGlsZSAobnVtMSAlIG51bTIgIT09IDAgfHwgbnVtMSA9PSBudW0yKTtcclxuICAgICAgcmVzdWx0ID0gbnVtMSAvIG51bTI7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnw5cnOlxyXG4gICAgICBkbyB7XHJcbiAgICAgICAgbnVtMSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgyMCAtIDIpICsgMik7XHJcbiAgICAgICAgbnVtMiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMDAgLSAyKSArIDIpO1xyXG4gICAgICB9IHdoaWxlIChudW0xICogbnVtMiA+PSAyMDApO1xyXG4gICAgICByZXN1bHQgPSBudW0xICogbnVtMjtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICcrJzpcclxuICAgICAgbnVtMSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMDAgLSAyKSArIDIpO1xyXG4gICAgICBudW0yID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwMCAtIDIpICsgMik7XHJcbiAgICAgIHJlc3VsdCA9IG51bTEgKyBudW0yO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJy0nOlxyXG4gICAgICBudW0yID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEyMCAtIDIpICsgMik7XHJcbiAgICAgIGRvIHtcclxuICAgICAgICBudW0xID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDIwMCAtIDIpICsgMik7XHJcbiAgICAgIH0gd2hpbGUgKG51bTEgPD0gbnVtMik7XHJcbiAgICAgIHJlc3VsdCA9IG51bTEgLSBudW0yO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxuICByZXR1cm4geyBxdWVzdGlvbjogYCR7bnVtMX0gJHtvcGVyYXRvcn0gJHtudW0yfWAsIHJlc3VsdDogcmVzdWx0LnRvU3RyaW5nKCkgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFF1ZXN0aW9uTWVudSBleHRlbmRzIFBoYXNlci5TY2VuZSB7XHJcbiAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgc3VwZXIoeyBrZXk6ICdRdWVzdGlvbk1lbnUnIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5pdCAoKSB7XHJcbiAgICB0aGlzLm51bXMgPSBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgJ0NMRUFSJywgMCwgJ09LJ107XHJcbiAgICB0aGlzLm9wcyA9IFsnw7cnLCAnw5cnLCAnKycsICctJ107XHJcbiAgfVxyXG5cclxuICBwcmVsb2FkICgpIHtcclxuICAgIHRoaXMub3BlcmF0b3IgPSB0aGlzLm9wc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLm9wcy5sZW5ndGgpXTtcclxuICAgIHRoaXMub3BlcmF0aW9uID0gbWF0aE9wZXJhdGlvbih0aGlzLm9wZXJhdG9yKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZSAoKSB7XHJcbiAgICB0aGlzLmFkZC5yZWN0YW5nbGUoMCwgMCwgdGhpcy5nYW1lLmNvbmZpZy53aWR0aCwgdGhpcy5nYW1lLmNvbmZpZy5oZWlnaHQsIDB4MDAwMDAwKS5zZXRPcmlnaW4oMCkuc2V0QWxwaGEoMC40KTtcclxuICAgIGxldCBidXR0b25MaXN0ID0gW107XHJcbiAgICBsZXQgaW5wdXRWYWx1ZSA9ICcnO1xyXG5cclxuICAgIGNvbnN0IHRpbWVyID0gbmV3IENvdW50ZG93bih0aGlzLCB0aGlzLmdhbWUuY29uZmlnLndpZHRoIC8gMiwgMTIwKTtcclxuICAgIGNvbnN0IHBvcEFsZXJ0ID0gbmV3IEFsZXJ0KHRoaXMsIHRoaXMuZ2FtZS5jb25maWcud2lkdGggLyAyLCB0aGlzLmdhbWUuY29uZmlnLmhlaWdodCAvIDIpO1xyXG4gICAgY29uc3QgZm9udEZhbWlseSA9ICdWZXJkYW5hLCBcIlRpbWVzIE5ldyBSb21hblwiLCBUYWhvbWEsIHNlcmlmJztcclxuICAgIGNvbnN0IGJ1dHRvbkNvbG9yID0gMHhmZmZmZmY7XHJcbiAgICBjb25zdCBob3ZlckNvbG9yID0gMHg4MDgwODA7XHJcbiAgICBjb25zdCBtYXRoID0gdGhpcy5vcGVyYXRpb247XHJcblxyXG4gICAgY29uc3QgYmcgPSB0aGlzLmFkZC5zcHJpdGUodGhpcy5nYW1lLmNvbmZpZy53aWR0aCAvIDIsIHRoaXMuZ2FtZS5jb25maWcuaGVpZ2h0IC8gMiwgJ3F1ZXN0aW9uLWJnJyk7XHJcbiAgICBjb25zdCBxdWVzdGlvblRleHQgPSB0aGlzLmFkZC50ZXh0KGJnLnggLSAyNjAsIGJnLnkgLSAyNjAsIG1hdGgucXVlc3Rpb24sIHsgZm9udEZhbWlseTogZm9udEZhbWlseSwgZm9udFNpemU6ICc0MHB4JywgZmlsbDogJyNmZmYnLCBmb250U3R5bGU6ICdib2xkJyB9KTtcclxuICAgIGNvbnN0IGVxdWFsID0gdGhpcy5hZGQudGV4dChiZy54IC0gMjYwLCBiZy55IC0gMjAwLCAnPSAnLCB7IGZvbnRGYW1pbHk6IGZvbnRGYW1pbHksIGZvbnRTaXplOiAnNDBweCcsIGZpbGw6ICcjZmZmJywgZm9udFN0eWxlOiAnYm9sZCcgfSk7XHJcblxyXG4gICAgY29uc3QgdGlsZVggPSBiZy54IC8gMiArIDEwO1xyXG4gICAgY29uc3QgdGlsZVkgPSBiZy5oZWlnaHQgLSA4NTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMzsgaisrKSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSBpICogMyArIGo7XHJcbiAgICAgICAgY29uc3QgeCA9IHRpbGVYICsgKGogKiAxOTApO1xyXG4gICAgICAgIGNvbnN0IHkgPSB0aWxlWSArIChpICogMTAwKTtcclxuICAgICAgICBjb25zdCBidXR0b25UaWxlID0gdGhpcy5hZGQucmVjdGFuZ2xlKHgsIHksIDE5MCwgMTAwLCBidXR0b25Db2xvcik7XHJcbiAgICAgICAgY29uc3QgdGV4dCA9IHRoaXMuYWRkLnRleHQoeCwgeSwgdGhpcy5udW1zW2luZGV4XSwgeyBmb250RmFtaWx5OiBmb250RmFtaWx5LCBmb250U2l6ZTogJzI0cHgnLCBmaWxsOiAnIzAwMCcsIGZvbnRTdHlsZTogJ2JvbGQnIH0pLnNldE9yaWdpbigwLjUpO1xyXG4gICAgICAgIGJ1dHRvblRpbGUubmFtZSA9IHRoaXMubnVtc1tpbmRleF07XHJcbiAgICAgICAgYnV0dG9uVGlsZS5zZXRJbnRlcmFjdGl2ZSgpO1xyXG4gICAgICAgIGJ1dHRvblRpbGUub24oJ3BvaW50ZXJvdmVyJywgKCkgPT4ge1xyXG4gICAgICAgICAgYnV0dG9uVGlsZS5maWxsQ29sb3IgPSBob3ZlckNvbG9yO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGJ1dHRvblRpbGUub24oJ3BvaW50ZXJvdXQnLCAoKSA9PiB7XHJcbiAgICAgICAgICBidXR0b25UaWxlLmZpbGxDb2xvciA9IGJ1dHRvbkNvbG9yO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGJ1dHRvblRpbGUub24oJ3BvaW50ZXJkb3duJywgKCkgPT4ge1xyXG4gICAgICAgICAgYnV0dG9uVGlsZS5maWxsQ29sb3IgPSBob3ZlckNvbG9yO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGJ1dHRvbkxpc3QucHVzaChidXR0b25UaWxlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJ1dHRvbkxpc3QuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XHJcbiAgICAgIGJ1dHRvbi5vbigncG9pbnRlcnVwJywgKCkgPT4ge1xyXG4gICAgICAgIGJ1dHRvbi5maWxsQ29sb3IgPSBidXR0b25Db2xvcjtcclxuICAgICAgICBpZiAoYnV0dG9uLm5hbWUgIT09ICdDTEVBUicgJiYgYnV0dG9uLm5hbWUgIT09ICdPSycpIHtcclxuICAgICAgICAgIGlucHV0VmFsdWUgKz0gYnV0dG9uLm5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChidXR0b24ubmFtZSA9PT0gJ0NMRUFSJykge1xyXG4gICAgICAgICAgaW5wdXRWYWx1ZSA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYnV0dG9uLm5hbWUgPT09ICdPSycpIHtcclxuICAgICAgICAgIHRoaXMuc2NlbmUucGF1c2UodGhpcyk7XHJcbiAgICAgICAgICBjb25zdCBpc0NvcnJlY3QgPSBpbnB1dFZhbHVlID09PSBtYXRoLnJlc3VsdDtcclxuICAgICAgICAgIGlmIChpc0NvcnJlY3QpIHtcclxuICAgICAgICAgICAgcG9wQWxlcnQuc2hvd0lzQ29ycmVjdCgpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcG9wQWxlcnQuc2hvd0lzV3JvbmcobWF0aC5yZXN1bHQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUucmVzdW1lKCdHYW1lcGxheVNjZW5lJywgeyBxdWVzdGlvbjogbWF0aC5xdWVzdGlvbiwgY29ycmVjdEFuc3dlcjogbWF0aC5yZXN1bHQsIHBsYXllckFuc3dlcjogaW5wdXRWYWx1ZSwgaXNDb3JyZWN0OiBpc0NvcnJlY3QgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuc3RvcCh0aGlzKTtcclxuICAgICAgICAgIH0sIDIwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlcXVhbC5zZXRUZXh0KGA9ICR7aW5wdXRWYWx1ZX1gKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aW1lci5ydW4oMTAsIHBvcEFsZXJ0LCBtYXRoKTtcclxuXHJcbiAgICB0aGlzLmFkZC5leGlzdGluZyhwb3BBbGVydCk7XHJcbiAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWluLmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9