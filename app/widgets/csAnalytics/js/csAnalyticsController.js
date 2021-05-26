angular.module('widgets').controller('csAnalyticsController', [
    '$scope',
    '$rootScope',
    '$interval',
    '$timeout',
    '$sce',
    'intellimonitoringAnalyticsService',
    function($scope, $rootScope, $interval, $timeout, $sce, $intellimonitoringAnalyticsService ) {
        'use strict';


        //Get Hypervisor Details
        $scope.getautoscaleDetFn = function(){
            $rootScope.showSpinner = true;
            $intellimonitoringAnalyticsService.getautoscaleallval().then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        $scope.aslist = res.data.slice(1);
                        console.log($scope.aslist, "autoscale list");
                        $rootScope.showSpinner = false;
                    } else {
                        notie.alert(3, res.data, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }
                }
            });
        }

        // Chart function
        function draw_barchart1(ele_id, dataset, name) {
            Pace.restart();  
            var dataseries = [];
            var dataname = [];
            var datadete = [];
            
            
            for (var [key, value] of Object.entries(dataset)) {
                
                dataname.push(key);
                var datas = [];
                for (var i = 0; i < value.length; i++) {
                    datadete.push(value[i][0]);
                    var data = value[i]
                    datas[i] = data.splice(1, 1);
                }
                datas = [].concat.apply([], datas)
                console.log(datas);
                dataseries.push(datas);
            }
            console.log(dataseries);

            datadete = datadete.filter( function( item, index, inputArray ) {
                return inputArray.indexOf(item) == index;
            });

            // console.log(datadete);
            
            // var labelOption = {
            //     show: true,
            //     position: 'insideBottom',
            //     distance: 15,
            //     align: 'left',
            //     verticalAlign: 'middle',
            //     rotate: 90,
            //     formatter: '{a} - ( {c} )',
            //     fontSize: 10,
            //     rich: {
            //         name: {
            //             textBorderColor: '#fff'
            //         }
            //     }
            // };

            var dataserlist = [];
            var j = -1;
            for (let i = 0; i < datadete.length; i++) {
                j++
                dataserlist.push({
                    name: datadete[i],
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'top'
                    },
                    data: dataseries.map(function (item) {
                        return item[j];
                    })
                })
            }

            console.log(dataserlist);

            
            var myChart = echarts.init(document.getElementById(ele_id));
            var option = {
                title: {
                    text: "Analytics_Chart_1_"+name,
                    textStyle: {
                        fontSize: 14
                    },
                },
                color: ['#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#00bcd4', '#4caf50', '#cddc39'],
                toolbox:{
                    show: true,
                    feature : {
                        saveAsImage: {show: true, title:"PDF"},
                    }
                },
                legend: {
                    data: datadete,
                    bottom: 20,
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
                    }
                },
                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '15%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: dataname
                },
                yAxis: {
                    name : "%",
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                series: dataserlist
            };
            myChart.setOption(option, true);
        }
      

        function draw_barchart2(ele_id, dataset, name) {
            Pace.restart(); 

            var data = dataset.slice(1)

            var dta = dataset[0];
            var datanames = dta.slice(1);
            
            var myChart = echarts.init(document.getElementById(ele_id));
            var option = {
                title: {
                    text: "Analytics_Chart_2_"+name,
                    textStyle: {
                        fontSize: 14
                    },
                },
                legend: {
                    data: datanames,
                    bottom: 20,
                    left: 'center'
                },
                toolbox:{
                    show: true,
                    feature : {
                        saveAsImage: {show: true, title:"PDF"},
                    }
                },
                color: ['#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#00bcd4', '#4caf50', '#cddc39'],
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
                    }
                },
                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '15%',
                    containLabel: true
                },
                xAxis: {
                    name : "Count",
                    type: 'category',
                    data: data.map(function (item) {
                        return item[0];
                    })
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                // series: dataseries
                series: [{
                        name: datanames[0],
                        type: 'bar',
                        // label: labelOption,
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{c}',
                        },
                        data:  data.map(function (item) {
                            return item[1];
                        })
                    },{
                        name: datanames[1],
                        type: 'bar',
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{c}',
                        },
                        data:  data.map(function (item) {
                            return item[2];
                        })
                    },{
                        name: datanames[2],
                        type: 'line',
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{c}',
                        },
                        data:  data.map(function (item) {
                            return item[3];
                        })
                    }
                ]
            };
            myChart.setOption(option, true);
        }

        $scope.init_event = function() {

            $scope.showchartdiv = false;

            $scope.closeformfn = function(){
                $scope.showchartdiv = false;
            }
            $scope.csASname;
            $scope.getChartDetFn = function(name){
                $scope.csASname = name;
                $rootScope.showSpinner = true;
                $intellimonitoringAnalyticsService.getasChartVal(name).then(function(res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                    }else{ 
                        $rootScope.showSpinner = false;
                        if (res.result == "success") {
                            $scope.asChartValue = res.data;
                            console.log($scope.asChartValue, "autoscale Chart Value");
                            $rootScope.showSpinner = false;
                            $scope.showchartdiv = true;
                            draw_barchart1("csachart1", $scope.asChartValue, name);
                        } else {
                            notie.alert(3, res.data, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }
                    }
                });

                $intellimonitoringAnalyticsService.getasChartsVal(name).then(function(res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                    }else{ 
                        $rootScope.showSpinner = false;
                        if (res.result == "success") {
                            $scope.asChartsValue = res.data;
                            console.log($scope.asChartsValue, "autoscale Chart2 Value");
                            $rootScope.showSpinner = false;
                            $scope.showchartdiv = true;
                            draw_barchart2("csachart2", $scope.asChartsValue, name);
                        } else {
                            notie.alert(3, res.data, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }
                    }
                });
            }
        
        }

        $scope.csvChartdownload = function(val){    
            if(val == 1){
                $scope.url = config.urls.csanalyticschartcsvget+ "/analytics1/"+$scope.csASname+"/xls" 
            }else{
                $scope.url = config.urls.csanalyticschartcsvget+ "/analytics2/"+$scope.csASname+"/xls" 
            }
            $rootScope.showSpinner = true;
            $intellimonitoringAnalyticsService.getasChartsCsv($scope.url).then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                }else{ 
                    if (res.result == "success") {
                        console.log(res.data);
                        const url = res.data 
                        const link = document.createElement('a'); 
                        link.href = url; 
                        link.setAttribute('download', link); 
                        document.body.appendChild(link); 
                        link.click(); 
                        $rootScope.showSpinner = false;
                    } else {
                        notie.alert(3, res.data, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }
                }
            });
        }

        $scope.csvardownload = function(){
            $scope.url = config.urls.csanalyticschartcsvget+ "audit/xls" 
            $intellimonitoringAnalyticsService.getauditreportCsv($scope.url).then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                }else{ 
                    if (res.result == "success") {
                        console.log(res.data);
                        const url = res.data 
                        const link = document.createElement('a'); 
                        link.href = url; 
                        link.setAttribute('download', link); 
                        document.body.appendChild(link); 
                        link.click(); 
                        $rootScope.showSpinner = false;
                    } else {
                        notie.alert(3, res.data, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }
                }
            });
        }

        $scope.pdfChartdownload = function(){
            // const element = document.getElementById("datatablepanel");
            // html2pdf(element);
            var HTML_Width = $("#analyticspdf").width();
            var HTML_Height = $("#analyticspdf").height();
            var top_left_margin = 15;
            var PDF_Width = HTML_Width+(top_left_margin*2);
            var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
            var canvas_image_width = HTML_Width;
            var canvas_image_height = HTML_Height;
            var d = new Date().getTime();
            var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
            html2canvas($("#analyticspdf")[0],{allowTaint:true}).then(function(canvas) {
                canvas.getContext('2d');
                var imgData = canvas.toDataURL("image/jpeg", 1.0);
                var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
                pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
                for (var i = 1; i <= totalPDFPages; i++) { 
                    pdf.addPage(PDF_Width, PDF_Height);
                    pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
                }
                pdf.save('Analytics_Chart__'+d+".pdf");
            });      
        }

        $scope.init = function() {
            $scope.init_event();
            $scope.getautoscaleDetFn();
        }

    }
])