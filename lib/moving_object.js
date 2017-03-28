

class MovingObject{
  constructor(options){
    this.y = options.y;
    this.x = options.x;
    // console.log(options.pos)
    // console.log(this.y)
    // console.log(options.pos[1]);
    this.vel = options.vel;
    // this.image = options.image;
    this.game = options.game;
    this.dim_x = options.dim_x;
    this.dim_y = options.dim_y;
  }

  draw(){
  }

  move(){
  }

  //need to fix this with shapes
  // isCollidedWith(otherObject) {
  //   const objectDist = this.distance(this.pos, otherObject.pos);
  //
  //   return objectDist < (10 + 25);
  // }
  //
  // distance(pos1, pos2){
  //   return Math.sqrt(
  //     Math.pow((pos1[0] - pos2[0]), 2), Math.pow((pos1[1] - pos2[1]), 2)
  //   );
  // }

  // remove(){
  //   this.game.remove(this);
  // }

}

module.exports = MovingObject;
