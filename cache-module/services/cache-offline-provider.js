'use strict';

angular.module('myTmoApp.cache').provider('OfflineCache', function(){

	this.$get = function ($rootScope, cacheService, loggerService, LOGGER_AJAX_OPTIONS, URL_CONSTS){
		var service = {};

		service.init = function() {};
		
		service.handleDataToStorage = function(isOnline){
			if(!isOnline){
				return;
			}
			
			service.sendLogsToServer();
		};
		
		service.sendLogsToServer = function(){
					
			var lStorageCache = cacheService.getTMOCache(URL_CONSTS.LOGGER_CACHE_NAME);
			var logmessages = lStorageCache.get(URL_CONSTS.LOGGER_CACHE_KEY) || [];
			var logger = loggerService.getAJAXLogger();

			if(logmessages.length <= 0){
				return;
			}
			for(var i=0; i< logmessages.length; i++){
                                logger.sendLogItemsAjax(logmessages[i]);
                        }
			lStorageCache.remove(URL_CONSTS.LOGGER_CACHE_KEY);
		};
		
		JL.ConsoleAppender.prototype.sendLogItemsConsole = function(logItems){
			var logMessages = [];
			var isOnline = $rootScope.online;
			
			if(isOnline && !loggerService.isDebug()){
				return;
			}
			
			if(!isOnline){
				var lStorageCache = cacheService.getTMOCache(URL_CONSTS.LOGGER_CACHE_NAME);
				logMessages = lStorageCache.get(URL_CONSTS.LOGGER_CACHE_KEY) || [];
				logMessages.push(logItems);
				lStorageCache.put(URL_CONSTS.LOGGER_CACHE_KEY,logMessages);
			}
			
			try {
                if (!console) {
                    return;
                }
                var i;
                for (i = 0; i < logItems.length; ++i) {
                    var li = logItems[i];
                    var msg = li.n + ': ' + li.m;

                    if (typeof window === 'undefined') {
                        msg = new Date(li.t) + ' | ' + msg;
                    }
                    if (li.l <= JL.getDebugLevel()) {
                        JL.ConsoleAppender.prototype.cdebug(msg);
                    }
                    else if (li.l <= JL.getInfoLevel()) {
                    	JL.ConsoleAppender.prototype.cinfo(msg);
                    }
                    else if (li.l <= JL.getWarnLevel()) {
                    	JL.ConsoleAppender.prototype.cwarn(msg);
                    }
                    else {
                    	JL.ConsoleAppender.prototype.cerror(msg);
                    }
                }
            }
            catch (e) {
            }
		};
		
		$rootScope.$on('onlineChanged', function(event, isOnline) {
			
			if(!isOnline){
				loggerService.detachAppender(LOGGER_AJAX_OPTIONS);
			}else{
				loggerService.attachAppender(LOGGER_AJAX_OPTIONS);
				service.handleDataToStorage(isOnline);
			}
		});

		return service;
	};


});
