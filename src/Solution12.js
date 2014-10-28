/*
 * Do it.
 *
 */
var phases = [
  {position: 1, thruster: 'top', angle: 270},
  {position: 1, thruster: 'left', angle: 0},
  {position: 5, thruster: 'top', angle: 90},
  {position: 1, thruster: 'right', angle: 180},
  {position: 1, thruster: 'bottom', angle: 270},
  {position: 5, thruster: 'right', angle: 180},
  {position: 1, thruster: 'top', angle: 90},
  {position: 10, thruster: 'left', angle: 0},
  {position: 5, thruster: 'top', angle: 90},
  {position: 20, thruster: 'left', angle: 0},
  {position: 1, thruster: 'bottom', angle: 270},
  {position: 1, thruster: 'left', angle: 0},
];
var currentPhase = 0;
var initialised = false;
var ratio = 0;

this.on('start', function() {
  this.radar.angle(180);
  this.radar.ping();
});

this.on('radar:hit', function(angle, distance) {
  if(initialised) {
    
    var phase = phases[currentPhase];
    console.log(distance);
    if(distance < (phase.position * ratio)) {
      this.thrusters.left(false);
      this.thrusters.top(false);
      this.thrusters.right(false);
      this.thrusters.bottom(false);
      
      phase = phases[++currentPhase];
      this.radar.angle(phase.angle);
      this.thrusters[phase.thruster](true);
    }
  }
  else {
    initialised = true;
    ratio = distance / 30;
    this.radar.angle(90);
    this.thrusters.top(true);
  }
  this.radar.ping();

});