angular.module('widgets').controller('automationdashboardController', ['$scope',
'$timeout',
'$rootScope',
'intelliautomationdashboardService', function($scope, $timeout, $rootScope, $intelliautomationdashboardService){


    'use strict';


    // dashboard list details get function
    $scope.getautodashboardlist = function(){
        $rootScope.showSpinner = true;
        $intelliautomationdashboardService.getautolisttotserv().then(function (res) {
            if(res == config.service_unavailable){
                notie.alert(3, res, config.notify_delay);
                $rootScope.showSpinner = false;
            }else{ 
                $rootScope.showSpinner = false;
                if (res.result == "success") {
                    console.log(res.data);
                    $scope.getautolist = res.data.splice(1);
                    draw_totcount1("charttotcount1", $scope.getautolist)
                }else{
                    notie.alert(3, res.data, config.notify_delay);
                }
            }
        });
    }

    // ProcessByTimeChart
    function draw_pbrt(ele_id, data_arr) {
        console.log(ele_id, data_arr, "time based data");
        Pace.restart();            
        var myChart = echarts.init(document.getElementById(ele_id));
        var option = {
            legend: {
                data: ['Punch Card']
            },
            grid: {
                left: 2,
                bottom: 10,
                right: 10,
                containLabel: true
            },
            // tooltip: {
            //     trigger: 'axis',
            //     axisPointer: {
            //         type: 'cross'
            //     },
            //     position: 'top'
            // },
            xAxis: {
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            },
            yAxis: {
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                scale: true
            },
            series: [{
                name: 'scatter',
                type: 'scatter',
                label: {
                    emphasis: {
                        show: true,
                        formatter : function(param){
                            return param.data[0];
                        }
                    },
                    position:'top'
                },
                symbolSize: function (val) {
                    return 1 * 20;
                },
                data : data_arr.map(function (item) {
                    return item[1];
                }),
            }]
        };
        myChart.setOption(option);
    }

    // ProcessbyStartChart
    function draw_pbsd(ele_id, data_arr) {
        Pace.restart();            
        var myChart = echarts.init(document.getElementById(ele_id));
        var option = {
            legend: {
                data: ['Punch Card']
            },
            grid: {
                left: 2,
                bottom: 10,
                right: 10,
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                },
                position: 'top'
            },
            color: ["#2196f3"],
            xAxis: {
                type: 'category',
                data: data_arr.map(function (item) {
                    return item[0];
                }),
            },
            yAxis: {},
            series: [{
                data: data_arr.map(function (item) {
                    return item[1];
                }),
                type: 'line',
                stack: 'area',
                            areaStyle: {},
            }]
        };
        myChart.setOption(option);
    }

    // ProcessbyEndChart
    function draw_pbed(ele_id, data_arr) {
        Pace.restart();            
        var myChart = echarts.init(document.getElementById(ele_id));
        var option = {
            legend: {
                data: ['Punch Card']
            },
            grid: {
                left: 2,
                bottom: 10,
                right: 10,
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                },
                position: 'top'
            },
            color: ["#3f51b5"],
            xAxis: {
                type: 'category',
                data: data_arr.map(function (item) {
                    return item[0];
                }),
            },
            yAxis: {},
            series: [{
                data: data_arr.map(function (item) {
                    return item[1];
                }),
                type: 'line',
                stack: 'area',
                            areaStyle: {},
            }]
        };
        myChart.setOption(option);
    }

    // ProcessbyType
    function draw_totcount1(ele_id, data_arr) {

        var datasetname = [];
        var datasetvalue = [];
        for (let i = 0; i < data_arr.length; i++) {
            datasetname.push(data_arr[i][0]);
            datasetvalue.push(data_arr[i][1]);
        }
        Pace.restart();            
        var myChart = echarts.init(document.getElementById(ele_id));
        var option = {
            // backgroundColor: '#eee',
            color: ["#96cbff", "#1a8cff", "#115daa", "#082a4d", "#081624"],
            title: {
                left: 'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c}"
            },
            xAxis: {
                type: 'category',
                data: datasetname
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: datasetvalue,
                type: 'bar'
            }]
        };
        myChart.setOption(option);
    }

    // ProcessbyType
    function draw_pbt1(ele_id, data_arr) {

        var dataset = [];
        for (let i = 0; i < data_arr.length; i++) {
            dataset.push({
                "value":data_arr[i][1], "name": data_arr[i][0]
            })
        }
        
        Pace.restart();            
        var myChart = echarts.init(document.getElementById(ele_id));
        var option = {
            // backgroundColor: '#eee',
            color: ["#96cbff", "#1a8cff", "#115daa", "#082a4d", "#081624"],
            title: {
                left: 'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            series : [{
                type: 'pie',
                radius : '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data: dataset,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
        myChart.setOption(option);
    }


    // Get Process By Start Date function
    $scope.getautodashprocesstart = function(){
        $rootScope.showSpinner = true;
        $intelliautomationdashboardService.getautoprocesstartotserv().then(function (res) {
            if(res == config.service_unavailable){
                notie.alert(3, res, config.notify_delay);
                $rootScope.showSpinner = false;
            }else{ 
                $rootScope.showSpinner = false;
                if (res.result == "success") {
                    $scope.getautoprocesstratdet = res.data.splice(1);
                    console.log($scope.getautoprocesstratdet);
                    draw_pbsd("chartpbsd1", $scope.getautoprocesstratdet);
                }else{
                    notie.alert(3, res.data, config.notify_delay);
                }
            }
        });
    }

    // Get Process By End Date function
    $scope.getautodashprocesend = function(){
        $rootScope.showSpinner = true;
        $intelliautomationdashboardService.getautoprocesendtotserv().then(function (res) {
            if(res == config.service_unavailable){
                notie.alert(3, res, config.notify_delay);
                $rootScope.showSpinner = false;
            }else{ 
                $rootScope.showSpinner = false;
                if (res.result == "success") {
                    $scope.getautoprocesenddet = res.data.splice(1);
                    console.log($scope.getautoprocesenddet);
                    draw_pbed("chartpbed1", $scope.getautoprocesenddet);
                }else{
                    notie.alert(3, res.data, config.notify_delay);
                }
            }
        });
    }

    // Get Process By Run Time function
    $scope.getautodashprocesrun = function(){
        $rootScope.showSpinner = true;
        $intelliautomationdashboardService.getautoprocesruntotserv().then(function (res) {
            if(res == config.service_unavailable){
                notie.alert(3, res, config.notify_delay);
                $rootScope.showSpinner = false;
            }else{ 
                $rootScope.showSpinner = false;
                if (res.result == "success") {
                    console.log(res.data);
                    $scope.getautoprocesrundet = res.data;
                    draw_pbrt("chartpbrt1", $scope.getautoprocesrundet.splice(1));
                    console.log($scope.getautoprocesrundet.splice(1));
                }else{
                    notie.alert(3, res.data, config.notify_delay);
                }
            }
        });
    }

    // Get Process By Run Time function
    $scope.getautodashprocestyp = function(){
        $rootScope.showSpinner = true;
        $intelliautomationdashboardService.getautoprocestyptotserv().then(function (res) {
            if(res == config.service_unavailable){
                notie.alert(3, res, config.notify_delay);
                $rootScope.showSpinner = false;
            }else{ 
                $rootScope.showSpinner = false;
                if (res.result == "success") {
                    console.log(res.data);
                    $scope.getautoprocestypdet = res.data.splice(1);
                    draw_pbt1("chartpbt1", $scope.getautoprocestypdet);
                }else{
                    notie.alert(3, res.data, config.notify_delay);
                }
            }
        });
    }


    // Get Process By Run Time function
    $scope.getautodashroityp = function(){
        $rootScope.showSpinner = true;
        $intelliautomationdashboardService.getautoroityptotserv().then(function (res) {
            if(res == config.service_unavailable){
                notie.alert(3, res, config.notify_delay);
                $rootScope.showSpinner = false;
            }else{ 
                $rootScope.showSpinner = false;
                if (res.result == "success") {
                    console.log(res.data);
                    $scope.getautoroitypdet = res.data;
                }else{
                    notie.alert(3, res.data, config.notify_delay);
                }
            }
        });
    }
    

    function init_event() {


    }

    $scope.init = function () {
        init_event()
        $scope.getautodashboardlist(); 
        $scope.getautodashprocesstart();
        $scope.getautodashprocesend();  
        $scope.getautodashprocesrun();
        $scope.getautodashprocestyp();
        $scope.getautodashroityp();
    }

    $rootScope.$on('AutomationTabChange', function (event, args) {
        if (args["tabname"] == "Dashboard") {
            // if (!bpageloaded) {
            //     bpageloaded = true;
            // $scope.load_deployment_list();
            // $scope.clrclass = "activeclr";
            // }
        }
    });

}])