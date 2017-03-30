const Game = require("./game");
const GameView = require('./game_view');

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;


  $('.retry-menu').hide();

  $('.start-button').click(()=>{
    const game = new Game({ctx: ctx});
    const gameView = new GameView(game, ctx);

    gameView.gameMenu();
  });


  $('.retry-button').click(()=>{
    ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y);
    GameView.gameOver = false;
    const game = new Game({ctx: ctx});
    const gameView = new GameView(game, ctx);

    gameView.gameMenu();
  });

});
