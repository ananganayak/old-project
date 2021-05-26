angular.module('widgets').directive('dashboardExecSummary', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/dashboardExecSummary/template/dashboardExecSummary.html',
        link: function(scope, element) {            
        }
    };
});