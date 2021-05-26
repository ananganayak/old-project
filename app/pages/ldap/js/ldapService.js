angular.module('widgets').service('intelliLdapService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';

        var loadldapDetails = function() {         
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.loadldapDetails, "GET", {}).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var saveldapDetails = function(param) {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.saveldapDetails, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var ldapmasterData = function() {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.ldapmasterData, "GET", {}).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        return {
            "ldapmasterData": ldapmasterData,
            "saveldapDetails": saveldapDetails,
            "loadldapDetails": loadldapDetails         
        };
    }
]);