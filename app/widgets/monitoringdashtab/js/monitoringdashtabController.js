angular.module('widgets').controller('monitoringdashtabController', [
    '$scope',
    '$rootScope',
    '$interval',
    '$timeout',
    'intellimonitoringdashtabService',
    function($scope, $rootScope, $interval, $timeout, $intellimonitoringdashtabService) {
        'use strict';

        var bpageloaded = true;

        $scope.hostgroup = "";
        $scope.inbtnvalid = "";
        $scope.inbtnvalname = "";
        $scope.inbtnvalcount = "";
        $scope.inbtnhsname = "";
        $scope.hostgroup = "";

        var autoref ;
        var autorefreshtime = '';
        
        var username = sessionStorage.getItem("username");

        // get main all Application
        $scope.getallapplication = function(){
            Pace.restart();

            // $rootScope.showSpinner = true;
            $intellimonitoringdashtabService.getallappval(username).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{
                    if(res.result == "failure"){
                        notie.alert(3, res.data, config.notify_delay);
                    }else{
                        Pace.start();
                        $scope.getallappval = res.data;
                        console.log($scope.getallappval);
                        Pace.stop();
                        $rootScope.showSpinner = false;
                    }
                }
            })
        }

        $scope.gridview = false;
        $scope.panelview = true;
        $scope.hostgrid = false;
        $scope.servicegrid = false;

        $scope.btngetgriddet = function(id, name, count, yval, hstgrp, val){
            // console.log(id, name, count, yval, hstgrp, val);

            if(count != '0'){
                Pace.restart();
                $scope.inbtnvalid = id;
                $scope.inbtnvalname = name;
                $scope.inbtnvalcount = count;
                $scope.inbtnhsname = yval;
                $scope.hostgroup = hstgrp;
                $scope.hostgrpdet = val;
    
                $scope.gridview = true;
                $scope.panelview = false;
                $scope.nogrid = true;
                $scope.valuegrid = false;
                if($scope.inbtnhsname == '0'){
                    var yval = "host"
                    $scope.hostgrid = true;
                    $scope.servicegrid = false;
                }else{
                    var yval = "service"
                    $scope.servicegrid = true;
                    $scope.hostgrid = false;
                }
                var dataset = {
                    "hostgroup" : $scope.hostgroup,
                    "type" : $scope.inbtnhsname,
                    "id" : $scope.inbtnvalid
                }
                $rootScope.showSpinner = true;
                $intellimonitoringdashtabService.gethstgrpdetserv(dataset).then(function (res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{
                    
                        Pace.start();
                        $scope.gethstgrpdet = res.data.splice(1);
                        console.log($scope.gethstgrpdet);
                        Pace.stop();
                        $rootScope.showSpinner = false;
                        // Pace.stop();
                    }
                })
            }else{
                // notie.alert(3, "count value 0", config.notify_delay);
                $scope.nogrid = true;
                $scope.valuegrid = false;
            }
            
        }

        $scope.btngriddetget= function(id, name, count, yval){
            $scope.inbtnvalid = id;
            $scope.inbtnvalname = name;
            $scope.inbtnvalcount = count;
            $scope.inbtnhsname = yval;
            $scope.getingriddet();
        }

        $scope.getingriddet = function(){
            if($scope.inbtnhsname == '0'){
                var yval = "host"
                $scope.hostgrid = true;
                $scope.servicegrid = false;
            }else{
                var yval = "service"
                $scope.servicegrid = true;
                $scope.hostgrid = false;
            }
            // if($scope.inbtnvalcount != '0'){
                Pace.restart();
                // console.log(id, name, count, yval);
                $scope.nogrid = true;
                $scope.valuegrid = false;
                
                var dataset = {
                    "hostgroup" : $scope.hostgroup,
                    "type" : $scope.inbtnhsname,
                    "id" : $scope.inbtnvalid
                }
                // $rootScope.showSpinner = true;
                $intellimonitoringdashtabService.gethstgrpdetserv(dataset).then(function (res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{
                        if(res.result == "failure"){
                                $scope.nogrid = false;
                                $scope.valuegrid = true;
                                $scope.gethstgrpdet = "";
                        }else{
                            Pace.start();

                            $scope.gethstgrpdet = res.data.splice(1);
                            console.log($scope.gethstgrpdet);
                            
                            Pace.stop();
                            $rootScope.showSpinner = false;
                        }
                        
                        // Pace.stop();
                    }
                })
            // }else{
                // notie.alert(3, "count value 0", config.notify_delay);
            //     $scope.nogrid = false;
            //     $scope.valuegrid = true;
            // }
        }

        $scope.backtohostlistfn = function(){
            $scope.gridview = false;
            $scope.panelview = true;
            $scope.hostgrid = false;
            $scope.servicegrid = false;
        }

        $scope.init_event= function() {

            var intFrameHeight = window.innerHeight;
            document.getElementById("tablehostgrid").style.height=(intFrameHeight - 415) + "px";
            document.getElementById("tableservicegrid").style.height=(intFrameHeight - 415) + "px";

            $scope.dashrefreshfunction = function(){
                if($scope.panelview == true){
                    $scope.getallapplication();
                    $scope.gridview = false;
                    $scope.panelview = true;
                }else{
                    $scope.getingriddet();
                    $scope.gridview = true;
                    $scope.panelview = false;
                }
            }


            $scope.selrefreshtime = function(val){
                $scope.refreshtime = val;
                // alert(refreshtime);
                $interval.cancel(autoref);
                if($scope.refreshtime == '1Min'){
                    autorefreshtime = "60000";
                    // autorefreshtime = "1800000";
                    $scope.anomalyautorefresh();
                }else if($scope.refreshtime == '2Min'){
                    autorefreshtime = "120000";
                    // autorefreshtime = "1800000";
                    $scope.anomalyautorefresh();
                }else if($scope.refreshtime == '5Min'){
                    autorefreshtime = "3000000";
                    // autorefreshtime = "1800000";
                    $scope.anomalyautorefresh();
                }else if ($scope.refreshtime == 'off'){
                    // autorefreshtime = "0";
                    $interval.cancel(autoref);
                    notie.alert(3, "Auto Refresh Stopped");
                }   
            }
            $scope.anomalyautorefresh = function(){
                autoref = $interval(function(){
                    $scope.dashrefreshfunction();
                },autorefreshtime)
            };

            var dereg = $rootScope.$on('$locationChangeSuccess', function() {
                console.log("Function Stopped")
                $interval.cancel(autoref);
                dereg();
            });
            
        
            $(".monitoring_full_screen").show();
            $(".monitoring_exit_screen").hide();

            $(".monitoring_full_screen").click(function(){
                document.getElementById("tablehostgrid").style.height=(intFrameHeight - 250) + "px";
                document.getElementById("tableservicegrid").style.height=(intFrameHeight - 250) + "px";
                $(".panel").addClass("monitoringfullscreen");
                $(".monitoring_exit_screen").css("display", "inline-block")
                $(".monitoring_full_screen").hide();
            })
            $(".monitoring_exit_screen").click(function(){
                document.getElementById("tablehostgrid").style.height=(intFrameHeight - 375) + "px";
                document.getElementById("tableservicegrid").style.height=(intFrameHeight - 375) + "px";
                $(".panel").removeClass("monitoringfullscreen");
                $(".monitoring_full_screen").css("display", "inline-block")
                $(".monitoring_exit_screen").hide();
            })

        }

        $scope.init = function() {
            $scope.init_event();
            $('[data-toggle="tooltip"]').tooltip();
            $scope.getallapplication(); 
            $scope.selrefreshtime('2Min');
        }
        
       
    }
]);