angular.module('widgets').directive('intelliAnalytics', function() {
    'use strict';
    return {
        restrict: 'E', 
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/csAnalytics/template/csAnalytics.html',
        link: function(scope, element) {            
        }
    };
});