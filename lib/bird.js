const MovingObject = require('./moving_object');

class Bird extends MovingObject {
  constructor(options){
    // this.x = options.pos[0];
    // this.y = options.pos[1];
    // this.gravity = .7;
    // this.anti_gravity = -9;
    options.x = 50;
    options.y = 50;
    options.vel = 0;
    // this.dim_x = options.dim_x;
    // this.dim_y = options.dim_y;
    // debugger;
    super(options);
  }

  draw(ctx){
    debugger
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(
      this.x, this.y, Bird.RADIUS, 0, 2* Math.PI
    );
    ctx.fill();
    // console.log(this);
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

  // collideWith(otherObject) {
  //   if (otherObject instanceof Enemy) {
  //     this.died();
  //     return true;
  //   } else if (otherObject instanceof Coins) {
  //       // this.game.remove();
  //       // otherObject.remove();
  //       return true;
  //   }
  // }


}

Bird.RADIUS = 10;
Bird.GRAVITY = .7;
Bird.ANTI_GRAVITY = -9;

module.exports = Bird;
