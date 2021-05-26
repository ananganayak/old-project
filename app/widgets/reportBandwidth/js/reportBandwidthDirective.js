angular.module('widgets').directive('intelliBandwidth', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/reportBandwidth/template/reportBandwidth.html',
        link: function(scope, element) {            
        }
    };
});