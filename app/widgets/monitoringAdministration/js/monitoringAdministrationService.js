angular.module('widgets').service('intellimonitoringAdministrationService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';
        
        // get template list service
        var gettemplatelistserv = function() {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.monitoradhostgrpget+"templates", "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // get account list service
        var getaccbsdetailsserv = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.monitoradhostgrpget+"accountsbytemplate", "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // get unselected list service
        var getunsellistserv = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.monitoradhostgrpget+"objects", "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // Post Add new host group service
        var seladhstgrpaddacc = function(param){
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.monitoradhostgrpget+"hostgroup", "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        }
        
        
        return { 
            "gettemplatelistserv" : gettemplatelistserv,
            "getaccbsdetailsserv" : getaccbsdetailsserv,
            "getunsellistserv" : getunsellistserv,
            "seladhstgrpaddacc" : seladhstgrpaddacc,
        };
    }
]);