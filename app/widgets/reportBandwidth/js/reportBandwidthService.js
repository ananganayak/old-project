angular.module('widgets').service('intellireportBandwidthService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';

        var getreportbandgriderv = function(id) {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.reportbandwidthget+"/grid/"+id, "GET" ).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var getreportbanddetserv = function() {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.reportbandwidthget , "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var postbandwidthdet = function(param){
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.reportbandwidthget, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        }

    
        return {
            "getreportbanddetserv" : getreportbanddetserv,
            "getreportbandgriderv" : getreportbandgriderv,
            "postbandwidthdet": postbandwidthdet,
        };
    }
]);