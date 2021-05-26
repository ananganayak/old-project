angular.module('widgets').directive('intelliUnknowns', function() {
    'use strict';
    return {
        restrict: 'E', 
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/monitoringUnknowns/template/monitoringUnknowns.html',
        link: function(scope, element) {            
        }
    };
});