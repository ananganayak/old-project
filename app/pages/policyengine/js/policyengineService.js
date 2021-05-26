angular.module('widgets').service('policyengineService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';

        var loadpolicyengineList = function() {
            var deferred = $q.defer();
            console.log(config.urls.loadpolicyengineList);
            APIService.doApiCall(config.urls.loadpolicyengineList, "GET", {}).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var policy_masterdata = function() {
            var deferred = $q.defer();
            //console.log(config.urls.loadpolicyengineList);
            APIService.doApiCall(config.urls.policy_masterdata, "GET", {}).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var policy_add = function(param) {            
            var deferred = $q.defer();
            APIService.doApiAjaxCall(config.urls.policy_add, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var set_policy_status = function(status_type,sid) {            
            var deferred = $q.defer();
            var surl = config.urls.setpolicystatus + sid+"/"+status_type;
            APIService.doApiAjaxCall(surl, "POST", {}).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        return {
            "loadpolicyengineList": loadpolicyengineList,
            "policy_masterdata" : policy_masterdata,
            "policy_add" : policy_add,
            "set_policy_status" : set_policy_status
        };
    }
]);