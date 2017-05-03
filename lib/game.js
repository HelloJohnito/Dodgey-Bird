const Bird = require("./bird");
const Enemy = require("./enemy");
const Coin = require("./coin");

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
    setInterval(this.addEnemy.bind(this), 600); // controls the amount of enemies//200
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
