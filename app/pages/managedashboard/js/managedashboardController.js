angular.module('pages').controller('managedashboardController', [
    '$scope',
    '$http',
    '$rootScope',
    '$timeout',
    'intellimanagedashboardService',
    function ($scope, $http, $rootScope, $timeout, $intellimanagedashboardService) {

        $scope.dashboard_list = [];

        $scope.currentDashboardPageHistory = [];
        $scope.dashboardcurrentPage = 1;
        $scope.dashboardnumPerPage = 10;
        $scope.filter_dashboard_list = [];

        $scope.totalPages = 1;

        $scope.searchKeywords = "";

        $scope.user_roles = [];

        $scope.dashboard_popup_title = "";

        var dashboard_action_type;

        $scope.calculateTotalPages = function () {
            var totalPages = $scope.dashboardnumPerPage < 1 ? 1 : Math.ceil($scope.filter_dashboard_list.length / $scope.dashboardnumPerPage);
            return Math.max(totalPages || 0, 1);
        };

        $scope.noPrevious = function () {
            return $scope.dashboardcurrentPage === 1;
        };

        $scope.noNext = function () {
            return $scope.dashboardcurrentPage === $scope.totalPages;
        };

        $scope.filterDashboard = function (dashboard_row) {
            return dashboard_row;
        };

        $scope.dashboardpageselect = function (page) {
            var end, start;
            start = (page - 1) * $scope.dashboardnumPerPage;
            end = start + $scope.dashboardnumPerPage;
            var sendtext = end;
            if (end > $scope.filter_dashboard_list.length) {
                sendtext = $scope.filter_dashboard_list.length;
            }
            //$scope.span_page_status = (start + 1) + " - " + parseInt(sendtext);
            if (parseInt(sendtext) != 0) {
                $scope.span_page_status = (start + 1) + " - " + parseInt(sendtext);
            } else {
                $scope.span_page_status = "0 - " + parseInt(sendtext);
            }
            $scope.span_total_count = $scope.filter_dashboard_list.length;
            return $scope.currentDashboardPageHistory = $scope.filter_dashboard_list.slice(start, end);
        };

        $scope.selectPage = function (page) {
            if ($scope.dashboardcurrentPage !== page && page > 0 && page <= $scope.totalPages) {
                $scope.dashboardcurrentPage = page;
                $scope.$apply();
            }
        };

        $scope.$watch(function () {
            $scope.filter_dashboard_list = $scope.$eval("dashboard_list | filter:searchKeywords");
            $scope.totalPages = $scope.calculateTotalPages();
            $scope.dashboardpageselect($scope.dashboardcurrentPage);
        });

        function clear_dashboard_form() {
            $("#dashboardmodel .form_error").removeClass("form_error");
            $("#txtdashboardname").val("");
            $(".dashboardrolepanel input[type='checkbox']").prop("checked", false);
            $.uniform.update(".dashboardrolepanel input[type='checkbox']");
        }

        $scope.addDashboard = function () {
            clear_dashboard_form();
            $scope.dashboard_popup_title = "New Dashboard";
            dashboard_action_type = "new";
            $("#dashboardmodel").modal('toggle');
        };

        $scope.edit_dashboard = function (row) {
            clear_dashboard_form();
            $scope.dashboard_popup_title = "Edit Dashboard";
            $("#txtdashboardname").val(row.name);
            var sroles = row.roles;
            var temp_arr = sroles.split(",");
            $(temp_arr).each(function (inx, ele) {
                $(".dashboardrolepanel input[value='" + $.trim(ele) + "']").prop('checked', true);
            });
            $.uniform.update(".dashboardrolepanel input[type='checkbox']");
            dashboard_action_type = "edit";
            $("#dashboardmodel").modal('toggle');
        };

        $scope.delete_dashboard = function (sname) {
            $.confirm({
                title: 'Delete Dashboard',
                type: 'blue',
                backgroundDismiss: true,
                content: 'Do you want to delete this dashboard ?',
                buttons: {
                    "Cancel": function () {
                    },
                    "Confirm": function () {
                        $rootScope.showSpinner = true;
                        var data_arr = {
                            name: sname
                        }
                        $intellimanagedashboardService.deleteDashboard(data_arr).then(function (res) {
                            if(res == config.service_unavailable){
                                notie.alert(3, res, config.notify_delay);
                                $rootScope.showSpinner = false;
                            }else{ 
                                $rootScope.showSpinner = false;
                                if (res.result == "success") {
                                    notie.alert(1, res.data, config.notify_delay);
                                    for (var i = 0; i < $scope.dashboard_list.length; i++) {
                                        if ($scope.dashboard_list[i].name == sname) {
                                            $scope.dashboard_list.splice(i, 1);
                                            $scope.$apply();
                                            break;
                                        }
                                    }
                                } else {
                                    notie.alert(3, res.data, config.notify_delay);
                                }
                            }
                        });
                    }
                }
            });
        };

        function load_dashboard() {
            //console.log("load_dashboard");
            $rootScope.showSpinner = true;
            $intellimanagedashboardService.loadDashboard({}).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        var resarr = res.data;
                        var final_arr = [];
                        for (var key in resarr) {
                            final_arr.push({
                                "name": key,
                                "roles": resarr[key].join(" , ")
                            });
                        }
                        $scope.dashboard_list = final_arr;
                    }
                }
            });
        }

        function loadUserRoles() {
            $rootScope.showSpinner = true;
            $intellimanagedashboardService.loadUserRoles({}).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    //console.log(res); 
                    if (res.result == "success") {
                        $scope.user_roles = res.data["role_name"];
                    }
                }
            });
        }

        function ValidateDashboard() {
            var berror = true;
            $("#dashboardmodel .form_error").removeClass("form_error");
            if (!$("#txtdashboardname").val()) {
                $("#txtdashboardname").addClass("form_error");
                berror = false;
            }
            if ($(".dashboardrolepanel input[type='checkbox']:checked").length == 0) {
                $(".dashboardrolepanel").addClass("form_error");
                berror = false;
            }
            return berror;
        }

        function init_event() {

            var dataarg = [];
            dataarg.push({"action": "#/dashboard", "name": "Dashboard"});
            dataarg.push({"action": "", "name": "Manage Dashboard"});
            $rootScope.$broadcast('ShowBreadcrumb', dataarg);

            $(".managedashboardcontainer .pagination_dropdown a").click(function () {
                var selnum = $(this).text();
                console.log(selnum);
                $(".span_pagination_text").text(selnum);
                $scope.dashboardcurrentPage = 1;
                $scope.dashboardnumPerPage = parseInt(selnum);
                $scope.$apply();
            });

            $("#btndashboardsave").click(function () {
                if (ValidateDashboard()) {
                    var sdashname = $("#txtdashboardname").val();
                    var temp_arr = [];
                    $(".dashboardrolepanel input[type='checkbox']:checked").each(function (inx, ele) {
                        temp_arr.push($(ele).val());
                    });
                    var data_obj = {
                        "dashboard_name": sdashname,
                        "role_name": temp_arr
                    };
                    $rootScope.showSpinner = true;
                    $intellimanagedashboardService.saveDashboard(data_obj).then(function (res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{ 
                            $rootScope.showSpinner = false;
                            if (res.result == "success") {
                                if (dashboard_action_type == "new") {
                                    var update_arr = {
                                        "name": sdashname,
                                        "roles": temp_arr.join(" , ")
                                    }
                                    $scope.dashboard_list.push(update_arr);
                                } else {
                                    for (var i = 0; i < $scope.dashboard_list.length; i++) {
                                        if ($scope.dashboard_list[i].name == sdashname) {
                                            $scope.dashboard_list[i].name = sdashname;
                                            $scope.dashboard_list[i].roles = temp_arr.join(" , ");
                                            break;
                                        }
                                    }
                                }
                                $scope.$apply();
                                $("#dashboardmodel").modal('toggle');
                                notie.alert(1, "Dashboard created successfully!", config.notify_delay);
                            } else {
                                notie.alert(3, res.data, config.notify_delay);
                            }
                        }
                    });
                }
                return false;
            });

        }

        $scope.init = function () {
            init_event();
            load_dashboard();
            loadUserRoles();
        };

        $scope.dashboard_finish_render = function () {
            $timeout(function () {
                angular.element(document).ready(function () {
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }, 100, false);
        };

        $scope.role_finish_render = function () {
            $timeout(function () {
                angular.element(document).ready(function () {
                    $("input[type='checkbox']").uniform();
                });
            }, 100, false);
        }

    }
]);