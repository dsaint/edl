var cmx = require('./cmx3600'),
    file32 = require('./file32')

module.exports = {
    cmx3600: cmx.parse,
    file32: file32.parse
}