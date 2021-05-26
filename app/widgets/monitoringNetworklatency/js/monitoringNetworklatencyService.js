angular.module('widgets').service('intellimonitorNetlatencyService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';
        
        // time stamp list get services
        var getlovtimestampserv = function() {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.monitornetlatenget+"listTimeStamps", "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // host group list get service
        var getallappval = function(username) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.monitoringgetallapp + username, "GET").then(function(result) {
                deferred.resolve(result);
                // console.log(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // host list get service
        var gethostlist = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.monitoringet, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // host List get services
        // var gethostlistserv = function() {
        //     // param = APIService.headerTokens(param);
        //     var deferred = $q.defer();
        //     APIService.doApiCall(config.urls.monitornetlatenget+"listAllHosts", "GET").then(function(result) {
        //         deferred.resolve(result);
        //     },
        //     function() {
        //         deferred.resolve(config.service_unavailable);
        //     });
        //     return deferred.promise;
        // };

        // host available list get services
        var gethostavailablelistserv = function(time) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.monitornetlatenget+"getAllHostAvailability/"+time , "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var gethostvalbasedserv = function(time, param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.monitornetlatenget+"getHostAvailability/"+time , "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        return { 
            "getlovtimestampserv" : getlovtimestampserv,
            "getallappval" : getallappval,
            "gethostlist" : gethostlist,
            // "gethostlistserv" : gethostlistserv,
            "gethostavailablelistserv" : gethostavailablelistserv,
            "gethostvalbasedserv" : gethostvalbasedserv,
        };
    }
]);