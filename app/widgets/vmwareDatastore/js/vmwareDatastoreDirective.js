angular.module('widgets').directive('intelliVmwaredatastore', function(){
    'use strict';
    return{
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/vmwareDatastore/template/vmwareDatastore.html',
        link: function(scope, element) {            
        }
    }
})