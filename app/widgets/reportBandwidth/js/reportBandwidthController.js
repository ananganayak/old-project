angular.module('pages').controller('reportBandwidthController', [
    '$scope',
    '$timeout',
    '$rootScope',
    'intellireportBandwidthService',
    function ($scope, $timeout, $rootScope, $intellireportBandwidthService) {

        var bpageloaded = false;
        
        $scope.getedgeval = [];


        // get edge details function
        $scope.getreportbandwidthdetfn = function(){
            $rootScope.showSpinner = true;
            $intellireportBandwidthService.getreportbanddetserv().then(function(res){
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{
                    if(res.result == "success"){
                        $scope.getbandwidthval = res.data.slice(1);
                        // console.log($scope.getedgeval);
                        $rootScope.showSpinner = false;
                    }else{
                        $rootScope.showSpinner = false;
                        notie.alert(3, res.data, config.notify_delay);
                    }
                }
            })
        }
        var custid = sessionStorage["userid"];
        // get bandwidth gird details function
        $scope.getreportbandwidthgriffn = function(){
            $rootScope.showSpinner = true;

            $intellireportBandwidthService.getreportbandgriderv(custid).then(function(res){
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{
                    if(res.result == "success"){
                        $scope.getbdgirdval = res.data.slice(1);
                        // console.log($scope.getedgeval);
                        $rootScope.showSpinner = false;
                    }else{
                        $rootScope.showSpinner = false;
                        notie.alert(3, res.data, config.notify_delay);
                    }
                }
            })
        }

        $scope.intname = "";

        function draw_area(ele_id, data_arr) {
            Pace.restart();            
            // console.log(res_arr);
            var myChart = echarts.init(document.getElementById(ele_id));
            var option = {
                title: {
                    text: 'Bandwidth Report - ' + $scope.intname,
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
                        return params[0].seriesName +':'+params[0].value+ '<br/>'+ params[1].seriesName +':'+ params[1].value+ '<br/>'+ params[2].seriesName +':'+ params[2].value;
                        // return params[2].seriesName +':'+ (params[2].value).toFixed(1) + '%'+ '<br/>'+ params[3].seriesName +':'+ (params[3].value * 100).toFixed(1) + '%';
                    }
                },
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
                        return item.Timestamp;
                    }),
                    axisLabel: {
                        interval: 0,
                        rotate: 90 //If the label names are too long you can manage this by rotating the label.
                    },
                    splitLine: {
                        show: true
                    },
                    boundaryGap: true
                },
                yAxis: {
                    name: 'MByte',
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
                    data: ['Traffic in Average', 'Traffic out Average', 'Traffic Total Average'],
                    right: 10
                },
                series: [{
                    name: 'Traffic in Average',
                    type: 'line',
                    data: data_arr.map(function (item) {
                        return item.Traffic_in_AVERAGE;
                    }),
                    hoverAnimation: false,
                    symbolSize: 6,
                    areaStyle: {},
                    itemStyle: {
                        color: '#673ab7'
                    },
                    showSymbol: false
                  },
                  {
                    name: 'Traffic out Average',
                    type: 'line',
                    data: data_arr.map(function (item) {
                        return item.Traffic_out_AVERAGE;
                    }),
                    hoverAnimation: false,
                    symbolSize: 6,
                    areaStyle: {},
                    itemStyle: {
                        color: '#3f51b5'
                    },
                    showSymbol: false
                  },{
                    name: 'Traffic Total Average',
                    type: 'line',
                    data: data_arr.map(function (item) {
                        return item.Traffic_total_AVERAGE;
                    }),
                    hoverAnimation: false,
                    symbolSize: 6,
                    areaStyle: {},
                    itemStyle: {
                        color: '#2196f3'
                    },
                    showSymbol: false
                  }
                ]
            };
            myChart.setOption(option);
        }


        function init_event() {
            $('.datepicker').datetimepicker({
                format: 'DD-MM-YYYY HH:mm'
            });

            $('#Formbandwidth').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    selinterface: {required: true},
                    selfiletyp: {required: true},
                    selbandwidthperiod: {required: true},
                    txtbdstartdate: {required: true},
                    txtbdendate: {required: true},
                },
                messages: {
                    selinterface: {
                        required: 'Please Select the Interface',
                    },
                    selfiletyp: {
                        required: 'Please Select the File type',
                    },
                    selbandwidthperiod: {
                        required: 'Please Select the Period',
                    },
                    txtbdstartdate: {
                        required: 'Please enter the StartDate',
                    },
                    txtbdendate: {
                        required: 'Please enter the EndDate',
                    },
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

            $scope.gridpage = true;
            $scope.pdfpage = false;
            
            $scope.backtogrid = function(){
                $scope.gridpage = true;
                $scope.pdfpage = false;  
            }

            $scope.btngetbandfn = function(){
                if ($('#Formbandwidth').valid()) {
                    var selval = $("#selbandwidthperiod").val();
                    $scope.intname = $("#selinterface").val();
                    if(selval == 'Custom Period'){
                        var dataset = {"Time Zone": sessionStorage["user_tz"], "date": selval, "name": $scope.intname, "file_type": $("#selfiletyp").val(), "user_id" : custid, "extra" : {"sdate":$("#txtbdstartdate").val(), "edate":$("#txtbdendate").val()}};
                    }
                    else{
                        var dataset = {"Time Zone": sessionStorage["user_tz"], "date": selval, "name": $scope.intname, "file_type": $("#selfiletyp").val(), "user_id" : custid};
                    }
                    // console.log(dataset);
                    $rootScope.showSpinner = true;
                    $intellireportBandwidthService.postbandwidthdet(dataset).then(function(res){
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{
                            if(res.result == "success"){
                                $scope.gridop = res;
                                console.log($scope.gridop);
                                $rootScope.showSpinner = false;
                                if($("#selfiletyp").val() == "pdf"){
                                    // var valFileDownloadPath = $scope.gridop.data;
                                    // window.open(valFileDownloadPath , 'Download');
                                    $scope.gridpage = false;
                                    $scope.pdfpage = true; 
                                    document.getElementById("chartval").style.width= (window.innerWidth - 100)  + "px";
                                    draw_area("chartval", res.data.grid);
                                    $scope.cpdfval = res.data;
                                    $scope.cpdfvalh = res.header;
                                }else{
                                    $scope.gridpage = true;
                                    $scope.pdfpage = false;
                                    $scope.getreportbandwidthgriffn();
                                    $.ajax({
                                        type: "GET",
                                        url: $scope.gridop.data,
                                        dataType: "text",
                                        success: function(data) {
                                            // console.log(data)
                                            var allTextLines = data.split(/\r\n|\n/);
                                            var entriess =[];
                                            for (var i = 0; i < allTextLines.length; i++) {
                                                var entries = allTextLines[i].split(';');
                                                if(i == 0){
                                                    entriess.push(entries);
                                                }else{
                                                    var strval = parseInt(entries[0]) + 19800;
                                                    var date = new Date(strval * 1000);
                                                    // alert(date.toLocaleString());
                                                    // var iso = date.toISOString().match(/(\d{4}\-\d{2}\-\d{2})T(\d{2}:\d{2}:\d{2})/)
                                                    var iso = date.toLocaleString();
                                                    var val = iso.replace(",", "-")
                                                    if(val != "Invalid Date"){
                                                        entries[0] = val;
                                                    }
                                                    for (var j = 0; j < entries.length; j++) {
                                                        if(j != 0){
                                                            entries[j] = (Math.round(entries[j] * 100) / 100).toFixed(2);
                                                        }
                                                    }
                                                    entriess.push(entries);
                                                }
                                            }
                                            var lineArray = [];
                                            entriess.forEach(function (infoArray, index) {
                                                var line = infoArray.join(",");
                                                lineArray.push(index == 0 ? "data:text/csv;charset=utf-8," + line : line);
                                            });
                                            var csvContent = lineArray.join("\n");
                                            // console.log(csvContent)
                                            csvfn(csvContent, $scope.intname);
                                             
                                            // draw_area("chartval", csvContent)
                                            
                                        }
                                     });
                                }
                                // notie.alert(1, res.data, config.notify_delay);
                            }else{
                                $rootScope.showSpinner = false;
                                notie.alert(3, res.data, config.notify_delay);
                            }   
                        }
                    })  
                }
            }
            $scope.brand_logo = config.brand_logo_240;

            $scope.getPDF =function(){
                var HTML_Width = $("#exfort").width();
                var HTML_Height = $("#exfort").height();
                var top_left_margin = 15;
                var PDF_Width = HTML_Width+(top_left_margin*2);
                var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
                var canvas_image_width = HTML_Width;
                var canvas_image_height = HTML_Height;
                var d = new Date().getTime();
                var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
                                
                html2canvas($("#exfort")[0],{allowTaint:true}).then(function(canvas) {
                    canvas.getContext('2d');
                    
                    // console.log(canvas.height+"  "+canvas.width);
                    
                    var imgData = canvas.toDataURL("image/jpeg", 1.0);
                    var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
                    pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
                
                    for (var i = 1; i <= totalPDFPages; i++) { 
                        pdf.addPage(PDF_Width, PDF_Height);
                        pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
                    }
                    
                    pdf.save("Bandwidth-Report-"+d+".pdf");
                    
                });
                
            };


            function csvfn(urlData, fileName) {
                var link = document.createElement('a');
                var d = new Date().getTime();
                var fl = 'Nxtgen-Bandwidth-' + fileName + d +'.csv';
                link.id = 'download-csv';
                link.setAttribute('href', urlData);
                link.setAttribute('download', fl);
                link.click();
                // document.body.appendChild(link);
                // document.querySelector('#download-csv').click();
            }

        }

        $scope.init = function () {
            init_event();
            $scope.getreportbandwidthdetfn();
            $scope.getreportbandwidthgriffn(); 
        }



        $rootScope.$on('ReportTabChange', function (event, args) {
            if (args["tabname"] == "Bandwidth Report") {
                if (!bpageloaded) {
                    bpageloaded = true;
                    init_event();
                    $scope.getreportbandwidthdetfn();
                    $scope.getreportbandwidthgriffn();
                }
            }
        });

       

    }
]);