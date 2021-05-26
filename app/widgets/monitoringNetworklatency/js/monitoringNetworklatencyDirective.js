angular.module('widgets').directive('intelliNetworklatency', function() {
    'use strict';
    return {
        restrict: 'E', 
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/monitoringNetworklatency/template/monitoringNetworklatency.html',
        link: function(scope, element) {            
        }
    };
});