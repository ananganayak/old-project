angular.module('widgets').directive('intelliMachine', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/machine/template/machine.html',
        link: function(scope, element) {            
        }
    };
});