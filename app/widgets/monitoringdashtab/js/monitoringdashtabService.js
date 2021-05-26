angular.module('widgets').service('intellimonitoringdashtabService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';
        
        var getallappval = function(username) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.getmonitoringhstgrp +"/"+username , "GET").then(function(result) {
                deferred.resolve(result);
                // console.log(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };


        var gethstgrpdetserv = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.postmonitoringhstgrpdet, "POST", param).then(function(result) {
                deferred.resolve(result);
                // console.log(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        return { 
            "getallappval" : getallappval,
            "gethstgrpdetserv" : gethstgrpdetserv
        };
    }
]);