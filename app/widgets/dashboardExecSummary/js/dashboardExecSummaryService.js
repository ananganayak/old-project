angular.module('widgets').service('dashboardExecSummaryService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';

        var executiveheaders = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            
            var surl = config.urls.dashboard_executivesummary + param["filter"] + "/" + param["more_filter"];
            APIService.doApiCall(surl, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var alertstatus = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.dashboard_executivealertstatus + param["filter"] + "/" + param["more_filter"];
            APIService.doApiCall(surl, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var automationstatus = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.dashboard_executiveautomationstatus + param["filter"] + "/" + param["more_filter"];
            APIService.doApiCall(surl, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var ticketstatus = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.dashboard_executiveticketstatus + param["filter"] + "/" + param["more_filter"];
            APIService.doApiCall(surl, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var top5component = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.dashboard_executivetop5component + param["filter"] + "/" + param["more_filter"];
            APIService.doApiCall(surl, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var top5component = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.dashboard_executivetop5component + param["filter"] + "/" + param["more_filter"];
            APIService.doApiCall(surl, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var top5automation = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.dashboard_executivetop5automation + param["filter"] + "/" + param["more_filter"];
            APIService.doApiCall(surl, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var suppression30days = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.dashboard_executivesuppression30days + param["filter"] + "/" + param["more_filter"];
            APIService.doApiCall(surl, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var alertseveritybc = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.dashboard_executivealertseveritybc + param["filter"] + "/" + param["more_filter"];
            APIService.doApiCall(surl, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var automationtypebc = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.dashboard_executiveautomationtypebc + param["filter"] + "/" + param["more_filter"];
            APIService.doApiCall(surl, "GET", param).then(function(result) {
                deferred.resolve(result);
            });
            return deferred.promise;
        };
        
        var workflowstatusbc = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.dashboard_executiveworkflowstatusbc + param["filter"] + "/" + param["more_filter"];
            APIService.doApiCall(surl, "GET", param).then(function(result) {
                deferred.resolve(result);
            });
            return deferred.promise;
        };

        return {
            "executiveheaders": executiveheaders,
            "alertstatus" : alertstatus,
            "automationstatus" : automationstatus,
            "ticketstatus" : ticketstatus,
            "top5component" : top5component,
            "top5automation" : top5automation,
            "suppression30days" : suppression30days,
            "alertseveritybc" : alertseveritybc,
            "workflowstatusbc" : workflowstatusbc,
            "automationtypebc" : automationtypebc
        };
    }
]);