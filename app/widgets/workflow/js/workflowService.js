angular.module('widgets').service('intelliWorkflowService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';
        
        var createWorkflow = function(surl) {            
            var deferred = $q.defer();
            APIService.doApiCall(surl, "GET", {}).then(function(result) {
                deferred.resolve(result);
            });
            return deferred.promise;
        };
        
        var workflowVersion = function(surl) {            
            var deferred = $q.defer();
            APIService.doApiCall(surl, "GET", {}).then(function(result) {
                deferred.resolve(result);
            });
            return deferred.promise;
        };
        
        return {
            "createWorkflow": createWorkflow,
            "workflowVersion" : workflowVersion
        };
    }
]);