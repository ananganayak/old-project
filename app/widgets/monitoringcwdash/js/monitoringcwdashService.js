angular.module('widgets').service('intellimonitoringcwdashService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';
        
        var getallval = function(val) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(val, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        
        
        return { 
            "getallval" : getallval,
        };
    }
]);