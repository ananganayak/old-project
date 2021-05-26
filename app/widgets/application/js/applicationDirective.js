angular.module('widgets').directive('intelliApplications', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/application/template/application.html',
        link: function(scope, element) {            
        }
    };
});