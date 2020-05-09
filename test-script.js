var fs = require('fs'),
newman = require('newman'),

results = [];

newman.run({
collection: require('/Users/sparimi/Desktop/postman_tests/DDT_add_contacts.json'),
iterationCount:4,
iterationData: '/Users/sparimi/Desktop/postman_tests/ddt_contacts.csv',
reporters: ['cli', 'html'],
reporter: {
	html: {
		export: '/Users/sparimi/Desktop/postman_tests/results/419report.html', // If not specified, the file will be written to `newman/` in the current working directory.
	}
}
})
.on('request', function (err, args) {
if (!err) {
	// here, args.response represents the entire response object
	var rawBody = args.response.stream, // this is a buffer
	body = rawBody.toString(); // stringified JSON

	results.push(JSON.parse(body)); // this is just to aggregate all responses into one object
	fs.writeFileSync('/Users/sparimi/Desktop/postman_tests/added_contacts.csv', JSON.stringify(results, null, 4));
	
	
}
});
// a second argument is also passed to this handler, if more details are needed.
//.on('done', function (err, summary) {
// write the details to any file of your choice. The format may vary depending on your use case
//fs.writeFileSync('caas-output.json', JSON.stringify(results, null, 4));
//if(summary.run.failures.length !== 0){
	//console.log("\\rThere are test failures")
	//here I can exit but the Newman summary isn't showed
//}//
//});//