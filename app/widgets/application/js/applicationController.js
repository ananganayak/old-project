angular.module('widgets').controller('applicationController', [
    '$scope',
    '$timeout',
    '$rootScope',
    'intelliapplicationService',
    function ($scope, $timeout, $rootScope, $intelliapplicationService) {

        var bpageloaded = false;
        $scope.txtapptype = "application";
        $scope.getappsdetlist = [];

        // application details class list get function

        $scope.selectapplicationclasslist = function(){
            $intelliapplicationService.getappclasslist().then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        $scope.getappclslist = res.data;
                        console.log($scope.getappclslist);
                    }
                }
            });
        };

        // application details sub class list get function

        $scope.selectapplicationsubclasslist = function(){
            $intelliapplicationService.getappsubclslist().then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        $scope.getappsclslist = res.data;
                        console.log($scope.getappsclslist);
                    }
                }
            });
        };


        // application details lilsst get function

        $scope.getapplicationdetlistfn = function(){
            $intelliapplicationService.getapplicationdetlistser({}).then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        $scope.getappsdetlist = res.data;
                        console.log($scope.getappsdetlist);
                    }
                }
            });
        };

        //update modal data get
        $scope.btnappupdate = function(aid){
            
            for (var i = 0; i < $scope.getappsdetlist.length; i++) {
                if($scope.getappsdetlist[i].application_id == aid){
                    $scope.updateviewmod = $scope.getappsdetlist[i];
                    console.log($scope.updateviewmod);
                }
            }   
            $("#modelappupdatedet").modal('toggle');    
        }



        $scope.deleteRowval =function(valname){
            var detapprow = {
                "type" : $scope.txtapptype,
                "name" : valname,
            }
            console.log(detapprow);
            $.confirm({
                title: 'Delete Application',
                type: 'blue',
                backgroundDismiss: true,
                content: 'Do you want to delete this application ?',
                buttons: {
                    "Cancel": function () {

                    },
                    "Confirm": function () {
                        $rootScope.showSpinner = true;
                        $intelliapplicationService.deletappdet(detapprow).then(function(res) {
                            if(res == config.service_unavailable){
                                notie.alert(3, res, config.notify_delay);
                                $rootScope.showSpinner = false;
                            }else{ 
                                $rootScope.showSpinner = false;
                                if (res.result == "success") {
                                    notie.alert(1, res.data, config.notify_delay);
                                    for (var i = 0; i < $scope.getappsdetlist.length; i++) {
                                        if ($scope.getappsdetlist[i].application_name == valname) {
                                            $scope.getappsdetlist.splice(i, 1);
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

        function init_event() {
            
            $('#addappForm').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    txtaddappname: {required: true},
                    seladdappcls: {required: true},
                    seladdappsubcls: {required: true},
                },
                messages: {
                    txtaddappname: {
                        required: 'Please enter the application name'
                    },
                    seladdappcls: {
                        required: 'Please enter the application class'
                    },
                    seladdappsubcls: {
                        required: 'Please enter the application sub class',
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


            $('#updateappForm').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    txtupdateappname: {required: true},
                    selupdateappcls: {required: true},
                    selupdateappsubcls: {required: true},
                },
                messages: {
                    txtupdateappname: {
                        required: 'Please enter the application name'
                    },
                    selupdateappcls: {
                        required: 'Please enter the application class'
                    },
                    selupdateappsubcls: {
                        required: 'Please enter the application sub class',
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

            // application new add detail function

            $("#btnaddappdet").click(function(){
                if ($('#addappForm').valid()) {

                    var appgetdet ={
                        "type": $scope.txtapptype,
                        "name":  $("#txtaddappname").val(),
                        "class": $("#seladdappcls").val(),
                        "sub_class": $("#seladdappsubcls").val(),
                    };
                    
                    // console.log(softgetattr);

                    $intelliapplicationService.addapplicationlist(appgetdet).then(function(res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{ 
                            $rootScope.showSpinner = false;
                            if (res.result == "success") {
                                notie.alert(1, res.data, config.notify_delay);
                                $scope.getappsdetlist.push({
                                    "application_id": $scope.getappsdetlist.length + 1,
                                    "type": $scope.txtapptype,
                                    "application_name":  $("#txtaddappname").val(),
                                    "application_class": $("#seladdappcls").val(),
                                    "application_subclass": $("#seladdappsubcls").val(),
                                });
                                // console.log($scope.getswsdetlist);
                                $("#btnaddappmodalcancel").trigger("click");
                                document.getElementById("addappForm").reset();
                            } else {
                                notie.alert(3, res.data, config.notify_delay);
                            }
                        }
                    });
                }
                return false;
            })

            // application update detail function

            $("#btnappdetUpdate").click(function(){

                if ($('#updateappForm').valid()) {

                    var updetfrm = {
                        "type": $scope.txtapptype,
                        "name":  $("#txtupdateappname").val(),
                        "class": $("#selupdateappcls").val(),
                        "sub_class": $("#selupdateappsubcls").val(),
                    }

                    $intelliapplicationService.updateapplicationlist(updetfrm).then(function(res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{ 
                            $rootScope.showSpinner = false;
                            if (res.result == "success") {
                                notie.alert(1, res.data, config.notify_delay);
                                for (var i = 0; i < $scope.getappsdetlist.length; i++) {                               
                                    if ($scope.getappsdetlist[i].application_name == updetfrm.name) {
                                        $scope.getappsdetlist[i].application_name = updetfrm.name;
                                        $scope.getappsdetlist[i].application_class = updetfrm.class;
                                        $scope.getappsdetlist[i].application_subclass = updetfrm.sub_class;
                                        break;
                                    }
                                }
                                $("#btnappupdatemodalcancel").trigger("click");
                                document.getElementById("addappForm").reset();
                            } else {
                                notie.alert(3, res.data, config.notify_delay);
                            }
                        }
                    });

                }

            })    
            
            $(".btnnewappadd").click(function(){
                $("#modeladdappdet").modal('toggle');
                $("label.error").css("display", "none");
                $("input, select").removeClass("form_error");
                return false;
            })

        }
        
        

        

        $scope.init = function () {
            
        }



        $rootScope.$on('CMDBTabChange', function (event, args) {
            if (args["tabname"] == "Application") {
                if (!bpageloaded) {
                    bpageloaded = true;
                    init_event();
                    $scope.selectapplicationclasslist();
                    $scope.selectapplicationsubclasslist();
                    $scope.getapplicationdetlistfn();
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