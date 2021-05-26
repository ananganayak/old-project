angular.module('widgets').service('manageEngineService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';

        var loadotrsDetails = function() {          
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.loadotrsDetails, "GET", {}).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var loadmanageengineDetails = function() {          
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.loadmanageengineDetails, "GET", {}).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var saveotrsDetails = function(param) {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.saveotrsDetails, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var savemanageengineDetails = function(param) {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.savemanageengineDetails, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var setotrsstatus = function(status_type,sid) {
            var deferred = $q.defer();
            var data_arr = {
                "id" : sid
            };
            var surl = config.urls.setotrsstatus + status_type;
            APIService.doApiCall(surl, "POST", data_arr).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var setmangeenginestatus = function(status_type,sid) {
            var deferred = $q.defer();
            var data_arr = {
                "id" : sid
            };
            var surl = config.urls.setmangeenginestatus + status_type;
            APIService.doApiCall(surl, "POST", data_arr).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var integrationmasterData = function() {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.integrationmasterData, "GET", {}).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        return {
            "loadotrsDetails" : loadotrsDetails,
            "loadmanageengineDetails" : loadmanageengineDetails,
            "saveotrsDetails" : saveotrsDetails,
            "savemanageengineDetails" : savemanageengineDetails,
            "setotrsstatus" : setotrsstatus,
            "setmangeenginestatus" : setmangeenginestatus,
            "integrationmasterData" : integrationmasterData
        };
    }
]);