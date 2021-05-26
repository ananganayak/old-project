angular.module('widgets').service('intelliLoginService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';
        var postLogin = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.login, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var update_keylicence = function(param) { 
            param = APIService.headerTokens(param);           
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.updatelicencekey, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        var resetpwd = function(param) { 
            param = APIService.headerTokens(param);           
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.postresetpwd, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        return {
            "postLogin": postLogin,
            "update_keylicence": update_keylicence,
            "resetpwd": resetpwd
        };
    }
]);