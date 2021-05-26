angular.module('widgets').service('intellimonitoringAutoscaleService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';
        
        var gethyperallval = function() {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.monitorashyplistget, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var getautoscaleallval = function() {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.monitoraslistget, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var gethypervmwareval = function(param){
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.monitorashypvmwarelistget, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        }

        var posthypervmwareval = function(param){
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.monitorashypvmwarepost, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise; 
        }

        var postastenantsListserv = function(param){
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.monitorastenantpost, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise; 
        }

        var puthypervmwareval = function(param){
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.monitorashypvmwarepost, "PUT", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise; 
        }

        var getupdateasvalservice = function(id){
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.monitoraslistget+"/" + id, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        }

        var deletasservice = function(param){
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.monitoraslistget, "DELETE", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        }

        
        return { 
            "gethyperallval" : gethyperallval,
            "gethypervmwareval" : gethypervmwareval,
            "postastenantsListserv" : postastenantsListserv,
            "posthypervmwareval" : posthypervmwareval,
            "puthypervmwareval" : puthypervmwareval,
            "getautoscaleallval" : getautoscaleallval,
            "getupdateasvalservice" : getupdateasvalservice,
            "deletasservice" : deletasservice
        };
    }
]);