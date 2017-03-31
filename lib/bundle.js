/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {


class MovingObject{
  constructor(options){
    this.x = options.x;
    this.y = options.y;
    this.vel = options.vel;
    this.radius = options.radius;
    // this.image = options.image;
    this.game = options.game;
    this.dim_x = options.dim_x;
    this.dim_y = options.dim_y;
    this.ctx = options.ctx;
  }

  draw(){
  }

  move(){
  }

  collideWith(){
  }


  isCollidedWith(otherObject) {
    let pos = [this.x, this.y];
    let otherObjectPos = [otherObject.x, otherObject.y];
    const objectDist = this.distance(pos, otherObjectPos);
    return objectDist < (this.radius + otherObject.radius);
  }

  distance(pos1, pos2){
    let sum = Math.pow((pos2[0] - pos1[0]), 2) + Math.pow((pos2[1] - pos1[1]), 2);
    return Math.sqrt(sum);
  }

  remove(){
    this.game.remove(this);
  }

}

module.exports = MovingObject;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Bird = __webpack_require__(6);
const Enemy = __webpack_require__(4);
const Coin = __webpack_require__(3);

class Game {
  constructor(options){
    this.bird = new Bird({ctx: options.ctx, game: this, dim_x: Game.DIM_X, dim_y: Game.DIM_Y});
    this.enemies = [];
    this.coins = [];
    this.coinCount = 0;
    this.ctx = options.ctx;
    this.htmlCoin = document.getElementById("coin-count");

    setTimeout(this.addEnemies.bind(this), 2500);
    setInterval(this.addCoin.bind(this), 1000);
  }

  addEnemies(){
    setInterval(this.addEnemy.bind(this), 400); // controls the amount of enemies//200
  }

  allObjects(){
    return [this.bird].concat(this.enemies, this.coins);
  }

  draw(ctx){
    ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y);
    let allObjects = this.allObjects();
    allObjects.forEach(object => (
      object.draw(ctx)
    ));
  }

  moveObjects(){
    let allObjects = this.allObjects();
    allObjects.forEach( object => (
      object.automove()
    ));
  }

  step(){
    this.moveObjects();
    this.checkCollisions();
    this.htmlCoin.innerHTML= this.coinCount;
  }

  addEnemy(){
    this.enemies.push(new Enemy({game: this, dim_x: Game.DIM_X, dim_y: Game.DIM_Y}));
  }

  addCoin(){
    this.coins.push(new Coin({game: this, dim_x: Game.DIM_X, dim_y: Game.DIM_Y}));
  }

  checkCollisions(){
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        if(i !== j){
          let obj1 = allObjects[i];
          let obj2 = allObjects[j];
          if (obj1.isCollidedWith(obj2)) {
            const collision = obj1.collideWith(obj2);
            if (collision) return;
          }
        }
      }
    }
  }

  remove(object) {
    if (object instanceof Enemy) {
      this.enemies.splice(this.enemies.indexOf(object), 1);
    } else if (object instanceof Coin){
      this.coins.splice(this.coins.indexOf(object), 1);
    }
  }

  randomPosition(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }

}

Game.DIM_X = 700;
Game.DIM_Y = 450;

