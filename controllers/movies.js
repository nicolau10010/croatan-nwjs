myApp.movies = {};
myApp.movies.init = function () {
	myApp.loadTemplate('layout', null, '#mainView');
	myApp.movies.listenForEvents();
	myApp.movies.load('all');
	
};

myApp.movies.listenForEvents = function () {
	$('.movie').click(function (){
		var id = $(this).attr('id');
		console.log('s');
	});
};

myApp.movies.importMovie = function(path){
	var fm = require('path');
	var fileNameIndex = encodeURI(fm.basename(path))
	var movieName = fileNameIndex.split('.')[0];
	var movies = [{type:"title", value:movieName}];
	myApp.imdbApi.getMovies(movies, function(movie){
		myApp.db.put(movie, function callback(err, result) {
			if (err) 
				return console.warn(err);
			movie._rev = result.rev;
			myApp.movies.render(movie);
		});
	});
}

myApp.movies.load = function(genre){
	myApp.db.allDocs({include_docs: true}, function(err, resp) {
		resp.rows.forEach(function (item) {
			if(genre != 'all' ){
				if (item.doc.Genre.indexOf(genre) > -1) {
					myApp.movies.render(item.doc);
				}
			} else {
				myApp.movies.render(item.doc);	
			}
		});
	});
};

myApp.movies.render = function(movie){
	var data = {
		movie: movie
	};
	var movieTemplate = myApp.loadTemplate('movies', data);
	$("#moviesContent").append(movieTemplate);
};
