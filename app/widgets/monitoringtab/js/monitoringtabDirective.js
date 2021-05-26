angular.module('widgets').directive('intelliMonitoring', function() {
    'use strict';
    return {
        restrict: 'E', 
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/monitoringtab/template/monitoringtab.html',
        link: function(scope, element) {            
        }
    };
});