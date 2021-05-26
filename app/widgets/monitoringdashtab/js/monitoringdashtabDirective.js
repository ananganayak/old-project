angular.module('widgets').directive('intelliMonitoringdashtab', function() {
    'use strict';
    return {
        restrict: 'E', 
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/monitoringdashtab/template/monitoringdashtab.html',
        link: function(scope, element) {            
        }
    };
});