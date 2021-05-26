angular.module('widgets').directive('intelliSoftware', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/software/template/software.html',
        link: function(scope, element) {            
        }
    };
});