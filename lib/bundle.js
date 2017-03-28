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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);
const GameView = __webpack_require__(2);

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;

  const ctx = canvas.getContext("2d");
  const game = new Game();
  const gameView = new GameView(game, ctx);

  gameView.start();
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Bird = __webpack_require__(3);

class Game {
  constructor(){
    this.bird = new Bird({game: this, dim_x: Game.DIM_X, dim_y: Game.DIM_Y});
    this.pipes = [];
    this.enemy = [];
    // this.addPipes();
  }


  allObjects(){
    return [this.bird].concat(this.pipes, this.enemy);
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
    // this.checkCollisions();
  }

  checkCollisions(){

  }

  addPipes(){

  }

  remove(){

  }

}

Game.DIM_X = 400;
Game.DIM_Y = 500;

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
/* 3 */
/***/ (function(module, exports) {


class Bird {
  constructor(options){
    this.game = options.game;
    this.x = 50;
    this.y = 50;
    this.gravity = .7;
    this.anti_gravity = -9;
    this.vel = 0;
    this.dim_x = options.dim_x;
    this.dim_y = options.dim_y;
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
    this.vel += this.gravity;
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
    this.vel += this.anti_gravity;
  }


}

Bird.RADIUS = 10;

module.exports = Bird;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map