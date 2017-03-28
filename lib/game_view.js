
class GameView {
  constructor(game ,ctx){
    this.game = game;
    this.ctx = ctx;
    this.bird = this.game.bird;
  }

  start(){
    this.bindKeyHandlers();
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time){
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  }

  bindKeyHandlers(){
    const bird = this.bird;
    key("space", () => { bird.jump(); });
  }

}


module.exports = GameView;
