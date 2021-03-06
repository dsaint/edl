var _ = require('lodash');

function contains(pattern) {
	if (this[1] && this[1].indexOf) {
		return (this[1].toUpperCase().indexOf(pattern.toUpperCase()) >= 0);
	} else {
		return null;
	}
    
}

function nameIncludes(patterns) {
    if (!patterns[0]) { 
        return _.identity; 
    } else {
        return function (edlEvent) {
            return (_.some(patterns, contains, edlEvent)) ? edlEvent : null;
        }
    }
}

function nameExcludes (patterns) {
	if (!patterns[0]) { 
        return _.identity; 
    } else {
        return function (edlEvent) {
            return (_.some(patterns, contains, edlEvent)) ? null : edlEvent;
        }
    }
}

module.exports = {
    nameIncludes: nameIncludes,
    nameExcludes: nameExcludes
}
