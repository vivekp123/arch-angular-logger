'use strict';

angular.module('myTmoApp.cache').service('cacheService', ['CacheFactory','URL_CONSTS',  function(cacheFactory, URL_CONSTS) {
	
	this.getTMobCache = function(name, type, option){
		if(type === URL_CONSTS.CACHE){
			return getCache(name, option);
		} else if(type === URL_CONSTS.CACHE_STORAGE){
			return getStorageCache(name, option);
		} 
	};
	
	this.getTMOCache = function(cache){
		return cacheFactory.get(cache);
	};
	
	var getCache = function(cache, options){
		if(cache && !cacheFactory.get(cache)){
			return cacheFactory.createCache(cache, options);
		}else{
			return cacheFactory.get(cache);
		}
	};
	
	var getStorageCache = function(cache, options){
		if(!cacheFactory.get(cache)){
			return cacheFactory.createCache(cache, options);
		}
		return cacheFactory.get(cache);
		
	};
	
	this.setCacheFlushInterval = function(cache, cacheFlushInterval){
		cache.setCacheFlushInterval(cacheFlushInterval);
	};
	
	this.setCapacity = function(cache, capacity){
		cache.setCapacity(capacity);
	};
	
	this.setDeleteOnExpire = function(cache, deleteOnExpire){
		cache.setDeleteOnExpire(deleteOnExpire);
	};
	
	this.setMaxAge = function(cache, setMaxAge){
		cache.setMaxAge(setMaxAge);
	};
	
	this.setOnExpire = function(cache, setOnExpire){
		cache.setOnExpire(setOnExpire);
	};
	
	this.setRecycleFreq = function(cache, setRecycleFreq){
		cache.setRecycleFreq(setRecycleFreq);
	};
	
	this.setStorageMode = function(cache, storageMode){
		cache.setStorageMode(storageMode);
	};
	
}]);
