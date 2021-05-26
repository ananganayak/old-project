angular.module('widgets').directive('intelliGroup', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/group/template/group.html',
        link: function(scope, element) {            
        }
    };
});