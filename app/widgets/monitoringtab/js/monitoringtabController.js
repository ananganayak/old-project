angular.module('widgets').controller('monitoringtabController', [
    '$scope',
    '$rootScope',
    '$interval',
    '$timeout',
    '$sce',
    'intellimonitoringtabService',
    function($scope, $rootScope, $interval, $timeout, $sce, $intellimonitoringtabService ) {
        'use strict';

        var bpageloaded = false;
        $scope.hostviewpanel = true;
        $scope.serviceviewpanel = true;

        // $scope.getmonitoringhstlist = [];

        $scope.getmonitoringhstlistname = [];

        var servarrval = [];

        $scope.search_sorting = "status_a";

        $scope.appname = [];

        $scope.gethostname = "";

        $scope.userdet = {
            "username" : sessionStorage.getItem("username")
        }

        $("#hostbody").hide();
        $("#hostbodyvms").hide();
        // $scope.activeValue;



        var chartwd = window.innerHeight;
        document.getElementById("hostbody").style.height= (chartwd - 280)  + "px";
        document.getElementById("hostbodyvms").style.height= (chartwd - 280)  + "px";
        document.getElementById("datatablepanel").style.height= (chartwd - 245)  + "px";

        // get host group function 
        $scope.getallapplication = function(){

            var username = sessionStorage.getItem("username");

            $rootScope.showSpinner = true;

            $intellimonitoringtabService.getallappval(username).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{
                    $scope.getallappval = res.data.hostgroup_name;
                    console.log($scope.getallappval);
                    $rootScope.showSpinner = false;
                }
            })

        }

        // get host list function
        $scope.hostlistget = function(){

            $scope.appname = $("#selhostgrp").val();
            // $scope.activeValue1 = key;
            $scope.appdet = {
                "HostGroup" : $scope.appname,
                // "username" : sessionStorage.getItem("username"),
            }
            $rootScope.showSpinner = true;
            $intellimonitoringtabService.gethostlist($scope.appdet).then(function(res){
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{
                   
                    $scope.hostviewpanel = false;
                    $scope.serviceviewpanel = true;
                    if(res.result == "failure"){
                        notie.alert(3, res.data, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{
                        if(res.multisearch == "no"){
                            $scope.getmonitoringhstlist = res.data.host_display_name;
                            $("#hostbody").show();
                            $("#hostbodyvms").hide();
                        }else{
                            $scope.getmonitoringhstlist = res.data.slice(1);
                            $("#hostbody").hide();
                            $("#hostbodyvms").show();
                        }
                        $rootScope.showSpinner = false;
                    }
                }
            })
        }

        // Host based Service get function
        $scope.hostnameget = function(keyval){
            $scope.activeValue = keyval;
            $scope.gethostname = keyval;

            var dataval = {"host_object_id": $scope.gethostname, "filter": $scope.search_sorting}

            $rootScope.showSpinner = true;

            $intellimonitoringtabService.postservicesortlist(dataval).then(function(res){
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{
                    if(res.result == "failure"){
                        $scope.sbody = false;
                        $scope.erbody = true;
                        $scope.hostviewpanel = false;
                        $scope.serviceviewpanel = false;
                        // notie.alert(3, res.data, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{
                        $scope.hostviewpanel = false;
                        $scope.serviceviewpanel = false;
                        $scope.sbody = true;
                        $scope.erbody = false;
                        $scope.getservicelist = res.data.service.splice(1);
                        // console.log($scope.getservicelist);
                        $rootScope.showSpinner = false;
                    }

                }
            })

        }

        // next pagination function
        // var count = 0;
        // var totnxtval = [];
        // $scope.nextservcount = function(){
        //     count += 1;
        //     // $scope.prevbtn =true;
        //     totnxtval = servarrval*count;
        //     var arrcount = totnxtval + 1;
        //     $scope.userdet = {
        //         "username" : sessionStorage.getItem("username"),
        //         "start": arrcount, 
        //         "count": 10
        //     }
        //     $rootScope.showSpinner = true;

        //     $intellimonitoringtabService.getservicelist($scope.gethostname, $scope.userdet).then(function(res){
        //         if(res == config.service_unavailable){
        //             notie.alert(3, res, config.notify_delay);
        //             $rootScope.showSpinner = false;
        //         }else{
        //             $scope.hostviewpanel = false;
        //             $scope.serviceviewpanel = false;
        //             $scope.getservicelist = res;
        //             console.log($scope.getservicelist);
        //             $rootScope.showSpinner = false;
        //             servarrval = Object.keys($scope.getservicelist[$scope.gethostname]).length;
        //             if( servarrval > 9){
        //                 $scope.nextbtn = true;
        //             }else{
        //                 $scope.nextbtn = false;
        //             }
        //             $scope.prevbtn = true;
        //         }
        //     })
        //     // alert(arrcount);
        // }

        // // Previous pagination function
        // $scope.pervservcount = function(){
        //     count -= 1;
        //     var prvarrval = totnxtval - servarrval;
        //     totnxtval = prvarrval;
        //     if (prvarrval == 0){
        //         $scope.userdet = {
        //             "username" : sessionStorage.getItem("username"),
        //             "start": prvarrval, 
        //             "count": 10
        //         }
        //         $scope.prevbtn = false;
        //     }else{
        //         $scope.userdet = {
        //             "username" : sessionStorage.getItem("username"),
        //             "start": prvarrval+1, 
        //             "count": 10
        //         }
        //     }
        //     $rootScope.showSpinner = true;
            
        //     $intellimonitoringtabService.getservicelist($scope.gethostname, $scope.userdet).then(function(res){
        //         if(res == config.service_unavailable){
        //             notie.alert(3, res, config.notify_delay);
        //             $rootScope.showSpinner = false;
        //         }else{
        //             $scope.hostviewpanel = false;
        //             $scope.serviceviewpanel = false;
        //             $scope.getservicelist = res;
        //             console.log($scope.getservicelist);
        //             $rootScope.showSpinner = false;
        //             servarrval = Object.keys($scope.getservicelist[$scope.gethostname]).length;
        //             if( servarrval > 9){
        //                 $scope.nextbtn = true;
        //             }else{
        //                 $scope.nextbtn = false;
        //             }
        //             // $scope.prevbtn = true;
        //         }
        //     })

        //     // alert(totnxtval);
        // }

        $scope.showsearchtxt = true;
        $scope.showSearch = function(){
            $scope.searchText = "";
            if($scope.showsearchtxt == true){
                $scope.showsearchtxt = false;
                $("#hostname.panel .panel-heading").css("height", "80px");
            }else{
                $scope.showsearchtxt = true;
                $("#hostname.panel .panel-heading").css("height", "40px");
            }
        }
        // $scope.servicechartget = function(sername){

        //     var servicename = encodeURIComponent(sername);
        //     var hostname = encodeURIComponent($scope.activeValue);
        //     console.log("service name :",  servicename, "host name :", hostname)
        //     $rootScope.showSpinner = true;
        //     $intellimonitoringtabService.getservicechart(hostname, servicename,  $scope.userdet).then(function(res){
        //         $rootScope.showSpinner = false;
        //         $scope.getchrtimg = "data:image/png;base64," + res;
        //         // console.log("chart:", $scope.getchrtimg);
        //         $scope.servname = sername;
        //         $("#model_chart_view").modal('toggle');
        //     })
        // }


        $scope.init_event = function() {

            $scope.servicechartget = function(sermap){
                $scope.dashboardmap = sermap;
                $("#model_chart_view").modal('toggle');
                $('.graphcpupercent').load('https://10.227.45.114:5693/graph/cpu/percent?token=NxtG3n'); 
                $('.graphcpucount').load('https://10.227.45.114:5693/graph/cpu/count?token=NxtG3n'); 
                $('.graphcpuidle').load('https://10.227.45.114:5693/graph/cpu/idle?token=NxtG3n'); 
                $('.graphcpuser').load('https://10.227.45.114:5693/graph/cpu/system?token=NxtG3n'); 
                $('.graphcpusystem').load('https://10.227.45.114:5693/graph/cpu/user?token=NxtG3n');
            }      
            $scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
            }

            $(".monitoring_tr th[data-col='sorting']").click(function () {
                //clear any oher sorting ...
                $(".monitoring_tr th[data-col='sorting']").not(this).attr("class", "sorting");
                var cache_ele = $(this);
                var sname = cache_ele.attr("data-key");
                if (cache_ele.hasClass("sorting")) {
                    cache_ele.attr("class", "sorting_asc");
                    sname = sname + "_a";
                } else if (cache_ele.hasClass("sorting_asc")) {
                    cache_ele.attr("class", "sorting_desc");
                    sname = sname + "_d";
                } else if (cache_ele.hasClass("sorting_desc")) {
                    cache_ele.attr("class", "sorting_asc");
                    sname = sname + "_a";
                }
                $scope.search_sorting = sname;
                $scope.sortservice();
                return false;    
            });

            

            $scope.sortservice = function(){
                var dataval = {"host_object_id": $scope.gethostname, "filter": $scope.search_sorting}
                $rootScope.showSpinner = true;
                $intellimonitoringtabService.postservicesortlist(dataval).then(function(res){
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{
                        if(res.result == "failure"){
                            $rootScope.showSpinner = false;
                            notie.alert(3, res.data, config.notify_delay);
                        }else{
                            $scope.getservicelist = res.data.service.splice(1);
                            $rootScope.showSpinner = false;
                        }
                        // console.log($scope.getservicelist);
                    }
                })
            }

        }
        
        // $scope.init = function() {
        //     // $scope.hostlistget(); 
        //     // $scope.getallapplication();                   
        // }
        // $scope.init = function () {
        //     setInterval(function () {
        //         $scope.hostlistget();
        //     }, 30000);
        // }

        $rootScope.$on('monitoringTabChange', function(event, args) {
            if (args["tabname"] == "Monitoring") {
                if (!bpageloaded) {
                    bpageloaded = true;
                    $scope.init_event();
                    $scope.getallapplication();
                    // $scope.sortservice()
                    // $scope.hostlistget();
                    
                }
            }
        });

    }
]);