angular.module('widgets').service('intellimonitoringtabService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';
        
        var getallappval = function(val) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.monitoringgetallapp + val, "GET"   ).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

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

        // var getservicelist = function(val, param) {
        //     param = APIService.headerTokens(param);
        //     var deferred = $q.defer();
        //     APIService.doApiCall(config.urls.monitorinservget + val , "POST", param).then(function(result) {
        //         deferred.resolve(result);
        //     },
        //     function() {
        //         deferred.resolve(config.service_unavailable);
        //     });
        //     return deferred.promise;
        // };

        var postservicesortlist = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.getmonitoringservsort, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // var getservicechart = function(hstname, servname, param) {
        //     param = APIService.headerTokens(param);
        //     var deferred = $q.defer();
        //     APIService.doApiCall(config.urls.monitorinchartget + hstname + "/"+ servname , "POST", param).then(function(result) {
        //         deferred.resolve(result);
        //     },
        //     function() {
        //         deferred.resolve('Service Unavailable');
        //     });
        //     return deferred.promise;
        // };
        
        return { 
            "getallappval" : getallappval,
            "gethostlist" : gethostlist,
            // "getservicelist" : getservicelist,
            "postservicesortlist" : postservicesortlist
            // "getservicechart" : getservicechart,
        };
    }
]);