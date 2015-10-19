var _ = require("lodash");

module.exports = function(req, res, next, csv) {
    var html = '';

    var table = _.chain(csv)
            .map(function (row) {
                var tr = _.chain(row)
                            .reduce(function (html, col) {
                                return html + '<td>' + col + '</td>'
                            }, '')
                    .value();
                return '<tr>' + tr + '</tr>';
            })
            .value();

    res
        .status(200)
        .type('html')
        .send('<table>' + table.join('') + '</table>');
    next();
}