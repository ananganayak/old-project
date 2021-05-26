angular.module('widgets').controller('alertsController', [
    '$scope',
    '$rootScope',
    '$timeout',
    '$state',
    'intelliAlertsService',
    function ($scope, $rootScope, $timeout, $state, $intelliAlertsService) {
        'use strict';

        $scope.alerts_list_res = [];

        $scope.alertcurrentPage = 1;
        $scope.alertnumPerPage = 10;

        $scope.totalPages = 1;
        $scope.totalitemCount = 0;

        $scope.filter_status = "all";

        var openrowarr = [];

        var alert_sync_timer;

        var search_filter_key = "null";
        var search_filter_value = "null";
        var search_sorting = "null";

        var sfilterdate;

        $scope.triage_title = "";
        $scope.triage_form = [];
        $scope.triage_history = [];
        $scope.triage_history_popup = [];

        var triage_cmd = "";
        var triage_alertid = "";
        //var triage_machine;

        // ticket id dropdown json value 

        var ticket_alert_id = "";
        var ticket_seleted_id = "";
        var ticket_status = "";

        $scope.custdetlov = "";

        var socket;

        $scope.ticketdropdownLov = [
            {
                id: '1',
                name: 'Create',
                value: 'create'
            },
            {
                id: '2',
                name: 'Update',
                value: 'update'
            },
            {
                id: '3',
                name: 'Status Change',
                value: 'status_change'
            },
            {
                id: '4',
                name: 'Worklog Update'
                , value: 'worklog_update'
            },
            {
                id: '5',
                name: 'Resolve',
                value: 'resolve'
            },
        ];

        $scope.form_master_data = [];

        $scope.calculateTotalPages = function (total_page_count) {
            var totalPages = $scope.alertnumPerPage < 1 ? 1 : Math.ceil(total_page_count / $scope.alertnumPerPage);
            return Math.max(totalPages || 0, 1);
        };

        $scope.noPrevious = function () {
            return $scope.alertcurrentPage === 1;
        };

        $scope.noNext = function () {
            return $scope.alertcurrentPage === $scope.totalPages;
        };

        $scope.filterAlert = function (alert_row) {
            if ($scope.filter_status == "" || $scope.filter_status == alert_row.astatus) {
                return alert_row;
            }
        }

        $scope.selectPage = function (page) {
            if ($scope.alertcurrentPage !== page && page > 0 && page <= $scope.totalPages) {
                $scope.alertcurrentPage = page;
                load_alert_list();
            }
        };

        $scope.PaginationLink = function (page) {
            //console.log(page);
            load_alert_list();
        }

        function display_pagination() {
            var end, start;
            start = ($scope.alertcurrentPage - 1) * $scope.alertnumPerPage;
            end = start + $scope.alertnumPerPage;
            var sendtext = end;
            if (end > $scope.totalitemCount) {
                sendtext = $scope.totalitemCount;
            }
            if (parseInt(sendtext) != 0) {
                $scope.span_page_status = (start + 1) + " - " + parseInt(sendtext);
            } else {
                $scope.span_page_status = "0 - " + parseInt(sendtext);
            }
            $scope.span_total_count = $scope.totalitemCount;
        }

        $scope.setrowstatuscolor = function (severity) {
            var scolorname = "";
            if (severity) {
                severity = severity.toUpperCase();
                if (severity == "CRITICAL") {
                    scolorname = "status_critical";
                } else if (severity == "WARNING") {
                    scolorname = "status_warning";
                } else if (severity == "OK") {
                    scolorname = "status_ok";
                } else if (severity == "UNKNOWN") {
                    scolorname = "status_unknown";
                }
            }
            return scolorname;
        }

        $scope.setsubrowstatuscolor = function (severity) {
            var scolorname = "";
            if (severity) {
                severity = severity.toUpperCase();
                if (severity == "CRITICAL") {
                    scolorname = "status_sub_critical";
                } else if (severity == "WARNING") {
                    scolorname = "status_sub_warning";
                } else if (severity == "OK") {
                    scolorname = "status_sub_ok";
                } else if (severity == "UNKNOWN") {
                    scolorname = "status_sub_unknown";
                }
            }
            return scolorname;
        }

        function load_alert_summary() {
            $intelliAlertsService.alertsSummary({}).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    if (res.result == "success") {
                        var dataarr = res.data;
                        $(".open_count").text(dataarr["open"]);
                        $(".wip_count").text(dataarr["wip"]);
                        $(".pending_count").text(dataarr["pending"]);
                        $(".resolved_count").text(dataarr["resolved"]);
                        $(".closed_count").text(dataarr["closed"]);
                        var itotal = 0;
                        $.each(dataarr, function (inx, ele) {
                            itotal = itotal + parseInt(ele);
                        });
                        $(".total_count").text(itotal);
                    }
                }
            });
        }

        // get customer details
        $scope.getcustdetfunction = function(){
            $intelliAlertsService.getcustdetserv().then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    if (res.result == "success") {
                        $scope.custdetlov = res.data.splice(1);
                        console.log($scope.custdetlov);
                    }
                    $rootScope.showSpinner = false;
                }
            });
        }();

        // search get function
        $scope.getsearchval = function(cid){
            $scope.searchcust = cid;
            $(".custsearch").hide();
        }

        // search function
        $(".custsearch").hide();
        $scope.searchcustfn = function(){
            var custval = $("#custvalueid").val();
            if(custval == ""){
                $(".custsearch").hide();
            }else{
                $(".custsearch").show();
            }
        }

        $scope.backbtn = false;
        
        if($rootScope.hostval != undefined && $rootScope.hostval != "null"){
            $(".tbl_search_filter_sel").val("ciname");
            $(".filter_searchbox").val($rootScope.hostval);
            search_filter_key = "ciname";
            search_filter_value = $rootScope.hostval;
            $scope.alertcurrentPage = 1;
            load_alert_list();
            $scope.backbtn = true;
        }

        $scope.backtomonitoringfn = function(){
            $state.go("monitoring");
            $rootScope.nsdash = "open";
        }

        var dereg = $rootScope.$on('$locationChangeSuccess', function() {
            $rootScope.hostval = "null";
            dereg();
        });

        $scope.downloadAlertCSV = function(){
            var istart = ($scope.alertcurrentPage - 1) * $scope.alertnumPerPage;
            var data_arr = {
                filter: $scope.filter_status,
                start: istart,
                offset: $scope.alertnumPerPage,
                search_filter_key: search_filter_key,
                search_fitler_val: search_filter_value,
                search_sorting: search_sorting
            };
            $rootScope.showSpinner = true;
            $intelliAlertsService.alertsCsvService(data_arr).then(function(res){
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    console.log(res);
                    if (res.result == "success") {
                        const url = res.data.link ;
                        const link = document.createElement('a'); 
                        link.href = url; 
                        link.setAttribute('download', link); 
                        document.body.appendChild(link); 
                        link.click(); 
                        notie.alert(1, "CSV prepared to Download", config.notify_delay);
                        $rootScope.showSpinner = false;
                    } else {
                        notie.alert(3, res.data, config.notify_delay);
                    }
                }
            })

        }

        function load_alert_list() {
            $rootScope.showSpinner = true;
            var istart = ($scope.alertcurrentPage - 1) * $scope.alertnumPerPage;
            var data_arr = {
                filter: $scope.filter_status,
                start: istart,
                offset: $scope.alertnumPerPage,
                search_filter_key: search_filter_key,
                search_fitler_val: search_filter_value,
                search_sorting: search_sorting
            };
            $intelliAlertsService.alertsList(data_arr).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    console.log(res);
                    if (res.result == "success") {
                        $scope.alerts_list_res = res.data["alert"];
                        $scope.totalitemCount = res.data["count"];
                        $scope.totalPages = $scope.calculateTotalPages(res.data["count"]);
                        display_pagination();
                    } else {
                        $scope.alerts_list_res = [];
                        $scope.totalitemCount = 0;
                        // notie.alert(3, res.data, config.notify_delay);
                        $scope.totalPages = $scope.calculateTotalPages(0);
                        display_pagination();
                    }
                }
            });
        }

        /*function load_alert_sync_list() {
         $intelliAlertsService.alertsList({}).then(function(res) {
         if (res.result == "success") {
         display_alert_list(res.data);
         
         }
         });
         }*/

        function validate_form() {
            $(".filter_control .form_error").removeClass("form_error");
            var berror = true;
            if ($(".tbl_search_filter_sel").val() == "datetime") {
                if (!$(".filter_searchdate").val()) {
                    $(".filter_searchdate").addClass("form_error");
                    berror = false;
                }
            } else if($(".tbl_search_filter_sel").val() == "customer_id"){
                if (!$(".filter_cust_searchbox").val()){
                    $(".filter_cust_searchbox").addClass("form_error");
                    berror = false;
                }
            } else{
                if (!$(".filter_searchbox").val()) {
                    $(".filter_searchbox").addClass("form_error");
                    berror = false;
                }
            }
            return berror;
        }

        function triage_form_validate() {
            var bformvalid = true;
            $(".triage_form_panel input").removeClass("form_error");
            var triage_arr = $scope.triage_form;
            for (var i = 0; i < triage_arr.length; i++) {
                var cache_ele = $("input[data-triage-ctrl='ctrl" + triage_arr[i][0] + "']");
                if (!cache_ele.val()) {
                    cache_ele.addClass("form_error");
                    bformvalid = false;
                }
            }
            return bformvalid;
        }

        function load_timeline_data(salertid, panel_ele) {
            //salertid = "AL0000000005446";
            $rootScope.showSpinner = true;
            var data_arr = {
                alertid: salertid
            };
            $intelliAlertsService.automationTimeline(data_arr).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        var res_arr = res.data;
                        var template_arr = [];
                        template_arr.push('<div class="timeline_panel">');
                        $(res_arr).each(function (inx, row) {
                            template_arr.push('<div class="timeline_item">');

                            template_arr.push('<div class="timeline-img">');
                            template_arr.push('<span style="background:' + row['status'] + ';"></span>');
                            template_arr.push('</div>');

                            template_arr.push('<div class="timeline-content"><div class="timeline-content-inner">');
                            template_arr.push('<span class="awsm-date">' + row['starttime'] + '</span>');
                            template_arr.push('<h2>' + row['stages'] + '</h2>');
                            //console.log(inx + row['stages']);
                            if (inx == 4) {
                                if (row['output'] != "") {
                                    template_arr.push('<pre style="max-height:200px;overflow-y: scroll;">' + row['output'] + '</pre>');
                                }
                            } else {
                                template_arr.push('<p>' + row['output'] + '</p>');
                            }
                            template_arr.push('</div></div>');

                            template_arr.push('</div>');
                        });
                        template_arr.push('</div>');
                        //console.log(template_arr.join(""));
                        panel_ele.append(template_arr.join(""));
                    }
                }
            });
        }

        function load_triage_data(salertid, panel_ele) {
            //console.log("load_triage_data");
            $rootScope.showSpinner = true;
            $intelliAlertsService.triageList({alertid: salertid}).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        var resarr = res.triage["triage_name"];
                        var triage_machine = res.machine;
                        var triage_machine_pro = "";
                        var triage_machine_host = "";
                        var triage_machine_port = "";
                        var triage_machine_user = "";

                        if (triage_machine.length > 0) {
                            triage_machine_pro = triage_machine[0]["cred_type"].toLowerCase();
                            triage_machine_host = triage_machine[0]["ip_address"];
                            triage_machine_port = triage_machine[0]["port"];
                            triage_machine_user = triage_machine[0]["username"];
                            console.log(triage_machine_pro);
                        }

                        var template_arr = [];
                        template_arr.push('<div class="triage_panel">');
                        template_arr.push('<div class="triage_panel_left">');
                        template_arr.push('<table style="width:1100px;margin-top:5px;margin-bottom:5px;" data-alertid="' + salertid + '">');
                        for (var i = 0, len = resarr.length; i < len; i += 6) {
                            var temp_arr = resarr.slice(i, i + 6);
                            template_arr.push('<tr>');
                            for (var j = 0; j < temp_arr.length; j++) {
                                template_arr.push('<td><a class="triage_cmd">' + temp_arr[j] + '</a></td>');
                            }
                            template_arr.push('</tr>');
                        }
                        template_arr.push('</table>');
                        template_arr.push('</div>');
                        template_arr.push('<div class="triage_panel_right">');
                        template_arr.push('<img class="triage_remote_terminal" data-pro="' + triage_machine_pro + '" data-host="' + triage_machine_host + '" data-port="' + triage_machine_port + '" data-user="' + triage_machine_user + '"  src="app/img/remote_access-512.png"/>');
                        template_arr.push('<div>');
                        template_arr.push('</div>');
                        panel_ele.append(template_arr.join(""));
                    }
                }
            });
        }

        function load_triage_details(triage_name, salertid) {
            $rootScope.showSpinner = true;
            var data_arr = {
                traige_name: triage_name,
                alertid: salertid
            };
            $rootScope.showSpinner = true;
            $intelliAlertsService.triageDetails(data_arr).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        console.log(res);
                        if (typeof res.form === "object") {
                            $scope.triage_form = res.form.slice(1);
                        } else {
                            $scope.triage_form = [];
                        }
                        if (typeof res.history === "object") {
                            $scope.triage_history = res.history.slice(1);
                        } else {
                            $scope.triage_history = [];
                        }
                        $("#triage_model_form").modal('toggle');
                    }
                }
            });
        }

        function load_tickerform_masterdata() {
            $rootScope.showSpinner = true;
            $intelliAlertsService.load_tickerform_masterdata({}).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        $scope.form_master_data = res.data;
                    }
                }
            });
        }

        function validate_ticket_form() {
            var bformvalid = true;
            $("#formworkflow .form-control").removeClass("form_error");
            for (var i = 0; i < $scope.formval.length; i++) {
                var row = $scope.formval[i];
                var form_ele = $("#formworkflow .form-control[name='ctrl" + row[1] + "']");
                if (!form_ele.val()) {
                    form_ele.addClass("form_error");
                    bformvalid = false;
                }
            }
            return bformvalid;
        }

        // ticket id based dynamic form attribute get.
        $scope.btnformcreate = function (val, salertid, sticketid) {
            ticket_status = val;
            ticket_alert_id = salertid;
            ticket_seleted_id = sticketid;
            $rootScope.showSpinner = true;
            var data_arr = {
                status_value: val
            };
            $intelliAlertsService.tcktformvalget(data_arr).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        $scope.formval = res.data.slice(1);
                        console.log($scope.formval);
                        //console.log($("#formworkflow select").length);
                        $(".alert-from-modal").modal('toggle');
                    }
                }
            });
        }

        function init_event() {



            // clipboard Copy function


            $scope.copyToClipboard = function() {
                var copyText = $(".table_copy").html();
                var success = true,
                    range = document.createRange(),
                    selection;
                // For IE.
                if (window.clipboardData) {
                    window.clipboardData.setData("Text", copyText);
                } else {
                    // Create a temporary element off screen.
                    var tmpElem = $('<div>');
                    tmpElem.css({
                        position: "absolute",
                        left: "-1000px",
                        top: "-1000px",
                    });
                    // Add the input value to the temp element.
                    tmpElem.text(copyText);
                    $("body").append(tmpElem);
                    // Select temp element.
                    range.selectNodeContents(tmpElem.get(0));
                    selection = window.getSelection();
                    selection.removeAllRanges();
                    selection.addRange(range);
                    // Lets copy.
                    success = document.execCommand("copy", false, null);             
                    if (success) {
                        // alert("The text is on the clipboard, try to paste it!");
                        notie.alert(1, "The text is on the clipboard, try to paste it!");
                        // remove temp element.
                        tmpElem.remove();
                    }
                }
            }


            $(".alertsController .info-box .panel-body").click(function () {
                $(".alertsController .info-box .panel-body").removeClass("infobox_active");
                $(this).addClass("infobox_active");
                var filter_name = $(this).attr("data_filter_name");
                $scope.filter_status = filter_name;
                $scope.alertcurrentPage = 1;
                load_alert_list();
            });

            $(".alert_table").on('click', '.icon_alert', function () {
                var cache_ele = $(this);
                var cache_tr_panel = cache_ele.closest("tr").next();
                cache_ele.closest("tr").find(".icon_ticket i").removeClass("fa-minus-square-o").addClass("fa-plus-square-o");
                cache_ele.closest("tr").find(".triage_icon_link").removeClass("fa-minus-square-o").addClass("fa-plus-square-o");
                var salertid = cache_ele.find("i").attr("data-tempid");
                if (cache_ele.find("i").hasClass("fa-plus-square-o")) {

                    if (openrowarr.indexOf(salertid) == -1) {
                        openrowarr.push(salertid);
                    }

                    cache_ele.find("i").removeClass("fa-plus-square-o");
                    cache_ele.find("i").addClass("fa-minus-square-o");

                    cache_tr_panel.find(".ticket_content_panel").hide();
                    cache_tr_panel.find(".triage_content_panel").hide();
                    cache_tr_panel.find(".alter_content_panel").show();
                    cache_tr_panel.fadeIn('slow');
                } else {
                    cache_ele.find("i").removeClass("fa-minus-square-o");
                    cache_ele.find("i").addClass("fa-plus-square-o");

                    if (openrowarr.indexOf(salertid) > -1) {
                        openrowarr.splice(openrowarr.indexOf(salertid), 1);
                    }
                    cache_tr_panel.fadeOut('slow');
                }
                return false;
            });

            $(".alert_table").on('click', '.icon_ticket', function () {
                //debuger;
                var cache_ele = $(this);
                cache_ele.closest("tr").find(".icon_alert i").removeClass("fa-minus-square-o").addClass("fa-plus-square-o");
                cache_ele.closest("tr").find(".triage_icon_link").removeClass("fa-minus-square-o").addClass("fa-plus-square-o");
                var sticketid = cache_ele.find("i").attr("data-tempid");
                var salertid = cache_ele.find("i").attr("data-alertid");
                var cache_tr_panel = cache_ele.closest("tr").next();
                if (cache_ele.find("i").hasClass("fa-plus-square-o")) {

                    if (openrowarr.indexOf(sticketid) == -1) {
                        openrowarr.push(sticketid);
                    }

                    cache_ele.find("i").removeClass("fa-plus-square-o");
                    cache_ele.find("i").addClass("fa-minus-square-o");

                    cache_tr_panel.find(".alter_content_panel").hide();
                    cache_tr_panel.find(".triage_content_panel").hide();
                    cache_tr_panel.find(".ticket_content_panel").show();
                    cache_tr_panel.fadeIn('slow');

                    var panel_ele = cache_tr_panel.find(".ticket_content_panel");
                    if (panel_ele.find(".timeline_panel").length == 0) {
                        load_timeline_data(salertid, panel_ele);
                    }

                } else {
                    cache_ele.find("i").removeClass("fa-minus-square-o");
                    cache_ele.find("i").addClass("fa-plus-square-o");

                    if (openrowarr.indexOf(sticketid) > -1) {
                        openrowarr.splice(openrowarr.indexOf(sticketid), 1);
                    }

                    cache_tr_panel.fadeOut('slow');
                }
                return false;
            });


            $(".alert_table").on('click', '.triage_icon_link', function () {
                //console.log("triage_icon_link"); 
                var cache_ele = $(this);
                var salertid = cache_ele.attr("data-alertid");
                var cache_tr_panel = cache_ele.closest("tr").next();

                cache_ele.closest("tr").find(".icon_ticket i").removeClass("fa-minus-square-o").addClass("fa-plus-square-o");
                cache_ele.closest("tr").find(".icon_alert i").removeClass("fa-minus-square-o").addClass("fa-plus-square-o");

                if (cache_ele.hasClass("fa-plus-square-o")) {

                    cache_ele.removeClass("fa-plus-square-o");
                    cache_ele.addClass("fa-minus-square-o");

                    cache_tr_panel.find(".alter_content_panel").hide();
                    cache_tr_panel.find(".ticket_content_panel").hide();
                    cache_tr_panel.find(".triage_content_panel").show();

                    cache_tr_panel.fadeIn('slow');

                    var panel_ele = cache_tr_panel.find(".triage_content_panel");
                    if (panel_ele.find(".triage_panel").length == 0) {
                        //load_timeline_data(salertid, panel_ele);
                        load_triage_data(salertid, panel_ele);
                    }

                } else {

                    cache_ele.removeClass("fa-minus-square-o");
                    cache_ele.addClass("fa-plus-square-o");

                    cache_tr_panel.fadeOut('slow');
                }
                return false;
            });

            $(".alert_table").on('click', '.triage_history_link', function () {
                var cache_ele = $(this);
                var salertid = cache_ele.attr("data-alertid");
                //console.log(salertid);
                var data_arr = {
                    alert_id: salertid
                };
                $rootScope.showSpinner = true;
                $intelliAlertsService.load_triage_history(data_arr).then(function (res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        $rootScope.showSpinner = false;
                        if (res.result == "success") {
                            $scope.triage_history_popup = res.data.slice(1);
                        } else {
                            $scope.triage_history_popup = [];
                        }
                    }
                });
                $(".triage_result_popup").modal('toggle');
                return false;
            });


            $(".alert_table").on('click', '.triage_cmd', function () {
                var cache_ele = $(this);
                triage_cmd = cache_ele.text();
                triage_alertid = cache_ele.closest("table").attr("data-alertid");
                $scope.triage_title = triage_cmd;
                load_triage_details(triage_cmd, triage_alertid);
            });

            $(".alert_table").on('click', '.triage_remote_terminal', function () {
                var cache_ele = $(this);
                var sparam = "pro=" + cache_ele.attr("data-pro") + "&host=" + cache_ele.attr("data-host") + "&port=" + cache_ele.attr("data-port") + "&user=" + cache_ele.attr("data-user");
                window.open("http://95.216.28.228:3001/aiconsole/index.html?" + sparam);
            });

            $("#btntriageexecute").click(function () {
                if (triage_form_validate()) {
                    var form_obj = {};
                    var triage_arr = $scope.triage_form;
                    for (var i = 0; i < triage_arr.length; i++) {
                        form_obj[triage_arr[i][0]] = $("input[data-triage-ctrl='ctrl" + triage_arr[i][0] + "']").val();
                    }
                    var data_arr = {
                        "triage_name": triage_cmd,
                        "alert_id": triage_alertid,
                        "form_data": form_obj
                    };
                    $rootScope.showSpinner = true;
                    $intelliAlertsService.triageExecute(data_arr).then(function (res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{ 
                            $rootScope.showSpinner = false;
                            if (res.result == "success") {
                                notie.alert(1, triage_cmd + " Executed Successfully!", config.notify_delay);
                                var res_arr = [res.data['output'], res.data['datetime']];
                                $scope.triage_history.unshift(res_arr);
                            } else {
                                notie.alert(3, res.data, config.notify_delay);
                            }
                        }
                    });
                }
                return false;
            });

            $(".alertsController .pagination_dropdown a").click(function () {
                var selnum = $(this).text();
                $(".span_pagination_text").text(selnum);
                $scope.alertcurrentPage = 1;
                $scope.alertnumPerPage = parseInt(selnum);
                load_alert_list();
            });

            /*alert_sync_timer = $interval(function() {
             if ($(".alert_table").find(".fa-minus-square-o").length == 0 && $(".nav-tabs li.active").attr("data-role") == "alerts") {
             load_alert_sync_list();
             }
             }, 10000);*/
             $(".tbl_cust_search_txt_pnl").hide();
             $(".tbl_search_txt_pnl").show();
            $(".tbl_search_filter_sel").change(function () {
                var cache_ele = $(this);
                $(".filter_control .form_error").removeClass("form_error");
                search_filter_key = "null";
                search_filter_value = "null";
                $(".filter_control > div").hide()
                if (cache_ele.val() == "datetime") {
                    $(".tbl_search_date_pnl").show();
                } else if (cache_ele.val() == "Status") {
                    $(".tbl_search_sel_pnl").show();
                } else if (cache_ele.val() == "customer_id") {
                    $(".tbl_cust_search_txt_pnl").show();
                }else {
                    $(".tbl_search_txt_pnl").show();
                }
                return false;
            });

            $('.alertsController input[name="est_date"]').daterangepicker({
                "showDropdowns": true,
                linkedCalendars: false
            });

            $('.alertsController input[name="est_date"]').on('apply.daterangepicker', function (ev, picker) {
                var startdate = picker.startDate.format('DD-MMM-YYYY');
                var enddate = picker.endDate.format('DD-MMM-YYYY');
                sfilterdate = startdate.toUpperCase() + "__" + enddate.toUpperCase();
            });

            $(".alert_header th[data-col='sorting']").click(function () {
                //clear any oher sorting ...
                $(".alert_header th[data-col='sorting']").not(this).attr("class", "sorting");
                var cache_ele = $(this);
                var sname = cache_ele.attr("data-key");
                if (cache_ele.hasClass("sorting")) {
                    cache_ele.attr("class", "sorting_asc");
                    sname = sname + "_a";
                } else if (cache_ele.hasClass("sorting_asc")) {
                    cache_ele.attr("class", "sorting_desc");
                    sname = sname + "_d";
                } else if (cache_ele.hasClass("sorting_desc")) {
                    cache_ele.attr("class", "sorting_asc");
                    sname = sname + "_a";
                }
                search_sorting = sname;
                $scope.alertcurrentPage = 1;
                load_alert_list();
                return false;
            });

            $(".btn_search_go").click(function () {
                if (validate_form()) {
                    search_filter_key = $(".tbl_search_filter_sel").val();
                    if ($(".tbl_search_filter_sel").val() == "datetime") {
                        //search_filter_value = $(".filter_searchdate").val();
                        search_filter_value = sfilterdate;
                    } else if($(".tbl_search_filter_sel").val() == "customer_id"){
                        var custrowdata = $(".filter_cust_searchbox").val();
                        search_filter_value = custrowdata.split('::')[1];
                        // alert(custrowdata.split('::')[1]);
                    } else {
                        search_filter_value = $(".filter_searchbox").val();
                    }
                    $scope.alertcurrentPage = 1;
                    load_alert_list();
                }
                return false;
            });

            $(".btn_search_clear").click(function () {
                search_filter_key = "null";
                search_filter_value = "null";
                search_filter_value = "null";
                search_sorting = "null";
                $rootScope.hostval = "null";
                $(".custsearch").hide();
                $(".filter_searchdate,.filter_searchbox, .filter_cust_searchbox").val("");
                $(".tbl_search_filter_sel").val("alert_id");
                $(".filter_control .form_error").removeClass("form_error");
                $scope.alertcurrentPage = 1;
                load_alert_list();
                return false;
            });

            $("#formworkflow").on('change', 'select[name="ctrlCategory"]', function () {
                var sval = $('select[name="ctrlCategory"] option:selected').attr("data-val");
                var data_arr = {
                    "category_id": sval
                };
                $rootScope.showSpinner = true;
                $intelliAlertsService.load_ticket_subcategory(data_arr).then(function (res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        $rootScope.showSpinner = false;
                        var cache_ele = $('select[name="ctrlSub-Category"]');
                        cache_ele.find("option").remove();
                        if (res.result == "success") {
                            var data_arr = res.data[0];
                            var final_arr = data_arr["sub_category"][1];
                            for (var i = 0; i < final_arr.length; i++) {
                                cache_ele.append("<option value='" + final_arr[i] + "'>" + final_arr[i] + "</option>");
                            }
                        }
                    }
                });
            });

            $("#ticketformsave").click(function () {
                console.log("ticketformsave click");
                if (validate_ticket_form()) {
                    var data_obj = {};

                    if (ticket_seleted_id) {
                        data_obj["Ticket ID"] = ticket_seleted_id;
                    }

                    for (var i = 0; i < $scope.formval.length; i++) {
                        var skey = $scope.formval[i][1];
                        var form_ele = $("#formworkflow .form-control[name='ctrl" + skey + "']");
                        data_obj[skey] = form_ele.val();
                    }
                    //console.log(data_obj);
                    var ticket_action_cmd = "";
                    if (ticket_status == "create") {
                        ticket_action_cmd = "createticket";
                        data_obj["Alert_id"] = ticket_alert_id;
                    } else if (ticket_status == "status_change") {
                        ticket_action_cmd = "changeticketstatus";
                    } else if (ticket_status == "worklog_update") {
                        ticket_action_cmd = "addticketworklog";
                    } else if (ticket_status == "resolve") {
                        ticket_action_cmd = "resolveticket";
                    } else if (ticket_status == "update") {
                        ticket_action_cmd = "changegroup";
                    }

                    data_obj["action_cmd"] = ticket_action_cmd;

                    $rootScope.showSpinner = true;
                    $intelliAlertsService.ticket_save_form(data_obj).then(function (res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{ 
                            $rootScope.showSpinner = false;
                            if (res.result == "success") {
                                $(".alert-from-modal").modal('toggle');
                                if (typeof res.data === 'string') {
                                    notie.alert(1, res.data, config.notify_delay);
                                } else {

                                    for (var i = 0; i < $scope.alerts_list_res.length; i++) {
                                        var row = $scope.alerts_list_res[i];
                                        if (row.alertid == ticket_alert_id) {
                                            row.itsmid = res.data['ticket_id'];
                                            $scope.alerts_list_res[i] = row;
                                            $scope.$apply();
                                            break;
                                        }
                                    }

                                    notie.alert(1, "Ticket ID : " + res.data['ticket_id'] + " created successfully!", config.notify_delay);
                                }
                            }
                        }
                    });
                }
                return false;
            });

            $(".alert_full_screen").click(function () {
                $(".alert_full_screen").hide();
                $(".alert_exit_screen").show();
                //document.getElementsByClassName(".alert_exit_screen").style.display = "inline-block";
                $(".alert_exit_screen").css({"display" : "inline-block"});
                $('.alertsController').addClass("alert_fullscreen");
                return false;
            });

            $(".alert_exit_screen").click(function () {
                $(".alert_exit_screen").hide();
                $(".alert_full_screen").show();
                //$(".alert_exit_screen").css({"display" : "inline-block"});
                $('.alertsController').removeClass("alert_fullscreen");
                return false;
            });

            //$(".slimscroll").slimScroll();

            var imodelcontentheight = $(window).height() - ($(".alert-from-modal .modal-header").outerHeight() + $(".alert-from-modal .modal-footer").outerHeight());
            $(".alert-from-modal .modal-body").css({"height": imodelcontentheight + "px", "overflow-y": "auto"});


            //$("#stylescroll").slimScroll();
        }

        // var socket;

        function refresh_alert_summary(data_row) {
            var itemp = 0;
            if (data_row.total != 0) {
                itemp = parseInt($(".total_count").text()) + data_row.total;
                $(".total_count").text(itemp);
                $(".total_count").closest(".panel-body").effect("highlight", {color: 'ivory'}, 3000);
                $scope.span_total_count = itemp;
            }
            if (data_row.open != 0) {
                //console.log(data_row.open);
                itemp = parseInt($(".open_count").text()) + data_row.open;
                $(".open_count").text(itemp);
                $(".open_count").closest(".panel-body").effect("highlight", {color: 'ivory'}, 3000);
            }
            if (data_row.wip != 0) {
                itemp = parseInt($(".wip_count").text()) + data_row.wip;
                $(".wip_count").text(itemp);
                $(".wip_count").closest(".panel-body").effect("highlight", {color: 'ivory'}, 3000);
            }
            if (data_row.pending != 0) {
                itemp = parseInt($(".pending_count").text()) + data_row.pending;
                $(".pending_count").text(itemp);
                $(".pending_count").closest(".panel-body").effect("highlight", {color: 'ivory'}, 3000);
            }
            if (data_row.resolve != 0) {
                itemp = parseInt($(".resolved_count").text()) + data_row.resolve;
                $(".resolved_count").text(itemp);
                $(".resolved_count").closest(".panel-body").effect("highlight", {color: 'ivory'}, 3000);
            }
            if (data_row.closed != 0) {
                itemp = parseInt($(".closed_count").text()) + data_row.closed;
                $(".closed_count").text(itemp);
                $(".closed_count").closest(".panel-body").effect("highlight", {color: 'ivory'}, 3000);
            }
        }

        function socket_test() {
            $.getJSON("app/widgets/alerts/json/createalertsocket.json", function (data) {
                var res_arr = data;
                if (res_arr.Action == "create" && res_arr.Module == "alert" && $scope.alertcurrentPage == 1) {
                    var data_arr = res_arr.Data;
                    refresh_alert_summary(data_arr.status_legends);
                    var event_data = [data_arr.event_details];
                    var screate_date = new Date(data_arr.alert_details["event_created_time"] * 1000)
                    screate_date = create_date.toLocaleString();
                    var alert_row = {
                        "alertid": data_arr.alert_details["alertid"],
                        "aci_name": data_arr.alert_details["ci_name"],
                        "acomponent": data_arr.alert_details["component"],
                        "adescription": data_arr.alert_details["description"],
                        "anotes": data_arr.alert_details["notes"],
                        "aseverity": data_arr.alert_details["severity"],
                        "alert_created_time": screate_date,
                        "asource": data_arr.alert_details["source"],
                        "astatus": data_arr.alert_details["status"],
                        "automationid": "",
                        "itsmid": "",
                        "associated_events": event_data
                    };
                    var alert_datatable = $scope.alerts_list_res;
                    alert_datatable.unshift(alert_row);
                    alert_datatable = alert_datatable.slice(0, $scope.alertnumPerPage);
                    $scope.alerts_list_res = alert_datatable;
                    $scope.$apply();
                    $(".alert_table tbody:first").effect("highlight", {color: 'ivory'}, 3000);
                }
            });
        }

        function socket_update() {
            console.log("socket_update");
            $.getJSON("app/widgets/alerts/json/updatealertsocket.json", function (data) {
                var res_arr = data;
                if (res_arr.Action == "update" && res_arr.Module == "alert") {
                    var data_arr = res_arr.Data;
                    refresh_alert_summary(data_arr.status_legends);
                    var alert_datatable = $scope.alerts_list_res;
                    for (var i = 0; i < alert_datatable.length; i++) {
                        // console.log(alert_datatable[i]);
                        if (alert_datatable[i].alertid == data_arr.alertid) {
                            //console.log(alert_datatable[i].alertid);
                            alert_datatable[i].aseverity = data_arr.alert_details["severity"];
                            alert_datatable[i].associated_events.push(data_arr.event_details);
                            $scope.alerts_list_res = alert_datatable;
                            $scope.$apply();
                            break;
                        }
                    }
                }
            });
        }

        function auto_refresh() {

            socket = io.connect(config.messagesocket, {transports: ['websocket']});

            socket.on('connect', function () {
                console.log("Alert socket Connected");
            });

            socket.on('alert', function (data) {
                var res_arr = data;
                console.log(res_arr);
                if (res_arr.Action == "create" && res_arr.Module == "alert" && $scope.alertcurrentPage == 1) {
                    var data_arr = res_arr.Data;
                    refresh_alert_summary(data_arr.status_legends);
                    //debugger;
                    var event_data = data_arr.event_details;
                    var sevent_date = new Date(event_data["event_created_time"] * 1000);
                    sevent_date = sevent_date.toLocaleString();
                    event_data["event_created_time"] = sevent_date;

                    var screate_date = new Date(data_arr.alert_details["event_created_time"] * 1000);
                    screate_date = screate_date.toLocaleString();
                    var alert_row = {
                        "alertid": data_arr.alert_details["alertid"],
                        "aci_name": data_arr.alert_details["ci_name"],
                        "acomponent": data_arr.alert_details["component"],
                        "adescription": data_arr.alert_details["description"],
                        "anotes": data_arr.alert_details["notes"],
                        "aseverity": data_arr.alert_details["severity"],
                        "alert_created_time": screate_date,
                        "asource": data_arr.alert_details["source"],
                        "astatus": data_arr.alert_details["status"],
                        "automationid": "",
                        "itsmid": "",
                        "associated_events": [event_data]
                    };
                    var alert_datatable = $scope.alerts_list_res;
                    alert_datatable.unshift(alert_row);
                    alert_datatable = alert_datatable.slice(0, $scope.alertnumPerPage);
                    //console.log(alert_datatable);
                    $scope.alerts_list_res = alert_datatable;
                    $scope.$apply();
                    $(".alert_table tbody:first").effect("highlight", {color: 'ivory'}, 3000);

                } else if (res_arr.Action == "update" && res_arr.Module == "alert") {
                    var data_arr = res_arr.Data;
                    if (data_arr.status_legends) {
                        refresh_alert_summary(data_arr.status_legends);
                    }
                    var alert_datatable = $scope.alerts_list_res;
                    for (var i = 0; i < alert_datatable.length; i++) {
                        // console.log(alert_datatable[i]);
                        if (alert_datatable[i].alertid == data_arr.alertid) {
                            //console.log(alert_datatable[i].alertid);
                            if (data_arr.alert_details) {
                                alert_datatable[i].aseverity = data_arr.alert_details["severity"];
                            }
                            if (data_arr.status_details) {
                                alert_datatable[i].astatus = data_arr.status_details["status"];
                            }
                            if (data_arr.ticket_details) {
                                alert_datatable[i].itsmid = data_arr.ticket_details["ticketid"];
                            }
                            if (data_arr.bot_details) {
                                alert_datatable[i].automationid = data_arr.bot_details["botname"];
                            }
                            if (data_arr.event_details) {
                                var event_arr = data_arr.event_details;
                                var sevent_date = new Date(event_arr["event_created_time"] * 1000);
                                sevent_date = sevent_date.toLocaleString();
                                event_arr["event_created_time"] = sevent_date;
                                //console.log(alert_datatable[i].associated_events);
                                alert_datatable[i].associated_events.unshift(event_arr);
                            }
                            $scope.alerts_list_res = alert_datatable;
                            $scope.$apply();
                            break;
                        }
                    }
                }
            });


        }

        $scope.init = function () {
            load_alert_summary();
            load_alert_list();
            load_tickerform_masterdata();
            init_event();
            // $(".custsearch").hide();
            auto_refresh();
            /*$timeout(function () {
             socket_test();
             }, 5000, false);
             
             $timeout(function () {
             //socket_update();
             socket_test();
             }, 10000, false);
             
             $timeout(function () {
             socket_test();
             }, 15000, false);*/

            /*setInterval(function () {
             socket_test();
             }, 5000);*/
        }

        $scope.alert_finish_render = function () {
            for (var i = 0; i < openrowarr.length; i++) {
                $(".alert_table i[data-tempid='" + openrowarr[i] + "']").closest("td").trigger("click");
            }
            openrowarr = [];
            $timeout(function () {
                angular.element(document).ready(function () {
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }, 100, false);

        }

        $scope.triage_finish_render = function () {
            var iheaderheight = $("#triage_model_form .modal-header").outerHeight() + $(".triage_form_action").outerHeight() + $("#triage_model_form .modal-title").outerHeight();
            var final_height = $(window).height() - iheaderheight - 40;

            $(".triage_form_result").css({
                "height": final_height + "px",
                "overflow-y": "scroll"
            });
        }

        $scope.ticket_form_finish = function () {
            //console.log($scope.form_master_data);
            if (ticket_seleted_id) {
                $("input[name='ctrlTicket ID']").val(ticket_seleted_id);
            }
            for (var k = 0; k < $scope.form_master_data.length; k++) {
                var master_arr = $scope.form_master_data[k];
                var skey = Object.keys(master_arr);
                for (var i = 0; i < $scope.formval.length; i++) {
                    var row = $scope.formval[i];
                    if (row[1] == skey[0]) {
                        var cache_ele = $("select[name='ctrl" + skey[0] + "']");
                        cache_ele.find("option").remove();
                        var value_arr = master_arr[skey[0]][0];
                        var final_arr = master_arr[skey[0]][1];
                        for (var j = 0; j < final_arr.length; j++) {
                            cache_ele.append("<option data-val='" + value_arr[j] + "' value='" + final_arr[j] + "'>" + final_arr[j] + "</option>");
                        }
                    }
                }
            }
        }

        /*$scope.$on("$destroy", function() {
         $interval.cancel(alert_sync_timer);
         });*/

    }
]);