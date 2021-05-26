angular.module('widgets').directive('intelliCwdash', function() {
    'use strict';
    return {
        restrict: 'E', 
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/monitoringcwdash/template/cwdash.html',
        link: function(scope, element) {            
        }
    };
});