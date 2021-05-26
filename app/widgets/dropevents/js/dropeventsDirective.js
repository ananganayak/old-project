angular.module('widgets').directive('intelliDropevents', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/dropevents/template/dropevents.html',
        link: function(scope, element) {            
        }
    };
});