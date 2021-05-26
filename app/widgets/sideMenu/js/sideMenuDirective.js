angular.module('widgets').directive('intelliSideMenu', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/sideMenu/template/sidemenu.html',
        link: function(scope, element) {            
        }
    };
});