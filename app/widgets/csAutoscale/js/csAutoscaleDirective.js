angular.module('widgets').directive('intelliAutoscale', function() {
    'use strict';
    return {
        restrict: 'E', 
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/csAutoscale/template/csAutoscale.html',
        link: function(scope, element) {            
        }
    };
});