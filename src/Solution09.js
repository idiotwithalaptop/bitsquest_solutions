/*
 * This other bot is helping-- somewhat.
 */

this.on('start', function() {
  	this.thrusters.left(true);
  	this.radar.angle(0);
	this.radar.ping();
});

var left = 0;
var right = 0;
var top = 0;
var bottom = 0;
var factor = 45;
var phase = 1;

this.on('radar:hit', function(angle, distance) {
  if(angle == 0)
  {
    right = distance;
    this.radar.angle(180);
  }
  
  if(angle == 180)
  {
    left = distance;
    this.radar.angle(0);
  }
  
  if(angle == 90)
  {
    bottom = distance;
    this.radar.angle(270);
  }
  
  if(angle == 270)
  {
    top = distance;
    this.radar.angle(90);
  }
  
  if(this.thrusters.left()) {
    var formula = Math.abs(right - left);
    if(phase == 1 && formula < (left+factor)) {
      this.radar.angle(90);
      this.thrusters.bottom(true);
      this.thrusters.left(false);
      phase++;
    }
    if(phase == 3 && formula > (right-factor)) {
      this.radar.angle(90);
      this.thrusters.top(true);
      this.thrusters.left(false);
      phase++;
    }
  }
  if(this.thrusters.bottom()) {
    var formula = Math.abs(bottom - top);
    if(top != 0 && top < 50) {
      this.radar.angle(0);
      this.thrusters.bottom(false);
      this.thrusters.left(true);
      phase++;
    }
  }
  if(this.thrusters.top()) {
    var formula = Math.abs(bottom - top);
    if(formula < factor) {
      this.radar.angle(90);
      this.thrusters.top(false);
      this.thrusters.right(true);
      phase++;
    }
  }
  
  this.radar.ping();
});

this.on('radar:miss', function() {
     this.thrusters.top(true);
  	 this.thrusters.right(false);
});