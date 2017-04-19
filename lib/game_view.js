
class GameView {
  constructor(game ,ctx){
    this.game = game;
    this.ctx = ctx;
    this.bird = this.game.bird;
  }

  gameMenu(){
    $('.start-menu').hide();
    $('.retry-menu').hide();
    // const hi = new Game;
    // console.log(bird);

    this.start();
  }

  gameRetry(){
    $('.retry-menu').show();
  }

  start(){
    this.bindKeyHandlers();
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time){
    const timeDelta = time - this.lastTime;

    if(GameView.gameOver){
      this.gameRetry();
      return;
    }else{
      this.game.step(timeDelta);
      this.game.draw(this.ctx);
      requestAnimationFrame(this.animate.bind(this));
    }
  }


  bindKeyHandlers(){
    const bird = this.bird;
    key('space', (e) => {
      bird.jump(); });
  }

}

GameView.gameOver = false;

module.exports = GameView;
