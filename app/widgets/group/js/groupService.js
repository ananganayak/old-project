angular.module('widgets').service('intelliGroupService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';

         // group details List view Get
         var getgroupdetlst = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.hddm_groupdet_get, "GET",  param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // machine list get service 

        var getmachinelst = function(){
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.hddm_machinedet_get, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;  
        }

        // group detail add 
        var postgroupdetlst = function(param) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.hddm_groupdet_get, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        //group update details get
        var getgruplst = function (mid){
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.hddm_groupdet_get + "/" + mid, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        }

        //group update details put
        var putupdategroupdetlst = function (vals){
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.hddm_groupdet_get, "PUT", vals).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        }

        //delete group details
        var deletegroupval = function(urls){
            var deferred = $q.defer();
            APIService.doApiCall(urls, "DELETE").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        }

        return {
            "getgroupdetlst" : getgroupdetlst,
            "getmachinelst" : getmachinelst,
            "postgroupdetlst" : postgroupdetlst,
            "getgruplst" : getgruplst,
            "putupdategroupdetlst" : putupdategroupdetlst,
            "deletegroupval" : deletegroupval
        };
    }
]);