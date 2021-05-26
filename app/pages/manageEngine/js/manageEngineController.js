angular.module('pages').controller('manageEngineController', [
    '$scope',
    '$http',
    '$rootScope',
    'manageEngineService',
    function($scope, $http, $rootScope, $manageEngineService) {

        // $scope.integration_title = "";

        // $scope.currentPage = 1;
        // $scope.currentPageHistory = [];
        // $scope.filteredHistory = [];
        // $scope.numPerPage = 10;
        // $scope.totalPages = 1;

        // $scope.totalItems = 0;

        // $scope.otrs_list = [];

        $scope.manage_engine_list = [];

        // var stype = "";

        // function animate_panel(ani_in, ani_out) {
        //     $("#" + ani_out).hide();
        //     $("#" + ani_in).removeClass().addClass("animated fadeIn").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(ee) {
        //         $(this).removeClass();
        //         $(this).clearQueue();
        //         $(this).stop();
        //         $(this).off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
        //     }).show();
        // }

        // function clear_form() {
        //     $("#formintegration input[type='text'],#formintegration input[type='password'],#formintegration select").val("");
        // }

        function load_dropdown_list() {
            $rootScope.showSpinner = true;
            $manageEngineService.integrationmasterData().then(function(res) {
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
                        console.log(res_arr)
                    }
                }
            });
        }

        function load_manage_engine_list() {
            $rootScope.showSpinner = true;
            $manageEngineService.loadmanageengineDetails().then(function(res) {
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
                        $scope.manage_engine_list = temp_arr[0];
                        console.log($scope.manage_engine_list);
                    }
                }
            });
        }


        function init_event() {

            // breadcrumb function
            var dataarg = [];
            dataarg.push({"action" : "#/admin","name" : "Admin"});             
            dataarg.push({"action" : "","name" : "Manage Engine"});
            $rootScope.$broadcast('ShowBreadcrumb', dataarg);

            $('#formintegration').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    txtmeid : {required: true},
                    selcommunication: {required: true},
                    txtmeipaddress: {required: true},
                    txtmeport: {required: true},
                    txtmestatus: {required: true},
                    // txtpassword: {required: true},
                    txtmeopenstatus: {required: true},
                    txtmewipstatus: {required: true},
                    txtmeresolvestatus: {required: true},
                    txtdftpriority: {required: true},
                    txtmeautomationqueue: {required: true},
                    txtmemanualqueue: {required: true},
                    txttechniciankey: {required: true},
                    txtmeservicecat: {required: true},
                    txtmelevl: {required: true},
                    txtmerequstr: {required: true},
                    txtmetemplt: {required: true},
                    txtmetechnician: {required: true},
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
                    txtmestatus: {
                        required: 'Please enter the status'
                    },
                    // txtpassword: {
                    //     required: 'Please enter the password'
                    // },
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
                    txttechniciankey: {
                        required: "Please enter the technician key"
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
                    txtmetechnician: {
                        required: "Please enter the technician name"
                    }
                },
                highlight: function(element) {
                    $(element).closest('input').addClass("error");
                    $(element).closest('select').addClass("error");
                },
                unhighlight: function(element) {
                    $(element).closest('input').removeClass("error");
                    $(element).closest('select').removeClass("error");
                },
                errorPlacement: function(error, element) {
                    $(element).closest('div').append(error);
                }
            });

            

            $("#btnsaveintegration").click(function() {
                if ($('#formintegration').valid()) {
                        var data_arr = {
                            "communication_type": $("#selcommunications").val(),
                            "ip": $("#txtmeipaddress").val(),
                            "port": $("#txtmeport").val(),
                            "technician_key": $("#txttechniciankey").val(),
                            "assignment_group_manual": $("#txtmemanualQueue").val(),
                            "assignment_group_automation": $("#txtmeautomationQueue").val(),
                            "itsm_status": $("#txtmeopenStatus").val(),
                            "priority": $("#txtdftpriority").val(),
                            "created_by": "admin",
                            "itsm_wip_status": $("#txtmewipstatus").val(),
                            "itsm_res_status": $("#txtmeresolvestatus").val(),
                            "service_category": $("#txtmeservicecat").val(),
                            "level": $("#txtmelevl").val(),
                            "requester": $("#txtmerequstr").val(),
                            "requesttemplate": $("#txtmetemplt").val(),
                            "technician": $("#txtmetechnician").val(),
                        };
                        $rootScope.showSpinner = true;
                        $manageEngineService.savemanageengineDetails(data_arr).then(function(res) {
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
                                    notie.alert(3, res.Message, config.notify_delay);
                                }
                            }
                        });
                }
                return false;
            });

           
            // $(".integration_manage_table").on("click", ".dropdown-menu a", function(event) {
            //     var status_type = $(this).attr("data-val");
            //     var sid = $(this).attr("data-id");
            //     $rootScope.showSpinner = true;
            //     $manageEngineService.setmangeenginestatus(status_type, sid).then(function(res) {
            //         $rootScope.showSpinner = false;
            //         if (res.Status == "Succes") {
            //             notie.alert(1, res.Message, config.notify_delay);

            //             for (var i = 0; i < $scope.manage_engine_list.length; i++) {
            //                 if ($scope.manage_engine_list[i]["ID"] == sid) {
            //                     var stemp = (status_type == "enable") ? "Enable" : "Disable";
            //                     $scope.manage_engine_list[i]["Status"] = stemp;
            //                     $scope.$apply();
            //                     break;
            //                 }
            //             }
            //         } else if (res.Status == "Error") {
            //             notie.alert(3, res.Message, config.notify_delay);
            //         }
            //         else {
            //             notie.alert(3, res.ERROR, config.notify_delay);
            //         }
            //     });
            //     event.preventDefault();
            // });

        }

        $scope.init = function() {
            // init_breadcrumb();
            load_manage_engine_list();
            init_event();
            load_dropdown_list();
        };

    }
]);