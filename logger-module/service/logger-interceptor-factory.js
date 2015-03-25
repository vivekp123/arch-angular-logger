'use strict';

angular.module('ngArchRef.logger').factory('logToServerInterceptor', [ '$q', function($q) {
	var myInterceptor = {
			'request' : function(config) {
				config.msBeforeAjaxCall = new Date().getTime();
				return config;
			},
			'response' : function(response) {
				if (response.config.warningAfter) {
					var msAfterAjaxCall = new Date().getTime();
					var timeTakenInMs = msAfterAjaxCall - response.config.msBeforeAjaxCall;
					if (timeTakenInMs > response.config.warningAfter) {
						JL('Rebellion').warn({
							timeTakenInMs : timeTakenInMs,
							config : response.config,
							data : response.data
						});
					}
				}
				return response;
			},
			'responseError' : function(rejection) {
				var errorMessage = 'timeout';
				if (rejection.status !== 0) {
					errorMessage = rejection.data.ExceptionMessage;
				}
				JL('Rebellion').fatalException({
					errorMessage : errorMessage,
					status : rejection.status,
					config : rejection.config
				}, rejection.data);
				return $q.reject(rejection);
			}
	};
	return myInterceptor;
} ]);