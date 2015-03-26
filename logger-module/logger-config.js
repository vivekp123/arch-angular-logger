'use strict';

angular.module('myTmoApp.logger', []).run(function(loggerService, LOGGER_OPTIONS, LOGGER_AJAX_OPTIONS) {

	loggerService.setLoggerOptions(LOGGER_OPTIONS);

	if(!navigator.onLine){
		loggerService.detachAppender(LOGGER_AJAX_OPTIONS);
		return;
	}

	loggerService.setAJAXLoggerOptions(LOGGER_AJAX_OPTIONS);

});

