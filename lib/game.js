const Bird = require("./bird");

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
