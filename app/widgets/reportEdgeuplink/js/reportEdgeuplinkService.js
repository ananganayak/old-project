angular.module('widgets').service('intellireportEdgeuplinkService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';

        // var getreportperiodserv = function() {
        //     // param = APIService.headerTokens(param);
        //     var deferred = $q.defer();
        //     APIService.doApiCall(config.urls.monitoringperiodget, "GET" ).then(function(result) {
        //         deferred.resolve(result);
        //     },
        //     function() {
        //         deferred.resolve(config.service_unavailable);
        //     });
        //     return deferred.promise;
        // };

        var getreportedgedetserv = function() {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.reportedgeget , "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var postedgedet = function(param){
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.reportedgeget, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        }

    
        return {
            // "getreportperiodserv" : getreportperiodserv,
            "getreportedgedetserv" : getreportedgedetserv,
            "postedgedet": postedgedet,
        };
    }
]);