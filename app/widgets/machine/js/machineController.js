angular.module('widgets').controller('machineController', [
    '$scope',
    '$rootScope',
    'intelliMachineService',
    function ($scope, $rootScope, $intelliMachineService) {

        $scope.device_list = [];
        $scope.currentDevicePageHistory = [];
        $scope.devicecurrentPage = 1;
        $scope.devicenumPerPage = 10;
        $scope.filter_device_list = [];
        $scope.totalPages = 1;

        $scope.getmachinelistdet = [];

        $scope.searchKeywords = "";

        // var sel_host_name;
        //var cache_chart_panel;
        // var cache_edit_ele;
        // var edit_ip_address;

        var bpageloaded = false;

        /*$scope.machinedetget = function () {
         $intelliMachineService.getmachinelist().then(function (res) {
         $rootScope.showSpinner = false;
         if (res.result == "success" || res.Status == "Completed") {
         $scope.getmachinelistdet = res.Data;
         console.log($scope.getmachinelistdet);
         }
         });
         };
         
         $scope.machinemasdetget = function () {
         $intelliMachineService.getmachinemaslist().then(function (res) {
         $rootScope.showSpinner = false;
         if (res.Status == "Success") {
         $scope.getmachinemaslistdet = res;
         console.log($scope.getmachinemaslistdet);
         }
         });
         }();*/

        function load_master_credstore() {
            $rootScope.showSpinner = true;
            $intelliMachineService.getmachinemaslist().then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.Status == "Success") {
                        $scope.getmachinemaslistdet = res;
                        console.log($scope.getmachinemaslistdet);
                    }
                }
            });
        };

        $scope.btnmodalremediateup = function (hstname, remedit) {
            $scope.modalhsname = hstname;
            $scope.modalremed = remedit;
            $("#modelmachineremed").modal('toggle');
        }

        $scope.btnmodalcredup = function (ipadd, osname, crednaem) {
            $scope.modalhsipdad = ipadd;
            $scope.modalhsosname = osname;
            $scope.modalcred = crednaem;
            console.log($scope.modalremed);
            $("#modelmachinecred").modal('toggle');
        }

        $scope.btnmchnremeddetUpdate = function () {
            var updateval = {
                "hostname": $scope.modalhsname,
                "remediate": $scope.modalremed
            }

            $intelliMachineService.updateremadlist(updateval).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.Status == "Success") {
                        notie.alert(1, res.Message, config.notify_delay);
                        /*for (var key in $scope.device_list) {
                            if ($scope.device_list[key].Hostname == updateval.hostname) {
                                $scope.device_list[key].Remediate = updateval.remediate;
                            }
                        }*/
                        for (var i = 0; i < $scope.device_list.length; i++) {
                            if ($scope.device_list[i].Hostname == updateval.hostname) {
                                $scope.device_list[i]["Remediate"] = updateval.remediate;
                            }
                        }
                        $scope.$apply();
                        $("#mchnremedupdatemodalcancel").trigger("click");
                    } else {
                        notie.alert(3, res.Message, config.notify_delay);
                    }
                }
            });
        }


        $scope.btnmchncreddetUpdate = function () {
            var updatecredval = {
                "ipaddress": $scope.modalhsipdad,
                "operating_system": $scope.modalhsosname,
                "cred_name": $scope.modalcred
            }

            $intelliMachineService.updatecredlist(updatecredval).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.Status == "Success") {
                        notie.alert(1, res.Message, config.notify_delay);
                        /*for (var key in $scope.getmachinelistdet) {
                            if ($scope.device_list[key].IPAddress == updatecredval.ipaddress) {
                                $scope.device_list[key]['Credentials ID'] = updatecredval.cred_name;
                            }
                        }*/
                        for (var i = 0; i < $scope.device_list.length; i++) {
                            if ($scope.device_list[i].IPAddress == updatecredval.ipaddress) {
                                $scope.device_list[i]["Credentials ID"] = updatecredval.cred_name;
                            }
                        }
                        $scope.$apply();
                        $("#mchncredupdatemodalcancel").trigger("click");
                    } else {
                        notie.alert(3, res.Message, config.notify_delay);
                    }
                }
            });
        }

        $scope.calculateTotalPages = function () {
            var totalPages = $scope.devicenumPerPage < 1 ? 1 : Math.ceil($scope.filter_device_list.length / $scope.devicenumPerPage);
            return Math.max(totalPages || 0, 1);
        };

        $scope.noPrevious = function () {
            return $scope.devicecurrentPage === 1;
        };

        $scope.noNext = function () {
            return $scope.devicecurrentPage === $scope.totalPages;
        };

        $scope.filterDevice = function (device_row) {
            return device_row;
        }

        $scope.devicepageselect = function (page) {
            var end, start;
            start = (page - 1) * $scope.devicenumPerPage;
            end = start + $scope.devicenumPerPage;
            var sendtext = end;
            if (end > $scope.filter_device_list.length) {
                sendtext = $scope.filter_device_list.length;
            }
            $scope.span_page_status = (start + 1) + " - " + parseInt(sendtext);
            $scope.span_total_count = $scope.filter_device_list.length;
            return $scope.currentDevicePageHistory = $scope.filter_device_list.slice(start, end);
        }

        $scope.selectPage = function (page) {
            if ($scope.devicecurrentPage !== page && page > 0 && page <= $scope.totalPages) {
                $scope.devicecurrentPage = page;
                $scope.$apply();
            }
        };

        $scope.$watch(function () {
            $scope.filter_device_list = $scope.$eval("device_list | filter:searchKeywords");
            $scope.totalPages = $scope.calculateTotalPages();
            $scope.devicepageselect($scope.devicecurrentPage);
        });

        // function load_cmdb_summary() {
        //     $rootScope.showSpinner = true;
        //     $.get(config.urls.cmdbsummary, function (res) {
        //         $rootScope.showSpinner = false;
        //         $scope.$apply();
        //         $(".hosts_total").text(res.Total);
        //         $(".windows_total").text(res.Windows);
        //         $(".linux_total").text(res.Linux);
        //     });
        // }

        function load_device_list() {
            /* var device_arr = [];
             $rootScope.showSpinner = true;
             $.get(config.urls.cmdbdevicelist, function (res) {
             $rootScope.showSpinner = false;
             console.log(res);
             if (res.Status == "Completed") {
             var data_arr = [];
             for (var key in res.Data) {
             var temp_arr = res.Data[key];
             temp_arr["hostname"] = key;
             device_arr.push(temp_arr);
             }
             $scope.device_list = device_arr;
             }
             $scope.$apply();
             });*/

            $rootScope.showSpinner = true;
            $intelliMachineService.getmachinelist().then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success" || res.Status == "Completed") {
                        var device_arr = [];
                        for (var key in res.Data) {
                            var temp_arr = res.Data[key];
                            temp_arr["hostname"] = key;
                            device_arr.push(temp_arr);
                        }
                        $scope.device_list = device_arr;
                        console.log($scope.device_list);
                    }
                    $scope.$apply();
                }
            });
        }



        function init_event() {

            $("#btnaddcmdb").click(function () {
                $(".side-form-modal-lg").modal('toggle');
                return false;
            });

            $('#btnmachineadd').click(function(){
                $("#modelmachineadd").modal("toggle");
            });

            $('#mchnaddmodalcancel').click(function(){
                $("#modelmachineadd").modal("toggle");
            });

            $('#machineaddform').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    txtaddhstname: {required: true},
                    txtaddipaddress: {required: true},
                    sleaddplatform: {required: true},
                    txtaddosname: {required: true},
                    txtaddosver: {required: true},
                    seladdcred: {required: true},
                },
                messages: {
                    txtaddhstname: {
                        required: 'Please enter the Host Name'
                    },
                    txtaddipaddress: {
                        required: 'Please enter the IP'
                    },
                    sleaddplatform: {
                        required: 'Please select the Platform'
                    },
                    txtaddosname: {
                        required: 'Please enter the OS Name'
                    },
                    txtaddosver: {
                        required: 'Please enter the OS Version'
                    },
                    seladdcred: {
                        required: "Please select a Add Cred"
                    },
                },
                highlight: function(element) {
                    $(element).closest('input').addClass("form_error");
                    $(element).closest('select').addClass("form_error");
                },
                unhighlight: function(element) {
                    $(element).closest('input').removeClass("form_error");
                    $(element).closest('select').removeClass("form_error");
                },
                errorPlacement: function(error, element) {
                    $(eleZment).closest('div').append(error);
                }
            });

            $('#mchndetadd').click(function(){
                if ($('#machineaddform').valid()) {
                
                    var dataval = {
                        "hostname" : $("#txtaddhstname").val(),
                        "ipaddress" : $("#txtaddipaddress").val(),
                        "platform" : $("#sleaddplatform").val(),
                        "osname" : $("#txtaddosname").val(),
                        "osversion" : $("#txtaddosver").val(),
                        "remediate" : "N",
                        "credentials" : $("#seladdcred").val(),
                    }

                    $intelliMachineService.machineaddserv(dataval).then(function(res){
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{ 
                            $rootScope.showSpinner = false;
                            if (res.Status == "Success") {
                                notie.alert(1, "Device saved successfully", config.notify_delay);
                                load_device_list();
                                $("#mchnaddmodalcancel").trigger("click");
                            } else {
                                notie.alert(3, res.Message, config.notify_delay);
                            }
                        }
                    });
                }
            });


            /*$("#workflow_list_container .pagination_dropdown a").click(function () {
             var selnum = $(this).text();
             $(".span_pagination_text").text(selnum);
             $scope.devicecurrentPage = 1;
             $scope.devicenumPerPage = parseInt(selnum);
             $scope.$apply();
             });*/

            // $('#formdevice').validate({
            //     onkeyup: false,
            //     errorClass: 'error',
            //     validClass: 'valid',
            //     rules: {
            //         txthostname: {required: true, minlength: 3},
            //         txtip: {required: true},
            //         txtusername: {required: true, minlength: 3},
            //         txtpassword: {required: true, minlength: 3}
            //     },
            //     messages: {
            //         txthostname: {
            //             required: 'Please enter the hostname',
            //             minlength: 'Please enter valid hostname'
            //         },
            //         txtip: {
            //             required: 'Please enter the IP address',
            //         },
            //         txtusername: {
            //             required: 'Please enter the username',
            //             minlength: 'Please enter valid username'
            //         },
            //         txtpassword: {
            //             required: 'Please enter the password',
            //             minlength: 'Please enter valid password'
            //         },
            //     },
            //     highlight: function (element) {
            //         $(element).closest('input').addClass("error");
            //     },
            //     unhighlight: function (element) {
            //         $(element).closest('input').removeClass("error");
            //     },
            //     errorPlacement: function (error, element) {
            //         $(element).closest('div').append(error);
            //     }
            // });

            // $("#btndevicesave").click(function () {
            //     if ($('#formdevice').valid()) {
            //         var dataarr = {
            //             "hostname": $("#txthostname").val(),
            //             "ipaddress": $("#txtip").val(),
            //             "username": $("#txtusername").val(),
            //             "password": $("#txtpassword").val()
            //         };
            //         $rootScope.showSpinner = true;
            //         $.ajax({
            //             url: config.urls.cmdbsavedevice,
            //             type: "POST",
            //             data: JSON.stringify(dataarr),
            //             dataType: "json",
            //             contentType: "application/json",
            //             success: function (res) {
            //                 $rootScope.showSpinner = false;
            //                 $scope.$apply();
            //                 $("#btndeviceclose").trigger("click");
            //                 notie.alert(1, "Device saved successfully", config.notify_delay);
            //             },
            //             error: function (data) {
            //                 $rootScope.showSpinner = false;
            //                 console.log(data);
            //             }
            //         });
            //     }
            //     return false;
            // });

            // $(".tbl_cmdb_list").on("click", ".icon_arrow", function () {
            //     var cache_ele = $(this);
            //     var cache_tr_panel = cache_ele.closest("tr").next();
            //     if (cache_ele.find("i").hasClass("fa-chevron-right")) {
            //         cache_ele.find("i").removeClass("fa-chevron-right");
            //         cache_ele.find("i").addClass("fa-chevron-down");
            //         cache_tr_panel.fadeIn('slow');
            //         cache_chart_panel = cache_tr_panel.find(".cmdb_chart_details");
            //         if (cache_chart_panel.find("table").length == 0) {
            //             sel_host_name = cache_ele.attr("data-val");
            //             load_chart_data(sel_host_name);
            //         }
            //     } else {
            //         cache_ele.find("i").removeClass("fa-chevron-down");
            //         cache_ele.find("i").addClass("fa-chevron-right");
            //         cache_tr_panel.fadeOut('slow');
            //     }
            //     return false;
            // });

            $scope.getscreen = function (val) {
                $intelliMachineService.getscreenval(val).then(function(res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        $rootScope.showSpinner = false;
                        if (res.result == "success") {
                            // notie.alert(1, res.data, config.notify_delay);
                            var sval = res.machine;
                            var sparam = "pro=" + sval[0].cred_type + "&host=" + sval[0].ip_address + "&port=" + sval[0].port + "&user=" + sval[0].username;
                            window.open(config.urls.aiconsole + sparam);
                        } else {
                            notie.alert(3, res.data, config.notify_delay);
                        }
                    }
                });
            };


            $(".cmdbcontroller .pagination_dropdown a").click(function () {
                var selnum = $(this).text();
                $(".span_pagination_text").text(selnum);
                $scope.devicecurrentPage = 1;
                $scope.devicenumPerPage = parseInt(selnum);
                $scope.$apply();
            });

            // $(".tbl_cmdb_list").on("click", ".edit_tbl_username", function () {
            //     cache_edit_ele = $(this).closest("td").find(".span_username");
            //     var susername = cache_edit_ele.text();
            //     edit_ip_address = cache_edit_ele.attr("data-val");
            //     $("#txt_edit_username").val(susername);
            //     $("#cmdb_user_model").modal('toggle');
            //     return false;
            // });

            // $(".tbl_cmdb_list").on("click", ".edit_tbl_psw", function () {
            //     edit_ip_address = $(this).attr("data-val");
            //     $(".cmdb_edit_ip").text(edit_ip_address);
            //     $("#cmdb_psw_model").modal('toggle');
            //     return false;
            // });

            // $("#btn_cmdb_user").click(function () {
            //     if (validate_cmdb_user()) {
            //         var data_arr = {
            //             "ipaddress": edit_ip_address,
            //             "username": $("#txt_edit_username").val()
            //         };
            //         $rootScope.showSpinner = true;
            //         $intelliCmdbService.cmdbUserUpdate(data_arr).then(function (res) {
            //             $rootScope.showSpinner = false;
            //             cache_edit_ele.text($("#txt_edit_username").val());
            //             $("#cmdb_user_model").modal('toggle');
            //             notie.alert(1, "Username Updated successfully", config.notify_delay);
            //         });
            //     }
            //     return false;
            // });

            // $("#btn_cmdb_password").click(function () {
            //     if (validate_cmdb_password()) {
            //         var data_arr = {
            //             "ipaddress": edit_ip_address,
            //             "password": $("#txt_edit_cmdbpsw").val()
            //         };
            //         $rootScope.showSpinner = true;
            //         $intelliCmdbService.cmdbUserPsw(data_arr).then(function (res) {
            //             $rootScope.showSpinner = false;
            //             $("#cmdb_psw_model").modal('toggle');
            //             notie.alert(1, "Password Updated successfully", config.notify_delay);
            //         });
            //     }
            //     return false;
            // });

            // delete Function 
            $scope.btnmachinedelete = function(id){
                $scope.machineipaddress = id;
                $.confirm({
                    title: 'Delete Machine',
                    type: 'blue',
                    backgroundDismiss: true,
                    content: 'Do you want to delete this Machine ?',
                    buttons: {
                        "Cancel": function () {
    
                        },
                        "Delete": function () {
                            $rootScope.showSpinner = true;
                            $intelliMachineService.deletmchinedet($scope.machineipaddress).then(function(res) {
                                if(res == config.service_unavailable){
                                    notie.alert(3, res, config.notify_delay);
                                    $rootScope.showSpinner = false;
                                }else{ 
                                    $rootScope.showSpinner = false;
                                    if (res.result == "success") {
                                        notie.alert(1, res.data, config.notify_delay);
                                        for (var i = 0; i < $scope.currentDevicePageHistory.length; i++) {
                                            if ($scope.currentDevicePageHistory[i].machine_id == $scope.machineipaddress) {
                                                $scope.currentDevicePageHistory.splice(i, 1);
                                                $scope.$apply();
                                                break;
                                            }
                                        }
                                        
                                    } else {
                                        notie.alert(3, res.data, config.notify_delay);
                                    }
                                }
                            });
                        },
                        "Delete & Initiate": function () {
                            $rootScope.showSpinner = true;
                            $intelliMachineService.deletmchineinitdet($scope.machineipaddress).then(function(res) {
                                if(res == config.service_unavailable){
                                    notie.alert(3, res, config.notify_delay);
                                    $rootScope.showSpinner = false;
                                }else{ 
                                    $rootScope.showSpinner = false;
                                    if (res.result == "success") {
                                        notie.alert(1, res.data, config.notify_delay);
                                        for (var i = 0; i < $scope.currentDevicePageHistory.length; i++) {
                                            if ($scope.currentDevicePageHistory[i].machine_id == $scope.machineipaddress) {
                                                $scope.currentDevicePageHistory.splice(i, 1);
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
                return false;
            }


        }

        $scope.init = function () {
            //init_event();
            //load_cmdb_summary();
            //load_device_list();
            
        };

        $scope.cmdb_finish_render = function () {
            $('[data-toggle="tooltip"]').tooltip();
        }

        $rootScope.$on('CMDBTabChange', function (event, args) {
            if (args["tabname"] == "Machine") {
                if (!bpageloaded) {
                    bpageloaded = true;
                    init_event();
                    load_master_credstore();
                    // load_cmdb_summary();
                    load_device_list();
                }
            }
        });

    }
]);