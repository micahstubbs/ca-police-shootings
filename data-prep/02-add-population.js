var d3 = require('d3');
var fs = require('fs');
var _ = require('lodash');
var util = require('../util.js');
var json2csv = require('json2csv');

var inputDir = __dirname;

var shootingsData = util.readCsv(inputDir + '/' + 'ca-fatal-police-shootings.csv');
var populationData = util.readCsv(inputDir + '/' + 'ca-county-population-2015.csv');

var counties = populationData.map(function(d) {
	
	// count the number of records for each county
	var count = shootingsData.filter(function(e) {
		return e['county'] === d['county'];
	}).length;

	// remove commas
	d['population'] = d['population'].replace(/,/g, '');

	console.log("d['population']", d['population']);
	console.log("parseInt(d['population'], 10)", parseInt(d['population'], 10));
	console.log('typeof count', "typeof Number(d['population'])")
	console.log(typeof count, typeof Number(d['population']));

	var rate = count / parseInt(d['population'], 10);
	var ratePer100k = rate * 100000;
	
	console.log("d['county']", d['county'])
	console.log('count', count);
	console.log('rate', rate);
	console.log('ratePer100k', ratePer100k);
	console.log('');

	d['count'] = count;
	d['ratePer100k'] = ratePer100k;

	return d;

})

var fields = ['county', 'population', 'count', 'ratePer100k'];

json2csv({ data: counties, fields: fields }, function(err, csv) {
  if (err) console.log(err);
  fs.writeFile('shooting-counts-by-county.csv', csv, function(err) {
    if (err) throw err;
    console.log('file saved');
  });
});

