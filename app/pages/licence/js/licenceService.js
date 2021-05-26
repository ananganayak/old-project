angular.module('widgets').service('licenceService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';

        var get_keylicence = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.getlicencekey, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        
        var update_keylicence = function(param) {            
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.updatelicencekey, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        return {
            "get_keylicence": get_keylicence,
            "update_keylicence" : update_keylicence
        };
    }
]);