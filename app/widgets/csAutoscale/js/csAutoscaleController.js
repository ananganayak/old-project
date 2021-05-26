angular.module('widgets').controller('csAutoscaleController', [
    '$scope',
    '$rootScope',
    '$interval',
    '$timeout',
    '$sce',
    'intellimonitoringAutoscaleService',
    function($scope, $rootScope, $interval, $timeout, $sce, $intellimonitoringAutoscaleService ) {
        'use strict';

        var bpageloaded = false;
        var formsubmit;

        //Get Hypervisor Details
        $scope.getHyperDet = function(){
            $rootScope.showSpinner = true;
            $intellimonitoringAutoscaleService.gethyperallval().then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        $scope.hyplist = res.data;
                        console.log($scope.hyplist, "hyper list");
                        $rootScope.showSpinner = false;
                    } else {
                        notie.alert(3, res.data, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }
                }
            });
        }

        $scope.getautoscaleDet = function(){
            $rootScope.showSpinner = true;
            $intellimonitoringAutoscaleService.getautoscaleallval().then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        $scope.aslist = res.data.slice(1);
                        console.log($scope.aslist, "autoscale list");
                        $rootScope.showSpinner = false;
                    } else {
                        notie.alert(3, res.data, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }
                }
            });
        }

        $scope.getiplistfn = function(val){
            // for(var [key, values] of Object.entries($scope.hyplist)){
            //     if(val == key){
            //         $scope.iplist = values;
            //     }
            // }
            // console.log($scope.iplist, "hyper ip list")

            var dataset = {
                "h_type": val
            }

            $intellimonitoringAutoscaleService.postastenantsListserv(dataset).then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        $scope.astenantlist = res.data.slice(1);
                        console.log($scope.astenantlist, "autoscale list");
                        $rootScope.showSpinner = false;
                        $("#seluphypervisor").select2();
                        $("#selhypervisor").select2();
                    } else {
                        notie.alert(3, res.data, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }
                }
            });

        }

        $scope.init_event = function() {
            $scope.showformadd = false;
            $scope.showformup = false;
            $scope.closeformfn = function(){
                $scope.showformadd = false;
                $scope.showformup = false;   
            }
            // Add Form Validation
            $('#autoscaleform').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    txtasname : {required: true},
                    txtasrsg : {required: true},
                    selhyperenv: {required: true},
                    selhypervisor: {required: true},
                    txtminpoweron: {required: true},
                    selpoweronone: {required: true},
                    txtpowerontwo: {required: true},
                    selpoweroffone: {required: true},
                    txtpowerofftwo: {required: true},
                },
                messages: {
                    txtasname: {
                        required: 'Please enter the Auto-Scale Name',
                    },
                    txtasrsg: {
                        required: 'Please enter the Real Service Group',
                    },
                    selhyperenv: {
                        required: 'Please Select the Hypervisor ENV ',
                    },
                    selhypervisor: {
                        required: 'Please Select the Hypervisor',
                    },
                    txtminpoweron: {
                        required: 'Please Enter the Minimum Power On',
                    },
                    selpoweronone: {
                        required: 'Please Select the Value',
                    },
                    txtpowerontwo: {
                        required: 'Please Enter the Value',
                    },
                    selpoweroffone: {
                        required: 'Please Select the Value',
                    },
                    txtpowerofftwo: {
                        required: 'Please Enter the Value',
                    },
                },
                highlight: function (element) {
                    $(element).closest('input').addClass("form_error");
                    $(element).closest('select').addClass("form_error");
                },
                unhighlight: function (element) {
                    $(element).closest('input').removeClass("form_error");
                    $(element).closest('select').removeClass("form_error");
                },
                errorPlacement: function (error, element) {
                    $(element).closest('div').append(error);
                }

            });


            // Update Form Validation
            $('#autoscaleupform').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    txtupasname : {required: true},
                    txtupasrsg : {required: true},
                    seluphyperenv: {required: true},
                    seluphypervisor: {required: true},
                    txtupminpoweron: {required: true},
                    seluppoweronone: {required: true},
                    txtuppowerontwo: {required: true},
                    seluppoweroffone: {required: true},
                    txtuppowerofftwo: {required: true},
                },
                messages: {
                    txtupasname: {
                        required: 'Please enter the Auto-Scale Name',
                    },
                    txtupasrsg: {
                        required: 'Please enter the Real Service Group',
                    },
                    seluphyperenv: {
                        required: 'Please Select the Hypervisor ENV ',
                    },
                    seluphypervisor: {
                        required: 'Please Select the Hypervisor',
                    },
                    txtupminpoweron: {
                        required: 'Please Enter the Minimum Power On',
                    },
                    seluppoweronone: {
                        required: 'Please Select the Value',
                    },
                    txtuppowerontwo: {
                        required: 'Please Enter the Value',
                    },
                    seluppoweroffone: {
                        required: 'Please Select the Value',
                    },
                    txtuppowerofftwo: {
                        required: 'Please Enter the Value',
                    },
                },
                highlight: function (element) {
                    $(element).closest('input').addClass("form_error");
                    $(element).closest('select').addClass("form_error");
                },
                unhighlight: function (element) {
                    $(element).closest('input').removeClass("form_error");
                    $(element).closest('select').removeClass("form_error");
                },
                errorPlacement: function (error, element) {
                    $(element).closest('div').append(error);
                }

            });

            $scope.getvmwarelistfn = function(){
                var val = $("#selhypervisor").val()
                if($scope.selhypervisor != ""){
                    var dataset = {
                        "h_type":  $("#selhyperenv").val(), 
                        // "h_ip": $scope.selhypervisor 
                        "tenant": val.split(".")[0]
                    }
                    $scope.getmainvmwarelistfn(dataset);
                }
            }
            $scope.getupvmwarelistfn = function(){
                var val = $("#seluphypervisor").val()
                if($scope.selhypervisor != ""){
                    var dataset = {
                        "h_type": $("#seluphyperenv").val(), 
                        // "h_ip": $scope.selhypervisor
                        "tenant": val.split(".")[0]
                    }
                    $scope.getmainvmwarelistfn(dataset);
                }
            }

            $scope.getupvmwarelistdfn = function(type, val){
                if($scope.selhypervisor != ""){
                    var dataset = {
                        "h_type": type, 
                        // "h_ip": $scope.selhypervisor
                        "tenant": val.split(".")[0]
                    }
                    $scope.getmainvmwarelistfn(dataset);
                }
            }

            $scope.getmainvmwarelistfn = function(dataset){
                $rootScope.showSpinner = true;
                $intellimonitoringAutoscaleService.gethypervmwareval(dataset).then(function(res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                    }else{ 
                        $rootScope.showSpinner = false;
                        if (res.result == "success") {

                            var vmware_list = res.data["vm_name"];
                            // $scope.hypvmwarelist = res.data;
                            $scope.hypvmwarelist = [];
                            $.each(vmware_list, function(i, el){
                                if($.inArray(el, $scope.hypvmwarelist) === -1) $scope.hypvmwarelist.push(el);
                            });
                            // console.log($scope.hypvmwarelist, "vmware list");
                            $rootScope.showSpinner = false;
                        } else {
                            notie.alert(3, res.data, config.notify_delay);
                        }
                    }
                });
            }

            var checkval = [];
            $scope.chckupval = function(val){
                var vall = val.split("..");
                var chckvalid = "chkupvmware"+vall[0];
                var chckval = document.getElementById(chckvalid)
                if(chckval.checked == true){
                    checkval.push(val)
                }else{
                    for (let i = 0; i < checkval.length; i++) {
                        if(checkval[i] == val){
                            checkval.splice(i, 1) 
                        }
                    }
                }
                
                checkval = checkval.filter( function( item, index, inputArray ) {
                    return inputArray.indexOf(item) == index;
                });
                console.log(checkval);
            }

            var checkvals = [];
            $scope.chckaddval = function(val){
                var val1 = val.split("..");
                var chckvalid = "chkaddvmware"+val1[0];
                var chckval = document.getElementById(chckvalid)
                if(chckval.checked == true){
                    checkvals.push(val)
                }else{
                    for (let i = 0; i < checkvals.length; i++) {
                        if(checkvals[i] == val){
                            checkvals.splice(i, 1) 
                        }
                    }
                }
                
                checkvals = checkvals.filter( function( item, index, inputArray ) {
                    return inputArray.indexOf(item) == index;
                });
                console.log(checkvals);
            }

            $scope.searchCheckval = function(id){
                if(id == 0){
                    checkvals.forEach(ele => {
                        ele = ele.split("..");
                        var chckid = "chkaddvmware" +  ele[0];
                        $('#'+chckid).prop('checked', true);
                    });
                }else{
                    checkval.forEach(ele => {
                        ele = ele.split("..");
                        var chckid = "chkupvmware" +  ele[0];
                        $('#'+chckid).prop('checked', true);
                    });
                }
            }

            $scope.btnsubmitasfn = function(){
                var val = $("#selhypervisor").val()
                if ($('#autoscaleform').valid()) {
                    if(checkvals.length != 0){
                        var dataset = {
                            "name": $scope.txtasname,
                            "h_type": $scope.selhyperenv,
                            "realservicegroup": $scope.txtasrsg,
                            "tenant": val.split(".")[0],
                            "min_poweron": $scope.txtminpoweron,
                            "vms":checkvals,
                            "poweron": {
                                "unit": $scope.selpoweronone, 
                                "unit condition": ">", 
                                "unit value":$scope.txtpowerontwo
                            },
                            "poweroff": {
                                "unit": $scope.selpoweroffone, 
                                "unit condition": "<", 
                                "unit value":$scope.txtpowerofftwo
                            }
                        }
                        $rootScope.showSpinner = true;
                        $intellimonitoringAutoscaleService.posthypervmwareval(dataset).then(function(res) {
                            if(res == config.service_unavailable){
                                notie.alert(3, res, config.notify_delay);
                            }else{ 
                                $rootScope.showSpinner = false;
                                if (res.result == "success") {
                                    notie.alert(1, res.data, config.notify_delay);
                                    document.getElementById("autoscaleform").reset();
                                    $scope.getautoscaleDet();
                                    $scope.showformadd = false;
                                    $scope.showformup =  false;
                                    checkval = [];
                                    $rootScope.showSpinner = false;
                                } else {
                                    notie.alert(3, res.data, config.notify_delay);
                                    $rootScope.showSpinner = false;
                                }
                            }
                        });
                    }else{
                        notie.alert(3, "Select the VMs", config.notify_delay);
                    }
                }
            }

            // Form Update Function
            $scope.btnsubmitasupfn = function(){
                var val = $("#seluphypervisor").val()
                if ($('#autoscaleupform').valid()) {
                    if(checkval.length != 0){
                        $.confirm({
                            title: 'Update Autoscale',
                            type: 'blue',
                            backgroundDismiss: true,
                            content: 'Changes on the AutoScale will affect the Automatic Power On/OFF Service. Are you sure to make changes?',
                            buttons: {
                                "Cancel": function () {
            
                                },
                                "Confirm": function () {
                                    var dataset = {
                                        "name": $("#txtupasname").val(),
                                        "h_type": $("#seluphyperenv").val(),
                                        "realservicegroup": $("#txtupasrsg").val(),
                                        "tenant": val.split(".")[0],
                                        "min_poweron": $("#txtupminpoweron").val(),
                                        "vms":checkval,
                                        "poweron": {
                                            "unit": $("#seluppoweronone").val(), 
                                            "unit condition": ">", 
                                            "unit value":$("#txtuppowerontwo").val()
                                        },
                                        "poweroff": {
                                            "unit": $("#seluppoweroffone").val(), 
                                            "unit condition": "<", 
                                            "unit value":$("#txtuppowerofftwo").val()
                                        }
                                    }        
                                    $rootScope.showSpinner = true;
                                    $intellimonitoringAutoscaleService.puthypervmwareval(dataset).then(function(res) {
                                        if(res == config.service_unavailable){
                                            notie.alert(3, res, config.notify_delay);
                                        }else{ 
                                            $rootScope.showSpinner = false;
                                            if (res.result == "success") {
                                                notie.alert(1, res.data, config.notify_delay);
                                                document.getElementById("autoscaleform").reset();
                                                $scope.getautoscaleDet();
                                                $scope.showformadd = false;
                                                $scope.showformup =  false;
                                                checkval = [];
                                                $rootScope.showSpinner = false;
                                            } else {
                                                notie.alert(3, res.data, config.notify_delay);
                                                $rootScope.showSpinner = false;
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }else{
                        notie.alert(3, "Select the VMs", config.notify_delay);
                    }
                }
            }

            $scope.addnewasfn = function (){
                document.getElementById("autoscaleform").reset();
                $scope.hypvmwarelist = [];
                $scope.showformadd = true;
                $scope.showformup = false;
                $("#txtasname").prop('disabled', false);
                checkval = [];
            }

            $scope.deletefn = function(name){
                var dataset = {
                    "name" : name
                }
                $.confirm({
                    title: 'Delete Autoscale',
                    type: 'blue',
                    backgroundDismiss: true,
                    content: 'Changes on the AutoScale will affect the Automatic Power On/OFF Service. Are you sure to make changes?',
                    buttons: {
                        "Cancel": function () {
    
                        },
                        "Confirm": function () {
                            $rootScope.showSpinner = true;
                            $intellimonitoringAutoscaleService.deletasservice(dataset).then(function(res) {
                                if(res == config.service_unavailable){
                                    notie.alert(3, res, config.notify_delay);
                                    $rootScope.showSpinner = false;
                                }else{ 
                                    $rootScope.showSpinner = false;
                                    if (res.result == "success") {
                                        notie.alert(1, res.data, config.notify_delay);  
                                        $scope.getautoscaleDet();
                                        $scope.showformadd = false;
                                        $scope.showformup = false;
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

            // Update List Get Function
            $scope.getUpdateDet = function(id){
                $scope.hypvmwarelist = [];
                $rootScope.showSpinner = true;
                $intellimonitoringAutoscaleService.getupdateasvalservice(id).then(function(res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                    }else{ 
                        $rootScope.showSpinner = false;
                        if (res.result == "success") {
                            $scope.updateasval = res.data;
                            $scope.getiplistfn($scope.updateasval.h_type);
                            $scope.showformadd = false;
                            $scope.showformup = true;
                            checkval = [];
                            $scope.getupvmwarelistdfn($scope.updateasval.h_type, $scope.updateasval.h_ip);
                            setTimeout(function(){ Chekboxvalfn($scope.updateasval.vms) }, 2000);
                            // var selVal = $('#seluphypervisor').val();
                            // console.log(selVal);
                            $rootScope.showSpinner = false;
                        } else {
                            notie.alert(3, res.data, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }
                    }
                });
            }

            function Chekboxvalfn(val){
                val.forEach(ele => {
                    checkval.push(ele);
                    ele = ele.split("..");
                    var chckid = "#chkupvmware" + ele[0];
                    $(chckid).prop('checked', true);
                });
                $("#seluphypervisor").select2();
            }
        }
        $scope.init = function() {
            $scope.init_event();
            $scope.getHyperDet();
            $scope.getautoscaleDet();
        }


        // $rootScope.$on('cloudserviceTabChange', function(event, args) {
        //     if (args["tabname"] == "Auto Scale") {
        //         if (!bpageloaded) {
        //             bpageloaded = true;

        //         }
        //     }
        // });

    }
]).filter('split', function() {
    return function(input, splitChar, splitIndex) {
        // do some bounds checking here to ensure it has that index
        return input.split(splitChar)[splitIndex];
    }
});