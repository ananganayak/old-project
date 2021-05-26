angular.module('widgets').directive('intelliCloud', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/cloud/template/cloud.html',
        link: function(scope, element) {            
        }
    };
});