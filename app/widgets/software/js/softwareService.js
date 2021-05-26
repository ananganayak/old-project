angular.module('widgets').service('intellisoftwareService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';

        // software class List Get  

        var getsoftwareclslist = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.getsoftclass, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // software sub class List Get 
        var getsoftwaresubclslist = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.getsoftsubclass, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // software details List view Get
        var getsoftwaredetlist = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.getsoftlist, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // software attripute details List Get
        var getsoftwareattrlist = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.getsoftattrlist, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // software add details List 
        var addsoftwarelist = function(param) {
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

        // software update details List 
        var upsoftwarelist = function(param) {            
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.addsoftlist, "PUT", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // software details delete function
        var deletswdet = function(param) {
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
            "getsoftwareclslist" : getsoftwareclslist,
            "getsoftwaresubclslist": getsoftwaresubclslist,
            "getsoftwareattrlist" : getsoftwareattrlist,
            "addsoftwarelist" : addsoftwarelist,
            "getsoftwaredetlist": getsoftwaredetlist,
            "upsoftwarelist" : upsoftwarelist,
            "deletswdet" : deletswdet
        };
    }
]);