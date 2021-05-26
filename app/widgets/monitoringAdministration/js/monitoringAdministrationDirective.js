angular.module('widgets').directive('intelliAdmin', function() {
    'use strict';
    return {
        restrict: 'E', 
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/monitoringAdministration/template/monitoringAdministration.html',
        link: function(scope, element) {            
        }
    };
});