'use strict';

angular.module('myTmoApp.logger')
.service('loggerService', ['$http', '$q', 'URL_CONSTS', '$location', 'loggerAjaxService', 'loggerConsoleService', 'LOCAL_STORAGE_CONFIG', 'cacheService', '$rootScope', function ($http, $q, URL_CONSTS, $location, loggerAjaxService, loggerConsoleService, LOCAL_STORAGE_CONFIG, cacheService, $rootScope) {
	var appenders = [];
	var self = this;
	self.logger = undefined;

	this.setLoggerOptions = function (option) {
		if (!option) {
			return;
		}
		JL.__.setOptions({
			level: JL.getTraceLevel()
		});
		self.logger = JL('Rebellion');
		self.logger.setOptions(option);
		self.createLoggerCache();
	};

	this.setAJAXLoggerOptions = function (option) {
		initAppenders(option);
	};

	this.getAJAXLogger = function(){
		return _.find(self.getAppenders(), { 'appenderName': 'ajaxAppender' });
	};
	
	this.createLoggerCache = function(){
		cacheService.getTMobCache(URL_CONSTS.LOGGER_CACHE_NAME, URL_CONSTS.CACHE_STORAGE, LOCAL_STORAGE_CONFIG);
	};

	this.detachAppender = function(options){
		detachAjaxConsoleAppender('ajaxAppender');
		if(self.isDebug()){
			return ;
		}
		self.attachConsoleAppender(options);
	};

	this.attachAppender = function(options){
		attachAjaxAppender(options);
		if(self.isDebug()){
			return;
		}
		detachAjaxConsoleAppender('consoleAppender');
	};

	var detachAjaxConsoleAppender = function(appender){
		_.remove(self.getAppenders(), function() { 
			return _.find(self.getAppenders(), { 'appenderName': appender });
		});
	};

	var attachAjaxAppender = function(res){
		var ajaxAppender = self.getAjaxAppender();

		if(res){
			ajaxAppender.setOptions(res);
		}    
		self.setAppenders(ajaxAppender);
	};

	this.attachConsoleAppender = function(res){
		var consoleAppender = self.getConsoleAppender();
		if(res){
			consoleAppender.setOptions(res);
		}    
		self.setAppenders(consoleAppender);
	};

	var initAppenders = function (res) {

		attachAjaxAppender(res);

		if (false === self.isDebug()) {
			return;
		}

		self.attachConsoleAppender(res);

	};

	this.setAppenders = function (appender) {
		if (!appender) {
			return;
		}
		appenders.push(appender);

		self.logger.setOptions({
			'appenders' : self.getAppenders()
		});
	};

	this.isDebug = function () {
		return $location.search()
		.debug === 'true';
	};

	this.getAppenders = function () {
		return appenders;
	};

	this.getAjaxAppender = function () {
		return loggerAjaxService.getAjaxAppender();
	};

	this.getConsoleAppender = function () {
		return loggerConsoleService.getConsoleAppender();
	};
}])
.service('loggerAjaxService', function () {

	this.getAjaxAppender = function () {
		return JL.createAjaxAppender('ajaxAppender');
	};
})
.service('loggerConsoleService', function () {

	this.getConsoleAppender = function () {
		return JL.createConsoleAppender('consoleAppender');
	};
}).service('$log', function () {
	this.log = function () {
		JL('Rebellion')
		.trace(arguments);
	};
	this.debug = function () {
		JL('Rebellion')
		.debug(arguments);
	};
	this.info = function () {
		JL('Rebellion')
		.info(arguments);
	};
	this.warn = function () {
		JL('Rebellion')
		.warn(arguments);
	};
	this.error = function () {
		JL('Rebellion')
		.error(arguments);
	};
});
