const MovingObject = require('./moving_object');

class Enemy extends MovingObject{
  constructor(options){
    options.x = 400;
    options.y = options.game.randomPosition(0, 490); //490
    options.radius = Enemy.RADIUS;
    options.vel = 8;
    super(options);
  }

  draw(ctx){
    ctx.fillRect(this.x, this.y, 20, 20);
  }

  automove(){
    if(this.x !== 0){
      this.x -= this.vel;
    } else if ( this.x === 0){
      this.remove(this);
    }
  }

}

Enemy.RADIUS = 8;
module.exports = Enemy;
