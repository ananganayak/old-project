angular.module('widgets').directive('intelliBots', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/bots/template/bots.html',
        link: function(scope, element) {            
        }
    };
});