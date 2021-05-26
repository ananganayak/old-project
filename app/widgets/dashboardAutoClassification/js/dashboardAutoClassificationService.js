angular.module('widgets').service('dashboardAutoClassificationService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';
        
        var load_auto_classification = function(param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.dashbaord_classification;
            //var surl = "app/widgets/dashboardAutoClassification/json/mockup.json";
            APIService.doApiCall(surl, "GET", param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        return {
            "load_auto_classification": load_auto_classification
        };
    }
]);