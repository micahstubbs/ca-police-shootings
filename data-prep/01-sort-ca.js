var d3 = require('d3');
var fs = require('fs');
var _ = require('lodash');
var util = require('../util.js');
var json2csv = require('json2csv');

var inputDir = __dirname + '/..';

var data = util.readCsv(inputDir + '/' + 'ca-fatal-police-shootings.csv');

var shootings = data.sort(function(a, b) {
    return a['city'].localeCompare(b['city']);
})

var fields = ['id', 'name', 'date', 'manner_of_death', 'armed', 'age',
	'gender', 'race', 'city', 'state', 'signs_of_mental_illness', 
	'threat_level', 'county'];

json2csv({ data: shootings, fields: fields }, function(err, csv) {
  if (err) console.log(err);
  fs.writeFile('ca-fatal-police-shootings.csv', csv, function(err) {
    if (err) throw err;
    console.log('file saved');
  });
});

