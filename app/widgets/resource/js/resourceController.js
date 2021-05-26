angular.module('pages').controller('resourceController', [
    '$scope',
    '$timeout',
    '$rootScope',
    'intelliresourceService',
    function ($scope, $timeout, $rootScope, $intelliresourceService) {

        var bpageloaded = false;

        $scope.addtxtrestype = "resource";
        $scope.getresopdetlist = [];

        // applcaition class Select JSON
        function getresourcecls() {
            $intelliresourceService.getresourceclslist({}).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        $scope.getrescclslist = res.data;
                        // console.log($scope.getrescclslist);
                    }
                }
            });
        }

        // software details list get function

        $scope.getresdetlist = function () {
            $intelliresourceService.getresourcedetlist({}).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        $scope.getresopdetlist = res.data;
                        console.log($scope.getresopdetlist);
                    }
                }
            });
        };


        //update modal data get
        $scope.upresDetget = function (val) {

            for (var i = 0; i < $scope.getresopdetlist.length; i++) {
                if ($scope.getresopdetlist[i].resource_id == val) {
                    $scope.updateviewmod = $scope.getresopdetlist[i];
                    console.log($scope.updateviewmod);
                }
            }
            $("#modelresourceupdatedet").modal('toggle');
        }


        // resource row delete function
        $scope.btnresourcedelete = function (valname) {
            var resdeletepattr = {
                "type": $scope.addtxtrestype,
                "name": valname,
            };

            $.confirm({
                title: 'Delete Resource',
                type: 'blue',
                backgroundDismiss: true,
                content: 'Do you want to delete this resource ?',
                buttons: {
                    "Cancel": function () {

                    },
                    "Confirm": function () {
                        $rootScope.showSpinner = true;
                        $intelliresourceService.deletresdet(resdeletepattr).then(function (res) {
                            if(res == config.service_unavailable){
                                notie.alert(3, res, config.notify_delay);
                                $rootScope.showSpinner = false;
                            }else{ 
                                $rootScope.showSpinner = false;
                                if (res.result == "success") {
                                    notie.alert(1, res.data, config.notify_delay);
                                    for (var i = 0; i < $scope.getresopdetlist.length; i++) {
                                        if ($scope.getresopdetlist[i].resource_name == resdeletepattr.name) {
                                            $scope.getresopdetlist.splice(i, 1);
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

            // resource detail update form validation

            $('#updateresourceForm').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    txtupdateresourcename: {required: true},
                    selupdateresourcecls: {required: true},
                },
                messages: {
                    txtupdateresourcename: {
                        required: 'Please enter the resource name'
                    },
                    selupdateresourcecls: {
                        required: 'Please enter the resource class'
                    },
                },
                highlight: function (element) {
                    $(element).closest('input').addClass("form_error");
                    $(element).closest('select').addClass("form_error");
                },
                unhighlight: function (element) {
                    $(element).closest('input').removeClass("form_error");
                    $(element).closest('select').removeClass("form_error");
                },
                errorPlacement: function (error, element) {
                    $(element).closest('div').append(error);
                }

            });


            // resource detail add form validation 
            $('#addresourceForm').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    txtaddresourcename: {required: true},
                    seladdresourcecls: {required: true},
                },
                messages: {
                    txtaddresourcename: {
                        required: 'Please enter the resource name'
                    },
                    seladdresourcecls: {
                        required: 'Please enter the resource class'
                    },
                },
                highlight: function (element) {
                    $(element).closest('input').addClass("form_error");
                    $(element).closest('select').addClass("form_error");
                },
                unhighlight: function (element) {
                    $(element).closest('input').removeClass("form_error");
                    $(element).closest('select').removeClass("form_error");
                },
                errorPlacement: function (error, element) {
                    $(element).closest('div').append(error);
                }

            });

            // software details add function

            $("#btnaddresourcedet").click(function () {
                if ($('#addresourceForm').valid()) {

                    var resrgetattr = {
                        "type": $scope.addtxtrestype,
                        "name": $("#txtaddresourcename").val(),
                        "class": $("#seladdresourcecls").val(),
                    };
                    $intelliresourceService.addresourcelist(resrgetattr).then(function (res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{ 
                            $rootScope.showSpinner = false;
                            if (res.result == "success") {
                                notie.alert(1, res.data, config.notify_delay);
                                $scope.getresopdetlist.push({
                                    "type": $scope.addtxtrestype,
                                    "resource_id": $scope.getresopdetlist.length + 1,
                                    "resource_name": $("#txtaddresourcename").val(),
                                    "resource_class": $("#seladdresourcecls").val(),
                                });
                                $("#btnaddresourcemodalcancel").trigger("click");
                                document.getElementById("addresourceForm").reset();
                            } else {
                                notie.alert(3, res.data, config.notify_delay);
                            }
                        }
                    });
                }
                return false;
            })

            // resource details update function
            
            $("#btnresourcedetUpdate").click(function(){
                if ($('#updateresourceForm').valid()) {
                    var resrupattr = {
                        "type": $scope.addtxtrestype,
                        "name": $("#txtupdateresourcename").val(),
                        "class": $("#selupdateresourcecls").val(),
                    };

                    $intelliresourceService.upresourcelist(resrupattr).then(function (res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{ 
                            $rootScope.showSpinner = false;
                            if (res.result == "success") {
                                notie.alert(1, res.data, config.notify_delay);
                                for (var i = 0; i < $scope.getresopdetlist.length; i++) {
                                    if ($scope.getresopdetlist[i].resource_name == resrupattr.name) {
                                        $scope.getresopdetlist[i].resource_name = resrupattr.name;
                                        $scope.getresopdetlist[i].resource_class = resrupattr.class;
                                        break;
                                    }
                                }
                                $("#btnresourceupdatemodalcancel").trigger("click");
                            } else {
                                notie.alert(3, res.data, config.notify_delay);
                            }
                        }
                    });
                }
            });


            $(".btnnewresourceadd").click(function () {
                $("#modeladdresourcedet").modal('toggle');
                $("label.error").css("display", "none");
                $("input, select").removeClass("form_error");
                return false;
            });

        }


        // resource add from modal





        $scope.init = function () {
        }



        $rootScope.$on('CMDBTabChange', function (event, args) {
            if (args["tabname"] == "Resource") {
                if (!bpageloaded) {
                    bpageloaded = true;
                    init_event();
                    getresourcecls();
                    $scope.getresdetlist();
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