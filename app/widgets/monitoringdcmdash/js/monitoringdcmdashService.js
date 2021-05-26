angular.module('widgets').service('intellimonitoringdcmdashService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';
        
        var getconfignameserv = function(val) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.inteldcmctget+"/listDCM", "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var getdatacenterserv = function(val) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.inteldcmctget+"/"+val+"/getDatacenters", "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var getdashdetpowerserv = function(configname, dcname) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.inteldcmctget+"/"+configname+"/dc/"+dcname+"/power", "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var getdashdetthermalserv = function(configname, dcname) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.inteldcmctget+"/"+configname+"/dc/"+dcname+"/thermal", "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        var getdashdethealthserv = function(configname, dcname) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.inteldcmctget+"/"+configname+"/dc/"+dcname+"/health", "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        var getdashinventoryserv = function(configname, dcname) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.inteldcmctget+"/"+configname+"/dc/"+dcname+"/inventory", "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var getdashdetdevicehealthserv = function(configname, dcname) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.inteldcmctget+"/"+configname+"/dc/"+dcname+"/deviceHealthStatistics", "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        var getdashdetpowercapacityserv = function(configname, dcname) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.inteldcmctget+"/"+configname+"/dc/"+dcname+"/powerCapacity", "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        var getdashmaxtempserv = function(configname, dcname) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.inteldcmctget+"/"+configname+"/dc/"+dcname+"/maxInletTemperature", "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var getdashdeteventgridserv = function(configname, dcname, sdate, pnumber, pcount){
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.inteldcmctget+"/"+configname+"/dc/"+dcname+"/events/"+sdate+"/"+pnumber+"/"+pcount, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        }
        
        
        return { 
            "getconfignameserv" : getconfignameserv,
            "getdatacenterserv" : getdatacenterserv, 
            "getdashdetpowerserv" : getdashdetpowerserv,
            "getdashdetthermalserv" : getdashdetthermalserv,
            "getdashdethealthserv" : getdashdethealthserv,
            "getdashinventoryserv" : getdashinventoryserv,
            "getdashdetdevicehealthserv" : getdashdetdevicehealthserv,
            "getdashdetpowercapacityserv" : getdashdetpowercapacityserv,
            "getdashmaxtempserv" : getdashmaxtempserv,
            "getdashdeteventgridserv" : getdashdeteventgridserv
        };
    }
]);