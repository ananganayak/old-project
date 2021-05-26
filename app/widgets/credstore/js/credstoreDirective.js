angular.module('widgets').directive('intelliCredstore', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/credstore/template/credstore.html',
        link: function(scope, element) { }
    };
});