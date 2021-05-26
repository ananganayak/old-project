angular.module('widgets').directive('intelliVmwarevms', function(){
    'use strict';
    return{
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/vmwareVms/template/vmwareVms.html',
        link: function(scope, element) {            
        }
    }
})