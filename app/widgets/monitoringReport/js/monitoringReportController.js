angular.module('widgets').controller('monitoringReportController', [
    '$scope',
    '$rootScope',
    '$interval',
    '$timeout',
    '$sce',
    'intellimonitoringReportService',
    function($scope, $rootScope, $interval, $timeout, $sce, $intellimonitoringReportService ) {
        'use strict';

        var bpageloaded = false;


        $scope.brand_logo = config.brand_logo_240;
        
        $scope.userdet = {
            "username" : sessionStorage.getItem("username")
        }
        function mreport_display_menu() {
            if (sessionStorage["access_control"]) {
                // $(".monitoringReport-content .nav-pills li").hide();
                $(".top_menu_cmdb").closest("li").show();
                var access_control = JSON.parse(sessionStorage["access_control"]);                
                var permisson_menu = access_control[sessionStorage["role_name"]];

                // console.log(access_control);
                $.each(permisson_menu,function(inx,ele){
                    if(ele.tab_name){
                        var menu_name = ele.tab_name;                       
                        if(menu_name == "Monitoring_Reports_Availability"){
                            $("#report_availability").show();
                        }else if(menu_name == "Monitoring_Reports_Performace"){ 
                            $("#report_performance").show();
                        }else if(menu_name == "Monitoring_Reports_Capacity"){
                            $("#report_capacity").show();
                        }
                    }
                });
            }
        }
        $rootScope.$on('UserloggedIn', function(event, args) {
            mreport_display_menu();
        });
        $scope.getperformanceperiod = ["today", "yesterday", "this_week", "this_month", "previous_month", "custom"]

        // $(".panel-view").hide();

        // $(function() {
        //     $('input[name="datetimes"]').daterangepicker({
        //       opens: 'left'
        //     }, function(start, end, label) {
        //       console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
        //     });
        // }); 

        // get hostgroup function
        $scope.getallapplication = function(){

            var username = sessionStorage.getItem("username");

            $rootScope.showSpinner = true;

            $intellimonitoringReportService.getallappval(username).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{
                    $scope.getallappval = res.data.hostgroup_name;
                    console.log($scope.getallappval);
                    $rootScope.showSpinner = false;
                }
            })

        }
        
        // get report period function
        $scope.getreportperiodfn = function(){
            $rootScope.showSpinner = true;

            $intellimonitoringReportService.getreportperiodserv().then(function(res){
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{
                    $scope.getperiodval = res;
                    console.log($scope.getperiodval);
                    $rootScope.showSpinner = false;
                }
            })
        }

        // live time updateing function
        // $scope.timedisplay_ct = function() {
        //     var x = new Date()
        //     // var ampm = x.getHours >= 12 ? 'pm' : 'am';
        //     var x1=x.getDate() + " / " + (x.getMonth() + 1)+ " / " + x.getFullYear(); 
        //     x1 = x1 + " - " +  x.getHours()+ " : " +  x.getMinutes() + " : " +  x.getSeconds() ;
        //     document.getElementById('datetime1').innerHTML = x1;
        //     document.getElementById('datetime2').innerHTML = x1;
        //     timedisplay_c();
        // }

        // live time updateing setTime function 
        // function timedisplay_c(){
        //     setTimeout(function(){
        //         $scope.timedisplay_ct();
        //     },1000)
        // }

        function draw_host_donut(ele_id, data_arr) {
            var res_arr = {
                lable: [],
                data: []
            };
            $.each(data_arr, function(inx, row) {
                res_arr.lable.push(inx);
                res_arr.data.push({
                    "value": row,
                    "name": inx + ' : ' + row.toFixed(2) + '%'
                });
            });
            var myChart = echarts.init(document.getElementById(ele_id));
            var option = {
                // title: {
                //     text: 'All Host',
                //     left: 'center'
                // },
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}"
                },
                legend: {
                    bottom: 10,
                    left: 'center',
                    data: res_arr.lable
                },
                color: ["#8bc34a", "#f44336", "#9e9e9e"],
                
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

        // service donut Chart
        function draw_service_donut(ele_id, data_arr) {
            var res_arr = {
                lable: [],
                data: []
            };
            $.each(data_arr, function(inx, row) {
                res_arr.lable.push(inx);
                res_arr.data.push({
                    "value": row,
                    "name": inx + ' : ' + row.toFixed(2) + '%'
                });
            });
            var myChart = echarts.init(document.getElementById(ele_id));
            var option = {
                // title: {
                //     text: 'All Service',
                //     left: 'center'
                // },
                tooltip: {
                    trigger: 'item',
                    // formatter: "{b}: {c} ({d}%)"
                    formatter: "({b})"
                },
                legend: {
                    bottom: 10,
                    left: 'center',
                    data: res_arr.lable
                },
                color: ["#8bc34a", "#ffd507", "#ef5350", "#9e9e9e", "#00c292"],
                
                animation: false,
                series: [
                    {
                        type: 'pie',
                        radius: '65%',
                        center: ['50%', '50%'],
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

        $scope.init_event = function() {
            
                // if($scope.timeval == "Today"){
                //      periodval = "Today";
                // }else if($scope.timeval == "Last 24 Hours"){
                //     periodval = "last24";
                // }else if($scope.timeval == "Last 7 Days"){
                //     periodval = "last7";
                // }else if($scope.timeval == "This Month"){
                //     periodval = "thismonth";
                // }else if($scope.timeval == "Last 31 Days"){
                //     periodval = "last31";
                // }else if($scope.timeval == "This Year"){
                //     periodval = "thisyear";
                // }else if($scope.timeval == "Custom Period"){
                //     periodval = "custom";
                // }

            $('#LegacyFormAvailble').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    selavailhostgrp: {required: true},
                    selavaihost: {required: true},
                    selreportpreriod: {required: true},
                    txtavailcomnt: {required: true},
                    txtavaistartdate: {required: true},
                    txtavaiendate: {required: true},
                },
                messages: {
                    selavailhostgrp: {
                        required: 'Please select the Host Group'
                    },
                    selavaihost: {
                        required: 'Please Select the Host Name'
                    },
                    selreportpreriod: {
                        required: 'Please Select the Period'
                    },
                    txtavailcomnt: {
                        required: 'Please enter the Comments'
                    },
                    txtavaistartdate: {
                        required: 'Please enter the Start Date'
                    },
                    txtavaiendate: {
                        required: 'Please enter the End Date'
                    },
                },
                highlight: function (element) {
                    $(element).closest('input').addClass("form_error");
                    $(element).closest('select').addClass("form_error");
                    $(element).closest('textarea').addClass("form_error");
                },
                unhighlight: function (element) {
                    $(element).closest('input').removeClass("form_error");
                    $(element).closest('select').removeClass("form_error");
                    $(element).closest('textarea').removeClass("form_error");
                },
                errorPlacement: function (error, element) {
                    $(element).closest('div').append(error);
                }

            });

            $('#LegacyFormperformance').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    selperhostgrp: {required: true},
                    selperhost: {required: true},
                    selreportperfpreriod: {required: true},
                    txtperstartdate: {required: true},
                    txtperendate: {required: true},
                },
                messages: {
                    selperhostgrp: {
                        required: 'Please select the Host Group'
                    },
                    selperhost: {
                        required: 'Please Select the Host Name'
                    },
                    selreportperfpreriod: {
                        required: 'Please Select the Period'
                    },
                    txtperstartdate: {
                        required: 'Please enter the Start Date'
                    },
                    txtperendate: {
                        required: 'Please enter the End Date'
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


            // get Report value
            $scope.btngetreportval= function(){
                $scope.tablepanel = true;
                $scope.chartpanel = false;
                var periodval = '';
                $scope.timeval = $("#selreportpreriod").val();
                $scope.hostgroup = $("#selavailhostgrp").val();
                $scope.host = $("#selavaihost").val();
                $scope.availcomnt = $("#txtavailcomnt").val();
                if($scope.timeval == "Today"){
                     periodval = "Today";
                }else if($scope.timeval == "Last 24 Hours"){
                    periodval = "last24";
                }else if($scope.timeval == "Last 7 Days"){
                    periodval = "last7";
                }else if($scope.timeval == "This Month"){
                    periodval = "thismonth";
                }else if($scope.timeval == "Last 31 Days"){
                    periodval = "last31";
                }else if($scope.timeval == "This Year"){
                    periodval = "thisyear";
                }else if($scope.timeval == "Custom Period"){
                    periodval = "custom";
                }
                if ($('#LegacyFormAvailble').valid()) {
                    if(periodval == 'custom'){
                        var data_get = ({
                            // "username" : config.ngs_admin_name,
                            "username" : config.ngs_admin_name,
                            "hostgroup" : $scope.hostgroup,
                            "host" : $scope.host,
                            "comment" : $scope.availcomnt,
                            "auto_userid" : sessionStorage.getItem("userid"),
                            "startdate": $("#txtavaistartdate").val(), 
                            "enddate": $("#txtavaiendate").val()
                        });
                    }
                    else{
                        var data_get = ({
                            // "username" : config.ngs_admin_name,
                            "username" : config.ngs_admin_name,
                            "hostgroup" : $scope.hostgroup,
                            "host" : $scope.host,
                            "comment" : $scope.availcomnt,
                            "auto_userid" : sessionStorage.getItem("userid"),
                        });
                    }
                    
                    $rootScope.showSpinner = true;
                    $intellimonitoringReportService.getgeneratereport(periodval, data_get).then(function(res){
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{
                            notie.alert(1, res.data, config.notify_delay);
                            $scope.getavailablereport();
                            $rootScope.showSpinner = false;
                            $("#selreportpreriod").val('');
                            $("#selavailhostgrp").val('');
                            $("#selavaihost").val('');
                            $scope.selreportpreriod = "";
                            $("#txtavailcomnt").val('');
                        }
                    })
                }
            }

            // get available report function
            $scope.getavailablereport = function(){
                var userid = sessionStorage.getItem("userid");
                // $rootScope.showSpinner = true;
                $intellimonitoringReportService.getreportmainvalserv(userid).then(function(res){
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{
                        Pace.start();
                        $scope.getreportdata = res.data;
                        // console.log($scope.getreportdata);
                        $rootScope.showSpinner = false;
                        for (var i = 0; i < $scope.getreportdata.length; i++) {
                            if($scope.getreportdata[i].status=="0"){
                                $scope.anomalyautorefresh();
                                break;
                            }
                        }
                        Pace.stop();
                        // $(".panel-view").show();
                        // load_event_donut($scope.getreportdata.data.Average);
                    }
                })
            }
            var autoref ;

            $scope.anomalyautorefresh = function(){
                autoref = $timeout(function(){ $scope.getavailablereport(); }, 120000);
            };

            var dreg = $rootScope.$on('$locationChangeSuccess', function() {
                // console.log("Function Stopped")
                $timeout.cancel(autoref);
                dreg();
            });

            $scope.tablepanel = true;
            $scope.chartpanel = false;
            // view chart and table modal
            $scope.viewpdfdata = function(modalval){
                $scope.mainrepdata = modalval.meta;
                $scope.availchartval = modalval.data.Average;
                // $scope.availtableval = modalval.data.hostgroup;
                $scope.availrptgentime = modalval.datetime;
                $scope.tablepanel = false;
                $scope.chartpanel = true;
                load_event_donut($scope.availchartval);
            }
            $scope.viewmodaldata = function(modalval){
                $scope.mainrepdata = modalval.meta;
                $scope.availchartval = modalval.data.Average;
                $scope.availtableval = modalval.data.hostgroup;
                console.log($scope.availtableval);
                $scope.availrptgentime = modalval.datetime;
                $scope.dataser = [];
                for (const [key, value] of Object.entries($scope.availtableval)) {
                    for (const [keys, values] of Object.entries(value.Services)) {
                        $scope.dataser.push({
                            "Host" : key,
                            "Service" : keys,
                            "Ok" : values.ok,
                            "Warning" : values.warning,
                            "Critical" : values.critical,
                            "Unknown" : values.unknown,
                        })
                    }
                }
                console.log($scope.dataser);
            }

            $scope.backtotableview = function(){
                $scope.tablepanel = true;
                $scope.chartpanel = false;
            }

            // iframe src 
            $scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
            }
            function load_event_donut(chartdata){
                draw_host_donut("donuthostavail", chartdata.Host_Average);
                draw_service_donut("donutservavail", chartdata.Service_Average);
            }
            // Availability pie chart download pdf
            $scope.exportpie = function(){
                 
                var HTML_Width = $("#exfortavaihost").width();
                var HTML_Height = $("#exfortavaihost").height();
                var top_left_margin = 15;
                var PDF_Width = HTML_Width+(top_left_margin*2);
                var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
                var canvas_image_width = HTML_Width;
                var canvas_image_height = HTML_Height;
                var d = new Date().getTime();
                var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
                
                
                html2canvas($("#exfortavaihost")[0],{allowTaint:true}).then(function(canvas) {
                    canvas.getContext('2d');
                    
                    // console.log(canvas.height+"  "+canvas.width);
                    
                    var imgData = canvas.toDataURL("image/jpeg", 1.0);
                    var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
                    pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
                
                    for (var i = 1; i <= totalPDFPages; i++) { 
                        pdf.addPage(PDF_Width, PDF_Height);
                        pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
                    }
                    
                    pdf.save("Availability-host-Report-"+d+".pdf");
                    
                });             
            }

            // Availablity host Datatable CSV Convert function
            $("#exporthost").click(function(){
                $("#tablehostdata").tableToCSV();
                $("#tableservicedata").tableToCSV();
            });

            // Availablity service Datatable CSV Convert function
            // $("#exportservice").click(function(){
            //     $("#tableservicedata").tableToCSV();
            // });

            // performance report
            
            // get host list
            $scope.selperhostgrpfn= function(){
                $scope.appdet = {
                    "HostGroup" : $("#selperhostgrp").val(),
                    // "username" : sessionStorage.getItem("username"),
                }
                $rootScope.showSpinner = true;
                $intellimonitoringReportService.getreportperhstval($scope.appdet).then(function(res){
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{
                        if(res.result== "failure"){
                            $rootScope.showSpinner = false;
                            notie.alert(3, res.data, config.notify_delay);
                        }else{
                            $scope.getperhotlst = res.data;
                        console.log($scope.getperhotlst);
                        $rootScope.showSpinner = false;
                            // notie.alert(3, res.data, config.notify_delay);
                        }
                        
                    }
                })
            }

            // get host list
            $scope.selavaihostgrpfn= function(){
                $scope.appdet = {
                    "HostGroup" : $("#selavailhostgrp").val(),
                    // "username" : sessionStorage.getItem("username"),
                }
                $rootScope.showSpinner = true;
                $intellimonitoringReportService.getreportperhstval($scope.appdet).then(function(res){
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{
                        if(res.result== "failure"){
                            $rootScope.showSpinner = false;
                            notie.alert(3, res.data, config.notify_delay);
                        }else{
                            $scope.getavaihotlst = res.data;
                            console.log($scope.getavaihotlst);
                            $rootScope.showSpinner = false;
                            // notie.alert(3, res.data, config.notify_delay);
                        }
                    }
                })
            }

            // $scope.selperhostfn = function(){

            //     var hostval = $("#selperhost").val();

            //     $scope.userdet = {
            //         "username" : sessionStorage.getItem("username"),
            //     }

            //     $intellimonitoringReportService.getperservicelist(hostval, $scope.userdet ).then(function(res){
            //         if(res == config.service_unavailable){
            //             notie.alert(3, res, config.notify_delay);
            //             $rootScope.showSpinner = false;
            //         }else{
            //             $rootScope.showSpinner = false;
            //             $scope.getperservlst = res;
            //             console.log($scope.getperservlst);
            //         }
            //     })
            // }
            
            //date format picker 
            $('.dateavaipicker').datetimepicker({
                format: 'DD-MM-YYYY'
            });
            $('.datepicker').datetimepicker({
                format: 'DD-MM-YYYY HH:mm'
            });

            // get performance report
            $scope.btngetperreportval = function(){
                var dateval = $("#selreportperfpreriod").val();
                if ($('#LegacyFormperformance').valid()) {
                    if(dateval == 'custom'){
                        var perval = ({
                            "host" : $("#selperhost").val() ,
                            "Time Zone" : sessionStorage.getItem("user_tz") ,
                            "date" : $("#selreportperfpreriod").val(),
                            "extra" : {"sdate":$("#txtperstartdate").val(), "edate":$("#txtperendate").val()}
                        });
                    }
                    else{
                        var perval = {
                            "host" : $("#selperhost").val() ,
                            "Time Zone" : sessionStorage.getItem("user_tz") ,
                            "date" : $("#selreportperfpreriod").val() ,
                        };
                    }

                    // console.log(perval);
                    $rootScope.showSpinner = true;
                    $intellimonitoringReportService.getperreportval(perval).then(function(res){
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{
                            $scope.getpereportvl = res.iframe;
                            // console.log($scope.getpereportvl);
                            $rootScope.showSpinner = false;
                        }
                    })  
                }
            }
            

        }

        $rootScope.$on('monitoringTabChange', function(event, args) {
            if (args["tabname"] == "Reports") {
                if (!bpageloaded) {
                    bpageloaded = true;
                    $scope.init_event();
                    $scope.getallapplication();   
                    $scope.getreportperiodfn(); 
                    $scope.getavailablereport(); 
                    mreport_display_menu();   
                    // $scope.timedisplay_ct();            
                }
            }
        });

    }
]);