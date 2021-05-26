angular.module('pages').controller('dashboardController', [
    '$scope',
    '$http',
    '$rootScope',
    function($scope, $http, $rootScope) {
        
        $scope.init = function() {
            $('.nav-tabs a').click(function() {
                var stabname = $(this).text();
                $rootScope.$broadcast('DashboardTabChange', {"tabname" : stabname});          
                return true;
            });
        }

    }
]);