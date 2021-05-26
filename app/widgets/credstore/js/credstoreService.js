angular.module('widgets').service('intelliCredstoreService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';

        // Cred New Detail add 

        var addCred = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.devicecred, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // Cred Delete Row 

        var deletcreddet = function(cred_name, param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.devicecred + "/" + cred_name, "DELETE", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

       // Cred Detail List Get  

        var getCredDetlist = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.devicecred, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // Cred Detail Update 

        var updateCreddet = function(cred_name,param) {            
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.devicecred + "/" + cred_name, "PUT", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        return {
            "addCred" : addCred,
            "getCredDetlist": getCredDetlist,
            "updateCreddet" : updateCreddet,
            "deletcreddet" : deletcreddet
        };
    }
]);