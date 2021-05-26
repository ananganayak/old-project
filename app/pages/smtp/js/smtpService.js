angular.module('widgets').service('intelliSmtpService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';

        var loadsmptDetails = function() {
            //param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.loadsmptDetails, "GET", {}).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var savesmptDetails = function(param) {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.savesmptDetails, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var smtpmasterData = function() {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.smtpmasterData, "GET", {}).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        return {
            "loadsmptDetails": loadsmptDetails,
            "savesmptDetails": savesmptDetails,
            "smtpmasterData": smtpmasterData         
        };
    }
]);