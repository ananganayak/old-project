angular.module('widgets').directive('intelliEdgeuplink', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/reportEdgeuplink/template/reportEdgeuplink.html',
        link: function(scope, element) {            
        }
    };
});