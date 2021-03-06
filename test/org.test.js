var test = require('tape');
var org  = require('../lib/switcher');
var dir  = __dirname.split('/')[__dirname.split('/').length-1];
var file = dir + __filename.replace(__dirname, '') + " > ";

test(file + 'Scrape an org WITHOUT a next page (known data)', function(t){
	var url = '/peersun';
	org(url, function(err, data) {
		// console.log(data);
		t.ok(data.entries.length > 5, 'org '
			+ url + ' has ' + data.entries.length + ' repos.')
		t.ok(data.pcount === 0, '"pcount":' + data.pcount);
		t.end();
	});
})

test(file + 'Scrape an org WITH a next page', function(t){
	var url = '/github';
	org(url, function(err, data) {
		// console.log(data);
		t.ok(data.pcount > 100, '"pcount":'+data.pcount);
		t.ok(data.location === 'San Francisco, CA', 'data.location: '+data.location);
		t.ok(data.website === 'https://github.com/about', 'data.url: '+data.url);
		t.ok(data.email === 'support@github.com', 'data.email: '+data.email);
		t.end();
	});
})

test(file + 'Fetch Second page of dwyl org', function(t){
	var url = '/dwyl?page=2';
	org(url, function(err, data) {
		// console.log(data);
		t.ok(data.entries.length === 30, 'SECOND page of org has 20 repos: '+data.entries.length)
		t.ok(data.pcount > 10, '"pcount":'+data.pcount);
		t.ok(data.next_page === '/dwyl?page=3', 'dwyl has more than one page');
		t.end();
	});
})

test(file + 'ORG with no people', function(t){
	var url = '/pandajs';
	org(url, function(err, data) {
		t.ok(typeof data.website === 'undefined', "No website")
		t.ok(typeof data.location === 'undefined', "No location")
		t.ok(typeof data.email === 'undefined', "No email")
		t.ok(data.pcount === 0, url + ' "pcount":'+data.pcount);
		t.end();
	});
})
