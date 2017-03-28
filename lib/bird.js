
class Bird {
  constructor(options){
    this.game = options.game;
    this.x = 50;
    this.y = 50;
    this.gravity = .7;
    this.anti_gravity = -9;
    this.vel = 0;
    this.dim_x = options.dim_x;
    this.dim_y = options.dim_y;
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
    this.vel += this.gravity;
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
    this.vel += this.anti_gravity;
  }


}

Bird.RADIUS = 10;

module.exports = Bird;
