angular.module('widgets').controller('monitoringcwdashController', [
    '$scope',
    '$rootScope',
    '$state',
    '$interval',
    'intellimonitoringcwdashService',
    function($scope, $rootScope, $state, $interval, $intellimonitoringcwdashService ) {
        'use strict';

        var bpageloaded = false;
        $scope.statusval = "critical";
        $scope.selcategrp = "mgmt";
        $scope.search_sorting = "since_d";
        $scope.csvdata = [];
        var autoref ;
        var autorefreshtime = '';

        var chartwd = window.innerHeight;
        document.getElementById("datatablepanels").style.height= (chartwd - 225)  + "px";

        $scope.init_event = function() {

            $scope.selcwdrefreshtime = function(val){
                $scope.refreshtime = val;
                // alert(refreshtime);
                $interval.cancel(autoref);
                if($scope.refreshtime == '30Sec'){
                    autorefreshtime = "30000";
                    $scope.anomalyautorefresh();
                }else if($scope.refreshtime == '1Min'){
                    autorefreshtime = "60000";
                    $scope.anomalyautorefresh();
                }else if($scope.refreshtime == '2Min'){
                    autorefreshtime = "120000";
                    $scope.anomalyautorefresh();
                }else if ($scope.refreshtime == 'off'){
                    // autorefreshtime = "0";
                    $interval.cancel(autoref);
                    notie.alert(3, "Auto Refresh Stopped");
                }   
            }

            $scope.anomalyautorefresh = function(){
                autoref = $interval(function(){
                    $scope.ongetservfn();
                },autorefreshtime)
            };

            var dereg = $rootScope.$on('$locationChangeSuccess', function() {
                console.log("Function Stopped")
                $interval.cancel(autoref);
                dereg();
            });

            $scope.ongetservfn = function(){
                var curl = config.urls.monitoringdashval + $scope.statusval + "/" + $scope.search_sorting +"/"+$scope.selcategrp;
                $scope.processval(curl);
            }

            $scope.getservfn = function(val){

                $scope.statusval = val;

                var curl = config.urls.monitoringdashval + $scope.statusval + "/" + $scope.search_sorting +"/"+$scope.selcategrp;
                
                $scope.processval(curl);
            }
            
            $scope.processval = function(curl){
                // $rootScope.showSpinner = true;
                $scope.servdata = "";
                Pace.restart();
                $intellimonitoringcwdashService.getallval(curl).then(function(res) {
                    if(res == config.service_unavailable){
                        Pace.start();
                        notie.alert(3, res, config.notify_delay);
                        // $rootScope.showSpinner = false;
                    }else{ 
                        Pace.start();
                        // $rootScope.showSpinner = false;
                        if (res.result == "success") {
                            // notie.alert(1, res.data, config.notify_delay);
                            $scope.csvdata = res.data.service;
                            $scope.servdata = res.data.service.slice(1);
                            Pace.stop();
                        } else {
                            $scope.servdatas = res.data;
                            notie.alert(3, res.data, config.notify_delay);
                            Pace.stop();
                        }
                    }
                });
            }

            $scope.catebslistget = function(){

                var curl = config.urls.monitoringdashval + $scope.statusval + "/" + $scope.search_sorting +"/"+$scope.selcategrp;
                $scope.processval(curl);

            }

            $(".monitoringdash th[data-col='sorting']").click(function () {
                //clear any oher sorting ...
                $(".monitoringdash th[data-col='sorting']").not(this).attr("class", "sorting");
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
                var curl = config.urls.monitoringdashval + $scope.statusval + "/" + $scope.search_sorting +"/"+$scope.selcategrp;
                $scope.processval(curl);
                return false;    
            });


            $scope.checkevent = function(host){
                $rootScope.hostval = host;
                $rootScope.stsval = $scope.statusval;
                $rootScope.selcat = $scope.selcategrp;
                $rootScope.search_sort = $scope.search_sorting;
                $state.go("evm");
            }


            $scope.chartevent = function(host, service){
                $scope.hostname = host; $scope.servicename = service;
                $scope.chartval = config.urls.monitoringdashchart+"host="+host +"&srv="+service;  
                // $scope.chartval = "https://r2d2.nxtgen.com/autointellireports/image?host="+host +"&srv="+service;  
                $("#hschart_modal").modal("toggle");
            }

            $scope.csvgeneratefn = function(){       
                $("#datatablepanels").tableToCSV();
                // var lineArray = [];
                // $scope.csvdata.forEach(function (infoArray, index) {
                //     var infoArrays = [];
                //     infoArray.forEach(function(val){
                //         infoArrays.push(val.replace(/"/g, '\\"').replace(/'/g, "\\'"));
                //     })
                //     var line = infoArrays.join(",");
                //     lineArray.push(index == 0 ? "data:text/csv;charset=utf-8," + line : line);
                // });
                // console.log(lineArray);
                // // var csvContent = lineArray.join("\n");
                
                // var link = document.createElement('a');
                // var d = new Date().getTime();
                // var fl = 'Nxtgen Support Dashboard Report-' + d +'.csv';
                // link.id = 'download-csv';
                // link.setAttribute('href', lineArray);
                // link.setAttribute('download', fl);
                // link.click();
            }            
        }

        if($rootScope.nsdash == "open"){
            $scope.statusval = $rootScope.stsval;
            $scope.selcategrp = $rootScope.selcat;
            $scope.init_event();
            var curl = config.urls.monitoringdashval + $rootScope.stsval + "/" + $rootScope.search_sort +"/"+ $rootScope.selcat;
            $scope.processval(curl);
        }
        var dereg = $rootScope.$on('$locationChangeSuccess', function() {
            $rootScope.nsdash = "null";
            dereg();
        });

        $rootScope.$on('monitoringTabChange', function(event, args) {
            if (args["tabname"] == "NxtGen Support Dashboard") {
                if (!bpageloaded) {
                    bpageloaded = true;
                    $scope.init_event();
                    $scope.ongetservfn();
                    $scope.selcwdrefreshtime('2Min');
                }
            }
        });

    }
]);