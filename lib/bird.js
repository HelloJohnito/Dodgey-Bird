
class Bird {
  constructor(options){
    this.game = options.game;
    this.x = 50;
    this.y = 50;
    this.gravity = 1;
    this.vel = 0;
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
    this.y += this.vel;

    if (this.y > this.game.DIM_Y){
      this.y = this.game.DIM_Y;
      this.vel = 0;
    }

    if (this.y < 0){
      this.y = 0;
      this.vel = 0;
    }
  }

  jump(){
    console.log("jump")
    // this.y -= 1;
  }
}

Bird.RADIUS = 10;

module.exports = Bird;
