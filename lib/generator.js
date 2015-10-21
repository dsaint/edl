var _ = require('lodash'),
    csv = require('./formatters/csv');

function outputCsv (edlEvent) {
    return csv.format(edlEvent);
}

function generator(options) {
    var events = [],
        summary = {},
        edlStream = options.stream;

    edlStream.on('event_create', function(edlEvent) {
        events.push(edlEvent);
        if (summary[edlEvent.id]) {
            summary[edlEvent.id].edit_type = edlEvent.edit_type;
            summary[edlEvent.id].src_tape = edlEvent.src_tape;
            summary[edlEvent.id].src_in  = edlEvent.src_in;
            summary[edlEvent.id].src_out = edlEvent.src_out;
            summary[edlEvent.id].seq_in  = edlEvent.seq_in;
            summary[edlEvent.id].seq_out = edlEvent.seq_out;
        } else {
            summary[edlEvent.id] = edlEvent;
        }
    });

    edlStream.on('motion_create', function(motionEvent) {
        var curEvent = events[events.length - 1];
        if (!curEvent) { return; }
        if (curEvent.motion) {
            // throw new Error("Motion event already exists", curEvent, motionEvent);
        } else {
            curEvent.motion = motionEvent;
        }
    });

    edlStream.on('event_trailer', function(trailer) {
        var curEvent = events[events.length - 1];

        if (!curEvent) { return; }
        if (!curEvent.trailers) { curEvent.trailers = {}; }
        if (!summary[curEvent.id].trailers) { summary[curEvent.id].trailers = {}; }
        _.merge(curEvent.trailers, trailer);
        _.merge(summary[curEvent.id].trailers, trailer);
    });

    edlStream.on('end', function() { 
        var output = _.chain(summary)
            .map(outputCsv)
            .map(options.filter.include)
            .map(options.filter.exclude)
            .pick(_.identity)
            .sortBy(0)
            .value();

        edlStream.emit('csv', output);
    });

    edlStream.on('data', options.parser);
}

module.exports = generator;