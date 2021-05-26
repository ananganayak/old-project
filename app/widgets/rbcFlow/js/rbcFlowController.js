angular.module('pages').controller('rbcFlowController', [
    '$scope',
    '$timeout',
    '$rootScope',
    'intellirbcFlowService',
    function ($scope, $timeout, $rootScope, $intellirbcFlowService) {

        var bpageloaded = false;
        
        $scope.rbc_list_res = [];
        
        function load_rbc_flow_data() {
            $rootScope.showSpinner = true;
            $intellirbcFlowService.rbcflowList({}).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    $scope.rbc_list_res = res;
                }
            });
        }

        $rootScope.$on('AutomationTabChange', function (event, args) {
            if (args["tabname"] == "rbcflow") {
                if (!bpageloaded) {
                    bpageloaded = true;
                    console.log("rbcFlow");
                    load_rbc_flow_data();
                }
            }
        });
    }
]);