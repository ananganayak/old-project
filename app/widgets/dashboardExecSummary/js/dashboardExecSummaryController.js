angular.module('widgets').controller('dashboardExecSummaryController', [
    '$scope',
    '$rootScope',
    '$location',
    '$timeout',
    'dashboardExecSummaryService',
    function($scope, $rootScope, $location, $timeout, dashboardExecSummaryService) {
        'use strict';

        $scope.filter = "all";
        $scope.smorefilter = "0";

        var color_arr = ["#ef5350", "#e9ab2e", "#398bf7", "#01c0c8", "#00c292"];
        var color_obj = {
            "critical": "#FF0000",
            "warning": "#FFA500",
            "completed": "#008000",
            "unknown": "#20B2AA",
            "Remediation": "#398bf7",
            "Diagnosis": "#01c0c8",
            "Aborted": "#ef5350",
            "Active": "#00c292",
            "Pending": "#01c0c8",
        };

        $scope.execstartdate;
        $scope.execenddate;

        var imaxdonutheight = 0;
        var imaxdonutheighttwo = 0;

        function draw_bar_chart(ele_id, color_option, data_arr) {
            var myChart = echarts.init(document.getElementById(ele_id));
            var option = {
                color: [color_option],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    top: "3%",
                    left: '3%',
                    right: '3%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: data_arr.xaxis,
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel: {
                            fontSize: 10
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '',
                        type: 'bar',
                        barWidth: '20%',
                        data: data_arr.series
                    }
                ]
            };
            myChart.setOption(option);
        }

        function draw_area(ele_id, data_arr) {
            var myChart = echarts.init(document.getElementById(ele_id));
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data: ['Event', 'Alert']
                },
                color: ['#C1CB50', '#66DABE'],
                grid: {
                    top: '15%',
                    left: '1%',
                    right: '1%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: data_arr["x-axis"],
                    axisLabel: {
                        fontSize: 10,
                        rotate: 90
                    }
                },
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Event',
                        type: 'line',
                        areaStyle: {normal: {}},
                        data: data_arr["event"],
                        smooth: true
                    },
                    {
                        name: 'Alert',
                        type: 'line',
                        areaStyle: {normal: {}},
                        data: data_arr["alert"],
                        smooth: true
                    },
                ]
            };
            myChart.setOption(option);
        }

        /*function draw_donut(ele_id, data_arr) {
         var data_color_arr = [];
         var data_val_arr = [];
         var cache_ele = $("." + ele_id);
         cache_ele.find(".list-inline li").remove();
         for (var i = 0; i < data_arr.length; i++) {
         var row = data_arr[i];
         
         var template_str = '<li class="flexbox mb-5">';
         template_str += '<div>';
         template_str += '<span class="badge badge-dot badge-lg mr-1 bg-color-' + (i + 1) + '"></span>';
         template_str += '<span>' + row[0] + '</span>';
         template_str += '</div>';
         template_str += '<div>' + row[1] + '</div>';
         template_str += '</li>';
         
         cache_ele.find(".list-inline").append(template_str);
         
         data_color_arr.push(color_arr[i]);
         data_val_arr.push(row[1]);
         }
         
         var data_donut_color = {
         "fill": data_color_arr,
         "radius": 78,
         "innerRadius": 58
         };
         cache_ele.find(".donut").attr("data-peity", JSON.stringify(data_donut_color));
         cache_ele.find(".donut").text(data_val_arr.join(","));
         
         cache_ele.find(".donut").peity('donut');
         
         var tempheight = $(".executive_donut_container_one ." + ele_id).height();
         if (imaxdonutheight < tempheight) {
         imaxdonutheight = tempheight + 38;
         $(".executive_donut_container_one .panel-body").css({"height": imaxdonutheight + "px"});
         }
         
         var tempheight2 = $(".executive_donut_container_two ." + ele_id).height();
         if (imaxdonutheighttwo < tempheight2) {
         imaxdonutheighttwo = tempheight2;
         $(".executive_donut_container_two .panel-body").css({"height": imaxdonutheighttwo + "px"});
         }
         }*/

        function draw_donut(ele_id, data_arr) {
            var res_arr = {
                lable: [],
                data: []
            };
            $.each(data_arr, function(inx, row) {
                res_arr.lable.push(row[0]);
                res_arr.data.push({
                    "value": row[1],
                    "name": row[0]
                });
            });
            var myChart = echarts.init(document.getElementById(ele_id));
            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)"
                },
                legend: {
                    bottom: 20,
                    left: 'center',
                    data: res_arr.lable
                },
                grid: {
                    top: 10
                },
                color: ["#ef5350", "#e9ab2e", "#398bf7", "#01c0c8", "#00c292"],
                animation: false,
                series: [
                    {
                        type: 'pie',
                        radius: ['60%', '70%'],
                        center: ['50%', '38%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '12',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: res_arr.data
                    }
                ]
            };
            myChart.setOption(option);
        }

        function load_executive_summary() {
            $rootScope.showSpinner = true;
            var data_arr = {
                "filter": $scope.filter,
                "more_filter": $scope.smorefilter
            };
            dashboardExecSummaryService.executiveheaders(data_arr).then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        var arr_res = res.data;
                        $(".events_total").text(arr_res.Total_Events);
                        $(".alerts_total").text(arr_res.Total_Alerts);
                        $(".tickets_total").text(arr_res.Total_Tickets);
                        $(".automation_total").text(arr_res.Total_Automations);
                    }
                }
            });
        }

        function load_executive_bar() {
            var data_arr = {
                "filter": $scope.filter,
                "more_filter": $scope.smorefilter
            };
            dashboardExecSummaryService.alertseveritybc(data_arr).then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    if (res.result == "success") {
                        $(".barchart1_no_resord").hide();
                        $("#barchart1").show();
                        var res_arr = {
                            xaxis: [],
                            series: []
                        };
                        $.each(res.data, function(inx, row) {
                            var stempcolname = color_obj[row[0]] || "#66CEB4";
                            res_arr.xaxis.push(row[0]);
                            res_arr.series.push({
                                value: row[1],
                                itemStyle: {
                                    color: stempcolname
                                }
                            });
                        });
                        draw_bar_chart("barchart1", '#66CEB4', res_arr);
                    } else {
                        $("#barchart1").hide();
                        $(".barchart1_no_resord").show();
                    }
                }
            });
            dashboardExecSummaryService.automationtypebc(data_arr).then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    if (res.result == "success") {
                        $(".barchart2_no_resord").hide();
                        $("#barchart2").show();
                        var res_arr = {
                            xaxis: [],
                            series: []
                        };
                        $.each(res.data, function(inx, row) {
                            var stempcolname = color_obj[row[0]] || "#BB98FB";
                            res_arr.xaxis.push(row[0]);
                            res_arr.series.push({
                                value: row[1],
                                itemStyle: {
                                    color: stempcolname
                                }
                            });
                        });
                        draw_bar_chart("barchart2", '#BB98FB', res_arr);
                    } else {
                        $("#barchart2").hide();
                        $(".barchart2_no_resord").show();
                    }
                }
            });
            dashboardExecSummaryService.workflowstatusbc(data_arr).then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    if (res.result == "success") {
                        $(".barchart3_no_resord").hide();
                        $("#barchart3").show();
                        var res_arr = {
                            xaxis: [],
                            series: []
                        };
                        $.each(res.data, function(inx, row) {
                            var stempcolname = color_obj[row[0]] || "#FFAF97";
                            res_arr.xaxis.push(row[0]);
                            res_arr.series.push({
                                value: row[1],
                                itemStyle: {
                                    color: stempcolname
                                }
                            });
                        });
                        draw_bar_chart("barchart3", '#FFAF97', res_arr);
                    } else {
                        $("#barchart3").hide();
                        $(".barchart3_no_resord").show();
                    }
                }
            });
        }

        function load_executive_donut() {
            var data_arr = {
                "filter": $scope.filter,
                "more_filter": $scope.smorefilter
            };
            $.fn.peity.defaults.donut = {
                width: 132,
                height: 132
            };
            dashboardExecSummaryService.alertstatus(data_arr).then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    if (res.result == "success") {
                        $(".executive_alert_no_resord").hide();
                        $(".executive_alert_content").show();
                        draw_donut("donutexecalert", res.data);
                    }
                    else {
                        $(".executive_alert_content").hide();
                        $(".executive_alert_no_resord").show();
                    }
                }
            });
            dashboardExecSummaryService.automationstatus(data_arr).then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    if (res.result == "success") {
                        $(".executive_automation_no_resord").hide();
                        $(".executive_automation_content").show();
                        draw_donut("donutexecautomation", res.data);
                    }
                    else {
                        $(".executive_automation_content").hide();
                        $(".executive_automation_no_resord").show();
                    }
                }
            });
            dashboardExecSummaryService.ticketstatus(data_arr).then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    if (res.result == "success") {
                        $(".executive_ticket_no_resord").hide();
                        $(".executive_ticket_content").show();
                        draw_donut("donutexectickets", res.data);
                    }
                    else {
                        $(".executive_ticket_content").hide();
                        $(".executive_ticket_no_resord").show();
                    }
                }
            });
            dashboardExecSummaryService.top5component(data_arr).then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    if (res.result == "success") {
                        $(".executive_top5component_no_resord").hide();
                        $(".executive_top5component_content").show();
                        draw_donut("donutexectop5component", res.data);
                    }
                    else {
                        $(".executive_top5component_content").hide();
                        $(".executive_top5component_no_resord").show();
                    }
                }
            });
            dashboardExecSummaryService.top5automation(data_arr).then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    if (res.result == "success") {
                        $(".executive_top5automation_no_resord").hide();
                        $(".executive_top5automation_content").show();
                        draw_donut("donutexectop5automation", res.data);
                    }
                    else {
                        $(".executive_top5automation_content").hide();
                        $(".executive_top5automation_no_resord").show();
                    }
                }
            });
        }

        function load_executive_areachart() {
            var data_arr = {
                "filter": $scope.filter,
                "more_filter": $scope.smorefilter
            };
            dashboardExecSummaryService.suppression30days(data_arr).then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    if (res.result == "success") {
                        $(".executive_suppression_no_resord").hide();
                        $(".executive_suppression_content").show();
                        draw_area("areachart1", res.data);
                    }
                    else {
                        $(".executive_suppression_content").hide();
                        $(".executive_suppression_no_resord").show();
                    }
                }
            });
        }

        function load_chart_data() {
            load_executive_summary();
            load_executive_bar();
            load_executive_donut();
            load_executive_areachart();
        }

        /*function date_range_filter() {
         if ($("#txtexecutivestartdate").val() && $("#txtexecutiveenddate").val()) {
         var sfilterdate = Date.parse($("#txtexecutivestartdate").val()).toString("dd_MMM_yyyy") + "__" +
         Date.parse($("#txtexecutiveenddate").val()).toString("dd_MMM_yyyy");
         $scope.smorefilter = sfilterdate;
         load_chart_data();
         }
         }*/

        function init_event() {

            $(".executive_filter_panel .btn").click(function() {
                var sfiltername = $(this).attr("data-val");
                if ($scope.filter != sfiltername) {
                    $(".executive_filter_panel .btn").removeClass("btn-info");
                    $(this).addClass("btn-info");
                    $scope.filter = sfiltername;
                    if (sfiltername == "date_range") {
                        //$(".executive_range_panel").show();
                    } else {
                        //$(".executive_range_panel").hide();
                        $scope.smorefilter = "0";
                        load_chart_data();
                    }
                }
                return false;
            });

            $('.executive_filter_panel .date_range').daterangepicker({
                "showDropdowns": true,
                opens: 'left',
                linkedCalendars: false
            });

            $('.executive_filter_panel .date_range').on('apply.daterangepicker', function(ev, picker) {
                var startdate = picker.startDate.format('DD-MMM-YYYY');
                var enddate = picker.endDate.format('DD-MMM-YYYY');
                var sfilterdate = startdate.toUpperCase() + "__" + enddate.toUpperCase();
                console.log(sfilterdate);
                $scope.smorefilter = sfilterdate;
                load_chart_data();
            });

            /*$('#txtexecutivestartdate').pickadate({
             format: 'dd-mmm-yyyy',
             formatSubmit: 'yyyy-mm-dd',
             selectMonths: true,
             selectYears: 100,
             clear: '',
             today: '',
             max: new Date(),
             onClose: function() {
             console.log($scope.execstartdate);
             console.log($scope.execenddate);
             date_range_filter();
             }
             });*/

            /*$('#txtexecutiveenddate').pickadate({
             format: 'dd-mmm-yyyy',
             formatSubmit: 'yyyy-mm-dd',
             selectMonths: true,
             selectYears: 100,
             clear: '',
             today: '',
             max: new Date(),
             onClose: function() {
             console.log($scope.execstartdate);
             console.log($scope.execenddate);
             date_range_filter();
             }
             });*/

        }

        $scope.init = function() {

            /*draw_bar_chart("barchart2", '#66CEB4');
             draw_bar_chart("barchart3", '#BB98FB');
             draw_bar_chart("barchart1", '#FFAF97');
             
             $('.donut').peity('donut');
             
             draw_area("areachart1");*/

            init_event();
            load_chart_data();

        }

    }
]);