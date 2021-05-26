angular.module('widgets').service('intelliBotrepoService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';

        var bottreeList = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.bottreelist, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var createbotTree = function(param) {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.createbotTree, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var deletebotTree = function(branch_id) {
            var deferred = $q.defer();
            var surl = config.urls.deletebotTree + branch_id;
            APIService.doApiCall(surl, "DELETE", {}).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var renamebotTree = function(branch_id, newfoldername) {
            var deferred = $q.defer();
            var surl = config.urls.renamebotTree + newfoldername + "/" + branch_id;
            APIService.doApiCall(surl, "PUT", {}).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var botfilesList = function(branch_id) {
            var surl = config.urls.botfilesList;
            if(branch_id !=0){
                surl = config.urls.botfilesList  + "/" + branch_id;
            }
            var deferred = $q.defer();
            APIService.doApiCall(surl, "GET", {}).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var botmasterData = function() {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.botmasterData, "GET", {}).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var botfileContent = function(fileid) {
            var deferred = $q.defer();
            var surl = config.urls.botfileContent + fileid;
            APIService.doApiCall(surl, "GET", {}).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var botfileupdateContent = function(fileid, param) {
            var deferred = $q.defer();
            var surl = config.urls.botfileContent + fileid;
            APIService.doApiCall(surl, "PUT", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var botfileupnewContent = function(branch_id, param) {
            var deferred = $q.defer();
            var surl = config.urls.botfileContent + branch_id;
            APIService.doApiCall(surl, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var botfileupdeleteContent = function(fileid) {
            var deferred = $q.defer();
            var surl = config.urls.botfileContent + fileid;
            APIService.doApiCall(surl, "DELETE", {}).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        }

        return {
            "bottreeList": bottreeList,
            "createbotTree": createbotTree,
            "deletebotTree": deletebotTree,
            "renamebotTree": renamebotTree,
            "botfilesList": botfilesList,
            "botmasterData": botmasterData,
            "botfileContent": botfileContent,
            "botfileupdateContent": botfileupdateContent,
            "botfileupnewContent": botfileupnewContent,
            "botfileupdeleteContent" : botfileupdeleteContent
        };
    }
]);