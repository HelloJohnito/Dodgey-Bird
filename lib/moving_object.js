

class MovingObject{
  constructor(options){
    this.pos = options.pos;
    this.image = options.image;
    this.game = options.game;
  }

  draw(){
  }

  move(){
  }

  remove(){
    this.game.remove(this);
  }

}

module.exports = MovingObject;
