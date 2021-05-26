angular.module('widgets').service('intelliautomationdashboardService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';

        // software class List Get  

        var getautolisttotserv = function() {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.getautolisttotapi+"/workflowstatus", "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var getautoprocesstartotserv = function() {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.getautolisttotapi+"/processbysd", "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var getautoprocesendtotserv = function() {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.getautolisttotapi+"/processbyed", "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var getautoprocesruntotserv = function() {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.getautolisttotapi+"/processbyruntime", "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var getautoprocestyptotserv = function() {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.getautolisttotapi+"/processcategory", "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var getautoroityptotserv = function() {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.getautolisttotapi + "/roi", "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        return {
            "getautolisttotserv" : getautolisttotserv,
            "getautoprocesstartotserv" : getautoprocesstartotserv,
            "getautoprocesendtotserv" : getautoprocesendtotserv,
            "getautoprocesruntotserv" : getautoprocesruntotserv,
            "getautoprocestyptotserv" : getautoprocestyptotserv,
            "getautoroityptotserv" : getautoroityptotserv
        };
    }
]);