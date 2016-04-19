myApp.imdbApi = {};

myApp.imdbApi.getMovies = function (movies, callbackFunc) {
	var http = require('http');
	var hostname = 'www.omdbapi.com';
	for (var i = 0; i < movies.length; i++) {
		var path = '/?i='+ movies[i].value +'&plot=full&r=json'
		if (movies[i].type == 'title') {
			path = '/?t='+ movies[i].value +'&plot=full&r=json'
		};
		var options = {
	  		hostname: hostname,
	  		path: path
		};

		var callback = function(response){
			var body = [];
			response.on('data', function(chunk) {
	  			body.push(chunk);
			}).on('end', function() {
	  			body = Buffer.concat(body).toString();
	  			var bodyFormat = body.replace('imdbID', '_id');
	  			callbackFunc(JSON.parse(bodyFormat));
			});
		}
		http.get(options, callback).end();	
	};
};