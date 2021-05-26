angular.module('widgets').directive('intelliPerformance', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/reportPerformance/template/reportPerformance.html',
        link: function(scope, element) {            
        }
    };
});