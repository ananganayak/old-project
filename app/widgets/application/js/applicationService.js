angular.module('widgets').service('intelliapplicationService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';

        // software class List Get  

        var getappclasslist = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.getappclslist, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var getappsubclslist = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.getappsubclslist, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var addapplicationlist = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.addsoftlist, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var getapplicationdetlistser = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.getappdetlist, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var updateapplicationlist = function(param) {            
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.addsoftlist, "PUT", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // application Delete Row 

        var deletappdet = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.addsoftlist, "DELETE", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

    
        return {
            "getappclasslist" : getappclasslist,
            "getappsubclslist": getappsubclslist,
            "addapplicationlist" : addapplicationlist,
            "getapplicationdetlistser" : getapplicationdetlistser,
            "updateapplicationlist" : updateapplicationlist,
            "deletappdet" : deletappdet
        };
    }
]);