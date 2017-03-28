const MovingObject = require('./moving_object');

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
