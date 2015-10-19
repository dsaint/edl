
function parse (chunk) {
    var self = this;

    chunk.toString().split(/[\r\n]/).forEach(
        function(line) { 
            var assignment_line = line.match(/^([A-Z\s]+):\s*(.*)$/);
            var event_line = line.match(/^(\d{3})\s+([^\s]{1,8})\s+([AV])\s+([CDWKBKO0-9]{1,4}(?: \d{3})*)\s+((?:(?:\d+:){3}\d{2}\s?){4})/);
            var motion_line = line.match(/^M2\s+([^\s]+)\s+([\d.]+)\s+((?:\d+:){3}\d{2})/);
            var trailer_line = line.match(/^\*\s?([A-Z\s]+):\s*(.*)$/);

            if (assignment_line) {
                var header = {};
                header[assignment_line[1]] = assignment_line[2];
                self.emit('header_update', header);
            } else if (event_line) {
                var times = event_line[5].split(/\s+/);
                self.emit('event_create', {
                    id: event_line[1],
                    src_tape: event_line[2],
                    channels: event_line[3],
                    edit_type: event_line[4],
                    src_in: times[0],
                    src_out: times[1],
                    seq_in: times[2],
                    seq_out: times[3]
                });
            } else if (motion_line) {
                self.emit('motion_create', {
                    src_tape: motion_line[1],
                    fps: motion_line[2],
                    src_in: motion_line[3]
                });
            } else if (trailer_line) {
                var trailer = {};
                trailer[trailer_line[1]] = trailer_line[2].trim();
                self.emit('event_trailer', trailer);
            } else {
                // Ignoring unknown line
            }

        }
    );
}


module.exports = {
    parse: parse
};