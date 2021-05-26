angular.module('pages').controller('patchController', [
    '$scope',
    '$timeout',
    '$rootScope',
    'intelliPatchService',
    function ($scope, $timeout, $rootScope, $intelliPatchService) {

        $scope.patch_res;
        $scope.patch_list = [];

        $scope.update_type_list = [];
        $scope.server_group_list = [];

        $scope.preview_patch_save = {
            "name": "",
            "grouptype": "",
            "updates": "",
            "blacklist": "",
            "whitelist": "",
            "reboot": "",
            "reboottime": ""
        };

        $scope.currentPatchPageHistory = [];
        $scope.patchcurrentPage = 1;
        $scope.patchnumPerPage = 10;
        $scope.filter_patch_list = [];

        $scope.totalPages = 1;

        $scope.searchKeywords = "";

        $scope.action_type = "";

        $scope.calculateTotalPages = function () {
            var totalPages = $scope.patchnumPerPage < 1 ? 1 : Math.ceil($scope.filter_patch_list.length / $scope.patchnumPerPage);
            return Math.max(totalPages || 0, 1);
        };

        $scope.noPrevious = function () {
            return $scope.patchcurrentPage === 1;
        };

        $scope.noNext = function () {
            return $scope.patchcurrentPage === $scope.totalPages;
        };

        $scope.filterPatch = function (patch_row) {
            return patch_row;
        }

        $scope.patchpageselect = function (page) {
            var end, start;
            start = (page - 1) * $scope.patchnumPerPage;
            end = start + $scope.patchnumPerPage;
            var sendtext = end;
            if (end > $scope.filter_patch_list.length) {
                sendtext = $scope.filter_patch_list.length;
            }
            if (parseInt(sendtext) != 0) {
                $scope.span_page_status = (start + 1) + " - " + parseInt(sendtext);
            } else {
                $scope.span_page_status = "0 - " + parseInt(sendtext);
            }
            $scope.span_total_count = $scope.filter_patch_list.length;
            //debugger;
            return $scope.currentPatchPageHistory = $scope.filter_patch_list.slice(start, end);
        }

        $scope.selectPage = function (page) {
            if ($scope.patchcurrentPage !== page && page > 0 && page <= $scope.totalPages) {
                $scope.patchcurrentPage = page;
                $scope.$apply();
            }
        };

        $scope.$watch(function () {
            $scope.filter_patch_list = $scope.$eval("patch_list | filter:searchKeywords");
            $scope.totalPages = $scope.calculateTotalPages();
            $scope.patchpageselect($scope.patchcurrentPage);
        });

        function clear_patch_form() {
            $(".step-content-container .form_error").removeClass("form_error");
            $(".patchformpanel input[type='text'],.patchformpanel input[type='number']").val("");
            $("#txtpatchname").attr("disabled",false);
            $(".patchformpanel input[type='checkbox']").prop("checked", false);
            $.uniform.update(".patchformpanel input[type='checkbox']");
            $(".rowpatchblacklist,.rowpatchwhitelist").remove();
        }

        function load_update_type() {
            $rootScope.showSpinner = true;
            $intelliPatchService.patchUpdateType({}).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    console.log(res);
                    if (res.Status == "Success") {
                        var res_arr = res.Data;
                        console.log(res_arr);
                        $scope.update_type_list = res_arr["UpdateSelection"];
                        $scope.server_group_list = res_arr["ServerGroups"];
                        console.log($scope.update_type_list);
                    }
                }
            });
        }

        function load_patch_list() {
            $rootScope.showSpinner = true;
            $intelliPatchService.patchList({}).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    //debugger;
                    var resarr = res.Data;
                    $scope.patch_res = resarr;
                    var json_arr = [];
                    for (var key in resarr) {
                        var temp_arr = {};
                        temp_arr["name"] = key;
                        temp_arr["lastrun"] = resarr[key]['Last Run Time'];

                        //debugger;
                        var servergroup = resarr[key]['servergroup'].join(",");
                        temp_arr["servergroup"] = servergroup;

                        json_arr.push(temp_arr);
                    }
                    console.log(json_arr);
                    $scope.patch_list = json_arr;
                    $scope.$apply();
                }
            });
        }

        function add_condition_list(actionname, sname) {
            var template_arr = [];
            template_arr.push('<tr class="rowpatch' + actionname + 'list">');
            template_arr.push('<td style="padding: 0px 15px !important;"><span class="spanname">' + sname + '</span></td>');
            template_arr.push('<td style="padding: 0px 15px !important;"><a href="" class="btnnamedelete"><i class="fa fa-trash-o " aria-hidden="true"></i></a></td>');
            template_arr.push('</tr>');
            $(".tblpatch" + actionname + "list tbody").append(template_arr.join(""));
            $("#txtpatch" + actionname + "list").val("");
        }

        function init_event() {
            var dataarg = [];
            dataarg.push({"action": "#/automation", "name": "Automation"});
            dataarg.push({"action": "", "name": "Patch Automation"});
            $rootScope.$broadcast('ShowBreadcrumb', dataarg);


            $("#btnpatchblacklist,#btnpatchwhitelist").click(function () {
                var actionname = "";
                if ($(this).attr("id") == "btnpatchblacklist") {
                    actionname = "black";
                } else if ($(this).attr("id") == "btnpatchwhitelist") {
                    actionname = "white";
                }
                $('#txtpatch' + actionname + 'list').removeClass("form_error");
                if (!$("#txtpatch" + actionname + "list").val()) {
                    $("#txtpatch" + actionname + "list").addClass("form_error");
                } else {
                    add_condition_list(actionname, $("#txtpatch" + actionname + "list").val());
                }
                return false;
            });

            $(".patchconditionpnl").on("click", ".btnnamedelete", function () {
                $(this).closest("tr").remove();
                return false;
            });

            $(".tbl_patch_list").on("click", ".patch_edit_link", function () {
                var cache_ele = $(this);
                var spatchname = cache_ele.closest("td").attr("data-name");
                clear_patch_form();
                action_type = "edit";
                $("#txtpatchname").attr("disabled",true);
                for (var key in $scope.patch_res) {
                    if (key == spatchname) {
                        console.log(key);
                        var temp_obj = $scope.patch_res[key];
                        $("#txtpatchname").val(key);

                        $(temp_obj["servergroup"]).each(function (inx, sval) {
                            $(".patchchkgrouppanel input[value='" + sval + "']").prop("checked", true);
                        });
                        $(temp_obj["updates"]).each(function (inx, sval) {
                            $(".patchchkupdatepanel input[value='" + sval + "']").prop("checked", true);
                        });
                        $.uniform.update(".patchformpanel input[type='checkbox']");

                        $(temp_obj["blacklist"]).each(function (inx, sval) {
                            add_condition_list("black", sval);
                        });

                        $(temp_obj["whitelistlist"]).each(function (inx, sval) {
                            add_condition_list("white", sval);
                        });

                        $("#selpatchreboot").val(temp_obj["Reboot"]["Reboot"]);
                        $("#txtreboottme").val(temp_obj["Reboot"]["Timeout"]);

                        $("#submitModal").modal('toggle');
                        break;
                    }
                }
                return false;
            });

            $(".tbl_patch_list").on("click", ".patch_delete_link", function () {
                var cache_ele = $(this);
                var spatchname = cache_ele.closest("td").attr("data-name");

                $.confirm({
                    title: 'Delete Patch',
                    type: 'blue',
                    backgroundDismiss: true,
                    content: 'Do you want to delete this patch ?',
                    buttons: {
                        "Cancel": function () {
                        },
                        "Confirm": function () {
                            var data_arr = {
                                "name": spatchname
                            };
                            $rootScope.showSpinner = true;
                            $intelliPatchService.deletePatch(data_arr).then(function (res) {
                                if(res == config.service_unavailable){
                                    notie.alert(3, res, config.notify_delay);
                                    $rootScope.showSpinner = false;
                                }else{ 
                                    $rootScope.showSpinner = false;
                                    if (res.Status == "Success") {
                                        notie.alert(1, res.Message, config.notify_delay);
                                        for (var i = 0; i < $scope.patch_list.length; i++) {
                                            if ($scope.patch_list[i].name == spatchname) {
                                                $scope.patch_list.splice(i, 1);
                                                $scope.$apply();
                                                break;
                                            }
                                        }
                                    } else {
                                        notie.alert(3, res.Message, config.notify_delay);
                                    }
                                }
                            });
                        }
                    }
                });

                return false;
            });

            $(".tbl_patch_list").on("click", ".patch_play_link", function () {
                var cache_ele = $(this);
                var spatchname = cache_ele.closest("td").attr("data-name");
                var data_arr = {
                    "name": spatchname
                };
                $rootScope.showSpinner = true;
                $intelliPatchService.executePatch(data_arr).then(function (res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        $rootScope.showSpinner = false;
                        if (res.Status == "Success") {
                            notie.alert(1, res.Message, config.notify_delay);
                        } else {
                            notie.alert(3, res.Message, config.notify_delay);
                        }
                    }
                });
                return false;
            });

            $('#submitModal').MultiStep({
                onNextClick: function (itabindex, call_back) {
                    var bvalidate = true;
                    $(".step-content-container .form_error").removeClass("form_error");
                    if (itabindex == 1) {
                        if (!$("#txtpatchname").val()) {
                            $("#txtpatchname").addClass("form_error");
                            bvalidate = false;
                        }
                    } else if (itabindex == 2) {
                        if ($(".patchchkgrouppanel input[type='checkbox']:checked").length == 0) {
                            $(".patchchkgrouppanel").addClass("form_error");
                            bvalidate = false;
                        }
                    } else if (itabindex == 3) {
                        if ($(".patchchkupdatepanel input[type='checkbox']:checked").length == 0) {
                            $(".patchchkupdatepanel").addClass("form_error");
                            bvalidate = false;
                        }
                    } else if (itabindex == 5) {
                        //save ..
                        console.log("before final confirmation...");
                        $scope.preview_patch_save["name"] = $("#txtpatchname").val();
                        var temp_arr = [];
                        $(".patchchkgrouppanel input[type='checkbox']:checked").each(function (inx, ele) {
                            temp_arr.push($(ele).val());
                        });
                        $scope.preview_patch_save["grouptype"] = temp_arr.join(",");
                        temp_arr = [];
                        $(".patchchkupdatepanel input[type='checkbox']:checked").each(function (inx, ele) {
                            temp_arr.push($(ele).val());
                        });
                        $scope.preview_patch_save["updates"] = temp_arr.join(",");

                        temp_arr = [];
                        $(".rowpatchblacklist .spanname").each(function (inx, ele) {
                            temp_arr.push($(ele).text());
                        });
                        $scope.preview_patch_save["blacklist"] = temp_arr.join(",");

                        temp_arr = [];
                        $(".rowpatchwhitelist .spanname").each(function (inx, ele) {
                            temp_arr.push($(ele).text());
                        });
                        $scope.preview_patch_save["whitelist"] = temp_arr.join(",");

                        $scope.preview_patch_save["reboot"] = $("#selpatchreboot").val();

                        $scope.preview_patch_save["reboottime"] = $("#txtreboottme").val();

                        $scope.$apply();
                    } else if (itabindex == 6) {
                        //save ..
                        var spatchname = $("#txtpatchname").val();
                        var data_arr = {};
                        var obj_arr = {};
                        data_arr["name"] = spatchname;
                        obj_arr[spatchname] = {};

                        data_arr["servergroup"] = [];
                        $(".patchchkgrouppanel input[type='checkbox']:checked").each(function (inx, ele) {
                            data_arr["servergroup"].push($(ele).val());
                        });
                        obj_arr[spatchname]["servergroup"] = data_arr["servergroup"];

                        data_arr["updates"] = [];
                        $(".patchchkupdatepanel input[type='checkbox']:checked").each(function (inx, ele) {
                            data_arr["updates"].push($(ele).val());
                        });
                        obj_arr[spatchname]["updates"] = data_arr["updates"];

                        data_arr["blacklist"] = [];
                        $(".rowpatchblacklist .spanname").each(function (inx, ele) {
                            data_arr["blacklist"].push($(ele).text());
                        });
                        obj_arr[spatchname]["blacklist"] = data_arr["blacklist"];

                        data_arr["whitelistlist"] = [];
                        $(".rowpatchwhitelist .spanname").each(function (inx, ele) {
                            data_arr["whitelistlist"].push($(ele).text());
                        });
                        obj_arr[spatchname]["whitelistlist"] = data_arr["whitelistlist"];

                        data_arr["Reboot"] = {
                            "Reboot": $("#selpatchreboot").val(),
                            "Timeout": $("#txtreboottme").val()
                        };
                        obj_arr[spatchname]["Reboot"] = data_arr["Reboot"];

                        console.log(obj_arr);
                        $rootScope.showSpinner = true;

                        if (action_type == "new") {

                            $intelliPatchService.createPatch(data_arr).then(function (res) {
                                if(res == config.service_unavailable){
                                    notie.alert(3, res, config.notify_delay);
                                    $rootScope.showSpinner = false;
                                }else{ 
                                    $rootScope.showSpinner = false;
                                    if (res.Status == "Success") {
                                        var temp_arr = [];
                                        $(".patchchkgrouppanel input[type='checkbox']:checked").each(function (inx, ele) {
                                            temp_arr.push($(ele).val());
                                        });
                                        var final_arr = {
                                            "name": spatchname,
                                            "servergroup": temp_arr.join(","),
                                            "lastrun": ""
                                        };
                                        $scope.patch_list.push(final_arr);
                                        Object.assign($scope.patch_res, obj_arr);

                                        notie.alert(1, res.Message, config.notify_delay);
                                    } else {
                                        notie.alert(3, res.Message, config.notify_delay);
                                    }
                                }
                            });

                        } else if (action_type == "edit") {

                            $intelliPatchService.uodatePatch(data_arr).then(function (res) {
                                if(res == config.service_unavailable){
                                    notie.alert(3, res, config.notify_delay);
                                    $rootScope.showSpinner = false;
                                }else{ 
                                    $rootScope.showSpinner = false;
                                    if (res.Status == "Success") {

                                        for (var i = 0; i < $scope.patch_list.length; i++) {
                                            if ($scope.patch_list[i].name == spatchname) {
                                                
                                                var temp_arr = [];
                                                $(".patchchkgrouppanel input[type='checkbox']:checked").each(function (inx, ele) {
                                                    temp_arr.push($(ele).val());
                                                });
                                                
                                                $scope.patch_list[i].servergroup = temp_arr.join(",");
                                                
                                                $scope.patch_res[spatchname] = obj_arr[spatchname];
                                                
                                                $scope.$apply();
                                                break;
                                            }
                                        }

                                        notie.alert(1, res.Message, config.notify_delay);
                                    } else {
                                        notie.alert(3, res.Message, config.notify_delay);
                                    }
                                }
                            });

                        }

                    }
                    if (bvalidate) {
                        if (call_back) {
                            call_back();
                        }
                    }
                }
            });
        }

        $scope.init = function () {
            load_patch_list();
            load_update_type();
            init_event();
        };

        $scope.patch_finish_render = function () {
            $timeout(function () {
                angular.element(document).ready(function () {
                    $('[data-toggle="tooltip"]').tooltip();
                    $("input[type='checkbox']").uniform();
                });
            }, 100, false);
        }

        $scope.create_patch = function () {
            clear_patch_form();
            action_type = "new";
            $("#submitModal").modal('toggle');
        }
    }
]);