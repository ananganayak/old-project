angular.module('widgets').directive('intelliAnomaly', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/anomaly/template/anomaly.html',
        link: function(scope, element) {            
        }
    };
});