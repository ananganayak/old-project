angular.module('widgets').directive('intelliDeployment', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/deployment/template/deployment.html',
        link: function(scope, element) {            
        }
    };
});