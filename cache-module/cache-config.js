'use strict';


angular.module('myTmoApp.cache', []).run(function ($window, $rootScope, OfflineCache) {
	OfflineCache.init();
	
	$rootScope.online = navigator.onLine;
	$window.addEventListener('offline', function () {
		$rootScope.$apply(function() {
			$rootScope.online = false;
		});
		$rootScope.$broadcast('onlineChanged', false);
	}, false);

	$window.addEventListener('online', function () {
		$rootScope.$apply(function() {
			$rootScope.online = true;
		});
		$rootScope.$broadcast('onlineChanged', true);
	}, false);
});
angular.module('myTmoApp.cache')
  .constant('URL_CONSTS', {
	  'CACHE': 'CACHE',
	  'CACHE_STORAGE': 'CACHE_STORAGE',
	  'LOGGER_CACHE_KEY': 'log',
	  'LOGGER_CACHE_NAME': 'logMsgCache'
});
