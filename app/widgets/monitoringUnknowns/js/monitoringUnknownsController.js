angular.module('widgets').controller('monitoringUnknownsController', [
    '$scope',
    '$rootScope',
    '$interval',
    '$timeout',
    '$sce',
    'intelliUnknownsService',
    function($scope, $rootScope, $interval, $timeout, $sce, $intelliUnknownsService ) {
        'use strict';

        var bpageloaded = false;

        function getunknownsdetfn(){
            $rootScope.showSpinner = true; 
            $intelliUnknownsService.getunknownsdetserv().then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{
                    if(res.result=="success"){
                        $scope.getunkowsdet = res.data;
                        console.log($scope.getunkowsdet);
                        $rootScope.showSpinner = false;
                        // notie.alert(1, res, config.notify_delay);
                    }else{
                        notie.alert(3, res.data, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }
                } 
            })
        }
        

        $scope.init_event = function() {



        }


        $rootScope.$on('monitoringTabChange', function(event, args) {
            if (args["tabname"] == "Unknowns") {
                if (!bpageloaded) {
                    bpageloaded = true;
                    getunknownsdetfn();
                    // $scope.init_event()
                }
            }
        });

    }
]);