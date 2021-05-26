angular.module('widgets').directive('intelliBreadcrumb', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/breadcrumb/template/breadcrumb.html',
        link: function(scope, element) {            
        }
    };
});