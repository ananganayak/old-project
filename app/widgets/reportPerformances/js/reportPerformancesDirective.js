angular.module('widgets').directive('intelliPerformances', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/reportPerformances/template/reportPerformances.html',
        link: function(scope, element) {            
        }
    };
});