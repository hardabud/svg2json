var fs = require('fs');
var jf = require('jsonfile');
var xml2js = require('xml2js');

var parser = new xml2js.Parser();

module.exports = function(svgFile) {
	var json = [];
	var jsonFile = './json/' + svgFile + '.json';
	var svg = fs.readFileSync('./svg/' + svgFile + '.svg');
	parser.parseString(svg, function (err, result) {
		var paths = result.svg.g[0].path;
		for(i=0;i<paths.length;i++) {
			json.push({ id: svgFile + i, d: paths[i].$.d, style: paths[i].$.style, transform: paths[i].$.transform})
		}
		jf.writeFile(jsonFile, json, function(err) {
			if(err) { console.log(err); }
			else { console.log('converted ' + svgFile + '.svg to ' + svgFile + '.json'); }
		});
	});
}


