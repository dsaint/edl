var timecode = require("timecode").Timecode;

timecode.toMSString = function() {
	var zeroPad = function(number) {
		var pad = (number < 10) ? "0" : "";
		return pad + Math.floor(number);
	};
	var frameAdjustment = (this.frames > (parseFloat(this.framerate)/2)) ? 1 : 0;
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