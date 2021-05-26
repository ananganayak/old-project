angular.module('widgets').service('intelliMachineService', [
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

        var getmachinelist = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.getmachinelist, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var getscreenval = function(host) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.getmachinescreeen + host, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var getmachinemaslist = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.getmachinemasterlist, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // remediate value update details List 
        var updateremadlist = function(param) {            
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.updateremediateval, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // Machine add details List 
        var machineaddserv = function(param) {            
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.addmachineval, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // remediate value update details List 
        var updatecredlist = function(param) {            
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.updatecredid, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        
        var deletmchinedet = function(mid) {            
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.machinedelete + mid, "DELETE").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
         var deletmchineinitdet = function(mid) {            
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.machinedelinit + mid, "DELETE").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        return {
            // "cmdbSummary" : cmdbSummary,
            "getmachinelist" : getmachinelist,
            "getscreenval" : getscreenval,
            "getmachinemaslist" : getmachinemaslist,
            "updateremadlist" : updateremadlist,
            "machineaddserv" : machineaddserv,
            "updatecredlist" : updatecredlist,
            "deletmchinedet" : deletmchinedet,
            "deletmchineinitdet" : deletmchineinitdet
        };
    }
]);