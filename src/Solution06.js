/*
 * The round switches won't stay on unless something is placed on top of them.
 */
var bottomTouches = 0;
var rightTouches = 0;
var topTouches = 0;

this.on('start', function() {
	this.thrusters.bottom(true);
});

this.on('sensor:bottom', function(context) {
  if(context)
  {
  	bottomTouches++;
  }
  
  
  if(context == true && bottomTouches > 1)
  {  
  	console.log(bottomTouches);
    this.thrusters.top(false);
    this.thrusters.bottom(false);
    this.thrusters.right(false);
  	this.thrusters.left(true);
  }
});

this.on('sensor:top', function(context) {  
  if(context)
  {
  	topTouches++;
  }
  
  if(context == true && topTouches < 2)
  {  
  	console.log(topTouches);
    this.thrusters.left(true);
    this.thrusters.top(false);
    this.thrusters.bottom(false);
  	this.thrusters.right(false);
  }
});

this.on('sensor:left', function(context) {  
  if(context == true)
  {  
    this.thrusters.left(true);
    this.thrusters.bottom(false);
    this.thrusters.right(false);
  	this.thrusters.top(false);
  }
});

this.on('sensor:right', function(context) {
  if(context)
  {
  	rightTouches++;
  }
  
  if(context == true)
  {  
  	console.log(rightTouches);
    this.thrusters.left(false);
    this.thrusters.top(rightTouches <= 2);
    this.thrusters.right(false);
  	this.thrusters.bottom(rightTouches > 2);
  }
});