angular.module('widgets').directive('intelliDiscovery', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/discovery/template/discovery.html',
        link: function(scope, element) {            
        }
    };
});