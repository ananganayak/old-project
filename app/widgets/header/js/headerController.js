angular.module('widgets').controller('headerController', [
    '$scope',
    '$rootScope',
    '$location',
    '$http',
    '$window',
    '$state',
    function($scope, $rootScope, $location, $http, $window, $state) {
        'use strict';
        
        $scope.brand_logo = config.brand_logo_240;
        
        $scope.app_brand = app_brand;

        if(app_brand == "nxtgen"){
            $scope.cliLocation = [
                {
                    "ip" : "https://r2d2.nxtgen.com:",
                    "name" : "Bangalore"
                },{
                    "ip" : "https://r2d22.nxtgen.com:",
                    "name" : "Ahmedabad"
                },{
                    "ip" : "https://r2d23.nxtgen.com:",
                    "name" : "Faridabad"
                },{
                    "ip" : "https://r2d21.nxtgen.com:",
                    "name" : "Mumbai"
                }
            ];
        }
        $scope.sellocation = sessionStorage.getItem("envirounment_ip");
        console.log($scope.sellocation);

        $scope.testlocation = function(evt){
            if($scope.sellocation == "https://r2d2.nxtgen.com:"){
                sessionStorage.setItem("envirounment_ip", "https://r2d2.nxtgen.com:");
                // sessionStorage.setItem("envirounment_port", "443");
                $scope.sellocation = "https://r2d2.nxtgen.com:";
                $window.location.reload();
            }else if($scope.sellocation == "https://r2d22.nxtgen.com:"){
                sessionStorage.setItem("envirounment_ip", "https://r2d22.nxtgen.com:");
                // sessionStorage.setItem("envirounment_port", "443");
                $scope.sellocation = "https://r2d22.nxtgen.com:";
                $window.location.reload();
            }else if($scope.sellocation == "https://r2d23.nxtgen.com:"){
                sessionStorage.setItem("envirounment_ip", "https://r2d23.nxtgen.com:");
                // sessionStorage.setItem("envirounment_port", "443");
                $scope.sellocation = "https://r2d23.nxtgen.com:";
                $window.location.reload();
            }else if($scope.sellocation == "https://r2d21.nxtgen.com:"){
                sessionStorage.setItem("envirounment_ip", "https://r2d21.nxtgen.com:");
                // sessionStorage.setItem("envirounment_port", "443");
                $scope.sellocation = "https://r2d21.nxtgen.com:";
                $window.location.reload();
            }
        }

        // console.log($scope.cliLocation);

        function menu_display_adjust() {
            $scope.usertyp = sessionStorage["ai_usertype"];
            if (sessionStorage["access_control"]) {
                // $(".top-menu .navbar-left li").hide();
                $(".top_menu_cmdb").closest("li").show();
                var access_control = JSON.parse(sessionStorage["access_control"]);                
                var permisson_menu = access_control[sessionStorage["role_name"]];
                // console.log(access_control);
                $.each(permisson_menu,function(inx,ele){
                    if(ele.tab_name){
                        var menu_name = ele.tab_name;                       
                        if(menu_name.split("_", 1) == 'Dashboard'){
                            $(".top_menu_dashboard").closest("li").show();
                        }else if(menu_name.split("_", 1) == "Event Management"){ 
                            $(".top_menu_evm").closest("li").show();
                        }else if(menu_name.split("_", 1) == "Admin"){
                            $(".top_menu_admin").closest("li").show();
                        }else if(menu_name.split("_", 1) == "Automation"){
                            $(".top_menu_automation").closest("li").show();
                        }else if(menu_name.split("_", 1) == "Monitoring"){
                            $(".top_menu_monitoring").closest("li").show();
                        }else if(menu_name.split("_", 1) == "Machine Learning"){
                            $(".top_menu_machine_learning").closest("li").show();
                        }else if(menu_name.split("_", 1) == "Reports"){
                            $(".top_menu_report").closest("li").show();
                        }else if(menu_name.split("_", 1) == "HDDM"){
                            $(".top_menu_cmdb").closest("li").show();
                        }else if(menu_name.split("_", 1) == "Cloud Services"){
                            $(".top_menu_cloud_service").closest("li").show();
                        }else if(menu_name.split("_", 1) == "Vmware Monitoring"){
                            $(".top_menu_vmwaremonitoring").closest("li").show();
                        }
                    }
                });
            }
            document.getElementById("resetbtn").style.display = "none";
            if ($scope.usertyp == 'Non LDAP'){
                document.getElementById("resetbtn").style.display = "block"; 
            }else if($scope.usertyp == 'LDAP'){
                document.getElementById("resetbtn").style.display = "none"; 
            }
        }

        $scope.init = function() {
            menu_display_adjust();
            
            Waves.attach('#intelli_header .waves-button', ['waves-effect', 'waves-button', 'waves-classic']);
            Waves.init();
            
            if ($rootScope.isloggedin) {
                $rootScope.username = sessionStorage["username"];
            }

            $('#resetform').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    txtresetnewpwd: {required: true, minlength: 5},
                    txtresetconfirmpwd: {required: true, minlength: 5, equalTo: "#txtresetnewpwd"}
                },
                messages: {
                    txtresetnewpwd: {
                        required: 'Please enter the password',
                        minlength: 'Min {0} characters'
                    },
                    txtresetconfirmpwd: {
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


            $scope.changepassfn = function(){
                if($("#resetform"). valid()){
                    var passwrd = $("#txtresetnewpwd").val();
                    var encrypass = CryptoJS.AES.encrypt(passwrd, "@ut0!ntell!");
                    var passStr = encrypass.toString();
                    var dataarr = {
                        "pk_user_details_id" : sessionStorage["userid"],
                        // "pk_user_details_id" : "testadmin",
                        "user_password" : passStr,
                    }
                    var header = {"headers" :{'sessionkey' :sessionStorage["session_id"]}}
                    $http.post(config.urls.postresetpwd, dataarr, header).then(function(res) {
                        if(res.data.result == "success"){
                            notie.alert(1, res.data.data, config.notify_delay);
                            document.getElementById("resetform").reset();
                        }else{
                            notie.alert(3, res.data.data, config.notify_delay);
                            document.getElementById("resetform").reset();
                        }
                    });
                }
            }

        }

        $rootScope.$on('UserloggedIn', function(event, args) {
            menu_display_adjust();
        });

    }
]);