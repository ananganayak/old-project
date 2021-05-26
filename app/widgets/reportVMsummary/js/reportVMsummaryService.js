angular.module('widgets').service('intellireportVMsummaryService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';

        var getrepocustserv = function(techid) {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.reportrepocustlovget + techid, "GET" ).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var postrepocustcsvserv = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.reportrepocustcsvget, "POST",  param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var postrepocustgridserv = function(id){
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.reportrepocustgridget+ id, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        }
        
        return {
            "getrepocustserv" : getrepocustserv,
            "postrepocustcsvserv" : postrepocustcsvserv,
            "postrepocustgridserv" : postrepocustgridserv
        };
    }
]);