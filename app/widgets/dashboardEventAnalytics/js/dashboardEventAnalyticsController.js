angular.module('widgets').controller('dashboardEventAnalyticsController', [
    '$scope',
    '$rootScope',
    'dashboardEventAnalyticsService',
    function($scope, $rootScope, dashboardEventAnalyticsService) {
        'use strict';

        var bpageloaded = false;

        $scope.filter = "all";
        $scope.smorefilter = "0";

        var color_arr = ["#ef5350", "#e9ab2e", "#398bf7", "#01c0c8", "#00c292"];

        var calendar;

        $scope.eventStartdate;
        $scope.eventEnddate;

        var imaxdonutheight = 0;

        $scope.currentWeekNO;
        $scope.currentAlertWeekNO;

        $scope.totalWeekNo;

        $scope.noPrevious = function() {
            return $scope.currentWeekNO === 1;
        };

        $scope.noNext = function() {
            return $scope.currentWeekNO === $scope.totalWeekNo;
        };

        $scope.noAlertPrevious = function() {
            return $scope.currentAlertWeekNO === 1;
        };

        $scope.noAlertNext = function() {
            return $scope.currentAlertWeekNO === $scope.totalWeekNo;
        };

        $scope.selectPage = function(page) {
            if ($scope.currentWeekNO !== page && page > 0 && page <= $scope.totalWeekNo) {
                $scope.currentWeekNO = page;
                dashboardEventAnalyticsService.weeklyheatmap(page).then(function(res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        var res_arr = res.data;
                        $scope.eventheatmaptitle = res_arr["WeekNumber"];
                        draw_head_map("event_heatmap", res_arr["EventCoords"]);
                    }
                });
                $scope.$apply();
            }
        };

        $scope.selectAlertPage = function(page) {
            if ($scope.currentAlertWeekNO !== page && page > 0 && page <= $scope.totalWeekNo) {
                $scope.currentAlertWeekNO = page;
                dashboardEventAnalyticsService.weeklyheatmap(page).then(function(res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        var res_arr = res.data;
                        $scope.alertheatmaptitle = res_arr["WeekNumber"];
                        draw_head_map("alert_heatmap", res_arr["AlertCoords"]);
                    }
                });
                $scope.$apply();
            }
        };


        function draw_head_map(ele_id, data) {
            var myChart = echarts.init(document.getElementById(ele_id));
            var tool_tip_name = "Event count";
            if (ele_id == "alert_heatmap") {
                tool_tip_name = "Alert count";
            }

            var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
                '7a', '8a', '9a', '10a', '11a',
                '12p', '1p', '2p', '3p', '4p', '5p',
                '6p', '7p', '8p', '9p', '10p', '11p'];

            var days = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'];

            //var data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]];

            data = data.map(function(item) {
                return [item[1], item[0], item[2] || '-'];
            });

            var option = {
                tooltip: {
                    position: 'top'
                },
                animation: false,
                grid: {
                    top: "-5px",
                    height: '70%'
                },
                xAxis: {
                    type: 'category',
                    data: hours,
                    splitArea: {
                        show: true
                    }
                },
                yAxis: {
                    type: 'category',
                    data: days,
                    splitArea: {
                        show: true
                    }
                },
                visualMap: {
                    min: 0,
                    max: 10,
                    calculable: true,
                    orient: 'horizontal',
                    left: 'center',
                    bottom: '0px'
                },
                series: [{
                        name: tool_tip_name,
                        type: 'heatmap',
                        data: data,
                        label: {
                            normal: {
                                show: true
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
            };


            myChart.setOption(option);
        }

        function load_event_summary() {
            $rootScope.showSpinner = true;
            var data_arr = {
                "filter": $scope.filter,
                "more_filter": $scope.smorefilter
            };
            dashboardEventAnalyticsService.suppresionPerc(data_arr).then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        var arr_res = res.data;
                        $(".suppressed_total").text(arr_res.total);
                        //$(".suppressed_percent").text(arr_res.suppressed_percent);
                        $(".suppressed_percent").text(arr_res.suppressed_count);
                        $(".dropped_percent").text(arr_res.dropped_count); 
                        //$(".suppressed_rate").text(arr_res.suppressed_count + " %");
                        $(".suppressed_rate").text(arr_res.suppressed_percent + " %");
                        $(".dropped_rate").text(arr_res.dropped_percent + " %");
                    }
                }
            });

        }

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
                    bottom: 10,
                    left: 'center',
                    data: res_arr.lable
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


        function draw_bar_chart(ele_id, data_arr) {
            console.log(data_arr);
            var myChart = echarts.init(document.getElementById(ele_id));

            var posList = [
                'left', 'right', 'top', 'bottom',
                'inside',
                'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
                'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
            ];

            var app = {};

            app.configParameters = {
                rotate: {
                    min: -90,
                    max: 90
                },
                align: {
                    options: {
                        left: 'left',
                        center: 'center',
                        right: 'right'
                    }
                },
                verticalAlign: {
                    options: {
                        top: 'top',
                        middle: 'middle',
                        bottom: 'bottom'
                    }
                },
                position: {
                    options: echarts.util.reduce(posList, function(map, pos) {
                        map[pos] = pos;
                        return map;
                    }, {})
                },
                distance: {
                    min: 0,
                    max: 100
                }
            };

            app.config = {
                rotate: 90,
                align: 'left',
                verticalAlign: 'middle',
                position: 'insideBottom',
                distance: 15,
                onChange: function() {
                    var labelOption = {
                        normal: {
                            rotate: app.config.rotate,
                            align: app.config.align,
                            verticalAlign: app.config.verticalAlign,
                            position: app.config.position,
                            distance: app.config.distance
                        }
                    };
                    myChart.setOption({
                        series: [{
                                label: labelOption
                            }, {
                                label: labelOption
                            }, {
                                label: labelOption
                            }, {
                                label: labelOption
                            }]
                    });
                }
            };


            var labelOption = {
                normal: {
                    show: true,
                    position: app.config.position,
                    distance: app.config.distance,
                    align: app.config.align,
                    verticalAlign: app.config.verticalAlign,
                    rotate: app.config.rotate,
                    formatter: '{c}  {name|{a}}',
                    fontSize: 14,
                    rich: {
                    },
                    color: "black",
                    fontFamily: "Open Sans"
                }
            };

            var option = {
                color: ['#ef5350', '#e9ab2e'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    }
                },
                grid: {
                    top: "15%",
                    height: '70%'
                },
                legend: {
                    data: ['Critical', 'warning']
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {show: false},
                        data: data_arr.date
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Critical',
                        type: 'bar',
                        barGap: 0,
                        label: labelOption,
                        data: data_arr.critical
                    },
                    {
                        name: 'warning',
                        type: 'bar',
                        label: labelOption,
                        data: data_arr.warning
                    }
                ]
            };

            myChart.setOption(option);
        }


        function load_event_donut() {
            var data_arr = {
                "filter": $scope.filter,
                "more_filter": $scope.smorefilter
            };
            dashboardEventAnalyticsService.top5ci(data_arr).then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    if (res.result == "success") {
                        $(".donut_alert_no_resord").hide();
                        $(".donut_alert_content").show();
                        draw_donut("donuteventalert", res.data);
                    }
                    else {
                        $(".donut_alert_content").hide();
                        $(".donut_alert_no_resord").show();
                    }
                }
            });
            dashboardEventAnalyticsService.top3alertcomponent(data_arr).then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    if (res.result == "success") {
                        $(".donut_event_no_resord").hide();
                        $(".donut_event_content").show();
                        draw_donut("donuteventevent", res.data);
                    }
                    else {
                        $(".donut_event_content").hide();
                        $(".donut_event_no_resord").show();
                    }
                }
            });
            dashboardEventAnalyticsService.alertbyseverity(data_arr).then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    if (res.result == "success") {
                        $(".donut_severity_no_resord").hide();
                        $(".donut_severity_content").show();
                        draw_donut("donuteventseverity", res.data);
                    }
                    else {
                        $(".donut_severity_content").hide();
                        $(".donut_severity_no_resord").show();
                    }
                }
            });

            //console.log(imaxdonutheight);
            //$(".event_donut_container > .col-md-4").css({"height": imaxdonutheight + "px"});
        }

        function load_event_heatmap() {
            $rootScope.showSpinner = true;
            dashboardEventAnalyticsService.weeklyheatmap("").then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        var res_arr = res.data;
                        $(".heatmap1_norecord,.heatmap2_norecord").hide();
                        $("#heatmap1,#heatmap2").show();
                        //console.log(res_arr);
                        $scope.eventheatmaptitle = res_arr["WeekNumber"];
                        $scope.alertheatmaptitle = res_arr["WeekNumber"];
                        draw_head_map("event_heatmap", res_arr["EventCoords"]);
                        draw_head_map("alert_heatmap", res_arr["AlertCoords"]);
                    } else {
                        $("#heatmap1,#heatmap2").hide();
                        $(".heatmap1_norecord,.heatmap2_norecord").show();
                    }
                }
            });
        }

        function load_evet_barchart() {
            $rootScope.showSpinner = true;
            dashboardEventAnalyticsService.alertseveritytrend().then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    //console.log("res" + res);
                    //console.log(res);
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        $(".alertseveritytrend_norecord").hide();
                        $("#alertseveritytrend").show();
                        draw_bar_chart("alertseveritytrend", res);
                    } else {
                        $("#alertseveritytrend").hide();
                        $(".alertseveritytrend_norecord").show();
                    }
                }
            });
        }

        function load_chart_data() {
            load_event_summary();
            load_event_donut();
            load_event_heatmap();
            load_evet_barchart();
        }

        /*function date_range_filter() {
            if ($scope.eventStartdate && $scope.eventEnddate) {
                // console.log(Date.parse($scope.eventStartdate).toString("dd_MMM_yyyy"));
                var sfilterdate = Date.parse($scope.eventStartdate).toString("dd_MMM_yyyy") + "__" +
                        Date.parse($scope.eventEnddate).toString("dd_MMM_yyyy");
                $scope.smorefilter = sfilterdate;
                load_chart_data();
            }
        }*/

        function init_event() {

            $(".event_filter_panel .btn").click(function() {
                var sfiltername = $(this).attr("data-val");
                if ($scope.filter != sfiltername) {
                    $(".event_filter_panel .btn").removeClass("btn-info");
                    $(this).addClass("btn-info");
                    $scope.filter = sfiltername;
                    if (sfiltername == "date_range") {
                        //$(".date_range_panel").show();
                    } else {
                        //$(".date_range_panel").hide();
                        $scope.smorefilter = "0";
                        load_chart_data();
                    }
                }
                return false;
            });

            /*$('#txteventstartdate,#txteventenddate').pickadate({
                format: 'dd-mmm-yyyy',
                formatSubmit: 'yyyy-mm-dd',
                selectMonths: true,
                selectYears: 100,
                clear: '',
                today: '',
                max: new Date(),
                onClose: function() {
                    date_range_filter();
                }
            });*/

            //$('[data-toggle="tooltip"]').tooltip();
            
            $('.event_filter_panel .date_range').daterangepicker({
                "showDropdowns": true,
                opens: 'left',
                linkedCalendars: false
            });
            
            $('.event_filter_panel .date_range').on('apply.daterangepicker', function(ev, picker) {
                var startdate = picker.startDate.format('DD-MMM-YYYY');
                var enddate = picker.endDate.format('DD-MMM-YYYY');
                var sfilterdate = startdate.toUpperCase() + "__" + enddate.toUpperCase();
                console.log(sfilterdate);
                $scope.smorefilter = sfilterdate;
                load_chart_data();
            });

        }

        $rootScope.$on('DashboardTabChange', function(event, args) {
            if (args["tabname"] == "Event Analytics") {
                if (!bpageloaded) {
                    bpageloaded = true;
                    //$('.donut').peity('donut');

                    var sweekno = intelliapp.utils.getWeek(new Date());
                    $scope.currentWeekNO = sweekno;
                    $scope.currentAlertWeekNO = sweekno;
                    $scope.totalWeekNo = sweekno;


                    var iechartwidth = $(".tab-content").width() - 30;
                    $("#heatmap1,#heatmap2,#areachart2").css({"width": iechartwidth + "px"});

                    //draw_heatmap("heatmap1");
                    //draw_heatmap("heatmap2");

                    //draw_area("areachart2");
                    init_event();
                    load_chart_data();

                    //console.log(imaxdonutheight);
                    //$(".event_donut_container > .panel-body").css({"height": imaxdonutheight + "px"});
                    /*var arr_height = [];
                     $(".event_donut_container > .col-md-4").each(function(inx,ele) {
                     var stempheight = $(ele).height();
                     arr_height.push(stempheight);                      
                     });
                     console.log(arr_height);
                     var imax_height = Math.max.apply(null, arr_height);
                     $(".event_donut_container > .col-md-4").css({"height": imax_height + "px"});*/
                }
            }
        });

    }
]);