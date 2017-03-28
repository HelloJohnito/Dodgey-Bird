const Game = require("./game");


class Pipe {
  constructor(){
    this.x = this.randomPosition(0, 500);
    this.y = this.randomPosition();


  }

  draw(){

  }

  randomPosition(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }

}

module.export = Pipe;
