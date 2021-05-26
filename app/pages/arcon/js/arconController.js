angular.module('pages').controller('arconController', [
    '$scope',
    '$http',
    '$rootScope',
    '$timeout',
    'intelliarconService',
    function($scope, $http, $rootScope, $timeout, $intelliarconService) {

        $scope.communication_type = [];

        // Get Communication Type
        function getcomtypefun (){
            $rootScope.showSpinner = true;
            $intelliarconService.getarccomtypeser().then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;                
                    if (res.Status == "Completed") {
                        $scope.communication_type = res.Data["communication_type"];
                        // load_smtp_details();
                    }
                }
            });
        }

        // Get Master Details
        function getmasterfun (){
            $rootScope.showSpinner = true;
            $intelliarconService.getarcmasterser().then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    if (res.Status == "Completed") {
                        $scope.arcdetails = res.Data;
                        var addpasswrd =  $scope.arcdetails["arconpwd"];
                        var ctObj = CryptoJS.AES.decrypt(addpasswrd, "@ut0!ntell!");
                        var ctStr = ctObj.toString(CryptoJS.enc.Utf8);
                        $("#txtarcip").val($scope.arcdetails["arconip"]);
                        $("#txtarcport").val($scope.arcdetails["arconport"]);
                        $("#txtarcpwd").val(ctStr);
                        $("#txtarcuser").val($scope.arcdetails["arconuser"]);
                        $("#selarccomtype").val($scope.arcdetails["communication_type"]);
                        // load_smtp_details();
                    }
                    $rootScope.showSpinner = false;
                }
            });
        }
        

        function init_event() {

            var dataarg = [];
            dataarg.push({"action": "#/admin", "name": "Admin"});
            dataarg.push({"action": "", "name": "ARCON"});
            $rootScope.$broadcast('ShowBreadcrumb', dataarg);
            
            // Vaildation Arcon Details
            $('#formarcon').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    selcommunicationtype: {required: true},
                    txtldapip: {required: true},
                    txtldapport: {required: true}                
                },
                messages: {
                    selarccomtype: {
                        required: 'Please select Arcon communication port'
                    },
                    txtarcip: {
                        required: 'Please enter your Arcon ip'
                    },
                    txtarcport: {
                        required: 'Please enter the Arcon port'
                    },   
                    txtarcuser: {
                        required: 'Please enter the Arcon user'
                    },    
                    txtarcpwd: {
                        required: "Please enter the confirm password",
                        minlength: "Min {0} characters",
                        equalTo: "Please re-enter the same password"
                    }                  
                },
                highlight: function(element) {
                    $(element).closest('input').addClass("error");
                    $(element).closest('select').addClass("error");
                },
                unhighlight: function(element) {
                    $(element).closest('input').removeClass("error");
                    $(element).closest('select').removeClass("error");
                },
                errorPlacement: function(error, element) {
                    $(element).closest('div').append(error);
                }
            }); 

            $scope.uppasstoggle = function(){
                var ps = document.getElementById("txtarcpwd") ;
                if(ps.type === "password"){
                    ps.type = "text";
                }else{
                    ps.type = "password"
                }
            }

            // Save Arcon Details
            $("#btnarcsave").click(function(){
                if($('#formarcon').valid()){
                    var addpasswrd =  $("#txtarcpwd").val();
                    var ctObj = CryptoJS.AES.encrypt(addpasswrd, "@ut0!ntell!");
                    var ctStr = ctObj.toString();
                    var data={
                        "communication_type" : $("#selarccomtype").val(),
                        "arconip" : $("#txtarcip").val(),
                        "arconport" : $("#txtarcport").val(),
                        "arconuser" : $("#txtarcuser").val(),
                        "arconpwd" : ctStr,
                    }
                    console.log(data);
                    $rootScope.showSpinner = true;
                    $intelliarconService.getarcsaveser(data).then(function(res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{ 
                            $rootScope.showSpinner = false;                
                            if (res.Status == "Success") {
                                notie.alert(1, res.Message, config.notify_delay);
                            }
                        }
                    });
                }return false;
            })
           

        }

        $scope.init = function() {
            init_event();
            getcomtypefun ();
            getmasterfun ();
        };

    }
]);