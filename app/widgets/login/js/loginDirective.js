angular.module('widgets').directive('intelliLogin', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/login/template/login.html',
        link: function(scope, element) {            
        }
    };
});