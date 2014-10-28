/*
 * Open all three doors to exit.
 *
 * The answer is ?.
 */

var start = [
  {position: 48, thruster: 'left', angle: 0},
  {position: 28, thruster: 'bottom', angle: 270},
  {position: 28, thruster: 'left', angle: 0}
]

var phases = [
  [
    {position: 18, thruster: 'left', angle: 0},
    {position: 13, thruster: 'bottom', angle: 270},
    {position: 28, thruster: 'top', angle: 90},
    {position: 28, thruster: 'right', angle: 180},
  ],
  [
    {position: 13, thruster: 'bottom', angle: 270},
    {position: 13, thruster: 'left', angle: 0},
    {position: 28, thruster: 'top', angle: 90},
    {position: 28, thruster: 'right', angle: 180},
  ],
  [
    {position: 18, thruster: 'left', angle: 0},
    {position: 13, thruster: 'bottom', angle: 270},
    {position: 28, thruster: 'top', angle: 90},
    {position: 28, thruster: 'right', angle: 180},
  ],
  [
    {position: 18, thruster: 'right', angle: 180},
    {position: 13, thruster: 'bottom', angle: 270},
    {position: 13, thruster: 'left', angle: 0},
    {position: 28, thruster: 'top', angle: 90},
    {position: 28, thruster: 'right', angle: 180},
  ],
  [
    {position: 18, thruster: 'left', angle: 0},
    {position: 13, thruster: 'bottom', angle: 270},
    {position: 28, thruster: 'top', angle: 90},
    {position: 28, thruster: 'right', angle: 180},
  ],
  [
    {position: 13, thruster: 'bottom', angle: 270},
    {position: 13, thruster: 'left', angle: 0},
    {position: 28, thruster: 'top', angle: 90},
    {position: 28, thruster: 'right', angle: 180},
  ],
  [
    {position: 18, thruster: 'left', angle: 0},
    {position: 13, thruster: 'bottom', angle: 270},
    {position: 28, thruster: 'top', angle: 90},
    {position: 28, thruster: 'right', angle: 180},
  ],
];

var steps = [];

var phaseIndex = -1;
var currentStep = 0;
var currentPhase = null;
var initialised = false;
var ratio = 0;
var checking = false;

var resetRight = 30;
var resetTop = 24;

this.on('start', function() {
  this.radar.angle(180);
  this.radar.ping();
});

this.on('radar:hit', function(angle, distance) {
  if(checking) {
	steps = phases[++phaseIndex];
    currentStep = 0;
    checking = false;
    this.radar.angle(steps[0].angle);
    this.thrusters[steps[0].thruster](true);
  } 
  else if(initialised) {
    var phase = steps[currentStep];
    console.log(distance + ' < ' + (phase.position * ratio));
    if(distance < (phase.position * ratio)) {
      this.thrusters.left(false);
      this.thrusters.top(false);
      this.thrusters.right(false);
      this.thrusters.bottom(false);
      
      phase = steps[++currentStep];
      if(typeof phase === 'undefined') {
        checking = true;
        this.radar.angle(90);
      } else {
      
      	this.radar.angle(phase.angle);
      	this.thrusters[phase.thruster](true);
      }
      
    }
  }
  else {
    initialised = true;
    ratio = distance;
    console.log(ratio);
    this.radar.angle(0);
    this.thrusters.left(true);
    steps = start;
    
  }
  this.radar.ping();
});

this.on('radar:miss', function(angle, distance) {
  this.thrusters.top(true);
});