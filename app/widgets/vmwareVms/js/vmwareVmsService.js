angular.module('widgets').service('intellivmwarevmsService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';

        // software class List Get  

        // var getsoftwareclslist = function(param) {
        //     param = APIService.headerTokens(param);
        //     var deferred = $q.defer();
        //     APIService.doApiCall(config.urls.getsoftclass, "GET", param).then(function(result) {
        //         deferred.resolve(result);
        //     },
        //     function() {
        //         deferred.resolve(config.service_unavailable);
        //     });
        //     return deferred.promise;
        // };

        return {
            // "getsoftwareclslist" : getsoftwareclslist,
        };
    }
]);