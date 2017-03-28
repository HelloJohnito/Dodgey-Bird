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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(1);

class Enemy extends MovingObject{
  constructor(options){
    options.x = 200;
    // options.y = options.game.randomPosition(0,200); //490
    options.y = 190;
    options.radius = Enemy.RADIUS;
    options.vel = 2;
    super(options);
  }

  draw(ctx){
    ctx.fillRect(this.x, this.y, 20, 20);
  }

  automove(){
    if(this.x !== 0){
      this.x -= this.vel;
    }
  }



}

Enemy.RADIUS = 8;
module.exports = Enemy;


/***/ }),
/* 1 */
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
  }

  draw(){
  }

  move(){
  }

  collideWith(){

  }

  //need to fix this with shapes
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

  // remove(){
  //   this.game.remove(this);
  // }

}

module.exports = MovingObject;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Bird = __webpack_require__(4);
const Enemy = __webpack_require__(0);

class Game {
  constructor(){
    this.bird = new Bird({game: this, dim_x: Game.DIM_X, dim_y: Game.DIM_Y});
    this.enemies = [];
    // this.coins = [];
    setInterval(this.addEnemy.bind(this), 1000);
  }

  allObjects(){
    return [this.bird].concat(this.enemies);
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
  }

  addEnemy(){
    this.enemies.push(new Enemy({game: this, dim_x: Game.DIM_X, dim_y: Game.DIM_Y}));
  }

  checkCollisions(){
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        if(i !== j){
          let obj1 = allObjects[i];
          let obj2 = allObjects[j];
          // debugger
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
    }
  }

  randomPosition(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }

}

Game.DIM_X = 200;
Game.DIM_Y = 200;

module.exports = Game;


/***/ }),
/* 3 */
/***/ (function(module, exports) {


class GameView {
  constructor(game ,ctx){
    this.game = game;
    this.ctx = ctx;
    this.bird = this.game.bird;
  }

  start(){
    this.bindKeyHandlers();
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time){
    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  }

  bindKeyHandlers(){
    const bird = this.bird;
    key("space", () => { bird.jump(); });
  }

}


module.exports = GameView;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(1);
const Enemy = __webpack_require__(0);

class Bird extends MovingObject {
  constructor(options){
    options.x = 50;
    options.y = 50;
    options.vel = 0;
    options.radius = Bird.RADIUS;
    super(options);
  }

  draw(ctx){
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(
      this.x, this.y, Bird.RADIUS, 0, 2* Math.PI
    );
    ctx.fill();
  }

  automove(){
    this.vel += Bird.GRAVITY;
    this.vel *= .9;
    this.y += this.vel;

    if (this.y > this.dim_y){
      this.y = this.dim_y;
      this.vel = 0;
    }

    if (this.y < 0){
      this.y = 0;
      this.vel = 0;
    }
  }

  jump(){
    // console.log("jump");
    this.vel += Bird.ANTI_GRAVITY;
  }

  died(){
    this.y = this.dim_y;
  }

  collideWith(otherObject) {
    if (otherObject instanceof Enemy) {
      console.log("here");
      this.game.remove(otherObject);
      // this.died();
      return true;
    // } else if (otherObject instanceof Coins) {
        // this.game.remove();
        // otherObject.remove();
        // return true;
    }
  }


}

Bird.RADIUS = 10;
Bird.GRAVITY = .7;
Bird.ANTI_GRAVITY = -9;

module.exports = Bird;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);
const GameView = __webpack_require__(3);

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;

  const ctx = canvas.getContext("2d");
  const game = new Game();
  const gameView = new GameView(game, ctx);

  gameView.start();
});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map