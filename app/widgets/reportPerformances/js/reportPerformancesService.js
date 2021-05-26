angular.module('widgets').service('intellireportPerformancesService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';

        var getlovperformserv = function(userid) {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.reportperflovget, "GET" ).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var postperfhstdetserv = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.reportperfdetpost, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var postperffwdetserv = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.reportperffwdetpost, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var postperfcdetserv = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.reportperfcdetpost, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        return {
            "getlovperformserv" : getlovperformserv,
            "postperfhstdetserv" : postperfhstdetserv,
            "postperffwdetserv" : postperffwdetserv,
            "postperfcdetserv" : postperfcdetserv,
        };
    }
]);