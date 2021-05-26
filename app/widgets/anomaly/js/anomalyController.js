angular.module('widgets').controller('anomalyController', [
    '$scope',
    '$rootScope',
    '$interval',
    'intelliAnomalyService',
    function($scope, $rootScope, $interval, intelliAnomalyService) {
        'use strict';

        var bpageloaded = false;

        $scope.anomalydetaildashboard = false;
        $scope.anomalydashboard = true;
        $scope.searchform = false;

        var autorefreshtime = '';
        var autoref ;
        $scope.getdetval = [];
        $scope.hostgorupname = [];
        $scope.hostgorupval = [];
        $scope.hostnameval = "";
        $scope.hostkeyval = "";
        $scope.checkmetricsval = "";

        // line chart
        function draw_area(ele_id, data_arr) {
            Pace.restart();
            var res_arr = [];
            for (var i = 0; i < data_arr.length; i++) {
                var stringValue = data_arr[i].Time_stamp;
                var datetimeval = moment.utc(stringValue);
                if(data_arr[i].lstm_output == 1){
                    res_arr.push({
                        "Timestamp": datetimeval.format('DD/MM/YY HH:mm'), 
                        "Metrics" : data_arr[i].actual, 
                        "Lower_Threshold" : data_arr[i].lower_threshold, 
                        "Anomaly": data_arr[i].lstm_output, 
                        "Prediction":data_arr[i].prediction, 
                        "Upper_Threshold":data_arr[i].upper_threshold,
                        "Color" : "#FF5252"
                    });
                }else{
                    res_arr.push({
                        "Timestamp": datetimeval.format('DD/MM/YY HH:mm'), 
                        "Metrics" : data_arr[i].actual, 
                        "Lower_Threshold" : data_arr[i].lower_threshold, 
                        "Anomaly": data_arr[i].lstm_output, 
                        "Prediction":data_arr[i].prediction, 
                        "Upper_Threshold":data_arr[i].upper_threshold,
                        "Color" : "#52A3FF"
                    });
                }
            }   
            
            // console.log(res_arr);
            var myChart = echarts.init(document.getElementById(ele_id));
            var option = {
                title: {
                    text: 'Anomaly Chart',
                    // subtext: 'Example in MetricsGraphics.js',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        animation: false,
                        label: {
                            backgroundColor: '#ccc',
                            borderColor: '#aaa',
                            borderWidth: 1,
                            shadowBlur: 0,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            color: '#222'
                        }
                    },
                    formatter: function (params) {
                        return params[0].seriesName +':'+params[0].value+ '<br/>'+ params[1].seriesName +':'+ params[1].value+ '<br/>'+ params[2].seriesName +':'+ params[2].value;
                        // return params[2].seriesName +':'+ (params[2].value).toFixed(1) + '%'+ '<br/>'+ params[3].seriesName +':'+ (params[3].value * 100).toFixed(1) + '%';
                    }
                },
                grid: {
                    top: '10%',
                    left: '3%',
                    right: '3%',
                    bottom: '15%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: res_arr.map(function (item) {
                        return item.Timestamp;
                    }),
                    splitLine: {
                        show: false
                    },
                    boundaryGap: false
                },
                yAxis: {
                    axisLabel: {
                        formatter: function (val) {
                            return (val);
                        }
                    },
                    splitNumber: 3,
                    splitLine: {
                        show: false
                    }
                },
                dataZoom: [{
                    startValue: res_arr[0].Timestamp
                }, {
                    type: 'inside',
                }],
                series: [{
                    name: 'Lower Threshold',
                    type: 'line',
                    data: res_arr.map(function (item) {
                        return item.Lower_Threshold;
                    }),
                    lineStyle: {
                        opacity: 0
                    },
                    areaStyle: {
                        color: '#ccc'
                    },
                    stack: 'confidence-band',
                    symbol: 'none'
                  },{
                    name: 'Upper Threshold',
                    type: 'line',
                    data: res_arr.map(function (item) {
                        return item.Upper_Threshold - item.Lower_Threshold;
                    }),
                    lineStyle: {
                        opacity: 0
                    },
                    areaStyle: {
                        color: '#ccc'
                    },
                    stack: 'confidence-band',
                    symbol: 'none'
                  },{
                    name: 'Metrics',
                    type: 'line',
                    data: res_arr.map(function (val, param) {
                        return val.Metrics;
                    }),
                    hoverAnimation: true,
                    symbolSize: 10,
                    symbol: 'circle',
                    // itemStyle: {
                    //     color: '#0000A0'
                    // },
                    lineStyle: {
                        width: 1,
                        color : '#2D67A9',
                    },
                    itemStyle: {
                        color: function(param) {
                            return res_arr[param.dataIndex].Color;
                        },
                        borderWidth: 5,
                    },
                    showSymbol: true
                  }
                //   {
                //     name: 'Prediction',
                //     type: 'line',
                //     data: res_arr.map(function (item) {
                //         return item.Prediction;
                //     }),
                //     hoverAnimation: false,
                //     symbolSize: 6,
                //     itemStyle: {
                //         color: '#FFA500'
                //     },
                //     showSymbol: false
                //   }
                ]
            };
            myChart.setOption(option);
        }

        // Auto Refresh time get Function
        $scope.selrefreshtime = function(){
            var refreshtime = $('#selrefreshtime').val();
            $interval.cancel(autoref);
            if(refreshtime == '5-Sec'){
                autorefreshtime = "5000";
                $scope.anomalyautorefresh();
            }else if(refreshtime == '10-Sec'){
                autorefreshtime = "10000";
                $scope.anomalyautorefresh();
            }else if(refreshtime == '30-Sec'){
                autorefreshtime = "30000";
                $scope.anomalyautorefresh();
            }else if(refreshtime == '1-min'){
                autorefreshtime = "100000";
                $scope.anomalyautorefresh();
            }else if(refreshtime == '10-min'){
                autorefreshtime = "1000000";
                $scope.anomalyautorefresh();
            }else if(refreshtime == '30-min'){
                autorefreshtime = "3000000";
                $scope.anomalyautorefresh();
            }else if(refreshtime == '1-hours'){
                autorefreshtime = "10000000";
                $scope.anomalyautorefresh();
            }else if (refreshtime == 'no'){
                // autorefreshtime = "0";
                $interval.cancel(autoref);
                notie.alert(3, "Auto Refresh Stopped");
            }   
            
        }

        // auto refresh connect function
        $scope.anomalyautorefresh = function(){
            autoref = $interval(function(){
                $scope.getanomalychartfn();
            },autorefreshtime)
        };

        //if root change auto refresh function changed  
        var dereg = $rootScope.$on('$locationChangeSuccess', function() {
            console.log("Function Stopped")
            $interval.cancel(autoref);
            dereg();
        });

        function init_event() {

            // host detail get function
            $scope.hostdetaildiv = function(val, val2, val3){
                Pace.restart();
                $("#gethostname li").removeClass("active");
                $("input:checkbox").prop('checked', false); 
                $('.chart-div').css("display",'none');
                $scope.checkedfun = false ;
                $scope.hostgorupname = val;
                $scope.hostgorupval = val2;
                $scope.hostkeyval = val3;
                $scope.searchtxt = "";
                // console.log($scope.hostgorupname, $scope.hostgorupval, $scope.hostkeyval);  
                $scope.anomalydetaildashboard = true;
                $scope.anomalydashboard = false;
                // $scope.getanomalychartfn();
            }
    
            // back to host group dashboard function
            $scope.backtodashboard = function(){
                $scope.anomalydetaildashboard = false;
                $scope.anomalydashboard = true;
            }
            

            // $scope.showSearch = function(){
            //     if($scope.searchform == true){
            //         $scope.searchform = false;
            //     }else{
            //         $scope.searchform = true;
            //     }
            // }

            // line 
            // $scope.getanomalychartfn = function(){
            //     var dataset = {"index_name":"vmware_esxivm_metric","period":"1M","host_name":"vse-WolkenEdge (bb6aa462-7712-41cf-bf0b-4f65b59a7123)-0","metric_name":"esxivm.NIC.Network adapter 1.nic_tx_percentage"}
            //     $rootScope.showSpinner = true;
            //     intelliAnomalyService.getanomalychartservnew(dataset).then(function(res) {
            //         if(res == config.service_unavailable){
            //             notie.alert(3, res, config.notify_delay);
            //             $rootScope.showSpinner = false;
            //         }else{ 
            //           $scope.getchartvalnew = res.data;
            //           console.log($scope.getchartvalnew);
            //         //   plotset($scope.getchartval);
            //           $rootScope.showSpinner = false;
            //         //   draw_area("linechart1", $scope.getchartval);
            //         };
            //     })
            // }();

            // function plotset(cval){
            //     var val = "linechart";
            //     setTimeout(function(){
            //         for (var i = 0; i < cval.length; i++) {
            //             Pace.restart();
            //             draw_area(val+[i], cval[i]); 
            //         }
            //     },10)
            // }

            // get anomaly detail function
            $scope.getanomalydetail = function(){
                $rootScope.showSpinner = true;
                intelliAnomalyService.getanomalydetailserv().then(function(res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                      $scope.getdetval = res.data;
                      console.log($scope.getdetval);
                      $rootScope.showSpinner = false;
                    };
                })
            }();

            // hide metrics function 
            $scope.checkedfun = false ;
            $scope.metricdisfn = function(name){
                $scope.checkedfun = true;
                $scope.hostnameval = name;
                $("input:checkbox").prop('checked', false); 
                $('.chart-div').css("display",'none');
            }
            $scope.nodata = true;

            $scope.getchartdetail = function getchartdetail(event, chkval, modelval){
                 var fields = $scope.hostgorupname.split(/_(.+)/)[1];
                $scope.checkmetricsval = chkval;
                if(event.target.checked == true){
                    if($scope.hostnameval != undefined){
                        var dataset ={
                                "index_name": fields,
                                "host_name": $scope.hostnameval,
                                "metric_name": $scope.checkmetricsval,
                                "period": "8h",
                        }
                        // var dataset = {"index_name":"vmware_esxivm_metric","period":"1M","host_name":"vse-WolkenEdge (bb6aa462-7712-41cf-bf0b-4f65b59a7123)-0","metric_name":"esxivm.NIC.Network adapter 1.nic_tx_percentage"}
                        $rootScope.showSpinner = true;
                        intelliAnomalyService.getanomalychartserv(dataset).then(function(res) {
                            if(res == config.service_unavailable){
                                notie.alert(3, res, config.notify_delay);
                                $rootScope.showSpinner = false;
                            }else{ 
                                if(res.result == "success"){
                                    Pace.restart();
                                    if(modelval == true){
                                        document.getElementById("showdiv"+$scope.checkmetricsval).style.display='block';
                                        var chartwd = document.getElementById("showdiv"+$scope.checkmetricsval).offsetWidth;
                                        document.getElementById("chart"+$scope.checkmetricsval).style.width= (chartwd - 50)  + "px";
                                    }else{
                                        document.getElementById("showdiv"+$scope.checkmetricsval).style.display='none'
                                    }
                                    if(res.output == "No Data"){
                                        
                                        $rootScope.showSpinner = false; 
                                        $scope.getchartval = res.output;
                                        notie.alert(3, res.output, config.notify_delay);
                                        var val = "chart";
                                        var noval = "nochart";
                                        // draw_area(val+val1, $scope.getchartval)
                                        document.getElementById(val+$scope.checkmetricsval).style.display='none';
                                        document.getElementById(noval+$scope.checkmetricsval).style.display='block';
                                    }else{
                                        $scope.getchartval = res.output;
                                        console.log($scope.getchartval);
                                        val = "chart";
                                        noval = "nochart";
                                        draw_area(val+$scope.checkmetricsval, $scope.getchartval)
                                        document.getElementById(val+$scope.checkmetricsval).style.display='block';
                                        document.getElementById(noval+$scope.checkmetricsval).style.display='none';
                                        $rootScope.showSpinner = false;  
                                    }
                                }else{
                                    var val = "#checkval" + $scope.checkmetricsval;
                                    $(val).prop('checked', false); 
                                    event.target.checked = false;
                                    $rootScope.showSpinner = false;
                                    notie.alert(3, res.data, config.notify_delay);
                                }

                            };
                        })
                    }else{
                        notie.alert(3, "please select host name");
                    }
                }else{
                    // notie.alert(3, "checked false");
                    document.getElementById("showdiv"+$scope.checkmetricsval).style.display='none'
                }              
            }

            // period based chart details get function
            $scope.getchartdetperiodfn = function(val1){
                document.getElementById("sort"+val1).style.display = "none";
                var period_id = "selperiodget" + val1;
                // var bucketspan_id = "selbsget" + val1;
                var fields = $scope.hostgorupname.split(/_(.+)/)[1];
                var dataset = {
                    "index_name": fields,
                    "host_name": $scope.hostnameval,
                    "metric_name": val1,
                    "period": document.getElementById(period_id).value,
                        // "bucket_span": document.getElementById(bucketspan_id).value,
                }
                $rootScope.showSpinner = true;
                intelliAnomalyService.getanomalychartserv(dataset).then(function(res) {
                    if(res == config.service_unavailable){

                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;

                    }else{ 

                        if(res.result == "success"){
                            Pace.restart();
                            if(res.output == "No Data"){
                                $scope.getchartval = res.output;
                                $rootScope.showSpinner = false; 
                                notie.alert(3, res.output, config.notify_delay);
                                var val = "chart";
                                var noval = "nochart";
                                // draw_area(val+val1, $scope.getchartval)
                                document.getElementById(val+val1).style.display='none';
                                document.getElementById(noval+val1).style.display='block';
                            }else{
                                $scope.getchartval = res.output;
                                val = "chart";
                                noval = "nochart";
                                draw_area(val+val1, $scope.getchartval)
                                $rootScope.showSpinner = false; 
                                document.getElementById(val+val1).style.display='block';
                                document.getElementById(noval+val1).style.display='none';
                            }
                        }else{

                            notie.alert(3, res.data, config.notify_delay);

                        }

                    };
                })

            }

            // chart close function
            $scope.chartclosefn = function(val1){
                document.getElementById("showdiv"+val1).style.display='none';
                document.getElementById("checkval"+val1).checked = false;
            }

            // sort dropdown content toggle
            $scope.sortbtn = function(x){
                if(document.getElementById("sort"+x).style.display == "block"){
                    document.getElementById("sort"+x).style.display = "none";
                }else{
                    document.getElementById("sort"+x).style.display = "block";
                }
                
            }
            
            // sort dropdown content toggle
            $scope.closebtn =function(x){
                document.getElementById("sort"+x).style.display = "none";
            }
        }
        $scope.init = function(){
            init_event();
        }

    }
]);