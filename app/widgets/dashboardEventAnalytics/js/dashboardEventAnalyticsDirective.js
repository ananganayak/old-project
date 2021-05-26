angular.module('widgets').directive('dashboardEventAnalytics', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/dashboardEventAnalytics/template/dashboardEventAnalytics.html',
        link: function(scope, element) {            
        }
    };
});