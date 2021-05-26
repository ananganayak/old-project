angular.module('widgets').controller('breadcrumbController', [
    '$scope',
    '$rootScope',
    '$location',
    function($scope, $rootScope, $location) {
        'use strict';
        
        $scope.data_list = [];
        
        $scope.init = function() {             
        } 
        
        $rootScope.$on('ShowBreadcrumb', function(event, args) { 
            console.log("ShowBreadcrumb");
            $scope.data_list = args;
            $rootScope.showBreadcrumb = true;
            $scope.$apply();
        });

    }
]);