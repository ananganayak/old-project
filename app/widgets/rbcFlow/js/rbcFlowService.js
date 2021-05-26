angular.module('widgets').service('intellirbcFlowService', [
    'APIService', '$q',
    function (APIService, $q) {
        'use strict';

        var rbcflowList = function (param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall("http://95.216.28.228:3006/ui/api1.0/rbc_call", "GET", param).then(function (result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        return {
            "rbcflowList": rbcflowList,
        };
    }
]);