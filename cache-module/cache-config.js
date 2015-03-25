'use strict';


angular.module('ngArchRef.cache', []).run(function ($window, $rootScope, OfflineCache) {
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