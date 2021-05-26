angular.module('widgets').directive('intelliVmwareoverview', function(){
    'use strict';
    return{
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/vmwareOverview/template/vmwareOverview.html',
        link: function(scope, element) {            
        }
    }
})