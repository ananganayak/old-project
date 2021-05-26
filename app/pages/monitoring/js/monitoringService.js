angular.module('widgets').service('intellimonitoringService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';

        // var cmdbSummary = function(param) {            
        //     var deferred = $q.defer();
        //     APIService.doApiAjaxCall(config.urls.cmdbsummary, "POST", param).then(function(result) {
        //         deferred.resolve(result);
        //     });
        //     return deferred.promise;
        // };
        
        // var cmdbUserUpdate = function(param) {            
        //     var deferred = $q.defer();
        //     APIService.doApiAjaxCall(config.urls.cmdbuserupdate, "POST", param).then(function(result) {
        //         deferred.resolve(result);
        //     });
        //     return deferred.promise;
        // };
        
        //  var cmdbUserPsw = function(param) {            
        //     var deferred = $q.defer();
        //     APIService.doApiAjaxCall(config.urls.cmdbpswupdate, "POST", param).then(function(result) {
        //         deferred.resolve(result);
        //     });
        //     return deferred.promise;
        // };

        // return {
        //     "cmdbSummary" : cmdbSummary,
        //     "cmdbUserUpdate" : cmdbUserUpdate,
        //     "cmdbUserPsw" : cmdbUserPsw
        // };
    }
]);