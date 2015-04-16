var express = require('express');
var app = express();
var fs = require('fs');

app.set('views', './views');
app.set('view engine', 'jade');

app.use('/js', express.static(__dirname + '/client/js'));
app.use('/css', express.static(__dirname + '/client/css'));


app.get('/', function(req, res) {
	var jsonFiles = fs.readdirSync('./json');
	res.render('index', {jsonFiles: jsonFiles})
})

app.get('/:file', function(req, res) {
	var fileName = req.params.file;
	var file = require('./json/' + fileName);
	res.render('image', {file: file})
})

app.get('/img/', function(req, res) {
	var jsonFiles = fs.readdirSync('./json');
	res.send(jsonFiles)
});
app.get('/img/:file', function(req, res) {
	var fileName = req.params.file;
	var file = require('./json/' + fileName);
	res.send(file)
});

app.listen(3000, function() { console.log('listening on 3000')})
