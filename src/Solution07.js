/*
 * Not only does your robot come equipped with sensors and thrusters. It also
 * has a radar that can be used to determine distances.
 *
 * The radar has two methods:
 *
 *
 *  - angle()       - the current direction the radar is pointing (0-359)
 *  - angle(number) - set the radar direction (0-359)
 *
 *  - ping()        - fires the radar
 *
 * One of two events will return after firing the radar:
 *  - 'radar:hit'   - an object was found
 *  - 'radar:miss'  - no object was found
 *
 * When a hit event is received, the handler will receive the angle the
 * ping was sent out on and the distance to the object, e.g.,
 *    this.on('radar:hit', function(angle, distance) {
 *       // do stuff
 *    });
 *
 *  Bonus info: 
 *
 *      Those red jumpy things will kill your robot. Don't touch them.
 */

var distanceRight = 0;
var targetDistance = -1;

this.on('start', function() {
  	this.radar.angle(0);
	this.radar.ping();
  	this.thrusters.left(true);
});

this.on('radar:hit', function(angle, distance) {
	if(angle == 0)
    {
      distanceRight = distance;
      this.thrusters.left(false);
      if(targetDistance < 0)
      {
		targetDistance = distance / 6;
      }
      this.radar.angle(180);
      this.radar.ping();
    }
  
  	if(angle == 180)
    {
      if((distanceRight - distance) < 10 )
      {
        this.thrusters.top(true);
      	this.radar.angle(90);
      }
      else
      {
      	this.radar.angle(0);
        this.thrusters.left(true);
      }
      this.radar.ping();
    }
  
  	if(angle == 90)
    {
      console.log('TD: ' + targetDistance);
      console.log('D: ' + distance);
      if((distance - targetDistance) < 10)
      {
        this.thrusters.left(true);
        this.thrusters.top(false);
      }
      else
      {
        this.radar.ping();
      }
    }
});
