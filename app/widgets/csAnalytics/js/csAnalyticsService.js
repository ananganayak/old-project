angular.module('widgets').service('intellimonitoringAnalyticsService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';
        
        var getautoscaleallval = function() {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.monitoraslistget, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var getasChartVal = function(name){
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.csanalyticschart1get + name, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        }

        var getasChartsVal = function(name){
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.csanalyticschart2get + name, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        }

        var getasChartsCsv = function(url){
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(url, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        }

        var getauditreportCsv = function(url){
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(url, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        }
        
        return { 
            "getautoscaleallval" : getautoscaleallval,
            "getasChartVal" : getasChartVal,
            "getasChartsVal" : getasChartsVal,
            "getasChartsCsv" : getasChartsCsv,
            "getauditreportCsv" : getauditreportCsv,

        };
    }
]);