angular.module('pages').controller('CSMappingController', [
    '$scope',
    '$http',
    '$rootScope',
    'CSMappingService',
    function($scope, $http, $rootScope, $CSMappingService) {


        // customer id 
        $scope.vm_custid = "";
        $scope.vmwaredet = [];
        $scope.custlist = "";
        var cust_id_mail  = "";
        $scope.sendmethod = "";
        $scope.vm_technology = "";

        // User View to Customer Go function
        $scope.create_customer_rule = function(){
            $scope.custlist = "";
            var icustheight = $(window).height();
            var icustwidth = $(window).width();
            $(".viewcustomer").css({"height": icustheight  - 150 + "px"});
            $(".viewcustomer .panel .panel-body").css({"height": icustheight - 250 + "px", "overflow-y" : 'scroll'});
            // $(".viewcustomer").css({"width": icustwidth  - 100 + "px"});

            $rootScope.showSpinner = true;
            $CSMappingService.getcustomerdet().then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    if (res.result == "success") {
                        $scope.custlist = res.data;
                        console.log($scope.custlist);
                        $rootScope.showSpinner = false;
                    }else{
                        notie.alert(3, res.data, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }
                }
            });

        }

        
        function init_event() {

            // breadcrumb function
            var dataarg = [];
            dataarg.push({"action" : "#/admin","name" : "Admin"});             
            dataarg.push({"action" : "","name" : "CSMapping"});
            $rootScope.$broadcast('ShowBreadcrumb', dataarg);


            // Customer detail to submit function
            $scope.submitcustdet = function(custid, servid){
                var chckvalid = "checkval"+custid+servid;
                var chckval = document.getElementById(chckvalid);
                if(chckval.checked == true){
                    var servicechk = "add";
                }else{
                    var servicechk = "del";
                }
                
                var custpara = {
                    "customer_id": custid,
                    "service_id": servid,
                    "action": servicechk
                };

                // alert(servicechk, custid, servid)
                // console.log(servicechk, custid, servid)
                $rootScope.showSpinner = true;
                $CSMappingService.postcustomerdet(custpara).then(function (res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        if (res.result == "success") {
                            // $scope.custlist = res.data;
                            notie.alert(1, res.data , config.notify_delay);
                            $rootScope.showSpinner = false;
                            // for (var i = 0; i < $scope.custlist.length; i++) {
                            //     if($scope.custlist[i].cust_pk_id == custid){
                            //         if(servicechk = "add"){
                            //             $scope.custlist[i].services[0][2] == "Y"
                            //         }else{
                            //             $scope.custlist[i].services[0][2] == "N"
                            //         }
                            //     }
                            // }
                            // console.log($scope.custlist);
                            $scope.create_customer_rule()
                        }else{
                            notie.alert(3, res.data, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }
                    }
                });
            }
            
            // get vmware details function
            $scope.getvmwaremapfn = function(custid, cusname, tech){
                $scope.vmwaredet = "";
                $scope.searcvmhtxt = "";
                $scope.vm_custid = custid;
                $scope.vm_cusname = cusname;
                $scope.vm_technology = tech;

                var modalheight = $(window).height();
                var modalwidth = $(window).width();
                // $("#Vmwaremodal .modal-dialog").css({"height" : modalheight - 100 + "px"});
                $("#Vmwaremodal .modal-body").css({"height" : modalheight - 200 + "px ", "overflow-y" : "scroll"});
                $("#Vmwaremodal .modal-dialog").css({"width" : modalwidth - 350 + "px"});
                $rootScope.showSpinner = true;
                $CSMappingService.getvmwaredet($scope.vm_custid, tech).then(function(res){
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        if (res.result == "success") {
                            $scope.vmwaredet = res.data.splice(1);
                            console.log($scope.vmwaredet);
                            // notie.alert(1, res.data , config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{
                            $rootScope.showSpinner = false;
                            notie.alert(3, res.data, config.notify_delay);
                        }
                    }
                });

            }

            // function arrayUnique(array) {
            //     var a = array.concat();
            //     for(var i=0; i<a.length; ++i) {
            //         for(var j=i+1; j<a.length; ++j) {
            //             if(a[i] === a[j])
            //                 a.splice(j--, 1);
            //         }
            //     }
            //     return a;
            // }

            // submit vmware mapping function
            $scope.submitvmdetfn = function(){
                $scope.searcvmhtxt = '';
                setTimeout(function(){ $scope.subvmdetfn() }, 2000);
                
            }

            $scope.subvmdetfn = function(){
                var checkboxes = document.getElementsByName("cmcheckbox");
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
                console.log(checkboxesChecked);
                // $scope.cust_id = [];
                // for (var i = 0; i < $scope.vmwaredet.length; i++) {
                //     if ($scope.vmwaredet[i][5] == "Y") {
                //         $scope.cust_id.push($scope.vmwaredet[i][0]);
                //     }
                // }
                // var chckval = arrayUnique(checkboxesChecked.concat($scope.cust_id));

                // console.log(chckval);

                // // alert(vmid);
                var vmdet = {
                    "customer_id": $scope.vm_custid,
                    "vms": checkboxesChecked,
                    "technology" : $scope.vm_technology
                }

                // console.log(vmdet);
                $rootScope.showSpinner = true;
                $CSMappingService.postvmwaredet(vmdet).then(function (res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        if (res.result == "success") {
                            // $scope.custlist = res.data;
                            notie.alert(1, res.data , config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{
                            notie.alert(3, res.data, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }
                    }
                });
            }

            // $('#csmmailfrom').validate({
            //     onkeyup: false,
            //     errorClass: 'error',
            //     validClass: 'valid',
            //     rules: {
            //         txtupdatecredusername: {required: true},
            //     },
            //     messages: {
            //         txtupdatecredusername: {
            //             required: 'Please Enter Email ID'
            //         },
            //     },
            //     highlight: function(element) {
            //         $(element).closest('input').addClass("form_error");
            //     },
            //     unhighlight: function(element) {
            //         $(element).closest('input').removeClass("form_error");
            //     },
            //     errorPlacement: function(error, element) {
            //         $(element).closest('div').append(error);
            //     }
            // });

            $scope.mailmodalfn = function(custval){
                cust_id_mail = custval;
                $scope.mailitems = [];
                $rootScope.showSpinner = true;
                $('#newRow').find("#inputFormRow").remove();
                $CSMappingService.getusermaildet(cust_id_mail).then(function (res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                            $scope.mailitems = res;
                            console.log($scope.mailitems);
                            // notie.alert(1, res.data , config.notify_delay);
                            $rootScope.showSpinner = false;
                            if(res.data == "no data"){
                                $scope.sendmethod = "postmethod"
                            }
                    }
                });
                $("#mailmodal").modal('toggle');
            }

            // $scope.mailitems = [];
            $scope.addbtnto = function(){
                // $scope.newitem ="Enter Your To Mail " + $scope.mailitems.length ;
                // if ($scope.mailitems.length < 4) {
                //   $scope.mailitems.push($scope.newitem);
                // }
                var tohtml = '';
                tohtml += '<div id="inputFormRow">';
                tohtml += '<div class="form-group">';
                tohtml += '<input type="email" name="tomail[]" class="form-control m-input" placeholder="Enter Mail ID" autocomplete="off" style="width: 92%;float: left;">';
                tohtml += '<div class="input-group-append">';
                tohtml += '<button id="removeRow" type="button" class="btn btn-info" style="float: left; padding: 7px; margin-left: 18px;"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
                tohtml += '</div>';
                tohtml += '</div>';
        
                $('#newRow').append(tohtml);
            }

                
            // remove row
            $(document).on('click', '#removeRow', function () {
                $(this).closest('#inputFormRow').remove();
            });

            $scope.submitpostvmdetfn = function(){
                // if ($('#csmmailfrom').valid()) {
                    var checkboxes = document.getElementsByName("tomail[]");
                    var values = $('input[name="tomail[]"]').map(function(){
                        return $(this).val();
                     }).get();
                    
                     console.log(values);
                    if($scope.sendmethod == "postmethod"){

                        if(checkboxes.length == "0"){
                            notie.alert(3, "Enter Mail", config.notify_delay);
                        }else{
                            var dataval = {"cust_id": cust_id_mail, "to":values}
                            $rootScope.showSpinner = true;
                            $CSMappingService.postusermaildet(dataval).then(function (res) {
                                if(res == config.service_unavailable){
                                    notie.alert(3, res, config.notify_delay);
                                    $rootScope.showSpinner = false;
                                }else{ 
                                    if (res.result == "success") {
                                        // $scope.mailitems = res.data;
                                        notie.alert(1, res.data , config.notify_delay);
                                        $rootScope.showSpinner = false;
                                        document.getElementById("csmmailfrom").reset();
                                        $('#newRow').find("#inputFormRow").remove();
                                        $("#mailmodal").modal('toggle');
                                    }else{
                                        notie.alert(3, res.data, config.notify_delay);
                                        $rootScope.showSpinner = false;
                                    }
                                }
                            });
                        }

                    }else{

                        if(checkboxes.length == "0"){
                            notie.alert(3, "Enter Mail", config.notify_delay);
                        }else{
                            var dataval = {"cust_id": cust_id_mail, "to":values}
                            $rootScope.showSpinner = true;
                            $CSMappingService.putusermaildet(dataval).then(function (res) {
                                if(res == config.service_unavailable){
                                    notie.alert(3, res, config.notify_delay);
                                    $rootScope.showSpinner = false;
                                }else{ 
                                    if (res.result == "success") {
                                        // $scope.mailitems = res.data;
                                        notie.alert(1, res.data , config.notify_delay);
                                        $rootScope.showSpinner = false;
                                        document.getElementById("csmmailfrom").reset();
                                        $('#newRow').find("#inputFormRow").remove();
                                        $("#mailmodal").modal('toggle');
                                    }else{
                                        notie.alert(3, res.data, config.notify_delay);
                                        $rootScope.showSpinner = false;
                                    }
                                }
                            });

                        }

                    }
                // }
               
            }

            $("#btndisble").click(function(){
                $CSMappingService.delusermaildet(cust_id_mail).then(function (res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        if (res.result == "success") {
                            // $scope.mailitems = res.data;
                            notie.alert(1, res.data , config.notify_delay);
                            $rootScope.showSpinner = false;
                            $("#mailmodal").modal('toggle');
                        }else{
                            notie.alert(3, res.data, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }
                    }
                });

            })

        }
        $scope.init = function() {
            init_event();
            $scope.create_customer_rule();
        };


    }
]);