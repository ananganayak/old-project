angular.module('widgets').service('dashboardEventAnalyticsService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';

        var suppresionPerc = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.eventsuppresionperc + param["filter"] + "/" + param["more_filter"];
            APIService.doApiCall(surl, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var top5ci = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.dashboard_top5ci + param["filter"] + "/" + param["more_filter"];
            APIService.doApiCall(surl, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var top3alertcomponent = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.dashboard_top3alertcomponent + param["filter"] + "/" + param["more_filter"];
            APIService.doApiCall(surl, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var alertbyseverity = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.dashboard_alertbyseverity + param["filter"] + "/" + param["more_filter"];
            APIService.doApiCall(surl, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var weeklyheatmap = function(param) {           
            var weekno = param || "";
            var surl = config.urls.weeklyheatmap;
            if(weekno){
                surl = config.urls.weeklyheatmap + "/" +  weekno;
            }
            var deferred = $q.defer();
            APIService.doApiCall(surl, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var alertseveritytrend = function() {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.dashboard_alertseveritytrend, "GET", {}).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        return {
            "suppresionPerc": suppresionPerc,
            "top5ci": top5ci,
            "top3alertcomponent": top3alertcomponent,
            "alertbyseverity": alertbyseverity,
            "weeklyheatmap" : weeklyheatmap,
            "alertseveritytrend" : alertseveritytrend
        };
    }
]);