angular.module('widgets').directive('intelliServicemodeling', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/serviceModeling/template/serviceModeling.html',
        link: function(scope, element) {            
        }
    };
});