angular.module('widgets').service('intellimaintenancewindowService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';

        // software class List Get  

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

    
        return {
            "getallappval" : getallappval,
        };
    }
]);