angular.module('widgets').service('intelliarconService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';

        var getarccomtypeser = function() {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.getarcmasterdata+"/masters", "GET", {}).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var getarcmasterser = function() {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.getarcmasterdata, "GET", {}).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var getarcsaveser = function(param) {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.getarcmasterdata+"/add", "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        return {
            "getarccomtypeser": getarccomtypeser,
            "getarcmasterser": getarcmasterser,
            "getarcsaveser": getarcsaveser         
        };
    }
]);