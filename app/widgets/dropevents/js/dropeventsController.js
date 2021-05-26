angular.module('widgets').controller('dropeventsController', [
    '$scope',
    '$rootScope',
    '$interval',
    'intelliDropEventsService',
    function($scope, $rootScope, $interval, $intelliDropEventsService) {
        'use strict';

        var bpageloaded = false;

        $scope.dropevents_list_res = [];

        $scope.dropcurrentPage = 1;
        $scope.dropnumPerPage = 10;

        $scope.totalPages = 1;
        $scope.totalitemCount = 0;

        var cache_promote_link;

        $scope.calculateTotalPages = function(total_page_count) {
            var totalPages = $scope.dropnumPerPage < 1 ? 1 : Math.ceil(total_page_count / $scope.dropnumPerPage);
            return Math.max(totalPages || 0, 1);
        };

        $scope.noPrevious = function() {
            return $scope.dropcurrentPage === 1;
        };

        $scope.noNext = function() {
            return $scope.dropcurrentPage === $scope.totalPages;
        };

        $scope.PaginationLink = function(page) {
            load_drop_events_list();
        }
        
        function display_pagination() {
            var end, start;
            start = ($scope.dropcurrentPage - 1) * $scope.dropnumPerPage;
            end = start + $scope.dropnumPerPage;
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

        function load_drop_events_list() {
            $rootScope.showSpinner = true;
            var istart = ($scope.dropcurrentPage - 1) * $scope.dropnumPerPage;
            var data_arr = {
                start: istart,
                offset: $scope.dropnumPerPage
            };
            $intelliDropEventsService.dropeventsList(data_arr).then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        var drop_res = res.data["dropped_events"];
                        var final_arr = [];
                        for (var i = 0; i < drop_res.length; i++) {
                            var temp_arr = drop_res[i][0];
                            temp_arr["more"] = [];
                            for (var j = 1; j < drop_res[i].length; j++) {
                                temp_arr["more"].push(drop_res[i][j]);
                            }
                            final_arr.push(temp_arr);
                        }
                        $scope.dropevents_list_res = final_arr;
                        $rootScope.dropevents_count = $scope.dropevents_list_res.length;
                        $rootScope.dropevents_count = 10;
                        $scope.totalitemCount = res.data["count"];
                        $scope.totalPages = $scope.calculateTotalPages(res.data["count"]);
                        display_pagination();
                    } else {
                        $scope.dropevents_list_res = [];
                        $scope.totalitemCount = 0;
                        $scope.totalPages = $scope.calculateTotalPages(0);
                        display_pagination();
                    }
                }
            });
        }

        function init_event() {

            $('#formpromote').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    txtdropciname: {required: true},
                    txtdropcomp: {required: true},
                    txtdropdesc: {required: true},
                    txtdropnote: {required: true},
                    seldropseverity: {required: true},
                },
                messages: {
                    txtdropciname: {
                        required: 'Please enter the ci name'
                    },
                    txtdropcomp: {
                        required: 'Please enter the component'
                    },
                    txtdropdesc: {
                        required: 'Please enter the description'
                    },
                    txtdropnote: {
                        required: 'Please enter the notes'
                    },
                    seldropseverity: {
                        required: "Please select a severity"
                    },
                },
                highlight: function(element) {
                    $(element).closest('input').addClass("error");
                },
                unhighlight: function(element) {
                    $(element).closest('input').removeClass("error");
                },
                errorPlacement: function(error, element) {
                    $(element).closest('div').append(error);
                }
            });

            $(".slimscroll").slimScroll();

            var imodelcontentheight = $(window).height() - ($(".dropeventsController .modal-header").outerHeight() + $(".dropeventsController .modal-footer").outerHeight());
            $(".dropeventsController .modal-body").css({"height": imodelcontentheight + "px", "overflow-y": "auto"});

            $(".drop_table").on('click', '.icon_arrow', function() {
                var cache_ele = $(this);
                var cache_tr_panel = cache_ele.closest("tr").next();
                if (cache_ele.find("i").hasClass("fa-chevron-right")) {
                    cache_ele.find("i").removeClass("fa-chevron-right");
                    cache_ele.find("i").addClass("fa-chevron-down");
                    cache_tr_panel.fadeIn('slow');

                } else {
                    cache_ele.find("i").removeClass("fa-chevron-down");
                    cache_ele.find("i").addClass("fa-chevron-right");
                    cache_tr_panel.fadeOut('slow');
                }
                return false;
            });

            $(".drop_table").on('click', '.btn_promote', function() {
                cache_promote_link = $(this);
                $("#formpromote").find("input[type=text], textarea,select").val("");
                var cache_tr = cache_promote_link.closest("tr");
                $("#txtdropciname").val(cache_tr.find("td:eq(1)").text());
                $("#txtdropcomp").val(cache_tr.find("td:eq(2)").text());
                $("#txtdropdesc").val(cache_tr.find("td:eq(3)").text());
                $("#txtdropnote").val(cache_tr.find("td:eq(4)").text());
                var sseverty = intelliapp.utils.toTitleCase(cache_tr.find("td:eq(5)").text());
                $("#seldropseverity").val(sseverty);
                $(".dropeventsController .side-form-modal-lg").modal('toggle');
                return false;
            });

            $(".dropeventsController .pagination_dropdown a").click(function() {
                var selnum = $(this).text();
                $(".span_pagination_text").text(selnum);
                $scope.dropcurrentPage = 1;
                $scope.dropnumPerPage = parseInt(selnum);
                load_drop_events_list();
            });

            $(".btn_promote_save").click(function() {
                if ($('#formpromote').valid()) {
                    var cache_tr = cache_promote_link.closest("tbody").find("tr[data-eventid]");
                    var temparr = [];
                    $(cache_tr).each(function(inx, ele) {
                        var stempeveid = $(this).attr("data-eventid");
                        temparr.push(stempeveid);
                    });
                    var data_arr = {
                        affected_events: temparr.join(","),
                        ci_name: $("#txtdropciname").val(),
                        component: $("#txtdropcomp").val(),
                        description: $("#txtdropdesc").val(),
                        notes: $("#txtdropnote").val(),
                        severity: $("#seldropseverity").val()
                    };
                    $rootScope.showSpinner = true;
                    $intelliDropEventsService.dropeventPromote(data_arr).then(function(res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{ 
                            $rootScope.showSpinner = false;
                            console.log(res);
                            if (res.result == "success") {
                                $(".btn_promote_close").trigger("click");                            
                                notie.alert(1, "Promoted Sucessfully !!", config.notify_delay);     
                                cache_promote_link.hide();
                            } else {
                                notie.alert(3, "Error while processing request !!", config.notify_delay);
                            }
                        }
                    });
                }
                return false;
            });

            /*$(".btn_promote_close").click(function(){
             console.log("btn_promote_close");
             return false;
             });*/
        }

        $rootScope.$on('EVMTabChange', function(event, args) {
            if (args["tabname"] == "Drop Events") {
                if (!bpageloaded) {
                    bpageloaded = true;
                    load_drop_events_list();
                    init_event();
                }
            }
        });

    }
]);