const MovingObject = require('./moving_object');

class Coin extends MovingObject{
  constructor(options){
    options.x = 600;
    options.y = options.game.randomPosition(0,350); //350
    options.radius = Coin.RADIUS;
    options.vel = 3;
    super(options);
  }

  draw(ctx){
    ctx.fillStyle = "gold";
    ctx.beginPath();
    ctx.arc(
      this.x, this.y, Coin.RADIUS, 0, 2* Math.PI
    );
    ctx.fill();
  }

  automove(){
    if(this.x !== 0){
      this.x -= this.vel;
    } else if ( this.x === 0){
      this.remove(this);
    }
  }
}

Coin.RADIUS = 10;

module.exports = Coin;
