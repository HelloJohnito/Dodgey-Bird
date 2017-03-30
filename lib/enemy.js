const MovingObject = require('./moving_object');
const sprite = require('./sprite');

class Enemy extends MovingObject{
  constructor(options){
    options.x = 600;
    options.y = options.game.randomPosition(0, 385);
    options.radius = Enemy.RADIUS;
    options.vel = 8;
    super(options);
  }

  draw(ctx){
    let enemyImage = new Image();
    enemyImage.src = "https://res.cloudinary.com/deh9l9lyq/image/upload/v1490845968/missle_2_s2q6sp.png";

    let enemy = sprite({
      context: ctx,
      width: 50, //295
      height: 50, // 62
      x: this.x,
      y: this.y,
      image: enemyImage,
      numberOfFrames: 1,
      ticksPerFrame: 0
    });

    enemy.update();
    enemy.render();
  }

  // draw(ctx){
  //   ctx.fillStyle = "black";
  //   ctx.fillRect(this.x, this.y, 20, 20);
  // }

  automove(){
    if(this.x !== 0){
      this.x -= this.vel;
    } else if ( this.x === 0){
      this.remove(this);
    }
  }

}

Enemy.RADIUS = 5;
module.exports = Enemy;
