angular.module('widgets').controller('configurationController', [
    '$scope',
    '$rootScope',
    'intelliconfigurationService',
    function($scope, $rootScope, $intelliconfigurationService) {
        'use strict';

        var bpageloaded = true;

        $scope.config_content = false;
        $scope.config_from = true;
        
        $scope.fromget= function(sval){
            $scope.configcat =  sval;
            $scope.config_content = true;
            $scope.config_from = false;
            if(sval == 0){
                $scope.windowform = true;
                $scope.linuxform = false;
                $scope.vmwareform = false;
            }else if(sval == 1){
                $scope.windowform = false;
                $scope.vmwareform = false;
                $scope.linuxform = true;
            }else if(sval == 2){
                $scope.windowform = false;
                $scope.vmwareform = true;
                $scope.linuxform = false;  
            }
        }
        
        $scope.backtopanel = function(){
            $scope.config_content = false;
            $scope.config_from = true;
        }

        // disk usage validation
        function validate_disk_usage(){
            var berror = true;
            var disfield_arr = ["seldriveval", "txtdiskwarval", "txtdiskdangerval"];
            $.each(disfield_arr, function(inx, ele) {
                if (!$("#" + ele).val()) {
                    $("#" + ele).addClass("form_error");
                    berror = false;
                } else {
                    $("#" + ele).removeClass("form_error");
                }
            })
            return berror;
        }

        
        // Services validation
        function validate_service(){
            var berror = true;
            var serfield_arr = [ "txtwinservval", "txtservdisval"];
            $.each(serfield_arr, function(inx, ele) {
                if (!$("#" + ele).val()) {
                    $("#" + ele).addClass("form_error");
                    berror = false;
                } else {
                    $("#" + ele).removeClass("form_error");
                }
            })
            return berror;
        }

        // process validation
        function validate_process(){
            var berror = true;
            var profield_arr = ["txtwinprocsval", "txtprocsdisval"];
            $.each(profield_arr, function(inx, ele) {
                if (!$("#" + ele).val()) {
                    $("#" + ele).addClass("form_error");
                    berror = false;
                } else {
                    $("#" + ele).removeClass("form_error");
                }
            })
            return berror;
        }

        // pc validation
        function validate_pc(){
            var berror = true;
            var profield_arr = ["txtpcval", "txtpcdisval", "txtpccofval", "txtpcwarval", "txtpccrival"];
            $.each(profield_arr, function(inx, ele) {
                if (!$("#" + ele).val()) {
                    $("#" + ele).addClass("form_error");
                    berror = false;
                } else {
                    $("#" + ele).removeClass("form_error");
                }
            })
            return berror;
        }


        // disk cache clear
        function clear_disk_cache() {
            $("#seldriveval, #txtdiskwarval, #txtdiskdangerval").val("");
        }


        // service cache clear
        function clear_service_cache() {
            $("#txtwinservval, #txtservdisval").val("");
        }


        // process cache clear
        function clear_process_cache() {
            $("#txtwinprocsval,#txtprocsdisval").val("");
        }


        // pc cache clear
        function clear_pc_cache() {
            $("#txtpcval, #txtpcdisval, #txtpccofval, #txtpcwarval, #txtpccrival").val("");
        }


        function init_event(){
            
            // disk add function
            $scope.disk_usage_add_btn = function(){
                if (validate_disk_usage()) {
                    var disk_arr = [];
                    disk_arr.push("<tr class='disk_value_row' style='border-bottom: 1px solid #efefef;'>");

                    disk_arr.push('<td>'+ $('#seldriveval').val() +'</td>');
                    disk_arr.push('<td>'+ $('#txtdiskwarval').val() +'</td>');
                    disk_arr.push('<td>'+ $('#txtdiskdangerval').val() +'</td>');
                    disk_arr.push('<td><a href="#" type="button" ng-click="btn_delete_diskrow(hi)"><i class="fa fa-trash-o" aria-hidden="true"></i></a></td>');

                    disk_arr.push("</tr>");

                    $(".tbl_disk tbody").append(disk_arr.join(""));
                    clear_disk_cache();
                }
                return false;
            }

            // disk row value delete
            $scope.btn_delete_diskrow = function(){
                alert("hi");
                var cache_ele = $(this);
                cache_ele.closest("tr").remove();
                return false;
            }

            // Services add function
            $scope.service_add_btn = function(){
                if (validate_service()) {
                    var serv_arr = [];
                    serv_arr.push("<tr class='serv_value_row' style='border-bottom: 1px solid #efefef;'>");

                    // serv_arr.push('<td>'+ $('#chkservval').val() +'</td>');
                    serv_arr.push('<td>'+ $('#txtwinservval').val() +'</td>');
                    serv_arr.push('<td>'+ $('#txtservdisval').val() +'</td>');
                    serv_arr.push('<td><button class="btn btn-sm btn-danger " ng-click="btn_delete_servrow()"><i class="fa fa-trash-o" aria-hidden="true"></i></button></td>');

                    serv_arr.push("</tr>");

                    $(".tbl_services tbody").append(serv_arr.join(""));
                    clear_service_cache();
                }
                return false;
            }

            // service row value delete
            $scope.btn_delete_servrow = function(){
                var cache_ele = $(this);
                cache_ele.closest("tr").remove();
                return false;
            }

            // process add function
            $scope.process_add_btn = function(){
                if (validate_process()) {
                    var process_arr = [];
                    process_arr.push("<tr class='process_value_row' style='border-bottom: 1px solid #efefef;'>");

                    // process_arr.push('<td>'+ $('#chkprocsval').val() +'</td>');
                    process_arr.push('<td>'+ $('#txtwinprocsval').val() +'</td>');
                    process_arr.push('<td>'+ $('#txtprocsdisval').val() +'</td>');
                    process_arr.push('<td><button class="btn btn-sm btn-danger" ng-click="btn_delete_procesrow()"><i class="fa fa-trash-o" aria-hidden="true"></i></button></td>');

                    process_arr.push("</tr>");

                    $(".tbl_process tbody").append(process_arr.join(""));
                    clear_process_cache();
                }
                return false;
            }

            // process row value delete
            $scope.btn_delete_procesrow = function(){
                var cache_ele = $(this);
                cache_ele.closest("tr").remove();
                return false;
            }

            // pc add function
            $scope.pc_add_btn = function(){
                if (validate_pc()) {
                    var pc_arr = [];
                    pc_arr.push("<tr class='pc_value_row' style='border-bottom: 1px solid #efefef;'>");

                    pc_arr.push('<td>'+ $('#chkpcval').val() +'</td>');
                    pc_arr.push('<td>'+ $('#txtpcval').val() +'</td>');
                    pc_arr.push('<td>'+ $('#txtpcdisval').val() +'</td>');
                    pc_arr.push('<td>'+ $('#txtpccofval').val() +'</td>');
                    pc_arr.push('<td>'+ $('#txtpcwarval').val() +'</td>');
                    pc_arr.push('<td>'+ $('#txtpccrival').val() +'</td>');
                    pc_arr.push('<td><button class="btn btn-sm btn-danger" ng-click="btn_delete_pcrow()"><i class="fa fa-trash-o" aria-hidden="true"></i></button></td>');

                    pc_arr.push("</tr>");

                    $(".tbl_pc tbody").append(pc_arr.join(""));
                    clear_pc_cache();
                }
                return false;
            }

            // pc row value delete
            $scope.btn_delete_pcrow = function(){
                var cache_ele = $(this);
                cache_ele.closest("tr").remove();
                return false;
            }

            $scope.submitconfigval = function(){
                $scope.dis_condtion_arr = [];
                $(".disk_value_row").each(function(inx, ele) {
                    var cache_ele = $(ele);
                    var dis_cond_json = {
                        "Name": cache_ele.find("td:eq(0)").text(),
                        "Warning": cache_ele.find("td:eq(1)").text(),
                        "Critical": cache_ele.find("td:eq(2)").text()
                    };
                    $scope.dis_condtion_arr.push(dis_cond_json);
                    console.log($scope.dis_condtion_arr);
                });
                $scope.serv_condtion_arr = [];
                $(".serv_value_row").each(function(inx, ele) {
                    var cache_ele = $(ele);
                    var serv_cond_json = {
                        "windows_service": cache_ele.find("td:eq(0)").text(),
                        "display_name": cache_ele.find("td:eq(1)").text(),
                        // "Critical": cache_ele.find("td:eq(2)").text()
                    };
                    $scope.serv_condtion_arr.push(serv_cond_json);
                    console.log($scope.serv_condtion_arr);
                });
                $scope.proces_condtion_arr = [];
                $(".process_value_row").each(function(inx, ele) {
                    var cache_ele = $(ele);
                    var proces_cond_json = {
                        "windows_process": cache_ele.find("td:eq(0)").text(),
                        "display_name": cache_ele.find("td:eq(1)").text(),
                        // "Critical": cache_ele.find("td:eq(2)").text()
                    };
                    $scope.proces_condtion_arr.push(proces_cond_json);
                    console.log($scope.proces_condtion_arr);
                });
                $scope.pc_condtion_arr = [];
                $(".pc_value_row").each(function(inx, ele) {
                    var cache_ele = $(ele);
                    var pc_cond_json = {
                        "performance_counter": cache_ele.find("td:eq(0)").text(),
                        "display_name": cache_ele.find("td:eq(1)").text(),
                        "counter_output-format": cache_ele.find("td:eq(2)").text(),
                        "warning": cache_ele.find("td:eq(2)").text(),
                        "critical": cache_ele.find("td:eq(2)").text()
                    };
                    $scope.pc_condtion_arr.push(pc_cond_json);
                    console.log($scope.pc_condtion_arr);
                });

                if($scope.configcat == 0){

                    $scope.configval = {
                        "IPAddress": $("#txtipaddress").val(),
                        "Hostname": $("#txthostname").val(),
                        // "OperatingSystem": ("#").val(),
                        "OperatingSystem": $("#selwinosval").val(),
                        "Agent_password": $("#txtagnetpwd").val(),
                        "Ping": $("#txtservermetricval").val(),
                        "Uptime": $("#txtuptimeval").val(),
                        "cpu": {
                            "Warning": $("#txtcpuminval").val(),
                            "Critical": $("#txtcpumaxval").val()
                        },
                        "Load": {
                            "Warning": $("#txtloadminval").val(),
                            "Critical": $("#txtloadmaxval").val()
                        },
                        "Memory": {
                            "Warning":$("#txtmemuseminval").val(),
                            "Critical": $("#txtmemmaxval").val()
                        },
                        "Disk_Usage": $scope.dis_condtion_arr,
                        "Services": $scope.serv_condtion_arr,
                        "Processes": $scope.proces_condtion_arr,
                        "PerformanceCounter":  $scope.pc_condtion_arr
                    }
                    console.log($scope.configval);

                }else{
                    $scope.configval = {
                        "IPAddress": $("#txtipaddress").val(),
                        "Hostname": $("#txthostname").val(),
                        "OperatingSystem": $("#sellinosval").val(),
                        "ssl_encryption": $("#selsslencryval").val(),
                        "Ping": $("#txtservermetricval").val(),
                        "Uptime": $("#txtuptimeval").val(),
                        "Yum": $("#txtyumupstsval").val(),
                        "Load": {
                            "Warning": $("#txtloadminval").val(),
                            "Critical": $("#txtloadmaxval").val()
                        },
                        "cpu": {
                            "Warning": $("#txtcpuminval").val(),
                            "Critical": $("#txtcpumaxval").val()
                        },
                        "cpu_statistics": {
                            "Warning": $("#txtcpustsminval").val(),
                            "Critical": $("#txtcpustsmaxval").val()
                        }, 
                        "Memory": {
                            "Warning":$("#txtmemuseminval").val(),
                            "Critical": $("#txtmemmaxval").val()
                        },   
                        "swap_usage": {
                            "Warning": $("#txtswapuseminval").val(),
                            "Critical": $("#txtswapusemaxval").val()
                        }, 
                        "open_files": {
                            "Warning": $("#txtopenfileminval").val(),
                            "Critical": $("#txtopenfilemaxval").val()
                        }, 
                        "users": {
                            "Warning": $("#txtuservalminval").val(),
                            "Critical": $("#txtuservalmaxval").val()
                        }, 
                        "total_processes": {
                            "Warning": $("#txttotprominval").val(),
                            "Critical": $("#txttotpromaxval").val()
                        },                       
                        "Disk_Usage": $scope.dis_condtion_arr,
                        "Services": $scope.serv_condtion_arr,
                        "Processes": $scope.proces_condtion_arr,
                    }
                    console.log($scope.configval);
                }

                $intelliconfigurationService.configdetail_add(configval).then(function(res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        if (res.Status == "Success") {
                            notie.alert(1, res.Message, config.notify_delay);
                        } else {
                            notie.alert(3, res.Message, config.notify_delay);
                        }
                    }
                });
            }

        }


        $scope.init = function() {
            init_event()
        }


        $rootScope.$on('monitoringTabChange', function(event, args) {
            if (args["tabname"] == "configuration") {
                if (!bpageloaded) {
                    bpageloaded = true;
                    init_event();
                }
            }
        });

    }
]);