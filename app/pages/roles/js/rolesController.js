angular.module('pages').controller('rolesController', [
    '$scope',
    '$http',
    '$rootScope',
    '$timeout',
    'intelliRolesService',
    function($scope, $http, $rootScope, $timeout, $intelliRolesService) {

        $scope.roles_list_res = [];
        $scope.tab_list_res = [];

        var action_type = "";

        function adjust_panel_width() {
            var iwidth = $(".roles_left_container").outerWidth();
            $(".roles_left_panel").css({"width": iwidth + "px"});

            var iwidth = $(".roles_right_container").outerWidth();
            $("#roles_right_panel").css({"width": iwidth + "px"});
        }

        function clear_roles_form() {
            $("#txtrolename").val("");
            $("#txtrolename").attr("readonly",false);
            $("#formroles .error").remove();
            $("#formroles input[type='checkbox']").prop('checked', false);
            $.uniform.update("#formroles input[type='checkbox']");
        }

        function open_roles_form() {
            $(".ul_roles_left_content li").removeClass("roles_active_li");
            $("#roles_right_panel").removeClass().addClass("animated fadeInLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $(this).removeClass();
            }).show();
        }

        function init_event() {
            var dataarg = [];
            dataarg.push({"action" : "#/admin","name" : "Admin"});             
            dataarg.push({"action" : "","name" : "Roles"});
            $rootScope.$broadcast('ShowBreadcrumb', dataarg);

            $(".ul_roles_left_content li").click(function() {
                $(".ul_roles_left_content li").removeClass("roles_active_li");
                $(this).addClass("roles_active_li");
                $("#roles_right_panel").removeClass().addClass("animated fadeInLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    $(this).removeClass();
                }).show();
                return false;
            });

            $("#btnadd").click(function() {
                action_type = "new";
                clear_roles_form();
                open_roles_form();
                return false;
            });

            $("#btnclose").click(function() {
                $(".ul_roles_left_content li").removeClass("roles_active_li");
                $("#roles_right_panel").removeClass().addClass("animated fadeOutLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    $(this).removeClass().hide();
                });
                return false;
            });

            $(".ul_roles_left_content").on("click", "li", function() {
                action_type = "edit";
                clear_roles_form();
                var rolename = $(this).find(".span_name").text();
                var surl = config.urls.roleDetails + rolename;
                $rootScope.showSpinner = true;
                $intelliRolesService.getroledetails(surl).then(function(res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        $rootScope.showSpinner = false;
                        if (res.result == "success") {
                            $("#txtrolename").val(rolename);
                            $("#txtrolename").attr("readonly",true);
                            var data_arr = res.data[rolename];
                            if (data_arr.length > 0) {
                                $.each(data_arr, function(inx, row) {
                                    var stabname = row.tab_name;
                                    var spermission = row.permission_name;
                                    if (spermission.indexOf('R') !== -1) {
                                        $("input[name='chkread" + stabname + "']").prop('checked', true);
                                    }
                                    if (spermission.indexOf('W') !== -1) {
                                        $("input[name='chkwrite" + stabname + "']").prop('checked', true);
                                    }
                                    if (spermission.indexOf('X') !== -1) {
                                        $("input[name='chkdelete" + stabname + "']").prop('checked', true);
                                    }
                                });
                                $.uniform.update("#formroles input[type='checkbox']");
                            }
                            open_roles_form();
                        }
                        else{
                            notie.alert(3, res.data, config.notify_delay);
                        }
                    }
                });
            });

            $(".ul_roles_left_content").on('mouseenter', 'li', function() {
                $(this).find(".span_delete").show();
            });

            $(".ul_roles_left_content").on('mouseleave', 'li', function() {
                $(this).find(".span_delete").hide();
            });

            /*$(".ul_roles_left_content").on('click', 'li.span_delete', function(e) {
             console.log("span_delete");
             e.stopPropagation(); 
             return false; 
             });*/

            $(".ul_roles_left_content").on('click', '.span_delete', function(e) {
                var cache_ele = $(this);
                var srolename = cache_ele.closest("li").attr("data-name");
                var surl = config.urls.deleterole + srolename;
                // $rootScope.showSpinner = true;
                $.confirm({
                    title: 'Delete Role Credential',
                    type: 'blue',
                    backgroundDismiss: true,
                    content: 'Do you want to delete this Role credential ?',
                    buttons: {
                        "Cancel": function () {
    
                        },
                        "Confirm": function () {
                            $rootScope.showSpinner = true;
                            $intelliRolesService.deleteRole(surl).then(function(res) {
                                if(res == config.service_unavailable){
                                    notie.alert(3, res, config.notify_delay);
                                    $rootScope.showSpinner = false;
                                }else{ 
                                    $rootScope.showSpinner = false;
                                    if (res.result == "success") {
                                        notie.alert(1, res.data, config.notify_delay);
                                        for (var i = 0; i < $scope.roles_list_res.length; i++) {
                                            console.log($scope.roles_list_res[i]);
                                            if ($scope.roles_list_res[i] == srolename) {
                                                $scope.roles_list_res.splice(i, 1);
                                                $scope.$apply();
                                                break;
                                            }
                                        }
                                    }else{
                                        notie.alert(3, res.data, config.notify_delay);
                                    }
                                }
                            });
                            e.preventDefault();
                            // return false;
                        }
                    }
                });
                return false;
            });

            $('#formroles').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    txtrolename: {required: true, minlength: 3}
                },
                messages: {
                    txtrolename: {
                        required: 'Please enter the role name',
                        minlength: 'Please enter valid role name'
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

            angular.element(document).ready(function() {
                $("input[type='checkbox']").uniform();
            });

        }

        function load_roles_list() {
            $rootScope.showSpinner = true;
            $intelliRolesService.roleList({}).then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        $scope.roles_list_res = res.data["role_name"];
                    }
                }
            });
        }

        function load_tab_list() {
            $rootScope.showSpinner = true;
            $intelliRolesService.tabList({}).then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        //console.log(res.data["tab_name"]);
                        $scope.tab_list_res = res.data["tab_name"];
                    }
                }
            });
        }

        $scope.init = function() {
            init_event();
            load_roles_list();
            load_tab_list();
            //$("input[type='checkbox']").uniform();
        };

        $scope.finished = function() {
            //$.uniform.update("#formroles input[type='checkbox']");
            $timeout(function() {
                angular.element(document).ready(function() {
                    $("#formroles input[type='checkbox']").uniform();
                });
            }, 100, false);
            //console.log('finished');
        };

        $scope.role_save = function() {
            if ($('#formroles').valid()) {
                var mapper_arr = {};
                $.each($scope.tab_list_res, function(inx, ele) {
                    //console.log(ele);
                    var permission = "";
                    if ($("input[name='chkread" + ele + "']:checked").length > 0) {
                        permission = "R";
                    }
                    if ($("input[name='chkwrite" + ele + "']:checked").length > 0) {
                        permission = permission + "W";
                    }
                    if ($("input[name='chkdelete" + ele + "']:checked").length > 0) {
                        permission = permission + "X";
                    }
                    if (permission) {
                        mapper_arr[ele] = permission;
                    }
                });
                var data_arr = {
                    "mapping": mapper_arr
                }
                if (action_type == "new") {
                    data_arr["role_name"] = $("#txtrolename").val();
                    $rootScope.showSpinner = true;
                    $intelliRolesService.createRole(data_arr).then(function(res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{ 
                            $rootScope.showSpinner = false;
                            if (res.result == "success") {
                                $scope.roles_list_res.push($("#txtrolename").val());
                                notie.alert(1, res.data, config.notify_delay);
                                $("#btnclose").trigger("click");
                            } else {
                                notie.alert(3, res.data, config.notify_delay);
                            }
                        }
                    });
                } else if (action_type == "edit") {
                    $rootScope.showSpinner = true;
                    var srolename = $("#txtrolename").val();
                    var surl = config.urls.updaterole + srolename;
                    $intelliRolesService.updateRole(surl, data_arr).then(function(res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{ 
                            $rootScope.showSpinner = false;
                            if (res.result == "success") {
                                //Update role list...
                                for (var i = 0; i < $scope.roles_list_res.length; i++) {                               
                                    if ($scope.roles_list_res[i] == srolename) {
                                        $scope.roles_list_res[i] = srolename;
                                        $scope.$apply();
                                        break;
                                    }
                                }
                                notie.alert(1, res.data, config.notify_delay);
                                $("#btnclose").trigger("click");
                            } else {
                                notie.alert(3, res.data, config.notify_delay);
                            }
                        }
                    });
                }
            }
        };

        $scope.$watch('$viewContentLoaded', function() {
            adjust_panel_width();
        });
    }
]);