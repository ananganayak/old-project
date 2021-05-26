angular.module('widgets').service('intelliresourceService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';

        var getresourceclslist = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.getresclslist, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };


        var getresourcedetlist = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.getresdetlist, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var addresourcelist = function(param) {
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

        var upresourcelist = function(param) {            
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

        var deletresdet = function(param) {
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
            "getresourceclslist" : getresourceclslist,
            "getresourcedetlist": getresourcedetlist,
            "addresourcelist" : addresourcelist,
            "upresourcelist" : upresourcelist,
            "deletresdet" : deletresdet
        };
    }
]);