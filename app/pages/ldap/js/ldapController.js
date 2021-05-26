angular.module('pages').controller('ldapController', [
    '$scope',
    '$http',
    '$rootScope',
    '$timeout',
    'intelliLdapService',
    function($scope, $http, $rootScope, $timeout, $intelliLdapService) {

        $scope.communication_type = [];

        function load_dropdown_list() {
            $rootScope.showSpinner = true;
            $intelliLdapService.ldapmasterData().then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;                
                    if (res.Status == "Completed") {
                        $scope.communication_type = res.Data["communication_type"];
                        load_smtp_details();
                    }
                }
            });
        }

        function load_smtp_details() {
            $rootScope.showSpinner = true;
            $intelliLdapService.loadldapDetails().then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.Status == "Completed") {
                        var res_arr = res.Data;
                        // var addpasswrd =  res_arr["syspwd"];
                        // var ctObj = CryptoJS.AES.decrypt(addpasswrd, "@ut0!ntell!");
                        // var ctStr = ctObj.toString(CryptoJS.enc.Utf8);
                        $("#txtldapip").val(res_arr["LDAP IP"]);
                        $("#txtldapport").val(res_arr["LDAP PORT"]);
                        $("#selcommunicationtype").val(res_arr["communication_type"]);                    
                        $("#txtldapaccount").val(res_arr["sysacc"]);                    
                        $("#txtldappassword").val(res_arr["syspwd"]);                    
                        $("#txtldapbasedn").val(res_arr["basedn"]);                    
                    }
                }
            });
        }

        function init_event() {

            var dataarg = [];
            dataarg.push({"action": "#/admin", "name": "Admin"});
            dataarg.push({"action": "", "name": "LDAP"});
            $rootScope.$broadcast('ShowBreadcrumb', dataarg);


            $('#formldap').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    selcommunicationtype: {required: true},
                    txtldapip: {required: true},
                    txtldapport: {required: true}                
                },
                messages: {
                    selcommunicationtype: {
                        required: 'Please select communication port'
                    },
                    txtldapip: {
                        required: 'Please enter your ldap ip'
                    },
                    txtldapport: {
                        required: 'Please enter the ldap port'
                    },
                    txtldapaccount: {
                        required: 'Please enter your ldap Account'
                    },
                    txtldappassword: {
                        required: "Please enter the confirm password",
                        minlength: "Min {0} characters",
                        equalTo: "Please re-enter the same password"
                    }, 
                    txtldapbasedn: {
                        required: 'Please enter your ldap Base DN'
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

            $scope.uppasstoggle = function(){
                var ps = document.getElementById("txtldappassword") ;
                if(ps.type === "password"){
                    ps.type = "text";
                }else{
                    ps.type = "password"
                }
            }

            $("#btnldapsave").click(function() {
                if ($('#formldap').valid()) {
                    var addpasswrd =  $("#txtldappassword").val();
                    var ctObj = CryptoJS.AES.encrypt(addpasswrd, "@ut0!ntell!");
                    var ctStr = ctObj.toString();
                    $rootScope.showSpinner = true;                    
                    var data_arr = {
                        "communication_type": $("#selcommunicationtype").val(),
                        "ldapip": $("#txtldapip").val(),
                        "ldapport": $("#txtldapport").val(),                     
                        "sysacc": $("#txtldapaccount").val(),                     
                        "syspwd": ctStr,                     
                        "basedn": $("#txtldapbasedn").val()                     
                    };
                    $intelliLdapService.saveldapDetails(data_arr).then(function(res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{ 
                            $rootScope.showSpinner = false;
                            notie.alert(1, res.Message, config.notify_delay);
                        }
                    });
                }
                return false;
            });

        }

        $scope.init = function() {
            init_event();
            load_dropdown_list();
        };

    }
]);