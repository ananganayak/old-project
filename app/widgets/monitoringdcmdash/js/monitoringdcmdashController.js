angular.module('widgets').controller('monitoringdcmdashController', [
    '$scope',
    '$rootScope',
    '$state',
    '$interval',
    'intellimonitoringdcmdashService',
    function($scope, $rootScope, $state, $interval, $intellimonitoringdcmdashService ) {
        'use strict';

        var bpageloaded = false;
        
        $scope.dcmevent_list_res = [];

        $scope.dcmeventcurrentPage = 1;
        $scope.dcmeventnumPerPage = 10;

        $scope.totalPages = 1;
        $scope.totalitemCount = 0;

        $scope.dashboardpage = false;

        var autoref ;
        var autorefreshtime = '';

        var loadfirstdate = 1;

        $scope.calculateTotalPages = function (total_page_count) {
            var totalPages = $scope.dcmeventnumPerPage < 1 ? 1 : Math.ceil(total_page_count / $scope.dcmeventnumPerPage);
            return Math.max(totalPages || 0, 1);
        };

        $scope.noPrevious = function () {
            return $scope.dcmeventcurrentPage === 1;
        };

        $scope.noNext = function () {
            return $scope.dcmeventcurrentPage === $scope.totalPages;
        };

        $scope.selectPage = function (page) {
            if ($scope.dcmeventcurrentPage !== page && page > 0 && page <= $scope.totalPages) {
                $scope.dcmeventcurrentPage = page;
                $scope.geteventdetfn(1);
            }
        };

        $scope.PaginationLink = function (page) {
            console.log(page);
            $scope.dcmeventcurrentPage = page;
            $scope.geteventdetfn(1);
        }

        $(".monitoringdcmdashController .pagination_dropdown a").click(function () {
            var selnum = $(this).text();
            $(".span_pagination_text").text(selnum);
            $scope.dcmeventcurrentPage = 1;
            $scope.dcmeventnumPerPage = parseInt(selnum);
            $scope.geteventdetfn(1);
        });

        function display_pagination() {
            var end, start;
            start = ($scope.dcmeventcurrentPage - 1) * $scope.dcmeventnumPerPage;
            end = start + $scope.dcmeventnumPerPage;
            var sendtext = end;
            if (end > $scope.totalitemCount) {
                sendtext = $scope.totalitemCount;
            }
            if (parseInt(sendtext) != 0) {
                $scope.span_page_status = (start + 1) + " - " + parseInt(sendtext);
            } else {
                $scope.span_page_status = "0 - " + parseInt(sendtext);
            }
            $scope.span_total_count = $scope.totalitemCount;
        }

        // get configuration name function 
        $scope.getconfignamefn = function(){
            $intellimonitoringdcmdashService.getconfignameserv().then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{
                    if(res.result == "failure"){
                        notie.alert(3, res.data, config.notify_delay);
                    }else{
                        $scope.getconfignameval = res.data;
                        console.log($scope.getconfignameval);
                        $rootScope.showSpinner = false;
                    }
                }
            })
        }

        function draw_donut(ele_id, data_arr) {
            var res_arr = {
                lable: [],
                data: []
            };
            $.each(data_arr, function(inx, row) {
                res_arr.lable.push(inx);
                res_arr.data.push({
                    "value": row,
                    "name": inx + ' : ' + row
                });
            });
            var myChart = echarts.init(document.getElementById(ele_id));
            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}"
                },
                legend: {
                    bottom: 10,
                    left: 'center',
                    data: res_arr.lable
                },
                color: ["#96cbff", "#1a8cff", "#115daa", "#082a4d", "#081624"],
                
                animation: false,
                series: [
                    {
                        type: 'pie',
                        radius: '65%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data: res_arr.data
                    }
                    
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            };
            myChart.setOption(option);
        }

        function draw_power_line(ele_id, dataset) {
            Pace.restart();
            var myChart = echarts.init(document.getElementById(ele_id));
            
            var data1 = dataset.map(function (item) {
                return item.dateTime;
            });
            var option = {
                backgroundColor: '#fff',
                color: ["#96cbff", "#1a8cff", "#115daa", "#082a4d", "#081624"],
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '10%',
                    containLabel: true
                },
                xAxis : [
                    {
                        name : "Timestamp",
                        type : 'category',
                        boundaryGap : false,
                        nameLocation: 'middle',
                        nameGap: 30,
                        data : data1
                    }
                ],
                yAxis : [
                    {
                        name : "Watts",
                        type : 'value',
                    }
                ],
                series : [
                    {
                        name:'Value',
                        type:'line',
                        data:dataset.map(function (item) {
                            return item.value;
                        })
                    }
                ]
            };
            myChart.setOption(option);
        }

        function draw_thermal_line(ele_id, dataset) {
            Pace.restart();
            var myChart = echarts.init(document.getElementById(ele_id));
            
            var data1 = dataset.map(function (item) {
                return item.dateTime;
            });
            var option = {
                backgroundColor: '#fff',
                color: ["#96cbff", "#1a8cff", "#115daa", "#082a4d", "#081624"],
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '10%',
                    containLabel: true
                },
                xAxis : [
                    {   
                        name : "Timestamp",
                        type : 'category',
                        boundaryGap : false,
                        nameLocation: 'middle',
                        nameGap: 30,
                        data : data1
                    }
                ],
                yAxis : [
                    {   
                        name : "°C",
                        type : 'value',
                    }
                ],
                series : [
                    {
                        name:'Value',
                        type:'line',
                        data:dataset.map(function (item) {
                            return item.value;
                        })
                    }
                ]
            };
            myChart.setOption(option);
        }

        $scope.init_event = function() {

            $('.datepickers').datetimepicker({
                format: 'YYYY-MM-DD'
            });

            $('#Formmonitordcm').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    seldcmconfigname: {required: true},
                    seldcmdatacenter: {required: true},
                    txtdcmstartdate: {required: true},
                },
                messages: {
                    seldcmconfigname: {
                        required: 'Please Select the Config Name',
                    },
                    seldcmdatacenter: {
                        required: 'Please Select the Data Centers',
                    },
                    txtdcmstartdate: {
                        required: 'Please Select the StartDate',
                    },
                },
                highlight: function (element) {
                    $(element).closest('select').addClass("form_error");
                },
                unhighlight: function (element) {
                    $(element).closest('select').removeClass("form_error");
                },
                errorPlacement: function (error, element) {
                    $(element).closest('div').append(error);
                }
            });

            
            // Get Datacenter List Function
            $scope.getdatacenterfn = function(){
                var configname = $('#seldcmconfigname').val();
                if(configname == ''){
                    notie.alert(3, "Please Select Config Name", config.notify_delay);
                }else{
                    $intellimonitoringdcmdashService.getdatacenterserv(configname).then(function (res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{
                            if(res.result == "failure"){
                                notie.alert(3, res.data, config.notify_delay);
                            }else{
                                $scope.getdcval = res.data;
                                console.log($scope.getdcval);
                                $rootScope.showSpinner = false;
                            }
                        }
                    })
                }
            }

            function formatDate(date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();
            
                if (month.length < 2) 
                    month = '0' + month;
                if (day.length < 2) 
                    day = '0' + day;
                
                return [year, month, day].join('-');
            }

            $scope.geteventdetfn = function(val){
                var configname = $('#seldcmconfigname').val();
                var datacenter = $('#seldcmdatacenter').val();
                var sdate;
                $rootScope.showSpinner = true;
                $scope.dashboardpage = true;
                
                if(val == 1){
                    sdate = $('#txtdcmstartdate').val();
                    loadfirstdate = 0;
                }else{
                    var myCurrentDate=new Date();
                    var myPastDate=new Date(myCurrentDate);
                        myPastDate.setDate(myPastDate.getDate() - 5)
                    console.log(formatDate(myPastDate));
                    sdate = formatDate(myPastDate);
                    console.log(sdate)
                    $scope.txtdcmstartdate = sdate;
                }
                $intellimonitoringdcmdashService.getdashdeteventgridserv(configname, datacenter, sdate,  $scope.dcmeventcurrentPage, $scope.dcmeventnumPerPage).then(function (res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{
                        if(res.result == "failure"){
                            $scope.dcmevent_list_res = [];
                            $scope.totalitemCount = 0;
                            display_pagination();
                            notie.alert(3, res.data, config.notify_delay);
                        }else{
                            $scope.dcmevent_list_res = res.data;
                            console.log($scope.dcmevent_list_res, "Event grid Value");
                            $scope.totalitemCount = res.data["totalItems"];
                            $scope.totalPages = $scope.calculateTotalPages(res.data["totalItems"]);
                            display_pagination();
                            $rootScope.showSpinner = false;
                        }
                    }
                })
            }

            $scope.getovaralldashdetfn = function(){
                if ($('#Formmonitordcm').valid()){
                    var configname = $('#seldcmconfigname').val();
                    var datacenter = $('#seldcmdatacenter').val();
                    $rootScope.showSpinner = true;
                    $scope.dashboardpage = true;
                    if(loadfirstdate == 1){
                        $scope.geteventdetfn(0);
                    }
                    $intellimonitoringdcmdashService.getdashdetpowerserv (configname, datacenter).then(function (res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{
                            if(res.result == "failure"){
                                notie.alert(3, res.data, config.notify_delay);
                            }else{
                                $scope.getdcpowerval = res.data.dataList;
                                draw_power_line("powerchartline", $scope.getdcpowerval);
                                console.log($scope.getdcpowerval, "Power value");
                                $rootScope.showSpinner = false;
                            }
                        }
                    })
    
                    $intellimonitoringdcmdashService.getdashdetthermalserv(configname, datacenter).then(function (res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{
                            if(res.result == "failure"){
                                notie.alert(3, res.data, config.notify_delay);
                            }else{
                                $scope.getdcthermalval = res.data.dataList;
                                console.log($scope.getdcthermalval, "Thermal Value");
                                draw_thermal_line("thermalchartline", $scope.getdcthermalval);
                                $rootScope.showSpinner = false;
                            }
                        }
                    })
    
                    $intellimonitoringdcmdashService.getdashdethealthserv(configname, datacenter).then(function (res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{
                            if(res.result == "failure"){
                                notie.alert(3, res.data, config.notify_delay);
                            }else{
                                $scope.getdchealthval = res.data;
                                console.log($scope.getdchealthval, "Health Value");
                                $rootScope.showSpinner = false;
                            }
                        }
                    })
    
                    $intellimonitoringdcmdashService.getdashinventoryserv(configname, datacenter).then(function (res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{
                            if(res.result == "failure"){
                                notie.alert(3, res.data, config.notify_delay);
                            }else{
                                $scope.getdcinventoryval = res.data;
                                console.log($scope.getdcinventoryval, "Inventory Value");
                                $rootScope.showSpinner = false;
                            }
                        }
                    })
    
                    $intellimonitoringdcmdashService.getdashmaxtempserv(configname, datacenter).then(function (res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{
                            if(res.result == "failure"){
                                notie.alert(3, res.data, config.notify_delay);
                            }else{
                                $scope.getdcmaxtempval = res.data;
                                console.log($scope.getdcmaxtempval, "Max Inlet Temp Value");
                                $rootScope.showSpinner = false;
                            }
                        }
                    })
    
                    $intellimonitoringdcmdashService.getdashdetdevicehealthserv(configname, datacenter).then(function (res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{
                            if(res.result == "failure"){
                                notie.alert(3, res.data, config.notify_delay);
                            }else{
                                $scope.getdcdevicehealthval = res.data;
                                console.log($scope.getdcdevicehealthval, "Device Health");
                                draw_donut("piechart", $scope.getdcdevicehealthval);
                                $rootScope.showSpinner = false;
                            }
                        }
                    })
    
                    $intellimonitoringdcmdashService.getdashdetpowercapacityserv(configname, datacenter).then(function (res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{
                            if(res.result == "failure"){
                                notie.alert(3, res.data, config.notify_delay);
                            }else{
                                $scope.getdcpowercapacityval = res.data;
                                console.log($scope.getdcpowercapacityval, "Power Capacity Value");
                                $rootScope.showSpinner = false;
                            }
                        }
                    }) 
                }
            }
                    
        }

        $scope.getdcmaftimefn = function(){
            var aftime = $scope.seldcmaftime;
            console.log(aftime);
            $scope.seldcmrefreshtime(aftime);
        }
        
        $scope.seldcmrefreshtime = function(val){
            $scope.refreshtime = val;
            // alert(refreshtime);
            $interval.cancel(autoref);
            if($scope.refreshtime == '30Sec'){
                autorefreshtime = "30000";
                $scope.dcmautorefresh();
            }else if($scope.refreshtime == '1Min'){
                autorefreshtime = "60000";
                $scope.dcmautorefresh();
            }else if($scope.refreshtime == '2Min'){
                autorefreshtime = "120000";
                $scope.dcmautorefresh();
            }else if ($scope.refreshtime == 'Off'){
                // autorefreshtime = "0";
                $interval.cancel(autoref);
                notie.alert(3, "Auto Refresh Stopped");
            }   
        }
       
        $scope.dcmautorefresh = function(){
            autoref = $interval(function(){
                if(loadfirstdate == 1){
                    $scope.getovaralldashdetfn();
                }else{
                    $scope.getovaralldashdetfn();
                    $scope.geteventdetfn(1);
                }
            }, autorefreshtime)
        };

        var dereg = $rootScope.$on('$locationChangeSuccess', function() {
            console.log("Function Stopped")
            $interval.cancel(autoref);
            dereg();
        });

        $rootScope.$on('monitoringTabChange', function(event, args) {
            if (args["tabname"] == "DCM Dashboard") {
                if (!bpageloaded) {
                    bpageloaded = true;
                    $scope.init_event();
                    $scope.getconfignamefn();
                }
            }
        });

    }
]);