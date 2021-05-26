angular.module('widgets').directive('intelliDashboard', function(){
    'use strict'; 
    return{
        restrict :'E',
        replace : true,
        scope : true,
        templateUrl : 'app/widgets/automationDashboard/template/dashboard.html',
        link: function(scope, element){

        }
    }
});