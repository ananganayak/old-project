angular.module('widgets').controller('dashboardAutoClassificationController', [
    '$scope',
    '$rootScope',
    '$location',
    '$timeout',
    'dashboardAutoClassificationService',
    function ($scope, $rootScope, $location, $timeout, dashboardAutoClassificationService) {
        'use strict';

        var bpageloaded = false;
        
        $scope.auto_classification = [];
        $scope.auto_classification_learn_det = [];
        
        $scope.currentAutoclassificationPageHistory = [];
        $scope.autocurrentPage = 1;
        $scope.autonumPerPage = 10;
        $scope.filter_auto_list = [];
        $scope.totalPages = 1;
        
        $scope.calculateTotalPages = function() {
            var totalPages = $scope.autonumPerPage < 1 ? 1 : Math.ceil($scope.filter_auto_list.length / $scope.autonumPerPage);
            return Math.max(totalPages || 0, 1);
        };
        
        $scope.noPrevious = function() {
            return $scope.autocurrentPage === 1;
        };
        
        $scope.noNext = function() {
            return $scope.autocurrentPage === $scope.totalPages;
        };
        
        $scope.filterAuto= function(auto_row) {
            return auto_row;
        }

        $scope.autopageselect = function(page) {
            var end, start;
            start = (page - 1) * $scope.autonumPerPage;
            end = start + $scope.autonumPerPage;
            var sendtext = end;
            if (end > $scope.filter_auto_list.length) {
                sendtext = $scope.filter_auto_list.length;
            }
            $scope.span_page_status = (start + 1) + " - " + parseInt(sendtext);
            $scope.span_total_count = $scope.filter_auto_list.length;
            return $scope.currentAutoclassificationPageHistory = $scope.filter_auto_list.slice(start, end);
        }

        $scope.selectPage = function(page) {
            if ($scope.autocurrentPage !== page && page > 0 && page <= $scope.totalPages) {
                $scope.autocurrentPage = page;
                $scope.$apply();
            }
        };
        
        $scope.$watch(function() {
            $scope.filter_auto_list = $scope.$eval("auto_classification | filter:filterAuto");
            $scope.totalPages = $scope.calculateTotalPages();
            $scope.autopageselect($scope.autocurrentPage);
        });
        
        function init_event(){
            
            $(".dashboardautocontainer .pagination_dropdown a").click(function() {
                var selnum = $(this).text();
                $(".dashboardautocontainer .span_pagination_text").text(selnum);
                $scope.autocurrentPage = 1;
                $scope.autonumPerPage = parseInt(selnum);
                $scope.$apply();
            });
            
        }
       
        function load_auto_classification(){
            $rootScope.showSpinner = true;
            dashboardAutoClassificationService.load_auto_classification({}).then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if(res.result == "success"){
                        $scope.auto_classification = res.data;
                        console.log(res.data);
                    }
                }
            });
        }


        // Learn Details Get
        $scope.getlearndata = function(interactionid){
            
            for (var i = 0; i < $scope.currentAutoclassificationPageHistory.length; i++) {
                if($scope.currentAutoclassificationPageHistory[i].interaction == interactionid){
                    $scope.auto_classification_learn_det = $scope.currentAutoclassificationPageHistory[i].learning;
                }
            }

            //console.log($scope.auto_classification_learn_det);
            $("#getlearnmodal").modal('toggle');
        }

        $rootScope.$on('DashboardTabChange', function (event, args) {
            if (args["tabname"] == "Auto Classification") {
                if (!bpageloaded) {
                    bpageloaded = true;
                    init_event();
                    load_auto_classification();
                }
            }
        });

    }
]);