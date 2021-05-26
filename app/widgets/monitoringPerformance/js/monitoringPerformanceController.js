angular.module('widgets').controller('monitoringPerformanceController', [
    '$scope',
    '$rootScope',
    '$interval',
    '$timeout',
    '$sce',
    'intellimonitoringPerformanceService',
    function($scope, $rootScope, $interval, $timeout, $sce, $intellimonitoringPerformanceService ) {
        'use strict';

        var bpageloaded = false;

        function draw_area(ele_id) {
            Pace.restart();
            // var res_arr = [];
            // for (var i = 0; i < data_arr.length; i++) {
            //     var stringValue = data_arr[i].Timestamp;
            //     var datetimeval = moment.utc(stringValue);
            //     res_arr.push([datetimeval.format('DD/MM/YY HH:mm'), data_arr[i].metric, data_arr[i].metric_severity]);
            // }   

            // console.log(res_arr);
            var myChart = echarts.init(document.getElementById(ele_id));
            // var myChart = echarts.init("#chartcpusage");
            
            var data1 = ['2015 Mar', '2015 Jun', '2015 Sep', '2015 Dec', '2016 Mar', '2016 Jun', '2016 Sep', '2016 Dec', '2017 Mar', '2017 Jun', '2017 Sep', '2017 Dec'];
            var option = {
                backgroundColor: '#fff',
                color: ["#D82A04", "#27AE60", "#F39C12", "#BDC3C7", "#3498DB"],
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
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : data1
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'Furniture',
                        type:'line',
                        stack: 'area',
                        areaStyle: {},
                        data:[22656.139, 28063.7496, 41957.8783, 64515.0862, 27374.0986, 27564.828, 49586.0352, 65993.2752, 24349.386, 41402.497, 52814.6322, 80334.9203, 23723.8142, 45032.103, 56283.102, 90348.25]
                    },
                    {
                        name:'Office Supplies',
                        type:'line',
                        stack: 'area',
                        areaStyle: {},
                        data:[14528.683, 31243.735, 53923.968, 52080.026, 23059.394, 32320.041, 35760.814, 46093.214, 29440.963, 34584.459, 45147.922, 74766.638, 43232.347, 45721.194, 72197.163, 84946.471]
                    },
                    {
                        name:'Technology',
                        type:'line',
                        stack: 'area',
                        areaStyle: {},
                        data:[37262.974, 27231.2750, 47751.366, 63032.618, 18418.246, 29239.318, 44912.726, 70210.519, 39446.832, 60095.345, 45824.808, 80997.195, 56188.699, 43011.075, 67771.691, 104759.346]
                    },
                ]
            };
            myChart.setOption(option);
        }
        function draw_area1(ele_id) {
            Pace.restart();
            // var res_arr = [];
            // for (var i = 0; i < data_arr.length; i++) {
            //     var stringValue = data_arr[i].Timestamp;
            //     var datetimeval = moment.utc(stringValue);
            //     res_arr.push([datetimeval.format('DD/MM/YY HH:mm'), data_arr[i].metric, data_arr[i].metric_severity]);
            // }   

            // console.log(res_arr);
            var myChart = echarts.init(document.getElementById(ele_id));
            // var myChart = echarts.init("#chartcpusage");
            
            var data1 = ['2015 Mar', '2015 Jun', '2015 Sep', '2015 Dec', '2016 Mar', '2016 Jun', '2016 Sep', '2016 Dec', '2017 Mar', '2017 Jun', '2017 Sep', '2017 Dec'];
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
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : data1
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'Furniture',
                        type:'line',
                        // stack: 'area',
                        // areaStyle: {},
                        data:[22656.139, 28063.7496, 41957.8783, 64515.0862, 27374.0986, 27564.828, 49586.0352, 65993.2752, 24349.386, 41402.497, 52814.6322, 80334.9203, 23723.8142, 45032.103, 56283.102, 90348.25]
                    },
                    {
                        name:'Office Supplies',
                        type:'line',
                        // stack: 'area',
                        // areaStyle: {},
                        data:[14528.683, 31243.735, 53923.968, 52080.026, 23059.394, 32320.041, 35760.814, 46093.214, 29440.963, 34584.459, 45147.922, 74766.638, 43232.347, 45721.194, 72197.163, 84946.471]
                    },
                    {
                        name:'Technology',
                        type:'line',
                        // stack: 'area',
                        // areaStyle: {},
                        data:[37262.974, 27231.2750, 47751.366, 63032.618, 18418.246, 29239.318, 44912.726, 70210.519, 39446.832, 60095.345, 45824.808, 80997.195, 56188.699, 43011.075, 67771.691, 104759.346]
                    },
                ]
            };
            myChart.setOption(option);
        }
        function draw_area4(ele_id) {
            Pace.restart();
            // var res_arr = [];
            // for (var i = 0; i < data_arr.length; i++) {
            //     var stringValue = data_arr[i].Timestamp;
            //     var datetimeval = moment.utc(stringValue);
            //     res_arr.push([datetimeval.format('DD/MM/YY HH:mm'), data_arr[i].metric, data_arr[i].metric_severity]);
            // }   

            // console.log(res_arr);
            var myChart = echarts.init(document.getElementById(ele_id));
            // var myChart = echarts.init("#chartcpusage");
            
            var data1 = ['2015 Mar', '2015 Jun', '2015 Sep', '2015 Dec', '2016 Mar', '2016 Jun', '2016 Sep', '2016 Dec', '2017 Mar', '2017 Jun', '2017 Sep', '2017 Dec'];
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
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : data1
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'Furniture',
                        type:'line',
                        // stack: 'area',
                        // areaStyle: {},
                        data:[22656.139, 28063.7496, 41957.8783, 64515.0862, 27374.0986, 27564.828, 49586.0352, 65993.2752, 24349.386, 41402.497, 52814.6322, 80334.9203, 23723.8142, 45032.103, 56283.102, 90348.25]
                    }
                ]
            };
            myChart.setOption(option);
        }

        function draw_area2(ele_id) {
            Pace.restart();
            var myChart = echarts.init(document.getElementById(ele_id));
            
            var data1 = ['2015 Mar', '2015 Jun', '2015 Sep', '2015 Dec', '2016 Mar', '2016 Jun', '2016 Sep', '2016 Dec', '2017 Mar', '2017 Jun', '2017 Sep', '2017 Dec'];
            var option = {
                backgroundColor: '#fff',
                color: ["#D82A04", "#27AE60", "#F39C12", "#BDC3C7", "#3498DB"],
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
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : data1
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'Furniture',
                        type:'line',
                        stack: 'area',
                        areaStyle: {},
                        data:[22656.139, 28063.7496, 41957.8783, 64515.0862, 27374.0986, 27564.828, 49586.0352, 65993.2752, 24349.386, 41402.497, 52814.6322, 80334.9203, 23723.8142, 45032.103, 56283.102, 90348.25]
                    },
                    {
                        name:'Office Supplies',
                        type:'line',
                        stack: 'area',
                        areaStyle: {},
                        data:[14528.683, 31243.735, 53923.968, 52080.026, 23059.394, 32320.041, 35760.814, 46093.214, 29440.963, 34584.459, 45147.922, 74766.638, 43232.347, 45721.194, 72197.163, 84946.471]
                    },
                    {
                        name:'Technology',
                        type:'line',
                        stack: 'area',
                        areaStyle: {},
                        data:[37262.974, 27231.2750, 47751.366, 63032.618, 18418.246, 29239.318, 44912.726, 70210.519, 39446.832, 60095.345, 45824.808, 80997.195, 56188.699, 43011.075, 67771.691, 104759.346]
                    },
                ]
            };
            myChart.setOption(option);
        }

        function draw_area3(ele_id) {
            Pace.restart();
            // var res_arr = [];
            // for (var i = 0; i < data_arr.length; i++) {
            //     var stringValue = data_arr[i].Timestamp;
            //     var datetimeval = moment.utc(stringValue);
            //     res_arr.push([datetimeval.format('DD/MM/YY HH:mm'), data_arr[i].metric, data_arr[i].metric_severity]);
            // }   

            // console.log(res_arr);
            var myChart = echarts.init(document.getElementById(ele_id));
            var xAxisData = ['4th jan','4th feb', '4th mar', '4th apr','4th may','4th jun','4th jul','4th aug','4th sep','4th oct','4th nov','4th dec','4th jan','4th feb', '4th mar', '4th apr','4th may','4th jun','4th jul','4th aug','4th sep','4th oct','4th nov','4th dec','4th jan','4th feb', '4th mar', '4th apr','4th may','4th jun','4th jul','4th aug','4th sep','4th oct','4th nov','4th dec','4th jan','4th feb', '4th mar', '4th apr','4th may','4th jun','4th jul','4th aug','4th sep','4th oct','4th nov','4th dec'];
                var data1 = [-33621.45626,-43338.45926,7832.657744,-19563.00626,-24210.06426,-13263.22366,-13911.95826,-19948.88276,33918.99954,
                -16404.95826,30770.36544,21687.26924,-29684.27566,-35906.94026,-9132.099256,-13663.14276,-17726.66476,-23061.05926,-19093.02626,
                -10960.01906,16737.56674,-16453.42776,28114.21224,27061.16994,-29315.86026,-24879.53626,3857.523744,-9108.312256,9129.376744,
                -7513.817256,-8596.388256,-16742.97696,25551.67364,11829.39374,31553.61454,49140.69174,-3886.977256,-27557.21786,11014.00154,
                -11336.81516,-3597.241056,5123.374444,-2593.935256,15262.53674,40008.30074,29918.57194,70589.47374,35970.96754];

                // var chart = echarts.init(document.getElementById('main0'));

                var itemStyle = {
                    normal: {
                    },
                    emphasis: {
                        barBorderWidth: 1,
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowColor: 'rgba(0,0,0,0.5)'
                    }
                };
                var label = {
                    normal: {
                        position: 'insideLeft'
                    },
                    emphasis: {
                        position: 'insideLeft'
                    }
                };

                myChart.setOption({
                    backgroundColor: '#fff',
                    color: ["#5DADE2", "#FC73F3"],
                    // toolbox: {
                    //     feature: {
                    //         magicType: {
                    //             type: ['stack', 'tiled']
                    //         },
                    //         dataView: {}
                    //     }
                    // },
                    tooltip: {},
                    xAxis: {
                        data: xAxisData,
                        name: 'X Axis',
                        silent: false,
                        axisLine: {onZero: true},
                        splitLine: {show: false},
                        splitArea: {show: false}
                    },
                    yAxis: {
                        inverse: false,
                        splitArea: {show: false}
                    },
                    grid: {
                        left: 100
                    },
                    visualMap: {
                        show : false,
                        type: 'continuous',
                        dimension: 1,
                        text: ['High', 'Low'],
                        inverse: true,
                        itemHeight: 200,
                        calculable: true,
                        min: -2,
                        max: 6,
                        top: 60,
                        left: 10,
                        inRange: {
                            colorLightness: [0.4, 0.8]
                        },
                        outOfRange: {
                            color: '#bbbbbb'
                        },
                        controller: {
                            inRange: {
                                color: '#2f4554'
                            }
                        }
                    },
                    series: [
                        {
                            name: 'bar',
                            type: 'line',
                            smooth: true,
                            symbol : 'none',
                            sampling : 'average',
                            itemStyle: itemStyle,
                            areaStyle : {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgb(89, 168, 255)'
                                }, {
                                    offset: 1,
                                    color: 'rgb(4, 106, 188)'
                                }]) 
                            },
                            data: data1
                        },
                    ]
                });
        }

        function draw_area5(ele_id) {
            Pace.restart();
            
            var myChart = echarts.init(document.getElementById(ele_id));

            var hours = ['65+', '55-64', '45-54', '35-44', '25-34', '18-24', 'Overall',
                '65+', '55-64', '45-54', '35-44', '25-34', '18-24', 'Overall', 
                '65+', '55-64', '45-54', '35-44', '25-34', '18-24', 'Overall', 
                '65+', '55-64', '45-54'];
                var days = ['Autointelliserv010', 'Autointelliserv011', 'Autointelliserv012',
                        'Autointelliserv013', 'Autointelliserv014', 'Autointelliserv015', 'Autointelliserv016'];

                var data = [[0,0,5],[0,1,1],[0,2,0],[0,3,0],[0,4,0],[0,5,0],[0,6,0],[0,7,0],[0,8,0],[0,9,0],[0,10,0],[0,11,2],[0,12,4],[0,13,1],[0,14,1],[0,15,3],[0,16,4],[0,17,6],[0,18,4],[0,19,4],[0,20,3],[0,21,3],[0,22,2],[0,23,5],[1,0,7],[1,1,0],[1,2,0],[1,3,0],[1,4,0],[1,5,0],[1,6,0],[1,7,0],[1,8,0],[1,9,0],[1,10,5],[1,11,2],[1,12,2],[1,13,6],[1,14,9],[1,15,11],[1,16,6],[1,17,7],[1,18,8],[1,19,12],[1,20,5],[1,21,5],[1,22,7],[1,23,2],[2,0,1],[2,1,1],[2,2,0],[2,3,0],[2,4,0],[2,5,0],[2,6,0],[2,7,0],[2,8,0],[2,9,0],[2,10,3],[2,11,2],[2,12,1],[2,13,9],[2,14,8],[2,15,10],[2,16,6],[2,17,5],[2,18,5],[2,19,5],[2,20,7],[2,21,4],[2,22,2],[2,23,4],[3,0,7],[3,1,3],[3,2,0],[3,3,0],[3,4,0],[3,5,0],[3,6,0],[3,7,0],[3,8,1],[3,9,0],[3,10,5],[3,11,4],[3,12,7],[3,13,14],[3,14,13],[3,15,12],[3,16,9],[3,17,5],[3,18,5],[3,19,10],[3,20,6],[3,21,4],[3,22,4],[3,23,1],[4,0,1],[4,1,3],[4,2,0],[4,3,0],[4,4,0],[4,5,1],[4,6,0],[4,7,0],[4,8,0],[4,9,2],[4,10,4],[4,11,4],[4,12,2],[4,13,4],[4,14,4],[4,15,14],[4,16,12],[4,17,1],[4,18,8],[4,19,5],[4,20,3],[4,21,7],[4,22,3],[4,23,0],[5,0,2],[5,1,1],[5,2,0],[5,3,3],[5,4,0],[5,5,0],[5,6,0],[5,7,0],[5,8,2],[5,9,0],[5,10,4],[5,11,1],[5,12,5],[5,13,10],[5,14,5],[5,15,7],[5,16,11],[5,17,6],[5,18,0],[5,19,5],[5,20,3],[5,21,4],[5,22,2],[5,23,0],[6,0,1],[6,1,0],[6,2,0],[6,3,0],[6,4,0],[6,5,0],[6,6,0],[6,7,0],[6,8,0],[6,9,0],[6,10,1],[6,11,0],[6,12,2],[6,13,1],[6,14,3],[6,15,4],[6,16,0],[6,17,0],[6,18,0],[6,19,0],[6,20,1],[6,21,2],[6,22,2],[6,23,6]];

                // var data = [20,16.8,16.2,16,12.1,7.5,14,4.7,4.8,5.2,5.6,5.4,4.7,5,7.2,8,7.5,9.8,12.5,14.7,10,8.2,10.7,10.9,11.6,15.2,
                // 19.1,13,10.7,8.4,7.7,6.6,10.6,9.7,9,27.6,28.4,30.8,31.6,26.3,21.8,28,21.6,22.8,21.6,18.9,18,22.4,21];

                data = data.map(function (item) {
                    return [item[1], item[0], item[2] || '-'];
                });

                myChart.setOption({
                // backgroundColor: '#eee',
                color: ["#2ECC71", "#58D68D", "#82E0AA", "#ABEBC6", "#D5F5E3"],
                aria: {
                    show: true
                },
                tooltip: {
                    position: 'top'
                },
                animation: false,
                grid: {
                    height: 300
                },
                xAxis: {
                    type: 'category',
                    data: hours
                },
                yAxis: {
                    type: 'category',
                    data: days
                },
                visualMap: {
                    show:false,
                    min: 1,
                    max: 10,
                    calculable: true,
                    inRange: {
                        color: ['#239B56', '#28B463', '#2ECC71', '#58D68D', '#82E0AA', '#ABEBC6', '#D5F5E3', '#EAFAF1']
                    },
                },
                series: [{
                    name: 'Punch Card',
                    type: 'heatmap',
                    data: data,
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    // itemStyle: {
                    //     emphasis: {
                    //         shadowBlur: 10,
                    //         shadowColor: 'rgba(0, 0, 0, 0.5)'
                    //     }
                    // }
                }]
            });
        }

        $scope.init_event = function() {

        }


        $rootScope.$on('monitoringTabChange', function(event, args) {
            if (args["tabname"] == "Performance") {
                if (!bpageloaded) {
                    bpageloaded = true;
                    $scope.init_event();
                    draw_area("chartcpusage");
                    draw_area1("chartsysload");
                    draw_area4("chartdiskio");
                    draw_area2("chartmemusage");
                    draw_area3("chartnetworktraffic");
                    draw_area5("charthistogram")
                    // $scope.hostlistget();
                    
                }
            }
        });

    }
]);