angular.module('widgets').service('intelliPatchService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';
        
        var patchList = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = "http://95.216.28.228:3006/admin/api/v2/patchmodule/getdetails";
            APIService.doApiCall(surl, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var patchUpdateType = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = "http://95.216.28.228:3006/admin/api/v2/patchmodule/masters";
            APIService.doApiCall(surl, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var createPatch = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = "http://95.216.28.228:3006/admin/api/v2/patchmodule/insert";
            APIService.doApiCall(surl, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var executePatch = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = "http://95.216.28.228:3006/admin/api/v2/patchmodule/executeplan";
            APIService.doApiCall(surl, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var deletePatch = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = "http://95.216.28.228:3006/admin/api/v2/patchmodule/deletedetails";
            APIService.doApiCall(surl, "DELETE", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var uodatePatch = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = "http://95.216.28.228:3006/admin/api/v2/patchmodule/editdetails";
            APIService.doApiCall(surl, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        return {
           "patchList": patchList,
           "patchUpdateType" : patchUpdateType,
           "createPatch" : createPatch,
           "executePatch" : executePatch,
           "deletePatch" : deletePatch,
           "uodatePatch" : uodatePatch
        };
    }
]);