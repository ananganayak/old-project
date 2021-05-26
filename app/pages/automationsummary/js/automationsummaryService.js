angular.module('pages').service('automationsummaryService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';

        var automation_summary = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.dash_baord_automation_summary, "GET", param).then(function(result) {
                deferred.resolve(result);
            });
            return deferred.promise;
        };

        return {
            "automation_summary": automation_summary         
        };
    }
]);

