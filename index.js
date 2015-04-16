var fs = require('fs');
var async = require('async');

var convert = require('./convert');
var svgs = fs.readdirSync('./svg');

var converting = function(svg, doneCallback) {
	var file = svg.substring(0, svg.length - 4);
	convert(file);
	return doneCallback(null);
};

async.eachSeries(svgs, converting, function (err) {
  if(err) { console.log(err); }
});
