angular.module('widgets').directive('intelliVmwarehost', function(){
    'use strict';
    return{
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/vmwareHost/template/vmwareHost.html',
        link: function(scope, element) {            
        }
    }
})