angular.module('widgets').service('intelliHypervisorService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';


        var hyperGird = function() {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.gethypergriddet, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };        
        
        var hyperCred = function() {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.devicecred, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var addhyperdet = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.gethypergriddet, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };  
        
        var updatehyperdet = function(param, id) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.gethypergriddet+"/"+ id, "PUT", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };  

        var delethyperdet = function(id) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.gethypergriddet+"/"+ id, "DELETE").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        }; 
        
        var gethyperingriddet = function(id) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.gethyperingriddet + id, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        }; 

        var gethyperkvmtot = function() {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.gethyperkvmtotal, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var gethyperfwtot = function(val) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.gethyperfwtotal + val, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        }; 

        var gethyperswtot = function(val) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.gethyperswtotal + val, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        }; 

        var gethyperswrouter = function(val) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.gethyperroutertotal + val, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        }; 

        var gethyperlbtot = function(val) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.gethyperlbtotal + val, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        }; 

        var gethyperkvmgirdsl = function(val) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.gethyperkvmspl + val, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        }; 

        var posthyperingrid = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.posthyperingriddet, "POST", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        }; 
        
        return {
            "hyperGird" : hyperGird,
            "hyperCred" : hyperCred,
            "addhyperdet" : addhyperdet,
            "updatehyperdet": updatehyperdet,
            "delethyperdet" : delethyperdet,
            "gethyperingriddet" : gethyperingriddet,
            "gethyperkvmtot" : gethyperkvmtot,
            "gethyperfwtot" : gethyperfwtot,
            "gethyperswtot" : gethyperswtot,
            "gethyperswrouter" : gethyperswrouter,
            "gethyperlbtot" : gethyperlbtot,
            "gethyperkvmgirdsl" : gethyperkvmgirdsl,
            "posthyperingrid" : posthyperingrid
        };
    }

]);