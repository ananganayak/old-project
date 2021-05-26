angular.module('widgets').directive('intelliVmsummary', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/reportVMsummary/template/reportVMsummary.html',
        link: function(scope, element) {            
        }
    };
});