var d3 = require('d3');
var fs = require('fs');
var _ = require('lodash');
var util = require('../util.js');
var json2csv = require('json2csv');

var inputDir = __dirname;

var data = util.readCsv(inputDir + '/' + 'fatal-police-shootings-data.csv');

var shootings = data.filter(function(d) {
	return d['state'] === 'CA';
})

var fields = ['id', 'name', 'date', 'manner_of_death', 'armed', 'age',
	'gender', 'race', 'city', 'state', 'signs_of_mental_illness', 
	'threat_level'];

json2csv({ data: shootings, fields: fields }, function(err, csv) {
  if (err) console.log(err);
  fs.writeFile('ca-fatal-police-shootings.csv', csv, function(err) {
    if (err) throw err;
    console.log('file saved');
  });
});

