angular.module('widgets').directive('intelliHeader', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/header/template/header.html',
        link: function(scope, element) {            
        }
    };
});