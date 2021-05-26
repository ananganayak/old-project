angular.module('widgets').service('intelDCMService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';

        var getdcmctserv = function() {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.inteldcmctget + "/masters", "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var getdcmgridserv = function() {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.inteldcmctget, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var postdcmaddserv = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.inteldcmctget+ "/add", "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        return {
            "getdcmctserv" : getdcmctserv,
            "getdcmgridserv" : getdcmgridserv,
            "postdcmaddserv" : postdcmaddserv
        };
    }
]);