angular.module('widgets').service('dashboardServiceVisualService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';
        
        var load_marstree = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.dashboard_marstree;
            APIService.doApiCall(surl, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        return {
            "load_marstree": load_marstree
        };
    }
]);