/*
 * This other bot is helping-- somewhat.
 */

this.on('start', function() {
  	this.thrusters.bottom(true);
  	this.radar.angle(270);
	this.radar.ping();
});

this.on('radar:hit', function(angle, distance) {
  if(angle == 270)
  {
    if(distance < 5)
    {
    	this.thrusters.left(true);
    	this.thrusters.bottom(false);
    	this.radar.angle(0);
    }
  }
  else
  {
    this.thrusters.left(distance >= 5);
  }
  
  this.radar.ping();
});

this.on('radar:miss', function() {
     this.thrusters.left(true);
});