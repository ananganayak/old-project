angular.module('widgets').controller('monitoringNetworklatencyController', [
    '$scope',
    '$rootScope',
    '$interval',
    '$timeout',
    '$sce',
    'intellimonitorNetlatencyService',
    function($scope, $rootScope, $interval, $timeout, $sce, $intellimonitorNetlatencyService ) {
        'use strict';

        var bpageloaded = false;
        $scope.hostavailablelist = [];
        $scope.hostchartaxis = [];
        $scope.selnlhost = [];

        var autoref ;
        var autorefreshtime = '';
        $scope.selnlaftime = 'Off';

        $scope.exsettings = { 
            checkBoxes: true, 
            dynamicTitle: false, 
            showUncheckAll: false, 
            showCheckAll: false 
        };

        $scope.gettimestampfn = function(){
            $rootScope.showSpinner = true;
            $intellimonitorNetlatencyService.getlovtimestampserv().then(function(res){
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{
                    if(res.result == "success"){
                        console.log(res, "TimeStamp list")
                        $scope.timestamplist = res.data;
                        $rootScope.showSpinner = false;
                    }else{
                        $rootScope.showSpinner = false;
                        notie.alert(3, res.data, config.notify_delay);
                    }
                }
            })
        }

        var username = sessionStorage.getItem("username");

        // get main all Hostgroup
        $scope.getallhostgroup = function(){
            Pace.restart();
            // $rootScope.showSpinner = true;
            $intellimonitorNetlatencyService.getallappval(username).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{
                    if(res.result == "failure"){
                        notie.alert(3, res.data, config.notify_delay);
                    }else{
                        Pace.start();
                        $scope.getallappval = res.data.hostgroup_name;
                        console.log($scope.getallappval);
                        Pace.stop();
                        $rootScope.showSpinner = false;
                    }
                }
            })
        }

        // host list get function
        $scope.gethostvallistfn = function(){

            $scope.appdet = {
                "HostGroup" : $("#selnlhostgrp").val(),
            }
            $rootScope.showSpinner = true;
            $intellimonitorNetlatencyService.gethostlist($scope.appdet).then(function(res){
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{
                    if(res.result == "failure"){
                        notie.alert(3, res.data, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{
                        if(res.multisearch == "no"){
                            $scope.getmonitoringhstlist = res.data.host_display_name;
                        }else{
                            $scope.getmonitoringhstlist = res.data.slice(1);
                        }
                        for (var i = 0; i < $scope.getmonitoringhstlist.length; i++) {
                            var htm = '';
                            htm += '<option value=' + $scope.getmonitoringhstlist[i] +'>' + $scope.getmonitoringhstlist[i] + '</option>';
                            $('#selnlhostlist').append(htm);
                        }
                        $('#selnlhostlist').multiselect('rebuild');
                        console.log($scope.getmonitoringhstlist);
                        $rootScope.showSpinner = false;
                    }
                }
            })
        }

        

        // $scope.gethostlistfn = function(){
        //     $rootScope.showSpinner = true;
        //     $intellimonitorNetlatencyService.gethostlistserv().then(function(res){
        //         if(res == config.service_unavailable){
        //             notie.alert(3, res, config.notify_delay);
        //             $rootScope.showSpinner = false;
        //         }else{
        //             if(res.result == "success"){
        //                 console.log(res, "Hostlist")
        //                 $scope.hostlist = res.data;
        //                 $rootScope.showSpinner = false;
        //             }else{
        //                 $rootScope.showSpinner = false;
        //                 notie.alert(3, res.data, config.notify_delay);
        //             }
        //         }
        //     })
        // }


        $scope.init_event = function() {    
            $("#selnlhostlist").multiselect({
                includeSelectAllOption: true,
            });
            $scope.gethostavailablelistfn = function(time){
                $rootScope.showSpinner = true;
                $intellimonitorNetlatencyService.gethostavailablelistserv(time).then(function(res){
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{
                        if(res.result == "success"){
                            console.log(res, "Hostlist")
                            $scope.hostavailablelist = res.data;
                            $scope.hostchartaxis = res.units;
                            $rootScope.showSpinner = false;
                            // $scope.updatechart();
                            setTimeout(function(){ $rootScope.$broadcast('changeText',{}) }, 1000);
                            
                        }else{
                            $rootScope.showSpinner = false;
                            notie.alert(3, res.data, config.notify_delay);
                        }
                    }
                })
            }

            $scope.gethostvalbasedfn = function(){
                $scope.appdet = {
                    "hosts" : $("#selnlhostlist").val(),
                }
                console.log($scope.appdet);
                $rootScope.showSpinner = true;
                $intellimonitorNetlatencyService.gethostvalbasedserv($scope.selnltimestamp, $scope.appdet).then(function(res){
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{
                        if(res.result == "success"){
                            console.log(res, "Hostlist")
                            $scope.hostavailablelist = res.data;
                            $scope.hostchartaxis = res.units;
                            $rootScope.showSpinner = false;
                            // $scope.updatechart();
                            setTimeout(function(){ $rootScope.$broadcast('changeText',{}) }, 1000);
                            
                        }else{
                            $rootScope.showSpinner = false;
                            notie.alert(3, res.data, config.notify_delay);
                        }
                    }
                })
            }

            $scope.getnlaftimefn = function(){
                var aftime = $scope.selnlaftime;
                console.log(aftime);
                $scope.selnlrefreshtime(aftime);
            }

            $scope.seldcmrefreshtime = function(val){
                $scope.refreshtime = val;
                // alert(refreshtime);
                $interval.cancel(autoref);
                if($scope.refreshtime == '30Sec'){
                    autorefreshtime = "30000";
                    $scope.nlautorefresh();
                }else if($scope.refreshtime == '1Min'){
                    autorefreshtime = "60000";
                    $scope.nlautorefresh();
                }else if($scope.refreshtime == '2Min'){
                    autorefreshtime = "120000";
                    $scope.nlautorefresh();
                }else if ($scope.refreshtime == 'Off'){
                    // autorefreshtime = "0";
                    $interval.cancel(autoref);
                    notie.alert(3, "Auto Refresh Stopped");
                }   
            }
           
            $scope.nlautorefresh = function(){
                autoref = $interval(function(){
                    $scope.gethostvalbasedfn();
                }, autorefreshtime)
            };
    
            var dereg = $rootScope.$on('$locationChangeSuccess', function() {
                console.log("Function Stopped")
                $interval.cancel(autoref);
                dereg();
            });
        
        }
        

        $rootScope.$on('monitoringTabChange', function(event, args) {
            if (args["tabname"] == "Network Latency") {
                if (!bpageloaded) {
                    bpageloaded = true;
                    $scope.init_event();
                    $scope.gettimestampfn();
                    // $scope.gethostlistfn();
                    $scope.getallhostgroup();
                    // $scope.gethostvailablevalfn();                   
                }
            }
        });

    }
]).directive("chartContainer", function ($compile){
    return{
        scope:false,
        link:function(scope,element,attributes){
            $.when(angular.element(document.getElementById('chartContainer')).append($compile(('<div class="col-lg-6" ng-repeat="(key, values) in hostavailablelist"><div class="panel panel-primary"> <div class="panel-heading" style="text-align: center">{{ key }}</div><div class="panel-body"><div id="chart_{{key}}" style="height:300px; width="100%";"></div></div><div class="panel-footer"><div class="table-responsive" id="tabel_{{key}}"></div></div></div></div>'))(scope))).then(function() {
                scope.updatechart = function(){
                    var maxarr = [];
                    var minarr = [];
                    var avgarr = [];
                    var datamin = [];
                    var datamax = [];
                    var dataavg = [];
                    var datapl = [];
                    angular.forEach(scope.hostavailablelist, function (value, key) {
                        Pace.restart();
                        maxarr = [];
                        minarr = [];
                        avgarr = [];
                        datamin = value.map(function (item) {
                            return item[1];
                        });
                        datamax = value.map(function (item) {
                            return item[2];
                        });
                        dataavg = value.map(function (item) {
                            return item[3];
                        });
                        datapl = value.map(function (item) {
                            return item[4];
                        });

                        
                        minarr.push(Math.min(...datamin));
                        minarr.push(Math.min(...datamax));
                        minarr.push(Math.min(...dataavg));
                        minarr.push(Math.min(...datapl));
                        maxarr.push(Math.max(...datamin));
                        maxarr.push(Math.max(...datamax));
                        maxarr.push(Math.max(...dataavg));
                        maxarr.push(Math.max(...datapl));
                        avgarr.push(datamin.reduce((a,b) => a + b, 0) / datamin.length);
                        avgarr.push(datamax.reduce((a,b) => a + b, 0) / datamax.length);
                        avgarr.push(dataavg.reduce((a,b) => a + b, 0) / dataavg.length);
                        avgarr.push(datapl.reduce((a,b) => a + b, 0) / datapl.length);

                        console.log(maxarr, minarr, avgarr);

                        var panel_ele =  document.getElementById("tabel_"+key)

                        panel_ele.innerHTML +='<table class="table"><thead><tr><th></th><th>Min</th><th>Max</th><th>Avg</th></tr></thead><tbody><tr><td>Min</td><td>' + minarr[0].toFixed(2) + 'ms</td><td>'+maxarr[0].toFixed(2)+'ms</td><td>'+avgarr[0].toFixed(2)+'ms</td></tr><tr><td>Max</td><td>'+minarr[1].toFixed(2)+'ms</td><td>'+maxarr[1].toFixed(2)+'ms</td><td>'+avgarr[1].toFixed(2)+'ms</td></tr><tr><td>Avg</td><td>'+minarr[2].toFixed(2)+'ms</td><td>'+maxarr[2].toFixed(2)+'ms</td><td>'+avgarr[2].toFixed(2)+'ms</td></tr><tr><td>Pocket Loss</td><td>'+minarr[3]+'%</td><td>'+maxarr[3]+'%</td><td>'+avgarr[3]+'%</td></tr></tbody></table>';
                        
                        console.log(panel_ele);
                        
                        var myChart = echarts.init(document.getElementById("chart_"+key));
                        
                        var option = {
                            backgroundColor: '#fff',
                            color: ["#ade5ff", "#aab7ff", "#115daa", "#082a4d", "#081624"],
                            // color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
                            tooltip : {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross',
                                    label: {
                                        backgroundColor: '#6a7985'
                                    }
                                }
                            },
                            legend: {
                                data: ['Min', 'Max', 'Average', 'Packet Loss']
                            },
                            toolbox:{
                                show: true,
                                feature : {
                                    saveAsImage: {show: true, title:"PDF"},
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '5%',
                                bottom: '10%',
                                containLabel: true
                            },
                            xAxis : [
                                {
                                    name : "Timestamp",
                                    type : 'category',
                                    boundaryGap : true,
                                    nameLocation: 'middle',
                                    nameGap: 30,
                                    data : value.map(function (item) {
                                        return item[0];
                                    }),
                                    splitLine: {
                                        show: true
                                    }
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value',
                                    name : "Latency",
                                    // interval: 20,
                                    axisLabel: {
                                        formatter: '{value}' + scope.hostchartaxis.response
                                    }
                                },
                                {
                                    type : 'value',
                                    name : "Packet Loss",
                                    min: 0,
                                    max: 100,
                                    // interval: 5,
                                    axisLabel: {
                                        formatter: '{value}' + scope.hostchartaxis.packet_loss
                                    },
                                    splitLine: {
                                        show: false
                                    }
                                }
                            ],
                            series : [
                                {
                                    name:'Min',
                                    type:'line',
                                    areaStyle: {},
                                    lineStyle: {
                                        opacity: 0
                                    },
                                    areaStyle: {
                                        color: '#ade5ff'
                                    },
                                    data:value.map(function (item) {
                                        return item[1];
                                    }),
                                    // markPoint: {
                                    //     data: [
                                    //         {type: 'max', name: 'Max'},
                                    //         {type: 'min', name: 'Min'},
                                    //         {type: 'average', name: 'Avg'}
                                    //     ]
                                    // }
                                },{
                                    name:'Max',
                                    type:'line',
                                    areaStyle: {},
                                    lineStyle: {
                                        opacity: 0
                                    },
                                    areaStyle: {
                                        color: '#aab7ff'
                                    },
                                    data:value.map(function (item) {
                                        return item[2];
                                    }),
                                    // markPoint: {
                                    //     data: [
                                    //         {type: 'max', name: 'Max'},
                                    //         {type: 'min', name: 'Min'},
                                    //         {type: 'average', name: 'Avg'}
                                    //     ]
                                    // }
                                },{
                                    name:'Average',
                                    type:'line',
                                    data:value.map(function (item) {
                                        return item[3];
                                    }),
                                    // markPoint: {
                                    //     data: [
                                    //         {type: 'max', name: 'Max'},
                                    //         {type: 'min', name: 'Min'},
                                    //         {type: 'average', name: 'Avg'}
                                    //     ]
                                    // }
                                },{
                                    name:'Packet Loss',
                                    type:'line',
                                    showSymbol: false,
                                    data:value.map(function (item) {
                                        return item[4];
                                    }),
                                    lineStyle: {
                                        opacity: 0
                                    },
                                    markPoint: {
                                        data: [
                                            {type: 'max', name: 'Max'},
                                            {type: 'min', name: 'Min'},
                                            // {type: 'average', name: 'Avg'}
                                        ]
                                    }
                                }
                            ]
                        };
                        myChart.setOption(option);
                    });
                }
                scope.$on('changeText',function(event, data){
                    scope.updatechart()
                });
            })
        }
    }
});