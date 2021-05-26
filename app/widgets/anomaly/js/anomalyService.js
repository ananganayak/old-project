angular.module('widgets').service('intelliAnomalyService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';
        
        var getanomalychartserv = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.anomalychartdetget, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            }
            );
            return deferred.promise;
        };


        // var getanomalychartservnew = function(param) {
        //     param = APIService.headerTokens(param);
        //     var deferred = $q.defer();
        //     APIService.doApiCall("https://r2d2.nxtgen.com/anomalygraph", "POST", param).then(function(result) {
        //         deferred.resolve(result);
        //     },
        //     function() {
        //         deferred.resolve(config.service_unavailable);
        //     }
        //     );
        //     return deferred.promise;
        // };

        var getanomalydetailserv = function() {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.anomalyhostgrpdetget, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        
        return { 
            "getanomalychartserv" : getanomalychartserv,
            "getanomalydetailserv" : getanomalydetailserv,
            // "getanomalychartservnew": getanomalychartservnew,
        };
    }
]);