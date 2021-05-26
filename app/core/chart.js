angular.module("chart_template", []).run(["$templateCache", function ($templateCache) {
        $templateCache.put("chart_bar",
                '<div class="bar_chart_container chart_panel_container">' +
                '<div class="chart_panel" style="width:100%;height:100%;"></div>' +
                '</div>');

        $templateCache.put("chart_line",
                '<div class="line_chart_container chart_panel_container">' +
                '<div class="chart_panel" style="width:100%;height:100%;"></div>' +
                '</div>');

        $templateCache.put("chart_donut",
                '<div class="donut_chart_container chart_panel_container">' +
                '<div class="chart_panel" style="width:100%;height:100%;"></div>' +
                '</div>');
        $templateCache.put("chart_label",
                '<div class="label_chart_container chart_panel_container">' +
                '<div><p class="chart_label_count"></p></div>' +
                '</div>');
        $templateCache.put("chart_iframe",
                '<div class="chart_iframe_container chart_panel_container">' +
                '<iframe src="" style="width:100%;height:100%;"></iframe>' +
                '</div>');
    }]);

angular.module('ui.chart', ['chart_template']);

angular.module('ui.chart').controller('ChartController', ['$scope', '$rootScope', 'APIService', function ($scope, $rootScope, APIService) {

        var cache_ele, cache_chart;

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

        function draw_bar_chart(myChart, color_option, data_arr) {
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

            myChart.resize();
        }

        function draw_donut(myChart, data_arr) {
            var res_arr = {
                lable: [],
                data: []
            };
            $.each(data_arr, function (inx, row) {
                res_arr.lable.push(row[0]);
                res_arr.data.push({
                    "value": row[1],
                    "name": row[0]
                });
            });
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

            myChart.resize();
        }

        function draw_area(myChart, data_arr) {
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

            myChart.resize();
        }

        $scope.loadbarchart = function (ele) {
            cache_ele = $(ele[0]);
            var chart_panel = cache_ele.find(".chart_panel");

            cache_chart = echarts.init(chart_panel[0]);

            APIService.doApiCall($scope.widget.api_url, "GET", {}).then(function (res) {
                //console.log(result);
                //draw_bar_chart(myChart,result.data);

                var res_arr = {
                    xaxis: [],
                    series: []
                };
                $.each(res.data, function (inx, row) {
                    var stempcolname = color_obj[row[0]] || "#66CEB4";
                    res_arr.xaxis.push(row[0]);
                    res_arr.series.push({
                        value: row[1],
                        itemStyle: {
                            color: stempcolname
                        }
                    });
                });
                draw_bar_chart(cache_chart, '#66CEB4', res_arr);

            });
        };

        $scope.loaddonutchart = function (ele) {
            cache_ele = $(ele[0]);

            console.log(cache_ele.closest("li").height());


            var chart_panel = cache_ele.find(".chart_panel");

            cache_chart = echarts.init(chart_panel[0]);
            APIService.doApiCall($scope.widget.api_url, "GET", {}).then(function (res) {
                //console.log(res.data);
                draw_donut(cache_chart, res.data);
            });
        };

        $scope.loadlinechart = function (ele) {
            cache_ele = $(ele[0]);
            var chart_panel = cache_ele.find(".chart_panel");
            cache_chart = echarts.init(chart_panel[0]);
            APIService.doApiCall($scope.widget.api_url, "GET", {}).then(function (res) {
                draw_area(cache_chart, res.data);
            });
        };

        $scope.loadlabelchart = function (ele) {
            cache_ele = $(ele[0]);
            var chart_label = cache_ele.find(".chart_label_count");
            var surl = $scope.widget.api_url + $scope.widget.label_count;
            //console.log(surl);
            APIService.doApiCall(surl, "GET", {}).then(function (res) {
               var slabelkey = $scope.widget.label_count.replace(/_/g," ");
               console.log(slabelkey);
               var slabelcount =  res.data[slabelkey];
               //console.log(slabelcount);
               chart_label.text(slabelcount);
            });
        };
        
        $scope.loadiframechart = function (ele) {
            console.log("loadiframechart");
            cache_ele = $(ele[0]);
            var chart_iframe = cache_ele.find(".chart_iframe_container");
            console.log($scope.widget.api_url);
            chart_iframe.find("iframe").attr("src",$scope.widget.api_url);
        }

        $rootScope.$on("chart_refresh", function (event, args) {
            if (args.chartname == $scope.widget.name && args.dashboardname == $scope.dashboardname) {
                if (cache_chart) {
                    cache_chart.resize();
                }
            }
        });

    }]);

angular.module('ui.chart').directive('chartBar', function () {
    'use strict';
    return {
        restrict: 'E',
        replace: false,
        scope: {
            dashboardname: '@',
            widget: '='
        },
        templateUrl: 'chart_bar',
        controller: 'ChartController',
        link: function (scope, element, attrs, ctrls) {
            scope.loadbarchart(element);
        }
    };
});

angular.module('ui.chart').directive('chartLine', function () {
    'use strict';
    return {
        restrict: 'E',
        replace: false,
        scope: {
            dashboardname: '@',
            widget: '='
        },
        templateUrl: 'chart_line',
        controller: 'ChartController',
        link: function (scope, element, attrs, ctrls) {
            scope.loadlinechart(element);
        }
    };
});

angular.module('ui.chart').directive('chartDonut', function () {
    'use strict';
    return {
        restrict: 'E',
        replace: false,
        scope: {
            dashboardname: '@',
            widget: '='
        },
        templateUrl: 'chart_donut',
        controller: 'ChartController',
        link: function (scope, element, attrs, ctrls) {
            scope.loaddonutchart(element);
        }
    };
});

angular.module('ui.chart').directive('chartLabel', function () {
    'use strict';
    return {
        restrict: 'E',
        replace: false,
        scope: {
            dashboardname: '@',
            widget: '='
        },
        templateUrl: 'chart_label',
        controller: 'ChartController',
        link: function (scope, element, attrs, ctrls) {
            scope.loadlabelchart(element);
        }
    };
});

angular.module('ui.chart').directive('chartIframe', function () {
    'use strict';
    return {
        restrict: 'E',
        replace: false,
        scope: {
            dashboardname: '@',
            widget: '='
        },
        templateUrl: 'chart_iframe',
        controller: 'ChartController',
        link: function (scope, element, attrs, ctrls) {
            scope.loadiframechart(element);
        }
    };
});