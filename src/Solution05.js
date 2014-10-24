/*
 * No explanation.
 */

this.on('start', function() {
	this.thrusters.top(true);
});

this.on('sensor:bottom', function(context) {
  if(context == true)
  {  
    this.thrusters.top(false);
    this.thrusters.bottom(false);
    this.thrusters.right(false);
  	this.thrusters.left(true);
  }
});

this.on('sensor:top', function(context) {  
  if(context == true)
  {  
    this.thrusters.left(false);
    this.thrusters.top(false);
    this.thrusters.bottom(false);
  	this.thrusters.right(true);
  }
});

this.on('sensor:left', function(context) {  
  if(context == true)
  {  
    this.thrusters.left(false);
    this.thrusters.bottom(false);
    this.thrusters.right(false);
  	this.thrusters.top(true);
  }
});

this.on('sensor:right', function(context) {
  if(context == true)
  {  
    this.thrusters.left(false);
    this.thrusters.top(false);
    this.thrusters.right(false);
  	this.thrusters.bottom(true);
  }
});