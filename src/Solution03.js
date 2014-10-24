/*
 * The square below is a pressure switch. Move your robot over it to trigger
 * the change to the on state and open the door.
 */

this.on('start', function() {
	this.thrusters.left(true);
	this.thrusters.top(true);
});

this.on('sensor:bottom', function(context) {
  this.thrusters.top(false);
  this.thrusters.left(context);
});

this.on('sensor:right', function(context) {
  this.thrusters.bottom(context);
  this.thrusters.left(!context);
});
