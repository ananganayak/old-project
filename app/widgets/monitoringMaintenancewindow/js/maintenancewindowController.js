angular.module('pages').controller('maintenancewindowController', [
    '$scope',
    '$timeout',
    '$rootScope',
    'intellimaintenancewindowService',
    function ($scope, $timeout, $rootScope, $intellimaintenancewindowService) {

        var bpageloaded = false;
        
        var username = sessionStorage.getItem("username");

        // get main all Application
        $scope.getallapplication = function(){
            Pace.restart();

            // $rootScope.showSpinner = true;
            $intellimaintenancewindowService.getallappval(username).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{
                    if(res.result == "failure"){
                        notie.alert(3, res.data, config.notify_delay);
                    }else{
                        Pace.start();
                        $scope.getallappval = res.data;
                        console.log($scope.getallappval);
                        Pace.stop();
                        $rootScope.showSpinner = false;
                    }
                }
            })
        }

        

        function init_event() {
            $('.datepicker').datetimepicker({
                format: 'DD-MM-YYYY HH:mm'
            });
            
            $('#addmwForm').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    seladdmwhostgrp: {required: true},
                    seladdmwhost: {required: true},
                    txtaddmwremarks: {required: true},
                    txtaddmwstartdate: {required: true},
                    txtaddmwendate: {required: true},
                },
                messages: {
                    seladdmwhostgrp: {
                        required: 'Please Select the Host Group'
                    },
                    seladdmwhost: {
                        required: 'Please Select the Host',
                    },
                    txtaddmwremarks: {
                        required: 'Please enter the Remarks'
                    },
                    txtaddmwstartdate: {
                        required: 'Please Enter the Start Date',
                    },
                    txtaddmwendate: {
                        required: 'Please Enter the End Date',
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


            

            // // application new add detail function

            // $("#btnaddappdet").click(function(){
            //     if ($('#addappForm').valid()) {

            //         var appgetdet ={
            //             "type": $scope.txtapptype,
            //             "name":  $("#txtaddappname").val(),
            //             "class": $("#seladdappcls").val(),
            //             "sub_class": $("#seladdappsubcls").val(),
            //         };
                    
            //         // console.log(softgetattr);

            //         $intelliapplicationService.addapplicationlist(appgetdet).then(function(res) {
            //             if(res == config.service_unavailable){
            //                 notie.alert(3, res, config.notify_delay);
            //                 $rootScope.showSpinner = false;
            //             }else{ 
            //                 $rootScope.showSpinner = false;
            //                 if (res.result == "success") {
            //                     notie.alert(1, res.data, config.notify_delay);
            //                     $scope.getappsdetlist.push({
            //                         "application_id": $scope.getappsdetlist.length + 1,
            //                         "type": $scope.txtapptype,
            //                         "application_name":  $("#txtaddappname").val(),
            //                         "application_class": $("#seladdappcls").val(),
            //                         "application_subclass": $("#seladdappsubcls").val(),
            //                     });
            //                     // console.log($scope.getswsdetlist);
            //                     $("#btnaddappmodalcancel").trigger("click");
            //                     document.getElementById("addappForm").reset();
            //                 } else {
            //                     notie.alert(3, res.data, config.notify_delay);
            //                 }
            //             }
            //         });
            //     }
            //     return false;
            // })

            
            $(".btnnewmwadd").click(function(){
                $("#modeladdmwdet").modal('toggle');
                $("label.error").css("display", "none");
                $("input, select").removeClass("form_error");
                return false;
            })

        }
        
        

        

        $scope.init = function () {
            
        }



        $rootScope.$on('monitoringTabChange', function (event, args) {
            if (args["tabname"] == "Maintenance Window") {
                if (!bpageloaded) {
                    bpageloaded = true;
                    init_event();
                    $scope.getallapplication();
                }
            }
        });

        $scope.finished = function () {
            $timeout(function () {
                angular.element(document).ready(function () {
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }, 100, false);
        };
       

    }
]);