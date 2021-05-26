angular.module('widgets').service('intelliautoReportService', [
    'APIService', '$q',
    function(APIService, $q) {
        'use strict';

        var postaireportserv = function(param) {
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.getautolisttotapi + "/processauditlog", "POST",  param).then(function(result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
    
        return {
            "postaireportserv" : postaireportserv,
        };
    }
]);