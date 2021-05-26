angular.module('widgets').service('intelliUnknownsService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';
        
        var getunknownsdetserv = function() {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.getmonitoringunknow, "GET").then(function(result) {
                // APIService.doApiCall("./app/widgets/monitoringUnknowns/json/unknowns.json", "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        return { 
            "getunknownsdetserv" : getunknownsdetserv
        };
    }
]);