angular.module('widgets').directive('intelliResource', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/resource/template/resource.html',
        link: function(scope, element) {            
        }
    };
});