angular.module('widgets').directive('intelliAlerts', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/alerts/template/alerts.html',
        link: function(scope, element) {            
        }
    };
});