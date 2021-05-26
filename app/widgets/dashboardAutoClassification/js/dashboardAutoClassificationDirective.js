angular.module('widgets').directive('dashboardAutoClassification', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/dashboardAutoClassification/template/dashboardAutoClassification.html',
        link: function(scope, element) {            
        }
    };
});