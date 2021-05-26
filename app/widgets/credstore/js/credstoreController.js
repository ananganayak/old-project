angular.module('widgets').controller('credstoreController', [
    '$scope',
    '$timeout',
    '$rootScope',
    'intelliCredstoreService',
    function ($scope, $timeout, $rootScope, $intelliCredstoreService) {

        $scope.credDet = [];

        var bpageloaded = false;

        // cred Details get function

        function loadCredDetails() {                 
                    
            $rootScope.showSpinner = true;
            $intelliCredstoreService.getCredDetlist({}).then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        $scope.credDet = res.data.slice(1);
                        console.log($scope.credDet);
                    }
                }
            });

        }


        // CRED Type Select JSON
        $scope.crdType =[{
            id : 1,
            value : "WINRM"
        },{
            id : 2,
            value : "SSH"
        },{
            id : 3,
            value : "TELNET"
        },{
            id : 4,
            value : "SSH-Key"
        },{
            id : 5,
            value : "ARCON"
        },{
            id : 6,
            value : "HTTP"
        },{
            id : 7,
            value : "HTTPS"
        },{
            id : 8,
            value : "SNMP v2c"
        }

        ];

        $scope.uppasstoggle = function(){
            var ps = document.getElementById("txtupdatecredpass") ;
            var cps = document.getElementById("txtupdatecredrepass") ;
            if(ps.type === "password" && cps.type === "password"){
                ps.type = "text";
                cps.type = "text";
            }else{
                ps.type = "password"
                cps.type = "password"
            }
        }
        $scope.addpasstoggle = function(){
            var aps = document.getElementById("txtcredpwd") ;
            var acps = document.getElementById("txtcredrepass") ;
            if(aps.type === "password" && acps.type === "password"){
                aps.type = "text";
                acps.type = "text";
            }else{
                aps.type = "password"
                acps.type = "password"
            }
        }

        // port field hidden and Show.
        // $scope.porttoggle = false;

        // $scope.addporttoggle = function(){
        //     if($scope.porttoggle == false){
        //         $scope.porttoggle = true;
        //     }else{
        //         $scope.porttoggle = false;
        //     }
            
        // }



        function init_event() {

            // Cred add Modal Form validation 


            $('#credAdddetails').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    txtcredname: {required: true},
                    selcredtype: {required: true},
                    txtcredusername: {required: true},
                    txtcredport: {required: true},
                    txtcredrdbport: {required: true},
                    txtcredpwd: {required: true, minlength: 5},
                    txtcredrepass: {required: true, minlength: 5,  equalTo: "#txtcredpwd"},
                },
                messages: {
                    txtcredname: {
                        required: 'Please enter the CRED Name'
                    },
                    txtcredusername: {
                        required: 'Please enter the CRED username'
                    },
                    txtcredport: {
                        required: 'Please enter the CRED Valid Port'
                    },
                    txtcredrdbport: {
                        required: 'Please enter the CRED Valid Port'
                    },
                    txtcredpwd: {
                        required: 'Please enter the CRED password',
                        minlength: "Min {0} characters"
                    },
                    txtcredrepass: {
                        required: "Please enter the confirm password",
                        minlength: "Min {0} characters",
                        equalTo: "Please re-enter the same password"
                    },
                    selcredtype: {
                        required: "Please select a user type"
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
                    $(element).closest('div').append(error);
                }
            });

           
          
            //cred form reset 

            $(".btncreddetreset").click(function(){
                document.getElementById("credAdddetails").reset();
            })


            // cred Add function


            $(".btncreddetsave").click(function() {   

                if ($('#credAdddetails').valid()) {
                    var addpasswrd =  $("#txtcredpwd").val();
                    var ctObj = CryptoJS.AES.encrypt(addpasswrd, "@ut0!ntell!");
                    var ctStr = ctObj.toString();
                    
                    var data_cred = {
                        "cred_name": $("#txtcredname").val(),
                        "username": $("#txtcredusername").val(),
                        "port": $("#txtcredport").val(),
                        "terminal_port": $("#txtcredrdbport").val(),
                        "password": ctStr,
                        "cred_type": $("#selcredtype").val(),
                        "sudo": '',
                    };

                    $rootScope.showSpinner = true;

                    $intelliCredstoreService.addCred(data_cred).then(function(res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{ 
                            $rootScope.showSpinner = false;
                            if (res.result == "success") {
                                notie.alert(1, res.data, config.notify_delay);
                                $scope.credDet.push({
                                    0 : $scope.credDet.length + 1,
                                    1 : $("#txtcredname").val(),
                                    2 : $("#selcredtype").val(),
                                    3 : $("#txtcredusername").val(),
                                });

                                // console.log($scope.credDet);
                                $("#btnaddemodalcancel").trigger("click");
                            } else {
                                notie.alert(3, res.data, config.notify_delay);
                            }
                        }
                    });

                }

                return false;

            });

            $('#updatecredForm').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    txtupdatecredusername: {required: true},
                    txtupdatecredpass: {required: true, minlength: 5},
                    txtupdatecredrepass: {required: true, minlength: 5, equalTo: "#txtupdatecredpass"},
                },
                messages: {
                    txtupdatecredusername: {
                        required: 'Please enter the CRED username'
                    },
                    txtupdatecredpass: {
                        required: 'Please enter the password',
                        minlength: 'Min {0} characters'
                    },
                    txtupdatecredrepass: {
                        required: "Please enter the confirm password",
                        minlength: "Min {0} characters",
                        equalTo: "Please re-enter the same password"
                    },
                },
                highlight: function(element) {
                    $(element).closest('input').addClass("form_error");
                },
                unhighlight: function(element) {
                    $(element).closest('input').removeClass("form_error");
                },
                errorPlacement: function(error, element) {
                    $(element).closest('div').append(error);
                }

            });

            // Cred Update Function

            $("#btncreddetUpdate").click(function(){
                if ($('#updatecredForm').valid()) {
                    var uppasswrd =  $("#txtupdatecredpass").val();
                    var ctObj = CryptoJS.AES.encrypt(uppasswrd, "@ut0!ntell!");
                    var ctStr = ctObj.toString();
                    var updata_data = {
                        "username": $("#txtupdatecredusername").val(),
                        "password": ctStr
                    };
                    var cred_name = $("#txtupdatecredname").val();
                    var username = $("#updatecredusername").val();
                    // var murl = "http://95.216.28.228:3006/ui/api1.0/devicecred/credentials/";
                    // var surl = murl + cred_name;
                    $rootScope.showSpinner = true;
                    $intelliCredstoreService.updateCreddet(cred_name, updata_data).then(function(res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{ 
                            $rootScope.showSpinner = false;
                            if (res.result == "success") {
                                notie.alert(1, res.data, config.notify_delay);
                                for (var i = 0; i < $scope.credDet.length; i++) {                               
                                    if ($scope.credDet[i] == username) {
                                        $scope.credDet[i][1] = username;
                                        $scope.$apply();
                                        break;
                                    }
                                }
                                $("#updatemodalbtn").trigger("click");
                                
                            } else {
                                notie.alert(3, res.data, config.notify_delay);
                            }
                        }
                    });
                }
                return false;
            });
            

        }


        // delete the row 
        $scope.deleteRowval = function(){

            var cred_name = $(this)[0].cd[1];
            // var murl = "http://95.216.28.228:3006/ui/api1.0/devicecred/credentials/";
            // var surl = murl + cred_name;

            $.confirm({
                title: 'Delete Credential',
                type: 'blue',
                backgroundDismiss: true,
                content: 'Do you want to delete this credential ?',
                buttons: {
                    "Cancel": function () {

                    },
                    "Confirm": function () {
                        $rootScope.showSpinner = true;
                        $intelliCredstoreService.deletcreddet(cred_name).then(function(res) {
                            if(res == config.service_unavailable){
                                notie.alert(3, res, config.notify_delay);
                                $rootScope.showSpinner = false;
                            }else{ 
                                $rootScope.showSpinner = false;
                                if (res.result == "success") {
                                    notie.alert(1, res.data, config.notify_delay);
                                    for (var i = 0; i < $scope.credDet.length; i++) {
                                        if ($scope.credDet[i][1] == cred_name) {
                                            $scope.credDet.splice(i, 1);
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




        $scope.init = function () {
            $('[data-toggle="tooltip"]').tooltip();
            init_event();
            loadCredDetails();
            
        }



        /*$rootScope.$on('CMDBTabChange', function (event, args) {
            if (args["tabname"] == "CRED Store") {
                if (!bpageloaded) {
                    bpageloaded = true;
                    init_event();
                }
            }
        });*/



        // Add new cred Detail Modal
        $(".newcredadd").click(function () {
            $("#model_cred_add").modal('toggle');
            document.getElementById("credAdddetails").reset();
            $("label.error").css("display", "none");
            $("input, select").removeClass("form_error");
            
            return false;
        });

        
        // Cred Update MOdel form value bind Function
        $scope.updateRowdetsmodal = function(val){
            for (var i = 0; i < $scope.credDet.length; i++) {
                if($scope.credDet[i][0] == val){
                    $scope.getval = $scope.credDet[i];
                    console.log($scope.getval);
                }
            }
            $("#model_cred_update").modal('toggle');
            return false;
        };
        
       

    }
]);