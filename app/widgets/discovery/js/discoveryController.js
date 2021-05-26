angular.module('widgets').controller('discoveryController', [
    '$scope',
    '$timeout',
    '$rootScope',
    'intelliDiscoveryService',
    function ($scope, $timeout, $rootScope, $intelliDiscoveryService) {

        $scope.discovery_list_res = [];
        $scope.device_cred_res = [];

        var bpageloaded = false;

        var socket;

        function validate_form() {
            $("#txtdiscovery").removeClass("form_error");
            if (!$("#txtdiscovery").val()) {
                $("#txtdiscovery").addClass("form_error");
                return false;
            }
            // if (!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\-(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test($("#txtdiscovery").val())) {
            //     $("#txtdiscovery").addClass("form_error");
            //     return false;
            // }
            return true;
        }


        function load_discovery_list() {
            $rootScope.showSpinner = true;
            $intelliDiscoveryService.discoveryList({}).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    console.log(res.data);
                    if (res.result == "success") {
                        console.log(res.data);
                        var final_arr = [];
                        for (var i = 0; i < res.data.length; i++) {
                            var row_arr = res.data[i];
                            var temp_arr = {
                                cred_name: row_arr['cred_name'],
                                ip_address: row_arr['ip_address'],
                                operating_system: row_arr['operating_system']
                            };
                            final_arr.push(temp_arr);
                        }
                        $scope.discovery_list_res = final_arr;
                    }
                }
            });
        }

        function load_device_cred() {
            $rootScope.showSpinner = true;
            $intelliDiscoveryService.deviceCred({}).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        console.log(res.data);
                        $scope.device_cred_res = res.data.slice(1);
                        load_discovery_list();
                    }
                }
            });
        }

        function add_device_cred(data_arr) {
            $rootScope.showSpinner = true;
            $intelliDiscoveryService.addDeviceCred(data_arr).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        var iparr = data_arr.mappers;
                        $(iparr).each(function (inx, ele) {
                            var sipaddress = ele[0];
                            $(".tbl_discovery tr[data-ip='" + sipaddress + "']").find("select").val(ele[1]);
                        });
                        notie.alert(1, res.data, config.notify_delay);
                    } else {
                        notie.alert(3, res.data, config.notify_delay);
                    }
                }
            });
        }

        function remove_device_cred(data_arr) {
            $rootScope.showSpinner = true;
            $intelliDiscoveryService.deattachDeviceCred(data_arr).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        var ip_arr = data_arr.device_list;
                        for (var i = 0; i < $scope.discovery_list_res.length; i++) {
                            for (var j = 0; j < ip_arr.length; j++) {
                                if ($scope.discovery_list_res[i].ip_address == ip_arr[j]) {
                                    //console.log(ip_arr[j]);
                                    $scope.discovery_list_res[i].cred_name = "";
                                    $(".tbl_discovery tr[data-ip='" + ip_arr[j] + "']").find("select").val("");
                                }
                            }
                        }

                        $scope.$apply();
                        notie.alert(1, res.data, config.notify_delay);
                    } else {
                        notie.alert(3, res.data, config.notify_delay);
                    }
                }
            });
        }

        function init_event() {

            socket = io.connect(config.messagesocket,{transports: ['websocket']});

            socket.on('connect', function () {
                console.log("Connected");
            });

            $("input[name='chkdeleteall']").uniform();

            $(".discoverycontainer").on('click', "input[name='chkdelete']", function (e) {
                var chkval = $("input[name='chkdelete']").serializeArray(); 
                console.log(chkval);
                if (chkval.length > 1 ) {
                    $(".group_filter_pnl").show();
                } else {
                    $(".group_filter_pnl").hide();
                }
            });

            $("#btnstartdiscovery").click(function () {
                if (validate_form()) {
                    $(".icndiscovery").css({"display": "inline-block"});
                    $("#btnstartdiscovery,#txtdiscovery").attr("disabled", true);
                    var dataarr = {
                        ip_range: $("#txtdiscovery").val()
                    };
                    //console.log(dataarr);
                    socket.emit('initiatediscovery', dataarr);
                }
                return false;
            });


            $("input[name='chkdeleteall']").click(function () {
                if ($(this).is(":checked")) {
                    $("input[name='chkdelete']").prop('checked', true);
                    $(".group_filter_pnl").show();
                } else {
                    $("input[name='chkdelete']").prop('checked', false);
                    $(".group_filter_pnl").hide();
                }
                $.uniform.update("input[name='chkdelete']");
            });

            socket.on('discovery_result', function (data) {
                console.log(data);
                var res_arr = data;
                if (res_arr.Action == "create" && res_arr.Module == "discovery") {
                    var temp_arr = {
                        cred_name: "",
                        ip_address: res_arr.Data["ipaddress"],
                        operating_system: res_arr.Data["OS"]
                    };
                    $scope.discovery_list_res.push(temp_arr);
                    $scope.$apply();
                }else if(res_arr.Module == "discovery" && res_arr.Action == "notify"){
                    if(res_arr.Data == "Discovery Completed"){
                        $(".x").hide();
                        $("#btnstartdiscovery,#txtdiscovery").attr("disabled", false);
                        $("#txtdiscovery").val("");
                        notie.alert(1, "Discovery Completed!", config.notify_delay);
                    }
                }
            });

            $(".cred_save_all").click(function () {
                $("#selcredall").removeClass("form_error");
                if ($("#selcredall").val()) {
                    var tempip_arr = [];
                    $("input[name='chkdelete']:checked").each(function (inx, ele) {
                        var sipaddress = $(ele).closest("tr").attr("data-ip");
                        tempip_arr.push([sipaddress, $("#selcredall").val()]);
                    });
                    var final_arr = {
                        "mappers": tempip_arr
                    };
                    add_device_cred(final_arr);
                } else {
                    $("#selcredall").addClass("form_error");
                }
                return false;
            });

            $(".cred_save_remove").click(function () {
                var tempip_arr = [];
                $("input[name='chkdelete']:checked").each(function (inx, ele) {
                    var sipaddress = $(ele).closest("tr").attr("data-ip");
                    tempip_arr.push(sipaddress);
                });
                var temp_arr = {
                    "device_list": tempip_arr
                };
                remove_device_cred(temp_arr);
                return false;
            });

            $(".tbl_discovery").on('click', ".cred_save", function (e) {
                $(".tbl_discovery select").removeClass("form_error");
                var cache_ele = $(this).closest("tr");
                console.log(cache_ele);
                var sel_ele = cache_ele.find("select");
                if (sel_ele.val()) {
                    var sipaddress = cache_ele.attr("data-ip");
                    var temp_arr = {
                        "mappers": [[sipaddress, sel_ele.val()]]
                    };
                    add_device_cred(temp_arr);
                } else {
                    sel_ele.addClass("form_error");
                }
                return false;
            });

            $(".tbl_discovery").on('click', ".cred_remove", function (e) {
                var cache_ele = $(this).closest("tr");
                var sipaddress = cache_ele.attr("data-ip");
                $.confirm({
                    title: 'Deattach Credentials',
                    type: 'blue',
                    backgroundDismiss: true,
                    content: 'Do you want to deattach credentials?',
                    buttons: {
                        "Cancel": function () {
                        },
                        "Confirm": function () {
                            var temp_arr = {
                                "device_list": [sipaddress]
                            };
                            remove_device_cred(temp_arr);
                        }
                    }
                });
                return false;
            });
        }

        // $scope.init = function () {

        // }
        $scope.btndiscoverydelete = function(ipadd){
            var disipadd = ipadd;

            $.confirm({
                title :'Delete Discovery Details',
                type :'blue',
                backgroundDismiss :'true',
                content :'Do you want to delete discovery details?',
                buttons :{
                    "Cancel" : function(){

                    },
                    "Confirm": function(){
                        $rootScope.showSpinner = true;
                        
                        $intelliDiscoveryService.disdeletefn(disipadd).then(function(res){
                            if(res == config.service_unavailable){
                                notie.alert(3, res, config.notify_delay);
                                $rootScope.showSpinner = false;
                            }else{ 
                                $rootScope.showSpinner = false;
                                if (res.result == "success") {
                                    for (var i = 0; i < $scope.discovery_list_res.length; i++) {
                                        if ($scope.discovery_list_res[i].ip_address == disipadd) {
                                            $scope.discovery_list_res.splice(i, 1);
                                            break;
                                        }
                                    }
                                    notie.alert(1, res.data, config.notify_delay);
                                } else {
                                    notie.alert(3, res.data, config.notify_delay);
                                }
                            }
                        })
                    }
                }
            })            
            return false;
        }   

        $scope.finished = function () {
            $timeout(function () {
                angular.element(document).ready(function () {
                    $("input[name='chkdelete']").uniform();
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }, 100, false);
        };

        $rootScope.$on('CMDBTabChange', function (event, args) {
            if (args["tabname"] == "Discovery") {
                if (!bpageloaded) {
                    bpageloaded = true;
                    init_event();
                    //load_discovery_list();    
                    load_device_cred();
                }
            }
        });

    }
]);