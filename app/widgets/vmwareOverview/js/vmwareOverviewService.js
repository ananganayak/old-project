angular.module('widgets').service('intellivmwareoverviewService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';

        // Timestamp List Get service 

        var getlovtimestampserv = function() {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.vmovtimestampget, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // Timestamp List Get service 
        var getlovlistvCentersserv = function() {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.vmovlistvcenterget, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // cluster List Get service 
        var getlovlistClustersserv = function(data) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.vmovlistvmwaredetget + "listClusters/" + data, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // cluster List Get service 
        var getlovlistEsxisserv = function(data) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.vmovlistvmwaredetget + "listEsxis/" + data, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // cluster List Get service 
        var getlovlistDatastoresserv = function(data) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.vmovlistvmwaredetget + "listDatastores/" + data, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // cluster List Get service 
        var getlovlistVMsserv = function(data) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.vmovlistvmwaredetget + "listVMs/" + data, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var getvspheredetserv = function(vcenter, timestamp) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.vmovlistvmwaredetget + "clusterStatus/vSphereOverview/" + timestamp + "/" + vcenter, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var getclusteroverviewserv = function(vcenter, timestamp, cluster) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.vmovlistvmwaredetget + "clusterStatus/clusterOverview/" + cluster + "/" + timestamp + "/" + vcenter, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // VMware Based CPU Usage Get Service  
        var getclustercpuserv = function(vcenter, timestamp) {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.vmovlistvmwaredetget + "clusterStatus/clusterCPUUsage/" + timestamp + "/" + vcenter, "GET").then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        

        return {
            "getlovtimestampserv" : getlovtimestampserv,
            "getlovlistvCentersserv" : getlovlistvCentersserv,
            "getlovlistClustersserv" : getlovlistClustersserv,
            "getlovlistEsxisserv" : getlovlistEsxisserv,
            "getlovlistDatastoresserv" : getlovlistDatastoresserv,
            "getlovlistVMsserv" : getlovlistVMsserv,
            "getvspheredetserv" : getvspheredetserv,
            "getclusteroverviewserv" : getclusteroverviewserv,
            "getclustercpuserv" : getclustercpuserv,
        };
    }
]);