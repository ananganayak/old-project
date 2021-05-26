angular.module('widgets').service('intelliDropEventsService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';
        
        var dropeventsList = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.dropeventslist + param["start"] + "/" + param["offset"];
            console.log(surl);
            APIService.doApiCall(surl, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var dropeventPromote = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.dropeventpromote, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        return { 
            "dropeventsList" : dropeventsList,
            "dropeventPromote" : dropeventPromote
        };
    }
]);