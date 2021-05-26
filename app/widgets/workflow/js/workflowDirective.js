angular.module('widgets').directive('intelliWorkflow', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/workflow/template/workflow.html',
        link: function(scope, element) {            
        }
    };
});