var timecode = require("timecode").Timecode;

timecode.toMSString = function() {
	var zeroPad = function(number) {
		var pad = (number < 10) ? "0" : "";
		return pad + Math.floor(number);
	};
	var frameAdjustment = (this.frames > (parseFloat(this.framerate)/2)) ? 1 : 0;
    // For the special case of a 0 second duration and less than 15 frames we force
    // the seconds duration to 1
    if (this.seconds === 0 && (this.frames > 0) && frameAdjustment === 0) { frameAdjustment = 1; }
    
	return zeroPad(this.minutes) + ":" + zeroPad(this.seconds + frameAdjustment);
}

function duration(timecodeStart, timecodeStop) {
	var tcStop = timecode.init({framerate: "29.97", timecode: timecodeStop});

    tcStop.subtract(timecodeStart);
    return tcStop.toMSString();
}

module.exports = {
    duration: duration
}