angular.module('pages').controller('reportPerformanceController', [
    '$scope',
    '$timeout',
    '$rootScope',
    'intellireportPerformanceService',
    function ($scope, $timeout, $rootScope, $intellireportPerformanceService) {

        var bpageloaded = false;
        
        $scope.getbandwidthval = [];

        $scope.bandwidthchartdiv = false;

        var userid = sessionStorage.getItem("username");
        
        // get edge details function
        $scope.getlovbandwidthfn = function(){
            
            $rootScope.showSpinner = true;
            $intellireportPerformanceService.getlovbandserv(userid).then(function(res){
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{
                    if(res.result == "success"){
                        $scope.getbandwidthval = res.data;
                        // console.log($scope.getedgeval);
                        $rootScope.showSpinner = false;
                    }else{
                        $rootScope.showSpinner = false;
                        notie.alert(3, res.data, config.notify_delay);
                    }
                }
            })
        }

        $scope.interfacelistget = function(){
            for (var [key, values] of Object.entries($scope.getbandwidthval)) {
                if($scope.bandinterface == key){
                    $scope.portval = values;
                }
                
            }
            console.log($scope.portval);
        }

        function draw_area(ele_id, data_arr) {
            Pace.restart();            
            // console.log(res_arr);
            var myChart = echarts.init(document.getElementById(ele_id));
            var option = {
                title: {
                    text: 'Senor ('+$scope.IPport+') - '+ $scope.bandtotval.Name +' ( '+ $scope.bandtotval.Description +') - Traffic',
                    // subtext: 'Example in MetricsGraphics.js',
                    // left: 'center'
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
                        var val =[];
                        for (var i = 0; i < params.length; i++) {
                            val.push(params[i].seriesName + ' : ' +params[i].value);
                        }
                        return val;
                        // return params[0].seriesName +':'+params[0].value+ '<br/>'+ params[1].seriesName +':'+ params[1].value+ '<br/>'+ params[2].seriesName +':'+ params[2].value;
                        // return params[2].seriesName +':'+ (params[2].value).toFixed(1) + '%'+ '<br/>'+ params[3].seriesName +':'+ (params[3].value * 100).toFixed(1) + '%';
                    }
                },
                dataZoom: [{
                    type: 'inside'
                }, {
                    type: 'slider'
                }],
                grid: {
                    top: '20%',
                    left: '0%',
                    right: '3%',
                    bottom: '15%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: data_arr.map(function (item) {
                        return item[0];
                    }),
                    axisLabel: {
                        // interval: 20,
                        rotate: 0 //If the label names are too long you can manage this by rotating the label.
                    },
                    splitLine: {
                        show: true
                    },
                    boundaryGap: true
                },
                yAxis: {
                    name: 'Mbit/s',
                    axisLabel: {
                        formatter: function (val) {
                            return (val);
                        }
                    },
                    splitNumber: 3,
                    splitLine: {
                        show: true
                    }
                },
                // dataZoom: [{
                //     startValue: data_arr[0].Timestamp
                // }, {
                //     type: 'inside',
                // }],
                legend: {
                    data: ['Traffic In(speed)', 'Traffic Out(speed)', 'Traffic Total(speed)'],
                    right: 20
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        saveAsImage: {show: true, title: 'Save As JPG'},
                        magicType: {show: true, type: ['line', 'bar'], title: 'Chart Type'},
                    }
                },
                series: [{
                    name: 'Traffic In(speed)',
                    type: 'line',
                    data: data_arr.map(function (item) {
                        return item[4];
                    }),
                    hoverAnimation: false,
                    symbolSize: 6,
                    // areaStyle: {},
                    itemStyle: {
                        color: '#673ab7'
                    },
                    markPoint: {
                        data: [
                            {type: 'max', name: 'High'},
                            // {type: 'min', name: 'Low'}
                        ]
                    },
                    showSymbol: false
                  },
                  {
                    name: 'Traffic Out(speed)',
                    type: 'line',
                    data: data_arr.map(function (item) {
                        return item[5];
                    }),
                    hoverAnimation: false,
                    symbolSize: 6,
                    // areaStyle: {},
                    itemStyle: {
                        color: '#3f51b5'
                    },
                    markPoint: {
                        data: [
                            {type: 'max', name: 'High'},
                            // {type: 'min', name: 'Low'}
                        ]
                    },
                    showSymbol: false
                  },{
                    name: 'Traffic Total(speed)',
                    type: 'line',
                    data: data_arr.map(function (item) {
                        return item[6];
                    }),
                    hoverAnimation: false,
                    symbolSize: 6,
                    // areaStyle: {},
                    itemStyle: {
                        color: '#2196f3'
                    },
                    markPoint: {
                        data: [
                            {type: 'max', name: 'High'},
                            // {type: 'min', name: 'Low'}
                        ]
                    },
                    showSymbol: false
                  }
                ]
            };
            myChart.setOption(option);
        }


        function init_event() {

            $('.datepickers').datetimepicker({
                format: 'YYYY-MM-DD HH:mm'
            });
            
            $('#Formbandwidths').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    selbandinterface: {required: true},
                    selbandport: {required: true},
                    txtbwsstartdate: {required: true},
                    txtbwsendate: {required: true},
                },
                messages: {
                    selbandinterface: {
                        required: 'Please Select the Interface',
                    },
                    selbandport: {
                        required: 'Please Select the Port',
                    },
                    txtbwsstartdate: {
                        required: 'Please Select the StartDate',
                    },
                    txtbwsendate: {
                        required: 'Please enter the EndDate',
                    }
                },
                highlight: function (element) {
                    $(element).closest('input').addClass("form_error");
                    $(element).closest('select').addClass("form_error");
                },
                unhighlight: function (element) {
                    $(element).closest('input').removeClass("form_error");
                    $(element).closest('select').removeClass("form_error");
                },
                errorPlacement: function (error, element) {
                    $(element).closest('div').append(error);
                }

            });

            $scope.ipval = "";
            $scope.IPport = "";
            $scope.bandtotval = [];
            
            $scope.btngetbanddetfn = function(){
                $scope.bandtotval = null;
                $scope.ipval = $("#selbandinterface").val();
                $scope.IPport = $("#selbandport").val();
                if ($('#Formbandwidths').valid()){
                    var dataset = {
                        "TimeZone": sessionStorage["user_tz"], 
                        "start_datetime": $("#txtbwsstartdate").val(), 
                        "end_datetime": $("#txtbwsendate").val(), 
                        "ip": $("#selbandinterface").val(), 
                        "port": $("#selbandport").val()
                    }
                    console.log(dataset);
                    $rootScope.showSpinner = true;
                    $intellireportPerformanceService.getbanddetserv(dataset).then(function(res){
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{
                            if(res.result == "success"){
                                $scope.bandtotval = res.data;
                                $scope.bandwidthchartdiv = true ;
                                $scope.bandplotlegnth = res.data.plots.slice(1);
                                console.log($scope.bandtotval);
                                $('#chartvals').fadeTo("slow", 1);
                                document.getElementById("chartvals").style.width= (window.innerWidth - 100)  + "px";
                                draw_area("chartvals", $scope.bandplotlegnth);
                                $rootScope.showSpinner = false;
                            }else{
                                $rootScope.showSpinner = false;
                                $('#chartvals').fadeTo("slow", 0);
                                $scope.bandwidthchartdiv = false;
                                notie.alert(3, res.data, config.notify_delay);
                            }
                        }
                    })
                }            
            }
            
            $scope.getbwPDF =function(){
                var HTML_Width = $("#bandwidthchartimage").width();
                var HTML_Height = $("#bandwidthchartimage").height();
                var top_left_margin = 15;
                var PDF_Width = HTML_Width+(top_left_margin*2);
                var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
                var canvas_image_width = HTML_Width;
                var canvas_image_height = HTML_Height;
                var d = new Date().getTime();
                var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
                html2canvas($("#bandwidthchartimage")[0],{allowTaint:true}).then(function(canvas) {
                    canvas.getContext('2d');
                    var imgData = canvas.toDataURL("image/jpeg", 1.0);
                    var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
                    pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
                    for (var i = 1; i <= totalPDFPages; i++) { 
                        pdf.addPage(PDF_Width, PDF_Height);
                        pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
                    }
                    pdf.save($scope.ipval+'__'+$scope.bandtotval.Name+'__'+$scope.bandtotval.Description+'__'+d+".pdf");
                });
            };

            $scope.getcsvfn = function(){
                $("#bandwidthsumtable").tableToCSV();
                $("#bandwidthplottable").tableToCSV();
            }

        }

        $scope.init = function () {
            init_event();
            $scope.getlovbandwidthfn();
        }



        // $rootScope.$on('ReportTabChange', function (event, args) {
        //     if (args["tabname"] == "Performance Report") {
        //         if (!bpageloaded) {
        //             bpageloaded = true;
        //             init_event();
        //             $scope.getlovbandwidthfn();
        //         }
        //     }
        // });

       

    }
]);