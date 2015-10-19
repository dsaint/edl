module.exports = function(req, res, next, csv) {
    res
        .status(200)
        .type('application/json')
        .send(csv);
    next();
}