angular.module('widgets').directive('intelliMonitoringreport', function() {
    'use strict';
    return {
        restrict: 'E', 
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/monitoringReport/template/monitoringReport.html',
        link: function(scope, element) {            
        }
    };
});