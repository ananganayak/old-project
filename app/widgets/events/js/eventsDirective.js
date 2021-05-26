angular.module('widgets').directive('intelliEvents', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/events/template/events.html',
        link: function(scope, element) {            
        }
    };
});