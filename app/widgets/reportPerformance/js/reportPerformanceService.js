angular.module('widgets').service('intellireportPerformanceService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';

        var getlovbandserv = function(userid) {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.reportbanddetget+ "/master/"+userid, "GET" ).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var getbanddetserv = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.reportbanddetget, "POST", param ).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        return {
            "getlovbandserv" : getlovbandserv,
            "getbanddetserv" : getbanddetserv
        };
    }
]);