angular.module('pages').service('uciMappingservices', [ 'APIService', '$q', 
    function(APIService, $q) {
        'use strict';


        var getucialldataserv = function() {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.ucigetalldet, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var getuciuserdetserv = function(param) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.ucigetalldet +"/" + param, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var submitcival = function(param) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.ucigetalldet, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        return {
            "getucialldataserv": getucialldataserv,
            "getuciuserdetserv": getuciuserdetserv,
            "submitcival": submitcival,
        };
    }
])