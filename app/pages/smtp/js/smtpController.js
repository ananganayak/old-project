angular.module('pages').controller('smtpController', [
    '$scope',
    '$http',
    '$rootScope',
    '$timeout',
    'intelliSmtpService',
    function($scope, $http, $rootScope, $timeout, $intelliSmtpService) {

        $scope.communication_type = [];

        function load_dropdown_list() {
            $rootScope.showSpinner = true;
            $intelliSmtpService.smtpmasterData().then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    console.log(res);
                    if (res.Status == "Completed") {
                        $scope.communication_type = res.Data["communication_type"];
                        load_smtp_details();
                    }
                }
            });
        }

        function load_smtp_details() {
            $rootScope.showSpinner = true;
            $intelliSmtpService.loadsmptDetails().then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.Status == "Completed") {
                        var res_arr = res.Data;
                        $("#txtsmtpip").val(res_arr["SMTP IP"]);
                        $("#txtsmtpport").val(res_arr["SMTP PORT"]);
                        $("#selcommunicationtype").val(res_arr["communication_type"]);
                        if (res_arr["Username"]) {
                            $("#chksmptauth").prop('checked', true);
                            $.uniform.update("#chksmptauth");
                            $(".smpt_auth_panel").show();

                            $("#txtsmtpusername").val(res_arr["Username"]);
                            $("#txtsmtppsw").val(res_arr["Password"]);
                        }
                    }
                }
            });
        }

        function init_event() {

            var dataarg = [];
            dataarg.push({"action": "#/admin", "name": "Admin"});
            dataarg.push({"action": "", "name": "SMTP"});
            $rootScope.$broadcast('ShowBreadcrumb', dataarg);

            $("#chksmptauth").uniform();

            $('#formsmtp').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    selcommunicationtype: {required: true},
                    txtsmtpip: {required: true},
                    txtsmtpport: {required: true},
                    txtsmtpusername: {required: true},
                    txtsmtppsw: {required: true},
                },
                messages: {
                    selcommunicationtype: {
                        required: 'Please select communication port'
                    },
                    txtsmtpip: {
                        required: 'Please enter your smtp ip'
                    },
                    txtsmtpport: {
                        required: 'Please enter the smtp port'
                    },
                    txtsmtpusername: {
                        required: 'Please enter the username'
                    },
                    txtsmtppsw: {
                        required: 'Please enter the password'
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

            $("#chksmptauth").click(function() {
                if ($(this).is(":checked")) {
                    $(".smpt_auth_panel").fadeIn('slow');
                } else {
                    $(".smpt_auth_panel").fadeOut('slow');
                }
            });


            $("#btnsmtpsave").click(function() {
                if ($('#formsmtp').valid()) {
                    $rootScope.showSpinner = true;
                    var sauth = "NO";
                    var susername = "";
                    var spassword = "";
                    if ($("#chksmptauth").is(":checked")) {
                        sauth = "YES";
                        susername = $("#txtsmtpusername").val();
                        spassword = $("#txtsmtppsw").val();
                    }
                    var data_arr = {
                        "communication_type": $("#selcommunicationtype").val(),
                        "smtpip": $("#txtsmtpip").val(),
                        "smtpport": $("#txtsmtpport").val(),
                        "smtpauth": sauth,
                        "smtpuser": susername,
                        "smtppass": spassword
                    };
                    $intelliSmtpService.savesmptDetails(data_arr).then(function(res) {
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