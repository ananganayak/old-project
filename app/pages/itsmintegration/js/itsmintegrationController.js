angular.module('pages').controller('itsmintegrationController', [
    '$scope',
    '$http',
    '$rootScope',
    'itsmintegrationService',
    function($scope, $http, $rootScope, $itsmintegrationService) {

        $scope.integration_title = "";

        $scope.currentPage = 1;
        $scope.currentPageHistory = [];
        $scope.filteredHistory = [];
        $scope.numPerPage = 10;
        $scope.totalPages = 1;

        $scope.totalItems = 0;

        $scope.otrs_list = [];

        $scope.manage_engine_list = [];

        var stype = "";

        $scope.calculateTotalPages = function() {
            var totalPages = $scope.numPerPage < 1 ? 1 : Math.ceil($scope.filteredHistory.length / $scope.numPerPage);
            return Math.max(totalPages || 0, 1);
        };

        $scope.noPrevious = function() {
            return $scope.currentPage === 1;
        };

        $scope.noNext = function() {
            return $scope.currentPage === $scope.totalPages;
        };

        $scope.integrationpageselect = function(page) {
            var end, start;
            start = (page - 1) * $scope.numPerPage;
            end = start + $scope.numPerPage;
            var sendtext = end;
            if (end > $scope.filteredHistory.length) {
                sendtext = $scope.filteredHistory.length;
            }
            $scope.span_page_status = (start + 1) + " - " + parseInt(sendtext);
            $scope.span_total_count = $scope.filteredHistory.length;
            //debugger;
            console.log($scope.filteredHistory.slice(start, end))
            return $scope.currentPageHistory = $scope.filteredHistory.slice(start, end);
           
        }

        $scope.selectPage = function(page) {
            if ($scope.currentPage !== page && page > 0 && page <= $scope.totalPages) {
                $scope.currentPage = page;
                $scope.$apply();
            }
        };

        function init_breadcrumb() {
            var dataarg = [];
            dataarg.push({"action": "#/admin", "name": "Admin"});
            dataarg.push({"action": "", "name": "Integration"});
            $rootScope.$broadcast('ShowBreadcrumb', dataarg);
        }

        function animate_panel(ani_in, ani_out) {
            $("#" + ani_out).hide();
            $("#" + ani_in).removeClass().addClass("animated fadeIn").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(ee) {
                $(this).removeClass();
                $(this).clearQueue();
                $(this).stop();
                $(this).off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
            }).show();
        }

        function clear_form() {
            $("#formintegration input[type='text'],#formintegration input[type='password'],#formintegration select").val("");
        }

        function load_dropdown_list() {
            $rootScope.showSpinner = true;
            $itsmintegrationService.integrationmasterData().then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.Status == "Completed") {
                        var res_arr = res.Data["communication_type"];
                        $.each(res_arr, function(inx, ele) {
                            var str = "<option value='" + ele + "'>" + ele + "</option>";
                            $("#selcommunication").append(str);
                        });
                    }
                }
            });
        }

        function load_otrs_list() {
            $rootScope.showSpinner = true;
            $itsmintegrationService.loadotrsDetails().then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.Status == "Completed") {
                        var temp_arr = [];
                        $.each(res.Data, function(inx, ele) {
                            ele["ID"] = inx;
                            temp_arr.push(ele);
                            //temp_arr["ID"] = inx;
                        });
                        $scope.totalItems = temp_arr.length;
                        $scope.otrs_list = temp_arr;
                    }
                }
            });
        }

        function load_manage_engine_list() {
            $rootScope.showSpinner = true;
            $itsmintegrationService.loadmanageengineDetails().then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.Status == "Completed") {
                        var temp_arr = [];
                        $.each(res.Data, function(inx, ele) {
                            ele["ID"] = inx;
                            temp_arr.push(ele);
                        });
                        $scope.totalItems = temp_arr.length;
                        $scope.manage_engine_list = temp_arr;
                    }
                }
            });
        }

        $scope.$watch(function() {
            if (stype == "OTRS") {
                $scope.filteredHistory = $scope.otrs_list;
                $scope.totalPages = $scope.calculateTotalPages();
                $scope.integrationpageselect($scope.currentPage);
            } else if (stype == "Manage Engine") {
                $scope.filteredHistory = $scope.manage_engine_list;
                $scope.totalPages = $scope.calculateTotalPages();
                $scope.integrationpageselect($scope.currentPage);
            }
        });

        function init_event() {

            var imodelcontentheight = $(window).height() - ($(".modal-header").outerHeight() + $(".modal-footer").outerHeight());
            $(".model_integrate_form .modal-body").css({"height": imodelcontentheight + "px", "overflow-y": "auto"});

            $(".slimscroll").slimScroll();

            $('#formintegration').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    selcommunication: {required: true},
                    txtipaddress: {required: true},
                    txtport: {required: true},
                    txtusername: {required: true},
                    txtpassword: {required: true},
                    txtdftopenstatus: {required: true},
                    txtdftwipstatus: {required: true},
                    txtdftrslstatus: {required: true},
                    txtdftpriority: {required: true},
                    txtautoqueue: {required: true},
                    txtmanualqueue: {required: true},
                    txtcusname: {required: true},
                    txtservicecategory: {required: true},
                    txtlevel: {required: true},
                    txtrequester: {required: true},
                    txtreqtemplate: {required: true},
                    txttechnician: {required: true},
                },
                messages: {
                    selcommunication: {
                        required: 'Please select a communication type'
                    },
                    txtipaddress: {
                        required: 'Please enter the ip address'
                    },
                    txtport: {
                        required: 'Please enter the port'
                    },
                    txtusername: {
                        required: 'Please enter the username'
                    },
                    txtpassword: {
                        required: 'Please enter the password'
                    },
                    txtdftopenstatus: {
                        required: "Please enter the default open status"
                    },
                    txtdftwipstatus: {
                        required: "Please enter the default wip status"
                    },
                    txtdftrslstatus: {
                        required: "Please enter the default resolved status"
                    },
                    txtdftpriority: {
                        required: "Please enter the default priority"
                    },
                    txtautoqueue: {
                        required: "Please enter the automation queue"
                    },
                    txtmanualqueue: {
                        required: "Please enter the manual queue"
                    },
                    txtcusname: {
                        required: "Please enter the customer name"
                    },
                    txtservicecategory: {
                        required: "Please enter the service category"
                    },
                    txtlevel: {
                        required: "Please enter the level"
                    },
                    txtrequester: {
                        required: "Please enter the requester"
                    },
                    txtreqtemplate: {
                        required: "Please enter the request template"
                    },
                    txttechnician: {
                        required: "Please enter the technician name"
                    }
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

            $(".itsmcontainer figure").click(function() {
                stype = $(this).attr("data-val");
                var dataarg = [];
                dataarg.push({"action": "#/admin", "name": "Admin"});
                dataarg.push({"action": "#/itsmintegration", "name": "Integration"});
                dataarg.push({"action": "", "name": stype, callbackmethod: ""});
                $rootScope.$broadcast('ShowBreadcrumb', dataarg);
                animate_panel("integration_details_container", "integration_list_container");
                $scope.integration_title = stype;
                $scope.$apply();
                $(".integration_table thead th,.integration_table tbody td").hide();

                if (stype == "OTRS") {
                    $(".integration_table th.otrs_col,.integration_table tbody td.otrs_col").show();
                    $(".integration_manage_table").hide();
                    $(".integration_otrs_table").show();
                    load_otrs_list();
                } else if (stype == "Manage Engine") {
                    $(".integration_table th.manage_col,.integration_table tbody td.manage_col").show();
                    $(".integration_otrs_table").hide();
                    $(".integration_manage_table").show();
                    load_manage_engine_list();
                }
                return false;
            });

            $(".breadcrumb").on("click", "a[href='#/itsmintegration']", function() {
                init_breadcrumb();
                animate_panel("integration_list_container", "integration_details_container");
                return false;
            });

            $(".icon_arrow").click(function() {
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

            $("#btnadd").click(function() {
                clear_form();

                $("#formintegration .form-group").hide();
                if (stype == "OTRS") {
                    $("#formintegration .otrs_row").show();
                } else if (stype == "Manage Engine") {
                    $("#formintegration .mg_row").show();
                }
                $(".model_integrate_form").modal('toggle');
                return false;
            });

            $(".integration_manage_table").on("click", ".icon_arrow", function() {
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

            $("#btnsaveintegration").click(function() {
                if ($('#formintegration').valid()) {
                    if (stype == "OTRS") {
                        var data_arr = {
                            "communication_type": $("#selcommunication").val(),
                            "ip": $("#txtipaddress").val(),
                            "port": $("#txtport").val(),
                            "username": $("#txtusername").val(),
                            "password": $("#txtpassword").val(),
                            "assignment_group_manual": $("#txtmanualqueue").val(),
                            "assignment_group_automation": $("#txtautoqueue").val(),
                            "itsm_status": $("#txtdftopenstatus").val(),
                            "priority": $("#txtdftpriority").val(),
                            "created_by": "admin",
                            "customer_name": $("#txtcusname").val(),
                            "itsm_wip_status": $("#txtdftwipstatus").val(),
                            "itsm_res_status": $("#txtdftrslstatus").val()
                        };
                        $rootScope.showSpinner = true;
                        $itsmintegrationService.saveotrsDetails(data_arr).then(function(res) {
                            if(res == config.service_unavailable){
                                notie.alert(3, res, config.notify_delay);
                                $rootScope.showSpinner = false;
                            }else{ 
                                $rootScope.showSpinner = false;
                                load_otrs_list();
                                $(".model_integrate_form").modal('toggle');
                                notie.alert(1, res.Message, config.notify_delay);
                            }
                        });
                    } else if (stype == "Manage Engine") {
                        var data_arr = {
                            "communication_type": $("#selcommunication").val(),
                            "ip": $("#txtipaddress").val(),
                            "port": $("#txtport").val(),
                            "technician_key": $("#txttechniciankey").val(),
                            "assignment_group_manual": $("#txtmanualqueue").val(),
                            "assignment_group_automation": $("#txtautoqueue").val(),
                            "itsm_status": $("#txtdftopenstatus").val(),
                            "priority": $("#txtdftpriority").val(),
                            "created_by": "admin",
                            "itsm_wip_status": $("#txtdftwipstatus").val(),
                            "itsm_res_status": $("#txtdftrslstatus").val(),
                            "service_category": $("#txtservicecategory").val(),
                            "level": $("#txtlevel").val(),
                            "requester": $("#txtrequester").val(),
                            "requesttemplate": $("#txtreqtemplate").val(),
                            "technician": $("#txttechnician").val(),
                        };
                        $rootScope.showSpinner = true;
                        $itsmintegrationService.savemanageengineDetails(data_arr).then(function(res) {
                            if(res == config.service_unavailable){
                                notie.alert(3, res, config.notify_delay);
                                $rootScope.showSpinner = false;
                            }else{ 
                                $rootScope.showSpinner = false;
                                load_manage_engine_list();
                                $(".model_integrate_form").modal('toggle');
                                if (res.Status == "Success") {
                                    notie.alert(1, res.Message, config.notify_delay);
                                } else {
                                    notie.alert(1, res.Message, config.notify_delay);
                                }
                            }
                        });
                    }
                }
                return false;
            });

            $(".integration_otrs_table").on("click", ".dropdown-menu a", function(event) {
                var status_type = $(this).attr("data-val");
                var sid = $(this).attr("data-id");
                $rootScope.showSpinner = true;
                $itsmintegrationService.setotrsstatus(status_type, sid).then(function(res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        $rootScope.showSpinner = false;
                        if (res.Status == "Succes") {
                            notie.alert(1, res.Message, config.notify_delay);
                            for (var i = 0; i < $scope.otrs_list.length; i++) {
                                if ($scope.otrs_list[i]["ID"] == sid) {
                                    var stemp = (status_type == "enable") ? "Enabled" : "Disabled";
                                    $scope.otrs_list[i]["Status"] = stemp;
                                    $scope.$apply();
                                    break;
                                }
                            }
                        } else if (res.Status == "Error") {
                            notie.alert(3, res.Message, config.notify_delay);
                        }
                        else {
                            notie.alert(3, res.ERROR, config.notify_delay);
                        }
                    }
                });
                event.preventDefault();
            });

            $(".integration_manage_table").on("click", ".dropdown-menu a", function(event) {
                var status_type = $(this).attr("data-val");
                var sid = $(this).attr("data-id");
                $rootScope.showSpinner = true;
                $itsmintegrationService.setmangeenginestatus(status_type, sid).then(function(res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        $rootScope.showSpinner = false;
                        if (res.Status == "Succes") {
                            notie.alert(1, res.Message, config.notify_delay);

                            for (var i = 0; i < $scope.manage_engine_list.length; i++) {
                                if ($scope.manage_engine_list[i]["ID"] == sid) {
                                    var stemp = (status_type == "enable") ? "Enable" : "Disable";
                                    $scope.manage_engine_list[i]["Status"] = stemp;
                                    $scope.$apply();
                                    break;
                                }
                            }
                        } else if (res.Status == "Error") {
                            notie.alert(3, res.Message, config.notify_delay);
                        }
                        else {
                            notie.alert(3, res.ERROR, config.notify_delay);
                        }
                    }
                });
                event.preventDefault();
            });


            $("#integration_details_container .pagination_dropdown a").click(function() {
                var selnum = $(this).text();
                $(".span_pagination_text").text(selnum);
                $scope.currentPage = 1;
                $scope.numPerPage = parseInt(selnum);
                $scope.$apply();
            });

        }

        $scope.init = function() {
            init_breadcrumb();
            init_event();
            load_dropdown_list();
        };

    }
]);