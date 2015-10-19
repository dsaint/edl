var express = require('express');
var bb = require('express-busboy');
var app = express();

var fs = require('fs');
var generator = require('./lib/generator');
var parser = require('./lib/parsers');
var filters = require('./lib/filters');
var output = require('./lib/output/html');

var fileTypes = {
    'CMX': parser.cmx3600,
    'FILE32': parser.file32
};
var outputFormats = {
    'html': require('./lib/output/html'),
    'csv' : require('./lib/output/csv'),
    'json': require('./lib/output/json')
};

bb.extend(app, {
    upload: true
});

app.use('/generate', function(req, res, next) { 

    var edlStream = fs.createReadStream(req.files.edl.file, { flags: 'r', encoding: 'utf-8' });
    var options = {
        stream: edlStream,
        filter: { 
            include: filters.nameIncludes(req.body.include.split(',')),
            exclude: filters.nameExcludes(req.body.exclude.split(','))
        },
        parser: fileTypes[req.body.type],
        output: outputFormats[req.body.format || 'html']
    };

    edlStream.on('csv', function (csv) { options.output(req, res, next, csv) });

    // Create edit list using edlEvent.src_type as the key
    generator(options);
});
app.use(express.static('public'));
app.listen(3000);
console.log("Listening on port 3000");