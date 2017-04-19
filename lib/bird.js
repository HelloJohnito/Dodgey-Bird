const GameView = require('./game_view');
const MovingObject = require('./moving_object');
const Enemy = require('./enemy');
const Coin = require('./coin');
const sprite = require('./sprite');

class Bird extends MovingObject {
  constructor(options){
    options.x = 50;
    options.y = 50;
    options.vel = 0;
    options.radius = Bird.RADIUS;
    super(options);

    // let birdImage = new Image();
    // birdImage.src = "https://res.cloudinary.com/deh9l9lyq/image/upload/v1490805805/bird_pcj18o.png";
    //
    //  this.bird = sprite({
    //   context: this.ctx,
    //   width: 295,
    //   height: 62,
    //   x: this.x,
    //   y: this.y,
    //   image: birdImage,
    //   numberOfFrames: 4,
    //   ticksPerFrame: 0
    // });
  }


  draw(ctx){
    let birdImage = new Image();
    birdImage.src = "https://res.cloudinary.com/deh9l9lyq/image/upload/v1490844866/smallbird_top0fk.png";

    let bird = sprite({
      context: ctx,
      width: 195, //295
      height: 41, // 62
      x: this.x,
      y: this.y,
      image: birdImage,
      numberOfFrames: 4,
      ticksPerFrame: 0
    });

    bird.update();
    bird.render();
  }
  //
  // draw(ctx){
  //   ctx.fillStyle = "#9C88C8";
  //   ctx.beginPath();
  //   ctx.arc(
  //     this.x, this.y, Bird.RADIUS, 0, 2* Math.PI
  //   );
  //   ctx.fill();
  // }

  automove(){
    this.vel += Bird.GRAVITY;
    this.vel *= .9;
    this.y += this.vel;

    if (this.y > 390){
      this.y = 390; //380
      this.vel = 0;
      this.died();
    }

    if (this.y < 0){
      this.y = 0;
      this.vel = 0;
    }
  }

  jump(){
    this.vel += Bird.ANTI_GRAVITY;
  }

  died(){
    this.y = 390;
    GameView.gameOver = true;
  }

  collideWith(otherObject) {
    if (otherObject instanceof Enemy) {
      this.died();
      return true;
    } else if (otherObject instanceof Coin) {
        this.game.remove(otherObject);
        this.game.coinCount += 1;
        return true;
    }
  }


}

Bird.RADIUS = 35; // 10
Bird.GRAVITY = .7; //.7
Bird.ANTI_GRAVITY = -13;//-9

module.exports = Bird;
