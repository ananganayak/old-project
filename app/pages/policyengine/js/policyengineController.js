angular.module('pages').controller('policyengineController', [
    '$scope',
    '$http',
    '$rootScope',
    'policyengineService',
    function($scope, $http, $rootScope, $policyengineService) {

        $scope.policyengine_list = [];

        $scope.currentPolicyPageHistory = [];
        $scope.policycurrentPage = 1;
        $scope.policynumPerPage = 10;
        $scope.filter_policy_list = [];
        $scope.totalPages = 1;

        $scope.policy_key = [];
        $scope.policy_operator = [];
        $scope.policy_action = [];
        $scope.policy_command = [];

        var local_script = [];
        var remote_script = [];

        $scope.searchKeywords = "";

        $scope.calculateTotalPages = function() {
            var totalPages = $scope.policynumPerPage < 1 ? 1 : Math.ceil($scope.filter_policy_list.length / $scope.policynumPerPage);
            return Math.max(totalPages || 0, 1);
        };

        $scope.noPrevious = function() {
            return $scope.policycurrentPage === 1;
        };

        $scope.noNext = function() {
            return $scope.policycurrentPage === $scope.totalPages;
        };

        $scope.policypageselect = function(page) {
            var end, start;
            start = (page - 1) * $scope.policynumPerPage;
            end = start + $scope.policynumPerPage;
            var sendtext = end;
            if (end > $scope.filter_policy_list.length) {
                sendtext = $scope.filter_policy_list.length;
            }
            $scope.span_page_status = (start + 1) + " - " + parseInt(sendtext);
            $scope.span_total_count = $scope.filter_policy_list.length;
            return $scope.currentPolicyPageHistory = $scope.filter_policy_list.slice(start, end);
        }

        $scope.selectPage = function(page) {
            if ($scope.policycurrentPage !== page && page > 0 && page <= $scope.totalPages) {
                $scope.policycurrentPage = page;
                $scope.$apply();
            }
        };

        $scope.$watch(function() {
            $scope.filter_policy_list = $scope.$eval("policyengine_list | filter:searchKeywords");
            $scope.totalPages = $scope.calculateTotalPages();
            $scope.policypageselect($scope.policycurrentPage);
        });

        function init_breadcrumb() {
            var dataarg = [];
            dataarg.push({"action": "#/admin", "name": "Admin"});
            dataarg.push({"action": "", "name": "Policy Engine"});
            $rootScope.$broadcast('ShowBreadcrumb', dataarg);
        }

        function load_master_dropdown() {
            $rootScope.showSpinner = true;
            $policyengineService.policy_masterdata().then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.Status == "Success") {
                        //console.log(res["Key"]);
                        $scope.policy_key = res["Key"];
                        $scope.policy_operator = res["Operator"];
                        $scope.policy_action = res["Action"];
                        local_script = res["LOCAL SCRIPT"];
                        remote_script = res["REMOTE SCRIPT"];
                    }
                }
            });
        }

        function load_policyengine_list() {
            $rootScope.showSpinner = true;
            $policyengineService.loadpolicyengineList().then(function(res) {
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
                        $scope.policyengine_list = temp_arr;
                    }
                }
            });
        }

        function validate_form() {
            var berror = true;
            var field_arr = ["txtpolicydesc", "txtpolicyhost", "selpolicygroup", "selactionname", "txtactioncommand"];
            $.each(field_arr, function(inx, ele) {
                if (!$("#" + ele).val() && $("#" + ele).is(":visible")) {
                    $("#" + ele).addClass("form_error");
                    berror = false;
                } else {
                    $("#" + ele).removeClass("form_error");
                }
            });
            return berror;
        }

        function validate_policy_condition() {
            var berror = true;
            var field_arr = ["selpolicykey", "selpolicycondition", "txtpolicyvalue"];
            $.each(field_arr, function(inx, ele) {
                if (!$("#" + ele).val()) {
                    $("#" + ele).addClass("form_error");
                    berror = false;
                } else {
                    $("#" + ele).removeClass("form_error");
                }
            });
            return berror;
        }

        function clear_policy_condition() {
            $("#selpolicykey,#selpolicycondition,#txtpolicyvalue").val("");
        }

        function init_event() {
            init_breadcrumb();

            $("#btnadd").click(function() {
                $(".model_ruleengine").modal('toggle');
                return false;
            });

            $(".tbl_policy_engine").on("click", ".icon_arrow", function() {
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

            $(".policyenginecontainer .pagination_dropdown a").click(function() {
                var selnum = $(this).text();
                $(".span_pagination_text").text(selnum);
                $scope.policycurrentPage = 1;
                $scope.policynumPerPage = parseInt(selnum);
                $scope.$apply();
            });

            $(".btn_policy_condition_add").click(function() {
                if (validate_policy_condition()) {
                    var template_arr = [];
                    template_arr.push("<tr class='condition_row'>");

                    template_arr.push('<td style="text-align: center;">' + $("#selpolicykey").val() + '</td>');
                    template_arr.push('<td style="text-align: center;">' + $("#selpolicycondition").val() + '</td>');
                    template_arr.push('<td style="text-align: center;">' + $("#txtpolicyvalue").val() + '</td>');
                    template_arr.push('<td style="text-align: center;"><a href="#" class="policy_cond_del"><i class="fa fa-trash" style="font-size: 16px;"></i></a></td>');

                    template_arr.push("</tr>");

                    $(".tbl_condition tbody").append(template_arr.join(""));
                    clear_policy_condition();
                }
                return false;
            });

            $(".tbl_condition").on("click", ".policy_cond_del", function() {
                var cache_ele = $(this);
                cache_ele.closest("tr").remove();
                return false;
            });

           

            $("#selactionname").change(function() {
                var cache_ele = $(this);
                if (cache_ele.val() == "LOCAL SCRIPT" || cache_ele.val() == "REMOTE SCRIPT") {

                    $(".policy_cmd_loc_panel").show();
                    $(".mail_cmd_to_label").hide();
                    $("#txtactionargu").show();
                    $(".mail_cmd_sms_label").hide();
                    
                    // if (cache_ele.val() == "LOCAL SCRIPT") {
                    //     $scope.policy_command = local_script;
                    // } else if (cache_ele.val() == "REMOTE SCRIPT") {
                    //     $scope.policy_command = remote_script;
                    // }
                    
                    $scope.$apply();
                
                } else if (cache_ele.val() == "EMAIL") {
                    
                    $(".policy_cmd_loc_panel").hide();
                    $(".mail_cmd_sms_label").hide();
                    $("#txtactionargu").show();
                    $(".mail_cmd_to_label").show();
                
                } else if (cache_ele.val() == "SMS") {
                
                    $(".policy_cmd_loc_panel").hide();
                    $(".mail_cmd_to_label").hide();
                    $("#txtactionargu").hide();
                    $(".mail_cmd_sms_label").show();
                
                } else {
                
                    $(".policy_cmd_loc_panel").show();
                    $(".mail_cmd_to_label").hide();
                    $("#txtactionargu").show();
                    $(".mail_cmd_sms_label").hide();
                
                }
                
                return false;

            });

            $(".btn_policy_save").click(function() {
                if (validate_form()) {
                    var condtion_arr = [];
                    $(".condition_row").each(function(inx, ele) {
                        var cache_ele = $(ele);
                        var cond_json = {
                            "Key": cache_ele.find("td:eq(0)").text(),
                            "operator": cache_ele.find("td:eq(1)").text(),
                            "value": cache_ele.find("td:eq(2)").text()
                        };
                        condtion_arr.push(cond_json);
                    });
                    var sgroupby = $("#selpolicygroup").val();
                    var sactioncommand =  $("#txtactioncommand").val();
                    // if ($("#selactionname").val() == "LOCAL SCRIPT" || $("#selactionname").val() == "REMOTE SCRIPT") {
                    //     sactioncommand = $("#selactioncmd").val();
                    // } else {
                    //     sactioncommand = $("#txtactioncommand").val();
                    // }
                    var data_arr = {
                        'condition': {
                            'Condition' : {}
                        },
                        'action': $("#selactionname").val(),
                        'actionargs': $("#txtactionargu").val(),
                        'actioncommand': sactioncommand,
                        'createdby': "admin",
                        'hostname': $("#txtpolicyhost").val(),
                        'rulename': $("#txtpolicydesc").val()
                    };
                    data_arr['condition']['Condition'][sgroupby] = condtion_arr;
                    $rootScope.showSpinner = true;
                    $policyengineService.policy_add(data_arr).then(function(res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{ 
                            $rootScope.showSpinner = false;
                            load_policyengine_list();
                            $("#model_ruleengine").modal('toggle');
                            if (res.Status == "Success") {
                                notie.alert(1, res.Message, config.notify_delay);
                            } else {
                                notie.alert(3, res.Message, config.notify_delay);
                            }
                        }
                    });
                }
                return false;
            });

            $(".tbl_policy_engine").on("click", ".dropdown-menu a", function(event) {
                var status_type = $(this).attr("data-val");
                var sid = $(this).attr("data-id");
                $rootScope.showSpinner = true;
                $policyengineService.set_policy_status(status_type, sid).then(function(res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        $rootScope.showSpinner = false;
                        if (res.Status == "Succes") {
                            notie.alert(1, res.Message, config.notify_delay);
                            for (var i = 0; i < $scope.policyengine_list.length; i++) {
                                if ($scope.policyengine_list[i]["ID"] == sid) {
                                    var stemp = (status_type == "enable") ? "Enabled" : "Disabled";
                                    $scope.policyengine_list[i]["status"] = stemp;
                                    $scope.$apply();
                                    break;
                                }
                            }
                        } else if (res.Status == "Error") {
                            notie.alert(3, res.Message, config.notify_delay);
                        }
                    }
                });
                event.preventDefault();
            });
        }

        $scope.init = function() {
            init_event();
            load_master_dropdown();
            load_policyengine_list();
            $(".policy_cmd_loc_panel").show();
            $(".mail_cmd_to_label").hide();
            $(".mail_cmd_sms_label").hide();
        };

    }
]);