

class MovingObject{
  constructor(options){
    this.x = options.x;
    this.y = options.y;
    this.vel = options.vel;
    this.radius = options.radius;
    // this.image = options.image;
    this.game = options.game;
    this.dim_x = options.dim_x;
    this.dim_y = options.dim_y;
  }

  draw(){
  }

  move(){
  }

  collideWith(){

  }

  //need to fix this with shapes
  isCollidedWith(otherObject) {
    let pos = [this.x, this.y];
    let otherObjectPos = [otherObject.x, otherObject.y];
    const objectDist = this.distance(pos, otherObjectPos);
    return objectDist < (this.radius + otherObject.radius);
  }

  distance(pos1, pos2){
    let sum = Math.pow((pos2[0] - pos1[0]), 2) + Math.pow((pos2[1] - pos1[1]), 2);
    return Math.sqrt(sum);
  }

  // remove(){
  //   this.game.remove(this);
  // }

}

module.exports = MovingObject;
