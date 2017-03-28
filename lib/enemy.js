const MovingObject = require('./moving_object');

class Enemy extends MovingObject{
  constructor(options){
    // this.x = options.pos[0];
    // this.y = options.pos[1];
    options.x = 370;
    options.y = options.game.randomPosition(0,490);
    options.vel = 10;
    super(options);
  }

  draw(ctx){
    ctx.fillRect(this.x, this.y, 25,25);
  }

  automove(){
    if(this.x !== 0){
      this.x -= this.vel;
    }
  }

}

module.exports = Enemy;
