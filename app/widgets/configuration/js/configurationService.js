angular.module('widgets').service('intelliconfigurationService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';
        
        var addconfigdetail = function() {
            var deferred = $q.defer();
            console.log(config.urls.loadpolicyengineList);
            APIService.doApiCall(config.urls.loadpolicyengineList, "GET", {}).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        return { 
            "addconfigdetail": addconfigdetail,
        };
    }
]);