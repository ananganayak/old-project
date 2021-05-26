angular.module('widgets').directive('intelliConfiguration', function() {
    'use strict';
    return {
        restrict: 'E', 
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/configuration/template/configuration.html',
        link: function(scope, element) {            
        }
    };
});