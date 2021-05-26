angular.module('widgets').service('intelliEventsService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';
        
        var eventsList = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.eventslist + "/" + param["filter"] + "/" + param["start"] + "/" + param["offset"]+"/"+ 
                    param["search_filter_key"]+"/"+param["search_fitler_val"] + "/" + param["search_sorting"];  
            APIService.doApiCall(surl, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var eventssummary = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();             
            APIService.doApiCall(config.urls.eventssummary, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // get customer details
        var getcustdetserv = function () {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.alertcustomerdetget, "GET").then(function (result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        return {
            "eventsList": eventsList,
            "eventssummary" : eventssummary,
            "getcustdetserv" : getcustdetserv
        };
    }
]);