angular.module('widgets').service('intelliRolesService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';
        var roleList = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.userroles, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var tabList = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.tablist, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var getroledetails = function(surl) {
            //param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(surl, "GET", {}).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var createRole = function(param) {
            //param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.createrole, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var deleteRole = function(surl) {
            //param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(surl, "DELETE", {}).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var updateRole = function(surl,param) {            
            var deferred = $q.defer();
            APIService.doApiCall(surl, "PUT", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        return {
            "roleList": roleList,
            "tabList" : tabList,
            "getroledetails" : getroledetails,
            "createRole" : createRole,
            "deleteRole" : deleteRole,
            "updateRole" : updateRole
        };
    }
]);