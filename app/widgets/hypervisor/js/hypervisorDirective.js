angular.module('widgets').directive('intelliApplication', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/hypervisor/template/hypervisor.html',
        link: function(scope, element) {            
        }
    };
});