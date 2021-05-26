angular.module('widgets').service('intelliCloudService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';


        // cloud details get service
        var cloudGird = function() {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.clouddetget, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };        
        
        // cloud Cred get service
        var cloudCred = function() {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.devicecred, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        // cloud add details service
        var addclouddet = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.clouddetget, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };  
        
        // cloud detail update service
        var updateclouddet = function(param, id) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.clouddetupdateput+"/"+ id, "PUT", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };  

        // cloud detail delete service
        var deletclouddet = function(id) {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.clouddetupdateput+"/"+ id, "DELETE").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        }; 
        
        // map details get service
        var cloudmapdetget = function(id) {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.cloudmapdet+"/"+ id, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var cloudmapdetpost = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.cloudmapdet, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        }; 
        
        return {
            "cloudGird" : cloudGird,
            "cloudCred" : cloudCred,
            "addclouddet" : addclouddet,
            "updateclouddet": updateclouddet,
            "deletclouddet" : deletclouddet,
            "cloudmapdetget" : cloudmapdetget,
            "cloudmapdetpost" : cloudmapdetpost,
        };
    }

]);