angular.module('pages').service('dashboardService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';

        var loadDashboard = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.dashboard_dyndash + "dashboard/"+ param["rolename"];
            //var surl = "app/pages/dashboard/json/dashboardmock.json";
            APIService.doApiCall(surl, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var loadWidgetlist = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.dashboard_dyndash + "sheetwidcat";
            //var surl = "app/pages/dashboard/json/widgetlistmock.json";
            APIService.doApiCall(surl, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var createDashboard = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.dashboard_dyndash + "cudashboard";
            APIService.doApiCall(surl, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var syncDashboard = function(param){
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.dashboard_dyndash + "mapdashwidget";
            APIService.doApiCall(surl, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var loadUserRoles = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            //var surl = "http://95.216.28.228:4006/ui/api1.0/roles";
            //var surl = "app/pages/dashboard/json/widgetlistmock.json";
            APIService.doApiCall(config.urls.userroles, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        return {
            "loadDashboard": loadDashboard,
            "loadWidgetlist" : loadWidgetlist,
            "createDashboard" : createDashboard,
            "syncDashboard" : syncDashboard,
            "loadUserRoles" : loadUserRoles
        };
    }
]);

