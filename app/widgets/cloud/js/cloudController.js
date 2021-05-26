angular.module('pages').controller('cloudController', [
    '$scope',
    '$timeout',
    '$rootScope',
    'intelliCloudService',
    function ($scope, $timeout, $rootScope, $intelliCloudService) {


        var bpageloaded = false;

        $scope.cloudgrid = true;
        $scope.clouddetgrid = false;

        $scope.cloud_grid_res = [];
        $scope.cloudkid = "";
        $scope.clmapid = "";
        $scope.cloudpk_id = "";


        // cloud cred load function
        function load_cloud_grid() {
            $rootScope.showSpinner = true;
            $intelliCloudService.cloudGird().then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        // console.log(res.data);
                        $scope.cloud_grid_res = res.data.slice(1);
                    }else{
                        $scope.cloud_grid_res = res.data;
                    }
                }
            });
        }

        // cloud cred load function
        function load_cloud_cred() {
            $rootScope.showSpinner = true;
            $intelliCloudService.cloudCred().then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        // console.log(res.data);
                        $scope.cloud_cred_res = res.data.slice(1);
                    }
                }
            });
        }

        function init_event() {

            // cloud form validation 
            $('#cloudForm').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    txtcloudname: {required: true},
                    txtcloudip: {required: true},
                    selcloudtype: {required: true},
                    selcloudcred: {required: true},
                },
                messages: {
                    txtcloudname: {
                        required: 'Please Enter the Name'
                    },
                    txtcloudip: {
                        required: 'Please Enter the IP'
                    },
                    selcloudtype: {
                        required: 'Please Select the Cloud Type'
                    },
                    selcloudcred: {
                        required: 'Please Select the Cloud Credential'
                    }

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
                    $(element).closest('div').append(error);
                }
            });


            // cloud add and update function
            $("#btnaddcloud").click(function(){
                if($scope.cloudkid == ""){
                    if ($('#cloudForm').valid()) {

                        var dataval = {
                            "cloud_name": $("#txtcloudname").val(), 
                            "cloud_ip_address": $("#txtcloudip").val(), 
                            "cloud_type": $("#selcloudtype").val(),
                            "cloud_cred": $("#selcloudcred").val()
                        }

                        // console.log(dataval);
    
                        $rootScope.showSpinner = true;
                        
                        $intelliCloudService.addclouddet(dataval).then(function(res){
                            if(res == config.service_unavailable){
                                notie.alert(3, res, config.notify_delay);
                                $rootScope.showSpinner = false;
                            }else{ 
                                $rootScope.showSpinner = false;
                                if (res.result == "success") {
                                    // console.log(res.data);
                                    notie.alert(1, res.data, config.notify_delay);
                                    $scope.cloud_grid_res.push({
                                        0 : res.pk_cloud_id,
                                        1 : $("#txtcloudname").val(),
                                        2 : $("#txtcloudip").val(),
                                        3 : $("#selcloudtype").val(),
                                        4 : $("#selcloudcred").val(),
                                    })
                                    document.getElementById("cloudForm").reset();
                                }else{
                                    notie.alert(3, res.data, config.notify_delay);
                                }
                                $rootScope.showSpinner = false;
                            }
                        })
                    }
                }else{
                    if ($('#cloudForm').valid()) {
                        var dataval = {
                            "cloud_name": $("#txtcloudname").val(), 
                            "cloud_ip_address": $("#txtcloudip").val(), 
                            "cloud_type": $("#selcloudtype").val(),
                            "cloud_cred": $("#selcloudcred").val()
                        }
                        $intelliCloudService.updateclouddet(dataval, $scope.cloudkid).then(function(res){
                            if(res == config.service_unavailable){
                                notie.alert(3, res, config.notify_delay);
                                $rootScope.showSpinner = false;
                            }else{ 
                                $rootScope.showSpinner = false;
                                if (res.result == "success") {
                                    // console.log(res.data);
                                    notie.alert(1, res.data, config.notify_delay);
                                    for (var i = 0; i < $scope.cloud_grid_res.length; i++) {
                                       if($scope.cloudkid == $scope.cloud_grid_res[i][0]){
                                        $scope.cloud_grid_res[i][0] = $scope.cloud_grid_res[i][0];
                                        $scope.cloud_grid_res[i][1] = $("#txtcloudname").val();
                                        $scope.cloud_grid_res[i][2] = $("#txtcloudip").val();
                                        $scope.cloud_grid_res[i][3] = $("#selcloudtype").val();
                                        $scope.cloud_grid_res[i][4] = $("#selcloudcred").val();
                                        break;
                                       }
                                    }
                                    // console.log($scope.cloud_grid_res);
                                    load_cloud_cred(); 
                                    $scope.cloudkid = "";
                                    document.getElementById("cloudForm").reset();
                                    $("#model_cloud_add").modal('toggle');
                                }else{
                                    notie.alert(3, res.data, config.notify_delay);
                                }
                                $rootScope.showSpinner = false;
                            }
                        })
                    }
                }

                
            })

            // cloud edit from modal trigger function 
            $scope.btncloudedit =  function(val){
                $("#txtcloudname").val(val[1]);
                $("#txtcloudip").val(val[2]);
                $("#selcloudtype").val(val[3]);
                $("#selcloudcred").val(val[4]);
                $("#model_cloud_add").modal('toggle');   
                $scope.cloudkid = val[0]
                $scope.addheader = false;
                $scope.updateheader = true;
            }
            

            // cloud add new function modal
            $scope.btnaddmodal= function(){
                $("#model_cloud_add").modal('toggle'); 
                document.getElementById("cloudForm").reset();
                $("label.error").css("display", "none");
                $("input, select").removeClass("form_error");
                $scope.addheader = true;
                $scope.updateheader = false;
                $scope.cloudkid = "";
            }

            // cloud delete function
            $scope.btnclouddel = function(val){
                $scope.cloudpk_id = val;
                $.confirm({
                    title: 'Delete Hypervisor',
                    type: 'blue',
                    backgroundDismiss: true,
                    content: 'Do you want to delete this Hypervisor ?',
                    buttons: {
                        "Cancel": function () {
    
                        },
                        "Confirm": function () {
                            $rootScope.showSpinner = true;
                            $intelliCloudService.deletclouddet($scope.cloudpk_id ).then(function(res) {
                                if(res == config.service_unavailable){
                                    notie.alert(3, res, config.notify_delay);
                                    $rootScope.showSpinner = false;
                                }else{ 
                                    $rootScope.showSpinner = false;
                                    if (res.result == "success") {
                                        notie.alert(1, res.data, config.notify_delay);
                                        for (var i = 0; i < $scope.cloud_grid_res.length; i++) {
                                            if ($scope.cloudpk_id == $scope.cloud_grid_res[i][0]) {
                                                $scope.cloud_grid_res.splice(i, 1);
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

            var displayheight =  $(window).height();
            $("#model_cloud_map .modal-body .table-reponsive").css({"height" : displayheight - 250 + "px ", "overflow-y" : "scroll"});

            // mapping function
            $scope.btncloudmap = function(val, val1){
                $scope.clmapid = val;
                $scope.clmapname = val1;
                $intelliCloudService.cloudmapdetget($scope.clmapid).then(function (res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        $rootScope.showSpinner = false;
                        if (res.result == "success") {
                            // console.log(res.data);
                            $scope.cloud_map_res = res.data.slice(1);
                            $("#model_cloud_map").modal('toggle');  
                        }else{ 
                            notie.alert(3, res.data, config.notify_delay);
                            
                        }
                    }
                });
            }

            $(".btn_map_save").click(function(){
                var checkboxes = document.getElementsByName("cldcheckname");
                var checkboxesChecked = [];
                // loop over them all
                for (var i=0; i<checkboxes.length; i++) {
                    if (checkboxes[i].checked) {
                        $scope.cval = checkboxes[i].id.split();
                        checkboxesChecked.push(parseInt($scope.cval));
                    }else{
                        checkboxesChecked.push();
                    }
                }
                var dataset = {"vcloud_ids": $scope.clmapid, "vcenter_ids":checkboxesChecked}
                // console.log(checkboxesChecked);
                $intelliCloudService.cloudmapdetpost(dataset).then(function (res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        $rootScope.showSpinner = false;
                        if (res.result == "success") {
                            // console.log(res)
                            notie.alert(1, res.data, config.notify_delay);
                            // $("#model_cloud_map").modal('toggle');  
                        }else{
                            notie.alert(3, res.data, config.notify_delay);
                            // $("#model_cloud_map").modal('toggle');  
                        }
                    }
                });

            })

        }   
        // $scope.init = function () {

        // }

        $rootScope.$on('CMDBTabChange', function (event, args) {
            if (args["tabname"] == "Cloud") {
                if (!bpageloaded) {
                    bpageloaded = true;
                    init_event();
                    load_cloud_grid();
                    load_cloud_cred();
                }
            }
        });

    }
])