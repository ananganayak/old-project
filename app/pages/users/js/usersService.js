angular.module('widgets').service('intelliUsersService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';
        var userList = function(userid) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.userlist+"/admin/"+ userid , "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var userRoles = function(param) {
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

        //To-do Optimize this call for future request 
        var timeZones = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.timezones, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var createUser = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.createuser, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var updateUser = function(param, urls){
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(urls, "PUT", param).then(function(result){
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var deletuserdet = function(username){
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.deleteuserlist+ username, "DELETE").then(function(result){
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var createOrchesUser = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.createorchesuser + param["customerid"] + "/" + param["tenantid"];
            APIService.doApiCall(surl, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // get customer map details
        var getcustomermapdet = function(id) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.admincustmapdetget+"/"+ id, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise; 
        };

        // get customer map details
        var postcustomermapdet = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.admincustmapdetget, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise; 
        };

        return {
            "userList": userList,
            "userRoles": userRoles,
            "timeZones": timeZones,
            "createUser" : createUser,
            "updateUser" : updateUser,
            "deletuserdet" : deletuserdet,
            "createOrchesUser" : createOrchesUser,
            "getcustomermapdet" : getcustomermapdet,
            "postcustomermapdet" : postcustomermapdet
        };
    }
]);