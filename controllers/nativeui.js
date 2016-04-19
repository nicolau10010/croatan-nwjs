myApp.nativeUI = {};
myApp.nativeUI.init = function () {
	// Instance nw.gui
	myApp.gui = require('nw.gui');
	// Globals
	myApp.mainWindow = myApp.gui.Window.get();
	myApp.name = myApp.gui.App.manifest.name;
	myApp.nativeUI.delayClosing();
	myApp.mainWindow.show();
	myApp.nativeUI.chooseFile('#fileDialog');
	myApp.nativeUI.chooseGenre('#filterGenre');
};

myApp.nativeUI.delayClosing = function () {
	myApp.mainWindow.on('close', function () {
		// Hide window
		myApp.mainWindow.hide();
		// Close other opened windows
		myApp.gui.App.closeAllWindows();
		// Actually close the Application
		myApp.mainWindow.close(true);
	});
};

myApp.nativeUI.chooseFile = function(container){
	var chooser = document.querySelector(container);
    chooser.addEventListener("change", function(evt) {
      	myApp.movies.importMovie(this.value);
    }, false);
}

myApp.nativeUI.chooseGenre = function(container){
	var genres = document.querySelector(container);
	genres.addEventListener("change", function(evt){
		myApp.nativeUI.clear("#moviesContent");
		myApp.movies.load(this.value)
	}, false);
}

myApp.nativeUI.clear = function(container){
	$(container).empty();
}