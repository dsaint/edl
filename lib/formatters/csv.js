var timecode = require('./timecode');

function format(edlEvent) {
    return [
        edlEvent.id,
        edlEvent.src_tape,
        edlEvent.src_in,
        edlEvent.src_out,
        edlEvent.seq_in,
        edlEvent.seq_out,
        timecode.duration(edlEvent.src_in, edlEvent.src_out),
        timecode.duration(edlEvent.seq_in, edlEvent.seq_out),
        (edlEvent.edit_type === 'C') ? edlEvent.trailers["FROM CLIP NAME"] : (edlEvent.trailers["TO CLIP NAME"] || edlEvent.trailers["FROM CLIP NAME"])
    ];
}

module.exports = {
    format: format
};