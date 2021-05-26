angular.module('widgets').directive('intelliFormdesigner', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/formdesigner/template/formdesigner.html',
        link: function(scope, element) {            
        }
    };
});