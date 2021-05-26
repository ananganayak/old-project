angular.module('widgets').directive('intelliRbcflow', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/rbcFlow/template/rbcFlow.html',
        link: function(scope, element) {            
        }
    };
});