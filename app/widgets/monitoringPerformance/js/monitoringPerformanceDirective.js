angular.module('widgets').directive('intelliMonitorperformance', function() {
    'use strict';
    return {
        restrict: 'E', 
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/monitoringPerformance/template/monitoringPerformance.html',
        link: function(scope, element) {            
        }
    };
});