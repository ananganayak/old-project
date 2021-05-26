angular.module('widgets').controller('dashboardServiceVisualController', [
    '$scope',
    '$rootScope',
    '$location',
    '$timeout',
    'dashboardServiceVisualService',
    function ($scope, $rootScope, $location, $timeout, dashboardServiceVisualService) {
        'use strict';

        var bpageloaded = false;

        function draw_tree_chart(ele_id, data_arr) {
            var myChart = echarts.init(document.getElementById(ele_id));
            var option = null;
            //myChart.showLoading();

            myChart.setOption(option = {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                series: [
                    {
                        type: 'tree',

                        data: [data_arr],

                        top: '1%',
                        left: '7%',
                        bottom: '1%',
                        right: '20%',

                        symbolSize: 7,

                        label: {
                            normal: {
                                position: 'left',
                                verticalAlign: 'middle',
                                align: 'right',
                                fontSize: 16
                            }
                        },

                        leaves: {
                            label: {
                                normal: {
                                    position: 'right',
                                    verticalAlign: 'middle',
                                    align: 'left'
                                }
                            }
                        },

                        expandAndCollapse: true,
                        animationDuration: 550,
                        animationDurationUpdate: 750
                    }
                ]
            });

        }

        function load_chart_data() {
            $rootScope.showSpinner = true;
            dashboardServiceVisualService.load_marstree().then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    //console.log(res);
                    if (res.result == "success") {
                        var dataarr = res.data; 
                        draw_tree_chart("servicevisualchart", dataarr);
                    }
                }
            });
        }

        $rootScope.$on('DashboardTabChange', function (event, args) {
            if (args["tabname"] == "Service Visualization") {
                if (!bpageloaded) {
                    bpageloaded = true;
                    
                    var iechartwidth = $(".tab-content").width() - 30;
                    var iechartheight = $(window).height() - 150;
                    $("#servicevisualchart").css({
                        "width": iechartwidth + "px",
                        "height" : iechartheight + "px"
                    });
                    //draw_tree_chart("servicevisualchart", data);
                    
                    load_chart_data();
                }
            }
        });

    }
]);