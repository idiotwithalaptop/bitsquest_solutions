/*
 * Open all three doors to exit.
 *
 * The answer is ?.
 */

var start = [
  {position: 38, thruster: 'left', angle: 0},
  {position: 22, thruster: 'bottom', angle: 270},
  {position: 28, thruster: 'left', angle: 0}
]

var phases = [
  {position: 38, thruster: 'left', angle: 0},
  {position: 22, thruster: 'bottom', angle: 270},
  {position: 28, thruster: 'left', angle: 0},
  {position: 5, thruster: 'bottom', angle: 270},
  {position: 18, thruster: 'left', angle: 0},
  {position: 28, thruster: 'top', angle: 90},
  {position: 28, thruster: 'right', angle: 180},
  {position: 1, thruster: 'top', angle: 90}
];
var currentPhase = 0;
var initialised = false;
var ratio = 0;

var resetRight = 30;
var resetTop = 24;

this.on('start', function() {
  this.radar.angle(0);
  this.radar.ping();
});

this.on('radar:hit', function(angle, distance) {
  if(initialised) {
  }
  else {
    initialised = true;
    ratio = distance;
    console.log(ratio);
    this.radar.angle(0);
    this.thrusters.left(true);
    
  }
    /*
    var phase = phases[currentPhase];
    console.log(distance + ' < ' + (phase.position * ratio));
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
    ratio = distance;
    console.log(ratio);
    this.radar.angle(0);
    this.thrusters.left(true);
  }
  this.radar.ping();
*/
});

this.reset = function() {
  console.log('RESETING');
}