angular.module('widgets').service('intellimonitoringReportService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';
        
        var getallappval = function(val) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.monitoringgetallapp + val, "GET" ).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var getreportperiodserv = function() {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.monitoringperiodget, "GET" ).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var getgeneratereport = function(val1, param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.monitoringavailgenereport +"/"+ val1, "POST", param ).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var getreportmainvalserv = function(userid) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.monitoringavailreportget+"/"+userid, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // performance host list get
        var getreportperhstval = function(param) {
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

        var getperservicelist = function(val, param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.monitorinservget + val , "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var getperreportval = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.monperformreportget , "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        return { 
            "getallappval" : getallappval,
            "getreportperiodserv" : getreportperiodserv,
            "getgeneratereport" : getgeneratereport,
            "getreportmainvalserv" : getreportmainvalserv,
            "getreportperhstval" : getreportperhstval,
            "getperservicelist" : getperservicelist,
            "getperreportval" : getperreportval,
        };
    }
]);