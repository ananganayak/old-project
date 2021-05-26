angular.module('pages').controller('automationsummaryController', [
    '$scope',
    '$http',
    '$rootScope',
    'automationsummaryService',
    function($scope, $http, $rootScope,$automationsummaryService) {
 
        $scope.init = function() {
            load_automation_summary();
        };
    }
]);