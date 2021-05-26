angular.module('widgets').directive('intelliAutomationreports', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/automationReports/template/automationReports.html',
        link: function(scope, element) {            
        }
    };
});