module.exports = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports) {


class GameView {
  constructor(game ,ctx){
    this.game = game;
    this.ctx = ctx;
    this.bird = this.game.bird;
  }

  gameMenu(){
    $('.start-menu').hide();
    $('.retry-menu').hide();
    // const hi = new Game;
    // console.log(bird);

    this.start();
  }

  gameRetry(){
    $('.retry-menu').show();
  }

  start(){
    this.bindKeyHandlers();
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time){
    const timeDelta = time - this.lastTime;

    if(GameView.gameOver){
      this.gameRetry();
      return;
    }else{
      this.game.step(timeDelta);
      this.game.draw(this.ctx);
      requestAnimationFrame(this.animate.bind(this));
    }
  }


  bindKeyHandlers(){
    const bird = this.bird;
    key("space", () => { bird.jump(); });
  }

}

GameView.gameOver = false;

module.exports = GameView;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(0);

class Coin extends MovingObject{
  constructor(options){
    options.x = 700;
    options.y = options.game.randomPosition(0,350); //350
    options.radius = Coin.RADIUS;
    options.vel = 3;
    super(options);
  }

  draw(ctx){
    ctx.fillStyle = "gold";
    ctx.beginPath();
    ctx.arc(
      this.x, this.y, 10, 0, 2* Math.PI
    );
    ctx.stroke();
    ctx.fill();
  }

  automove(){
    if(this.x > 0){
      this.x -= this.vel;
    } else if ( this.x <= 0){
      this.remove(this);
    }
  }

}

Coin.RADIUS = 7.5;

module.exports = Coin;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(0);
const sprite = __webpack_require__(5);

class Enemy extends MovingObject{
  constructor(options){
    options.x = 700;
    options.y = options.game.randomPosition(0, 410);
    options.radius = Enemy.RADIUS;
    options.vel = 8;
    super(options);
  }

  draw(ctx){
    let enemyImage = new Image();
    enemyImage.src = "https://res.cloudinary.com/deh9l9lyq/image/upload/v1490845968/missle_2_s2q6sp.png";

    let enemy = sprite({
      context: ctx,
      width: 50, //295
      height: 50, // 62
      x: this.x,
      y: this.y,
      image: enemyImage,
      numberOfFrames: 1,
      ticksPerFrame: 0
    });

    enemy.update();
    enemy.render();
  }

  // draw(ctx){
  //   ctx.fillStyle = "black";
  //   ctx.fillRect(this.x, this.y, 20, 20);
  // }

  automove(){
    if(this.x > 0){
      this.x -= this.vel;
    } else if(this.x <= 0){
      this.remove(this);
    }
  }

}

Enemy.RADIUS = 5;
module.exports = Enemy;


/***/ }),
/* 5 */
/***/ (function(module, exports) {


function sprite(options) {

  var that = {},
  frameIndex = 0,
  tickCount = 0,
  ticksPerFrame = options.ticksPerFrame || 0,
  numberOfFrames = options.numberOfFrames || 1;


  that.context = options.context;
  that.width = options.width;
  that.height = options.height;
  that.image = options.image;
  that.x = options.x;
  that.y = options.y;


  that.render = function(){
    that.context.drawImage(
      that.image,
      frameIndex * that.width / numberOfFrames,
      0,
      that.width / numberOfFrames,
      that.height,
      that.x,
      that.y,
      that.width / numberOfFrames,
      that.height
    );
  };

  that.loop = options.loop;


  that.update = function(){
    tickCount += 1;

    if (tickCount > ticksPerFrame){
      tickCount = 0;

      if(frameIndex < numberOfFrames - 1){
        frameIndex += 1;
        // console.log(tickCount)
      } else if (that.loop) {
        frameIndex = 0;
      }
    }
  };

  return that;
}

module.exports = sprite;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(2);
const MovingObject = __webpack_require__(0);
const Enemy = __webpack_require__(4);
const Coin = __webpack_require__(3);
const sprite = __webpack_require__(5);

class Bird extends MovingObject {
  constructor(options){
    options.x = 50;
    options.y = 50;
    options.vel = 0;
    options.radius = Bird.RADIUS;
    super(options);

    // let birdImage = new Image();
    // birdImage.src = "https://res.cloudinary.com/deh9l9lyq/image/upload/v1490805805/bird_pcj18o.png";
    //
    //  this.bird = sprite({
    //   context: this.ctx,
    //   width: 295,
    //   height: 62,
    //   x: this.x,
    //   y: this.y,
    //   image: birdImage,
    //   numberOfFrames: 4,
    //   ticksPerFrame: 0
    // });
  }


  draw(ctx){
    let birdImage = new Image();
    birdImage.src = "https://res.cloudinary.com/deh9l9lyq/image/upload/v1490844866/smallbird_top0fk.png";

    let bird = sprite({
      context: ctx,
      width: 195, //295
      height: 41, // 62
      x: this.x,
      y: this.y,
      image: birdImage,
      numberOfFrames: 4,
      ticksPerFrame: 0
    });

    bird.update();
    bird.render();
  }
  //
  // draw(ctx){
  //   ctx.fillStyle = "#9C88C8";
  //   ctx.beginPath();
  //   ctx.arc(
  //     this.x, this.y, Bird.RADIUS, 0, 2* Math.PI
  //   );
  //   ctx.fill();
  // }

  automove(){
    this.vel += Bird.GRAVITY;
    this.vel *= .9;
    this.y += this.vel;

    if (this.y > 390){
      this.y = 390; //380
      this.vel = 0;
      this.died();
    }

    if (this.y < 0){
      this.y = 0;
      this.vel = 0;
    }
  }

  jump(){
    this.vel += Bird.ANTI_GRAVITY;
  }

  died(){
    this.y = 390;
    GameView.gameOver = true;
  }

  collideWith(otherObject) {
    if (otherObject instanceof Enemy) {
      this.died();
      return true;
    } else if (otherObject instanceof Coin) {
        this.game.remove(otherObject);
        this.game.coinCount += 1;
        return true;
    }
  }


}

Bird.RADIUS = 35; // 10
Bird.GRAVITY = .7;
Bird.ANTI_GRAVITY = -9;

module.exports = Bird;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);
const GameView = __webpack_require__(2);

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;

  $('.retry-menu').hide();

  $('.start-button').click(()=>{
    const game = new Game({ctx: ctx});
    const gameView = new GameView(game, ctx);

    gameView.gameMenu();
  });


  $('.retry-button').click(()=>{
    ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y);
    GameView.gameOver = false;
    const game = new Game({ctx: ctx});
    const gameView = new GameView(game, ctx);

    gameView.gameMenu();
  });

});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map