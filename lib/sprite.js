
function sprite(options) {

  var that = {},
  frameIndex = 0,
  tickCount = 0,
  ticksPerFrame = options.ticksPerFrame || 0,
  numberOfFrames = options.numberOfFrames || 1;


  that.context = options.context;
  that.width = options.width;
  that.height = options.height;
  that.image = options.image;
  that.x = options.x;
  that.y = options.y;


  that.render = function(){
    that.context.drawImage(
      that.image,
      frameIndex * that.width / numberOfFrames,
      0,
      that.width / numberOfFrames,
      that.height,
      that.x,
      that.y,
      that.width / numberOfFrames,
      that.height
    );
  };

  that.loop = options.loop;


  that.update = function(){
    tickCount += 1;

    if (tickCount > ticksPerFrame){
      tickCount = 0;

      if(frameIndex < numberOfFrames - 1){
        frameIndex += 1;
        // console.log(tickCount)
      } else if (that.loop) {
        frameIndex = 0;
      }
    }
  };

  return that;
}

module.exports = sprite;
