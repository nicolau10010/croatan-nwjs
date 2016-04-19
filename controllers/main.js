var myApp = {};
myApp.init = function () {
	myApp.db = new PouchDB('movies');
	myApp.movies.init();
	myApp.nativeUI.init()
};
$(window).load(myApp.init);