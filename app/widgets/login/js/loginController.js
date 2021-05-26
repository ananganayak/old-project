angular.module('widgets').controller('intelliLoginController', [
    '$scope',
    '$rootScope',
    '$location',
    'intelliLoginService',
    function($scope, $rootScope, $location, $intelliLoginService) {
        'use strict';
        
        $scope.brand_logo = config.brand_logo;
        $scope.copyright = config.brand_copyright;
        
        $scope.loginpages = true;
        $scope.updatepages = false;


        $scope.init = function() {
            $('#loginform').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    txtusername: {required: true, minlength: 3},
                    txtpassword: {required: true, minlength: 3}
                },
                messages: {
                    txtusername: {
                        required: 'Please enter your username',
                        minlength: 'Please enter valid username'
                    },
                    txtpassword: {
                        required: 'Please enter the password',
                        minlength: 'Please enter valid password'
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

            $('#resetpwdform').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    txtnewpwd: {required: true, minlength: 5},
                    txtconfirmpwd: {required: true, minlength: 5, equalTo: "#txtnewpwd"},
                },
                messages: {
                    txtnewpwd: {
                        required: 'Please enter the password',
                        minlength: 'Min {0} characters'
                    },
                    txtconfirmpwd: {
                        required: "Please enter the confirm password",
                        minlength: "Min {0} characters",
                        equalTo: "Please re-enter the same password"
                    },
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

            $('#loginform input').keydown(function(e) {
                if (e.keyCode == 13) {
                    $('#btnlogin').trigger("click");
                }
            });
        };

        $scope.login = function() {
            if ($('#loginform').valid()) {
                var passwrd = $("#txtpassword").val();
                var encrypass = CryptoJS.AES.encrypt(passwrd, "@ut0!ntell!");
                var passStr = encrypass.toString();
                // var pval = passStr;
                // $scope.value = CryptoJS.AES.decrypt(pval, "@ut0!ntell!").toString(CryptoJS.enc.Utf8);
                // alert($scope.value);
                var dataarr = {
                    username: $("#txtusername").val(),
                    password: passStr,
                    // password:  $("#txtpassword").val(),
                };
                $rootScope.showSpinner = true;
                $intelliLoginService.postLogin(dataarr).then(function(res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        $rootScope.showSpinner = false;
                        if (res.result == "success" && res.license == "License Expired") {
                            $scope.loginpages = false;
                            $scope.updatepages = true;
                            notie.alert(3, res.license, config.notify_delay);
                            sessionStorage["session_id"] = res.session_id;
                            var key = $("#txtlicensekey").val('')
                        }
                        if (res.result == "success" && res.first_time_login == "Y") {
                            $scope.loginpages = false;
                            $scope.updatepages = false;
                            $scope.resetpwd = true;
                            sessionStorage["session_id"] = res.session_id;
                            sessionStorage["userid"] = res.pk_user_details_id;
                            var newkey = $("#txtnewpwd").val('')
                            var cnewkey = $("#txtconfirmpwd").val('')
                        }
                        else if(res.result == "success" && res.license == ""){
                            sessionStorage["loggedin"] = true;
                            sessionStorage["username"] = res.user_id;
                            sessionStorage["userid"] = res.pk_user_details_id;
                            sessionStorage["role_name"] = res.role_name;
                            sessionStorage["session_id"] = res.session_id;
                            // sessionStorage["session_id"] = "01b0fda702d14b2cd60bf17eca0a3d7704fe9689b7fea56bb9f5d37eb75623e3500c114851eb194e1978e9d07e9f48567a2ab93cfb7410fc515f6752a42635c9";
                            sessionStorage["user_tz"] = res.time_zone;
                            sessionStorage["ai_username"] = res.aiorch_user_id;
                            sessionStorage["ai_usertype"] = res.user_type;
                            var access_control = res.mapper;
                            sessionStorage["access_control"] = JSON.stringify(access_control);

                            $scope.$emit("loggedIn", {message: "loggedin"});
                        }else{
                            notie.alert(3, res.data, config.notify_delay);
                        }
                    }
                }, dataarr);                
            }

            $scope.licenseupdate = function() {
                var copyinputText ={
                    "key" : $("#txtlicensekey").val()
                } 
                if(copyinputText.key == ""){
                    notie.alert(3, "Enter The License key and Update", config.notify_delay);
                }else{
                    
                    // alert(copyinputText);
                    $intelliLoginService.update_keylicence(copyinputText).then(function(res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{ 
                            $rootScope.showSpinner = false;
                            if (res.result == "success") {
                                notie.alert(1, res.data, config.notify_delay);
                                $scope.loginpages =  true;
                                $scope.updatepages = false;
                            } else {
                                notie.alert(3, res.Message, config.notify_delay);
                            }
                        }
                    });
                }
               
            };

            $scope.loginpage = function(){
                $scope.loginpages =true ;
                $scope.updatepages =false;
                $scope.resetpwd =false;
                var key = $("#txtlicensekey").val('')
            }

            $scope.pwdupdate = function(){
                if($("#resetpwdform"). valid()){
                    var passwrd = $("#txtnewpwd").val();
                    var encrypass = CryptoJS.AES.encrypt(passwrd, "@ut0!ntell!");
                    var passStr = encrypass.toString();
                    var dataarr = {
                        "pk_user_details_id" : sessionStorage["userid"],
                        "user_password" : passStr,
                    }
                    // console.log(dataarr);
                    $intelliLoginService.resetpwd(dataarr).then(function(res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{ 
                            $rootScope.showSpinner = false;
                            if (res.result == "success") {
                                notie.alert(1, res.data, config.notify_delay);
                                $scope.loginpages =  true;
                                $scope.updatepages = false;
                                $scope.resetpwd =false;
                            } else {
                                notie.alert(3, res.data, config.notify_delay);
                            }
                        }
                    });
                }
                
            }


        }

    }
]);