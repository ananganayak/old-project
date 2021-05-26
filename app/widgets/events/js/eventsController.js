angular.module('widgets').controller('eventsController', [
    '$scope',
    '$rootScope',
    '$interval',
    'intelliEventsService',
    function($scope, $rootScope, $interval, $intelliEventsService) {
        'use strict';

        //22-11-2018 ~ Nakkeeran  New Pagination going to include

        $scope.events_list_res = [];

        $scope.eventcurrentPage = 1;
        $scope.eventnumPerPage = 10;

        $scope.totalPages = 1;
        $scope.totalitemCount = 0;

        $scope.filter_status = "all";

        var sfilterdate;

        var event_sync_timer;
        var bpageloaded = false;

        var search_filter_key = "null";
        var search_filter_value = "null";
        var search_sorting = "null";

        $scope.calculateTotalPages = function(total_page_count) {
            var totalPages = $scope.eventnumPerPage < 1 ? 1 : Math.ceil(total_page_count / $scope.eventnumPerPage);
            return Math.max(totalPages || 0, 1);
        };

        $scope.noPrevious = function() {
            return $scope.eventcurrentPage === 1;
        };

        $scope.noNext = function() {
            return $scope.eventcurrentPage === $scope.totalPages;
        };

        $scope.selectPage = function(page) {
            if ($scope.eventcurrentPage !== page && page > 0 && page <= $scope.totalPages) {
                $scope.eventcurrentPage = page;
                load_event_list();
            }
        };

        $scope.PaginationLink = function(page) {
            load_event_list();
        }

        function display_pagination() {
            var end, start;
            start = ($scope.eventcurrentPage - 1) * $scope.eventnumPerPage;
            end = start + $scope.eventnumPerPage;
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

        $scope.setrowstatuscolor = function(severity) {
            var scolorname = "";
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
            return scolorname;
        }

        function load_event_summary() {
            $intelliEventsService.eventssummary({}).then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    if (res.result == "success") {
                        var dataarr = res.data;
                        $(".event_open_count").text(dataarr["open"]);
                        $(".event_wip_count").text(dataarr["wip"]);
                        $(".event_pending_count").text(dataarr["pending"]);
                        $(".event_resolved_count").text(dataarr["resolved"]);
                        $(".event_closed_count").text(dataarr["closed"]);
                        var itotal = 0;
                        $.each(dataarr, function(inx, ele) {
                            itotal = itotal + parseInt(ele);
                        });
                        $(".event_total_count").text(itotal);
                    }
                }
            });
        }

        // get customer details
        $scope.getcustdetfunction = function(){
            $intelliEventsService.getcustdetserv().then(function (res) {
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
        };

        // search get function
        $scope.getsearchval = function(cid){
            $scope.searchevcust = cid;
            $(".custssearch").hide();
        }

        // search function
        $(".custssearch").hide();
        $scope.searchcustfn = function(){
            var custval = $("#custeventvalueid").val();
            if(custval == ""){
                $(".custssearch").hide();
            }else{
                $(".custssearch").show();
            }
        }

        function load_event_list() {
            $rootScope.showSpinner = true;
            var istart = ($scope.eventcurrentPage - 1) * $scope.eventnumPerPage;
            var data_arr = {
                filter: $scope.filter_status,
                start: istart,
                offset: $scope.eventnumPerPage,
                search_filter_key: search_filter_key,
                search_fitler_val: search_filter_value,
                search_sorting: search_sorting
            };
            $intelliEventsService.eventsList(data_arr).then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        $scope.events_list_res = res.data["event"];
                        $scope.totalitemCount = res.data["count"];
                        $scope.totalPages = $scope.calculateTotalPages(res.data["count"]);
                        display_pagination();
                        //$scope.$apply();
                    }
                    else {
                        $scope.events_list_res = [];
                        $scope.totalitemCount = 0;
                        $scope.totalPages = $scope.calculateTotalPages(0);
                        display_pagination();
                    }
                }
            });
        }

        /*function load_alert_sync_list() {
         $intelliEventsService.eventsList({}).then(function(res) {
         if (res.result == "success") {
         display_event_list(res.data);
         }
         });
         }*/

        function validate_form() {
            $(".filter_event_control .form_error").removeClass("form_error");
            var berror = true;
            if ($(".filter_event_searchbox").is(":visible")) {
                if (!$(".filter_event_searchbox").val()) {
                    $(".filter_event_searchbox").addClass("form_error");
                    berror = false;
                }
            } else if($(".filter_custs_searchbox").is(":visible")){
                if (!$(".filter_custs_searchbox").val()) {
                    $(".filter_custs_searchbox").addClass("form_error");
                    berror = false;
                }
            }
            return berror;
        }

        function init_event() {
            
            $(".eventsController .info-box .panel-body").click(function() {
                $(".eventsController .info-box .panel-body").removeClass("infobox_active");
                $(this).addClass("infobox_active");
                var filter_name = $(this).attr("data_filter_name");
                //console.log(filter_name);
                $scope.filter_status = filter_name;
                $scope.eventcurrentPage = 1;
                load_event_list();
            });

            $(".eventsController .pagination_dropdown a").click(function() {
                var selnum = $(this).text();
                $(".span_pagination_text").text(selnum);
                $scope.eventcurrentPage = 1;
                $scope.eventnumPerPage = parseInt(selnum);
                load_event_list();
            });

            $(".tbl_custs_search_txt_pnl").hide();
            $(".tbl_event_search_txt_pnl").show();
            $(".tbl_event_filter_sel").change(function() {
                var cache_ele = $(this);
                $(".filter_event_control .form_error").removeClass("form_error");
                $(".filter_event_control > div,.filter_event_control select").hide();
                if (cache_ele.val() == "datetime") {
                    $(".tbl_event_search_date_pnl").show();
                } else if (cache_ele.val() == "source") {
                    $(".tbl_event_search_sel_pnl").show();
                    $("#sel_event_source").show();
                } else if (cache_ele.val() == "severity") {
                    $(".tbl_event_search_sel_pnl").show();
                    $("#sel_event_severity").show();
                } else if (cache_ele.val() == "customer_id") {
                    $(".tbl_custs_search_txt_pnl").show();
                } else {
                    $(".tbl_event_search_txt_pnl").show();
                }
                return false;
            });

            $('input[name="event_est_date"]').daterangepicker({
                "showDropdowns": true,
                linkedCalendars: false
            });

            $('input[name="event_est_date"]').on('apply.daterangepicker', function(ev, picker) {
                var startdate = picker.startDate.format('DD-MMM-YYYY');
                var enddate = picker.endDate.format('DD-MMM-YYYY');
                sfilterdate = startdate.toUpperCase() + "__" + enddate.toUpperCase();
                console.log(sfilterdate);
            });

            $(".event_header th[data-col='sorting']").click(function() {
                //clear any oher sorting ...
                $(".event_header th[data-col='sorting']").not(this).attr("class", "sorting");
                var cache_ele = $(this);
                var sname = cache_ele.attr("data-key");
                if (cache_ele.hasClass("sorting")) {
                    cache_ele.attr("class", "sorting_asc");
                    sname = sname + "_a";
                }
                else if (cache_ele.hasClass("sorting_asc")) {
                    cache_ele.attr("class", "sorting_desc");
                    sname = sname + "_d";
                }
                else if (cache_ele.hasClass("sorting_desc")) {
                    cache_ele.attr("class", "sorting_asc");
                    sname = sname + "_a";
                }
                search_sorting = sname;
                $scope.eventcurrentPage = 1;
                load_event_list();
                return false;
            });

            $(".btn_search_event_go").click(function() {
                if (validate_form()) {
                    search_filter_key = $(".tbl_event_filter_sel").val();
                    if (search_filter_key == "datetime") {
                        //search_filter_value = $(".filter_event_searchdate").val();
                        search_filter_value = sfilterdate;
                    }
                    else if (search_filter_key == "source") {
                        search_filter_value = $("#sel_event_source").val();
                    } else if (search_filter_key == "severity") {
                        search_filter_value = $("#sel_event_severity").val();
                    } else if(search_filter_key == "customer_id"){
                        var custrowdata = $(".filter_custs_searchbox").val();
                        search_filter_value = custrowdata.split('::')[1];
                        // alert(custrowdata.split('::')[1]);
                    } else {
                        search_filter_value = $(".filter_event_searchbox").val();
                    }
                    $scope.eventcurrentPage = 1;
                    load_event_list();
                }
                return false;
            });

            $(".btn_event_search_clear").click(function() {
                search_filter_key = "null";
                search_filter_value = "null";
                search_sorting = "null";
                $(".filter_event_searchdate,.filter_event_searchbox, .filter_custs_searchbox").val("");
                $(".tbl_event_filter_sel").val("event_id");
                $scope.eventcurrentPage = 1;
                load_event_list();
                return false;
            });

            /*event_sync_timer = $interval(function() {
             if ($(".nav-tabs li.active").attr("data-role") == "events") {
             load_alert_sync_list();
             }
             }, 5000);*/

        }

        /*$scope.$on("$destroy", function() {
         $interval.cancel(event_sync_timer);
         });*/

        $rootScope.$on('EVMTabChange', function(event, args) {
            if (args["tabname"] == "Events") {
                $(".custssearch").hide();
                if (!bpageloaded) {
                    bpageloaded = true;
                    load_event_summary();
                    $scope.getcustdetfunction();
                    load_event_list();
                    init_event();
                }
            }
        });
    }
]);