const MovingObject = require('./moving_object');
const Enemy = require('./enemy');

class Bird extends MovingObject {
  constructor(options){
    options.x = 50;
    options.y = 50;
    options.vel = 0;
    options.radius = Bird.RADIUS;
    super(options);
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
    this.vel += Bird.GRAVITY;
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
    this.vel += Bird.ANTI_GRAVITY;
  }

  died(){
    this.y = this.dim_y;
  }

  collideWith(otherObject) {
    if (otherObject instanceof Enemy) {
      console.log("here");
      this.game.remove(otherObject);
      // this.died();
      return true;
    // } else if (otherObject instanceof Coins) {
        // this.game.remove();
        // otherObject.remove();
        // return true;
    }
  }


}

Bird.RADIUS = 10;
Bird.GRAVITY = .7;
Bird.ANTI_GRAVITY = -9;

module.exports = Bird;
