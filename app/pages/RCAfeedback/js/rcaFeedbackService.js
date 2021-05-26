angular.module('pages').service('rcaFeedbackservices', [ 'APIService', '$q', 
    function(APIService, $q) {
        'use strict';


        var get_rcaAlartval = function(param) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.Rcaalertgetval, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var send_rcaAlartval = function(param) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.Rcaalertsendval, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        return {
            "get_rcaAlartval": get_rcaAlartval,
            "send_rcaAlartval": send_rcaAlartval,
        };
    }
])