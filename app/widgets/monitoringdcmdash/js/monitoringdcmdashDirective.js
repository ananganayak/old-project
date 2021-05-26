angular.module('widgets').directive('intelliDcmdash', function() {
    'use strict';
    return {
        restrict: 'E', 
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/monitoringdcmdash/template/monitoringdcmdash.html',
        link: function(scope, element) {            
        }
    };
});