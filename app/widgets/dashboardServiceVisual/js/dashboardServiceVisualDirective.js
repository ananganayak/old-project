angular.module('widgets').directive('dashboardServiceVisual', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/dashboardServiceVisual/template/dashboardServiceVisual.html',
        link: function(scope, element) {            
        }
    };
});