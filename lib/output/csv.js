var _ = require("lodash");

module.exports = function(req, res, next, csv) {
    var stringCsv = '';
    csv.forEach(function (line) {
        stringCsv = stringCsv + line.join(',') + "\n";
    })

    res
        .status(200)
        .type('text/csv')
        .set("Content-Disposition", 'inline; filename="' + req.files.edl.filename.replace(/\..*$/, '.csv') + '"')
        .send(stringCsv);
    next();

}