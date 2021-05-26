angular.module('pages').controller('intelDCMController', [
    '$scope',
    '$http',
    '$rootScope',
    'intelDCMService',
    function($scope, $http, $rootScope, $intelDCMService) {

        $scope.dcmCommunicationType = [];
        $scope.dcmgriddata = [];
        
        function init_breadcrumb() {
            var dataarg = [];
            dataarg.push({"action": "#/admin", "name": "Admin"});
            dataarg.push({"action": "", "name": "Intel DCM"});
            $rootScope.$broadcast('ShowBreadcrumb', dataarg);
        }

        function loadcommunicationtypefn() {
            $rootScope.showSpinner = true;
            $intelDCMService.getdcmctserv().then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    
                    if (res.result == "Completed") {
                        $scope.dcmCommunicationType = res.Data;
                        console.log(res);
                        $rootScope.showSpinner = false;
                    }
                }
            });
        }


        function loaddcmgridgetfn() {
            $rootScope.showSpinner = true;
            $intelDCMService.getdcmgridserv().then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    
                    if (res.result == "success") {
                        $scope.dcmgriddata = res.data;
                        console.log(res);
                        $rootScope.showSpinner = false;
                    }
                }
            });
        }


        function init_event() {
            init_breadcrumb();

            $("#btnadd").click(function() {
                $(".model_ruleengine").modal('toggle');
                return false;
            });

            $('#DCMAddForm').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    txtadddcmip: {required: true},
                    txtadddcmport: {required: true},
                    txtadddcmusername: {required: true},
                    txtadddcmpwd: {required: true},
                    txtaddconfigname: {required: true},
                    seladdcommunicatiotyp: {required: true},
                },
                messages: {
                    txtadddcmip: {
                        required: 'Please enter the Config Ip'
                    },
                    txtadddcmport: {
                        required: 'Please enter the Config Port'
                    },
                    txtadddcmusername: {
                        required: 'Please enter the Config Username'
                    },
                    txtadddcmpwd: {
                        required: 'Please enter the Password'
                    },
                    txtaddconfigname: {
                        required: 'Please enter the Config Name'
                    },
                    seladdcommunicatiotyp: {
                        required: 'Please select the Config type'
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

            $('.btn_dcm_save').click(function(){
                if ($('#DCMAddForm').valid()) {
                    var addpasswrd =  $("#txtadddcmpwd").val();
                    var ctObj = CryptoJS.AES.encrypt(addpasswrd, "@ut0!ntell!");
                    var ctStr = ctObj.toString();
                    var dataset = {
                        'communication_type': $('#seladdcommunicatiotyp').val(), 
                        'dcmip': $('#txtadddcmip').val(), 
                        'dcmport': $('#txtadddcmport').val(), 
                        'dcmuser': $('#txtadddcmusername').val(), 
                        'dcmpwd': ctStr,
                        'configName': $('#txtaddconfigname').val()
                    }

                    $rootScope.showSpinner = true;

                    $intelDCMService.postdcmaddserv(dataset).then(function(res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{ 
                            if (res.result == "Success") {
                                console.log(res);
                                $rootScope.showSpinner = false;
                                notie.alert(1, res.Message , config.notify_delay);
                                loaddcmgridgetfn();
                            }
                        }
                    });
                }
            })
            
        }

        $scope.init = function() {
            init_event();
            loadcommunicationtypefn();
            loaddcmgridgetfn();
        };

    }
]);