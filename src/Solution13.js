/*
 * You have a cannon object available to you which can send out projectiles. 
 * The projectiles don't move terribly quickly but they will destroy your enemy
 * if they hit.
 * 
 * The cannon object attached to this has the following methods:
 *
 * cannon.aim()  - returns the current direction the cannon is pointing.
 * cannon.aim(number) - points the cannon in the supplied direction.
 * cannon.fire() - fires a projectile.
 * cannon.ready() - tests to see if the cannon can be fired again.  The cannon
 *    requires a cooldown period after each firing.
 *
 *
 * Go up the elevator.
 */
var phases = [
  {position: 8, thruster: 'top', angle: 90},
  {position: 28, thruster: 'left', angle: 0},
  {position: 20, thruster: 'bottom', angle: 270}
];
var currentPhase = 0;
var initialised = false;
var ratio = 0;
var attack = false;
var emptyCount = 0;
var finish = false;

this.on('start', function() {
  this.radar.angle(180);
  this.radar.ping();
});

this.on('sensor:left', function(angle, distance) {
  this.thrusters.left(true);
  this.thrusters.right(false);
})


this.on('sensor:right', function(angle, distance) {
  this.thrusters.right(true);
  this.thrusters.left(false);
})

this.on('radar:hit', function(angle, distance) {
  if(initialised) {
    if(attack) {
      var newAngle = angle + 1;
      if(newAngle > 315) {
        newAngle = 225;
      }
      this.radar.angle(newAngle);
      
      if(distance > (25 * ratio)) {
        emptyCount++;
        if(emptyCount > 5) {
          this.thrusters.left(false);
          this.thrusters.top(false);
          this.thrusters.right(false);
          this.thrusters.bottom(true);
        }
      }
      else {    
	    this.radar.angle(newAngle);
        if(this.cannon.ready()) {
          this.cannon.aim(newAngle);
          this.cannon.fire();
        } 
      }
    }
    else {
      var phase = phases[currentPhase];
      console.log(distance);
      if(distance < (phase.position * ratio)) {
        this.thrusters.left(false);
        this.thrusters.top(false);
        this.thrusters.right(false);
        this.thrusters.bottom(false);
        
        phase = phases[++currentPhase];
        if(typeof phase === 'undefined') {
          attack = true;
          this.thrusters.right(true);
        }
        else {
          this.radar.angle(phase.angle);
          this.thrusters[phase.thruster](true);
        }
      }
    }
  }
  else {
    initialised = true;
    ratio = distance;
    this.radar.angle(phases[0].angle);
    this.thrusters[phases[0].thruster](true);
  }
  this.radar.ping();

});