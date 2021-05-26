angular.module('pages').controller('reportPerformancesController', [
    '$scope',
    '$timeout',
    '$rootScope',
    'intellireportPerformancesService',
    function ($scope, $timeout, $rootScope, $intellireportPerformancesService) {

        var userid = sessionStorage.getItem("username");
        $scope.userid = userid;
        
        $scope.getperflovval = [];

        $scope.hostviewpanel = true;
        $scope.mainpartmetrics = true;
        $scope.mainviewmainpanel = true;
        $scope.mainviewmainsumpanel = true;

        $scope.metricsview = true;
        $scope.fwmetricsview = true;

        var wh = window.innerHeight;
        $scope.interfaceval = "";
        // $scope.hostnameval = "";
        $scope.bandplotname = "";
        $scope.bandtotval = "";
        $scope.tablebind = [];
        // $('.selectpicker').selectpicker();
        
        // get lov function
        $scope.getlovperformancefn = function(){
            $rootScope.showSpinner = true;
            $intellireportPerformancesService.getlovperformserv().then(function(res){
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{
                    if(res.result == "success"){
                        $scope.getperflovval = res.data;
                        // console.log($scope.getperflovval);
                        $rootScope.showSpinner = false;
                        $('.selectpicker').searchableSelect();
                        $("#selperfport").select2();
                    }else{
                        $rootScope.showSpinner = false;
                        notie.alert(3, res.data, config.notify_delay);
                    }
                }
            })
        }

        //get interface list det
        $scope.interfacelistget = function(){
            $scope.mainviewmainpanel = true;
            $scope.hostviewpanel = true;
            $scope.mainviewmainsumpanel = true;
            $scope.metricsview = true;
            $("#gethostname li").removeClass("active")
            for (var [key, values] of Object.entries($scope.getperflovval)) {
                if($scope.perfinterface == key){
                    $scope.portvals = values;
                }
            }
            // console.log($scope.portvals);
            if($scope.perfinterface == 'Firewall' || $scope.perfinterface == 'Switch'){
                $scope.interfaceval = $scope.perfinterface;
                var dataset = {"category": $scope.perfinterface, "item": " "};
                $intellireportPerformancesService.postperfhstdetserv(dataset).then(function(res){
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{
                        if(res.result == "success"){
                            $scope.getperfhstitems = res.data.items.slice(1);
                            // console.log($scope.getperfhstitems, $scope.getperfhstmetrics);
                            $scope.hostviewpanel = false;
                            $rootScope.showSpinner = false;
                            $scope.mainviewmainpanel = true;
                            $scope.mainviewmainsumpanel = true;
                            $scope.metricsview = true;
                            $("#selperflist").select2();
                            $("#ippanel.panel .panel-body").css("height", (wh - 300)  + "px");
                        }else{
                            $rootScope.showSpinner = false;
                            notie.alert(3, res.data, config.notify_delay);
                        }
                    }
                })
            }
        }


        // Chart function
        function draw_area(ele_id, plot, plotname, plotval) {
            Pace.restart();            
            var dataseries = [];
            // console.log(res_arr);
            for (var i = 0; i < plot.length; i++) {
                for (var j = 0; j < plotname.length; j++) {
                    if(plotname[j] == plot[i]){
                        // var point = j;
                        dataseries.push({
                            name: plotname[j],
                            type: 'line',
                            data: plotval.map(function (item) {
                                return item[j];
                            }),
                            hoverAnimation: false,
                            symbolSize: 6,
                            markPoint: {
                                data: [
                                    {type: 'max', name: 'High'},
                                ]
                            },
                            showSymbol: false
                        })
                           
                    }
                }
            }
            var myChart = echarts.init(document.getElementById(ele_id));
            var option = {
                title: {
                    text: $scope.interfaceval+'__'+$scope.selperflist,
                    textStyle: {
                        fontSize: 14
                    },
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
                    },
                    formatter: function (params) {
                        var val =[];
                        for (var i = 0; i < params.length; i++) {
                            val.push(params[i].seriesName + ' : ' +params[i].value);
                        }
                        return val;
                        // return params[0].seriesName +':'+params[0].value+ '<br/>'+ params[1].seriesName +':'+ params[1].value+ '<br/>'+ params[2].seriesName +':'+ params[2].value;
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
                    data: plotval.map(function (item) {
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
                    name: $scope.bandtotval.units,
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
                legend: {
                    data: [$scope.bandplotname[1], $scope.bandplotname[2], $scope.bandplotname[3], $scope.bandplotname[4], $scope.bandplotname[5], $scope.bandplotname[6],$scope.bandplotname[7],$scope.bandplotname[8]],
                    center: 20
                },
                toolbox: {
                    show: true,
                    feature: {
                        saveAsImage: {show: true, title: 'Save As JPG'},
                        magicType: {show: true, type: ['line', 'bar'], title: 'Chart Type'},
                    }
                },
                series: dataseries,
            };
            myChart.setOption(option, true);
        }


        function init_event() {

            $('.datepickers').datetimepicker({
                format: 'YYYY-MM-DD HH:mm'
            });

            $('#Formreportperformances').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    selperfinterface: {required: true},
                    selperfport: {required: true},
                    selperfevmmet: {required: true},
                    selperflist: {required: true},
                    txtperfstartdate: {required: true},
                    txtperfsendate: {required: true},
                },
                messages: {
                    selperfinterface: {
                        required: 'Please Select the Category',
                    },
                    selperfport: {
                        required: 'Please Select the Sub Category',
                    },
                    selperfevmmet: {
                        required: 'Please Select the Metrics',
                    },
                    selperflist: {
                        required: 'Please Select the Object',
                    },
                    txtperfstartdate: {
                        required: 'Please Select the StartDate',
                    },
                    txtperfsendate: {
                        required: 'Please enter the EndDate',
                    }
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

            // details get function
            $scope.btnpostperffn = function(){
                $rootScope.showSpinner = true;
                $scope.interfaceval = $scope.perfinterface;
                var dataset = {"category": $scope.perfinterface, "item": $("#selperfport").val()};
                $intellireportPerformancesService.postperfhstdetserv(dataset).then(function(res){
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{
                        if(res.result == "success"){
                            $scope.getperfhstitems = res.data.items.slice(1);
                            $scope.getperfhstmetrics = res.data;
                            // console.log($scope.getperfhstitems, $scope.getperfhstmetrics);
                            $scope.hostviewpanel = false;
                            $rootScope.showSpinner = false;
                            $scope.mainviewmainpanel = true;
                            $scope.mainviewmainsumpanel = true;
                            $scope.fwmetricsview = false;
                            $scope.metricsview = false;
                            $("#selperflist").select2();
                            $("#selperfevmmet").select2();
                            $("#ippanel.panel .panel-body").css("height", (wh - 300)  + "px");
                        }else{
                            $rootScope.showSpinner = false;
                            notie.alert(3, res.data, config.notify_delay);
                        }
                    }
                })
            }


            // host list get
            $scope.metricdisfn = function(){
                if($scope.interfaceval == 'Firewall' || $scope.interfaceval == 'Switch'){
                    var dataset = {"category": $scope.interfaceval, "ip": $scope.selperflist};
                    $scope.metricsview = true;
                    $rootScope.showSpinner = true;
                    $intellireportPerformancesService.postperffwdetserv(dataset).then(function(res){
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{
                            if(res.result == "success"){
                                $scope.getperfhstmetrics = res.data;
                                $rootScope.showSpinner = false;
                                $scope.metricsview = false;
                                $("#selperfevmmet").select2();
                            }else{
                                $rootScope.showSpinner = false;
                                notie.alert(3, res.data, config.notify_delay);
                            }
                        }
                    })
                }else{
                    $scope.checkedfun = true;
                    $scope.metricsview = false;
                }
                $("input:radio").prop('checked', false); 
            }

            // Firewall and switch Function details get
            $scope.btngetperfdetfn = function(){
                if ($('#Formreportperformances').valid()){
                    $scope.tablebind = [];
                    $('#tottable').remove();
                    if($scope.interfaceval == 'Firewall' || $scope.interfaceval == 'Switch'){
                        var dataset = {
                            "category" : $scope.interfaceval,
                            "item" : '',
                            "list" : $scope.selperflist,
                            "metrics": $scope.selperfevmmet,
                            "TimeZone": sessionStorage["user_tz"], 
                            "start_datetime": $("#txtperfstartdate").val(), 
                            "end_datetime": $("#txtperfsendate").val(), 
                        }
                    }else{
                        var dataset = {
                            "category" : $scope.interfaceval,
                            "item" : $scope.selperfport,
                            "list" : $scope.selperflist,
                            "metrics": $scope.selperfevmmet,
                            "TimeZone": sessionStorage["user_tz"], 
                            "start_datetime": $("#txtperfstartdate").val(), 
                            "end_datetime": $("#txtperfsendate").val(), 
                        }
                    }
                    // console.log(dataset);
                    $rootScope.showSpinner = true;
                    $intellireportPerformancesService.postperfcdetserv(dataset).then(function(res){
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{
                            if(res.result == "success"){
                                $scope.bandtotval = res;
                                // console.log($scope.bandtotval);
                                $scope.bandwidthchartdiv = true ;
                                $scope.bandplotname = res.data.plots[0];
                                // console.log($scope.bandplotname);
                                if($scope.interfaceval == 'Firewall' || $scope.interfaceval == 'Switch'){
                                    $scope.bandgridlegnth = res.data.grid.slice(1);
                                    $scope.bandplotlegnth = res.data.plots.slice(1);
                                    $scope.datatablebind($scope.bandplotname, $scope.bandgridlegnth);
                                    $scope.mainviewmainsumpanel = false;
                                }else{
                                    $scope.bandplotlegnth = res.data.plots.slice(1);
                                    $scope.datatablebind($scope.bandplotname, $scope.bandplotlegnth);
                                    $scope.mainviewmainsumpanel = true;
                                }
                                
                                $('#performanceschart').fadeTo("slow", 1);
                                document.getElementById("performanceschart").style.width= (window.innerWidth - 100)  + "px";
                                draw_area("performanceschart", $scope.bandtotval.plotters, $scope.bandplotname, $scope.bandplotlegnth);
                                $scope.mainviewmainpanel = false;
                                
                                $rootScope.showSpinner = false;
                            }else{
                                $rootScope.showSpinner = false;
                                $('#performanceschart').fadeTo("slow", 0);
                                $scope.bandwidthchartdiv = false;
                                notie.alert(3, res.data, config.notify_delay);
                            }
                        }
                    })
                }   
            }
            
            $scope.datatablebind = function(header, body){
                // console.log(header);
                $scope.tablebind +='<table class="table table-bordered" id="tottable"><caption style="display: none;">'+ $scope.interfaceval +'__'+ $scope.selperflist +'__tot</caption><thead style="background-color:#efefef;"><tr>';
                for (var i = 0; i < header.length; i++) {
                    // console.log(header[i]);
                    // $scope.tablebind += '<th>' + header[i] +'</th>';
                    if(header[i] == "DateTime"){
                        $scope.tablebind += '<th>' + header[i] +'&nbsp; &nbsp;</th>';
                    }else{
                        if(header[i] == 'Traffic Total(speed)' || header[i] == 'Traffic In(speed)' || header[i] == 'Traffic Out(speed)' || header[i] == 'Traffic Out(volume)' || header[i] == 'Traffic In(volume)' || header[i] == 'Traffic Total(volume)'){
                            $scope.tablebind += '<th>' + header[i] +'</th>';
                        }else {
                            $scope.tablebind += '<th>' + header[i] +'&nbsp; &nbsp;'+ $scope.bandtotval.units +'</th>';
                        }
                        
                    }
                    
                }
                $scope.tablebind +='</tr></thead>';
                $scope.tablebind +='<tbody>';
                for (var i = 0; i < body.length; i++) {
                    $scope.tablebind +='<tr>';
                    for (var j = 0; j < body[i].length; j++) {
                        $scope.tablebind += '<td>' + body[i][j]+ '</td>';
                    }
                    $scope.tablebind +='</tr>';
                }
                $scope.tablebind +='</tbody><table>';
                // console.log($scope.tablebind);
                $('#performanceplottable').append($scope.tablebind);
            }

            //csv download function 
            $scope.getcsvfn = function(){
                // $("#performanceplottable").tableToCSV();
                // $("#performancesumtable").tableToCSV();
                // $("#performancehighsumtable").tableToCSV();
                // $("#performanceavgtable").tableToCSV();
                
                    const url = $scope.bandtotval.data.link 
                    const link = document.createElement('a'); 
                    link.href = url; 
                    link.setAttribute('download', link); 
                    document.body.appendChild(link); 
                    link.click();  
            }
            $scope.getbwPDF = function(){
                var HTML_Width = $("#performancechartdiv").width();
                var HTML_Height = $("#performancechartdiv").height();
                var top_left_margin = 15;
                var PDF_Width = HTML_Width+(top_left_margin*2);
                var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
                var canvas_image_width = HTML_Width;
                var canvas_image_height = HTML_Height;
                var d = new Date().getTime();
                var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
                html2canvas($("#performancechartdiv")[0],{allowTaint:true}).then(function(canvas) {
                    canvas.getContext('2d');
                    var imgData = canvas.toDataURL("image/jpeg", 1.0);
                    var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
                    pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
                    for (var i = 1; i <= totalPDFPages; i++) { 
                        pdf.addPage(PDF_Width, PDF_Height);
                        pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
                    }
                    pdf.save($scope.interfaceval+'__'+$scope.selperflist+'__'+d+".pdf");
                });
                // var canvasShiftImg = function(img, shiftAmt, scale, pageHeight, pageWidth){
                //     var c = document.createElement('canvas'),
                //       ctx = c.getContext('2d'),
                //       shifter = Number(shiftAmt || 0),
                //       scaledImgHeight = img.height * scale,
                //       scaledImgWidth = img.width * scale;
                      
                //     ctx.canvas.height = pageHeight;
                //     ctx.canvas.width = pageWidth;
                //     ctx.drawImage(img, 0, shifter, scaledImgWidth, scaledImgHeight)
                    
                //     return c;
                //   };
              
                //   var canvasToImg = function(canvas, loaded, error){
                //     var dataURL = canvas.toDataURL('image/png'),
                //       img = new Image();
                //     img.onload = loaded;
                //     img.onerror = error;
                //     img.src = dataURL;
                //   };
                  
                //   var imageToPdf = function(){
                //     // can't pass any parameters or else "this" won't be the img element
                //     var img = this,
                //       pdf = new jsPDF('l','px'),
                //       pdfInternals = pdf.internal,
                //       pdfPageSize = pdfInternals.pageSize,
                //       pdfScaleFactor = pdfInternals.scaleFactor,
                //       pdfPageWidth = pdfPageSize.width,
                //       pdfPageHeight = pdfPageSize.height,
                //       pdfPageWidthPx = pdfPageWidth * pdfScaleFactor,
                //       pdfPageHeightPx = pdfPageHeight * pdfScaleFactor,
                      
                //       imgScaleFactor = Math.min(pdfPageWidthPx / img.width, 1),
                //       imgScaledHeight = img.height * imgScaleFactor,
                      
                //       shiftAmt = 0,
                //       done = false;
                    
                //     while(!done){
                //       var newCanvas = canvasShiftImg(img, shiftAmt, imgScaleFactor, pdfPageHeightPx, pdfPageWidthPx);
                //       pdf.addImage(newCanvas, 'png', 0, 0, pdfPageWidth, 0, null, 'SLOW');
                      
                //       shiftAmt -= pdfPageHeightPx;
                      
                //       if(-1*shiftAmt < imgScaledHeight){
                //         pdf.addPage();
                //       } else {
                //         done = true;
                //       }
                //     }
                //     var d = new Date().getTime();
                //     pdf.save('Performance-Report-'+d+'.pdf');
                //   };
                //   var imageLoadError = function(){
                //     alert('there was an image load error :(');
                //   };                  
                //   html2canvas($('#performancechartdiv')[0], {
                //       onrendered: function(canvas){
                //         // params: canvas, onload, onerror
                //         canvasToImg(canvas, imageToPdf, imageLoadError);
                //       }
                //   });
            };

        }

        $scope.init = function () {
            if(userid == 'tommyuser'){
                $scope.perfinterface = 'Firewall';
                $scope.interfaceval = $scope.perfinterface ;
                $scope.selperflist = '10.225.11.20';
                $scope.selperfevmmet = '380..TommyHil-3021';
                $scope.metricsview = false;
            }else if(userid == 'ttk'){
                $scope.perfinterface = 'Firewall';
                $scope.interfaceval = $scope.perfinterface ;
                $scope.selperflist = '10.225.11.14';
                var dataset = {"category": $scope.interfaceval, "ip": $scope.selperflist};
                $scope.metricsview = true;
                $rootScope.showSpinner = true;
                $intellireportPerformancesService.postperffwdetserv(dataset).then(function(res){
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{
                        if(res.result == "success"){
                            $scope.getperfhstmetrics = res.data;
                            $rootScope.showSpinner = false;
                            $scope.metricsview = false;
                            $("#selperfevmmet").select2();
                        }else{
                            $rootScope.showSpinner = false;
                            notie.alert(3, res.data, config.notify_delay);
                        }
                    }
                })
            }else if(userid == 'Barbeque'){
                $scope.perfinterface = 'Firewall';
                $scope.interfaceval = $scope.perfinterface ;
                $scope.selperflist = '10.225.11.20';
                $scope.selperfevmmet = '75..Barbeque-3155';
                $scope.metricsview = false;
            }else if(userid == 'modicare'){
                $scope.perfinterface = 'Firewall';
                $scope.interfaceval = $scope.perfinterface ;
                $scope.selperflist = '10.225.179.129';
                $scope.selperfevmmet = '666..Modicare-2844';
                $scope.metricsview = false;
            }

            init_event();
            $scope.getlovperformancefn();
        }    

    }
]);