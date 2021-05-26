angular.module('widgets').directive('intelliMaintenancewindow', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/monitoringMaintenancewindow/template/maintenancewindow.html',
        link: function(scope, element) {            
        }
    };
});