angular.module('widgets').service('CSMappingService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';
        // get customer details
        var getcustomerdet = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.admincustdetget, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // Get customer details
        var postcustomerdet = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.admincustdetget, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // Get Virutal Machnine Details
        var getvmwaredet = function(cusid, tec) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.custvmwaremapdetget + "/" +cusid +"/" + tec, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // Post Virutal Machnine Details
        var postvmwaredet = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.custvmwaremapdetget, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // Post Virutal Machnine Details
        var getusermaildet = function(id) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.getcustmaildet + id, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // Post Virutal Machnine Details
        var postusermaildet = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.sendcustmaildet, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // Put Virutal Machnine Details
        var putusermaildet = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.sendcustmaildet, "PUT", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // Put Virutal Machnine Details
        var delusermaildet = function(id) {
            // param = APIService.headerTokens(id);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.getcustmaildet + id, "DELETE").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };


        return {
            "getcustomerdet" : getcustomerdet,
            "postcustomerdet" : postcustomerdet,
            "getvmwaredet" : getvmwaredet,
            "postvmwaredet" : postvmwaredet,
            "getusermaildet" : getusermaildet,
            "postusermaildet" : postusermaildet,
            "putusermaildet" : putusermaildet,
            "delusermaildet" : delusermaildet,
        };
    }
]);