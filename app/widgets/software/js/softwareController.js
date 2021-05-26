angular.module('pages').controller('softwareController', [
    '$scope',
    '$timeout',
    '$rootScope',
    'intellisoftwareService',
    function ($scope, $timeout, $rootScope, $intellisoftwareService) {

        $scope.addtxtswname1 = "software";
        var bpageloaded = false;

        $scope.getattrlistary = [];

        $scope.getswsdetlist = [];

        $scope.viewattribut = false;
        $scope.addviewattribute = false;
        $scope.noaddviewattribute = false;

        // software details class list get function

        $scope.selectsoftwareclasslist = function () {
            $intellisoftwareService.getsoftwareclslist({}).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    console.log(res);
                    if (res.result == "success") {
                        $scope.getswclslist = res.data;
                        console.log($scope.getswclslist);
                    }
                }
            });
        };

        // software details sub class list get function

        $scope.selectsoftwaresubclasslist = function () {
            $intellisoftwareService.getsoftwaresubclslist({}).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        $scope.getswsclslist = res.data;
                        console.log($scope.getswsclslist);
                    }
                }
            });
        };

        // software details list get function

        $scope.getsoftwaredetlistfn = function () {
            $intellisoftwareService.getsoftwaredetlist({}).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        $scope.getswsdetlist = res.data;
                        console.log($scope.getswsdetlist);
                    }
                }
            });
        };

        // software details attribute get function

        $scope.getattributeval = function () {
            console.log($("#seladdsoftwareclass").val(), $("#seladdsoftwaresubclass").val());

            var softgetattr = {
                "type": $scope.addtxtswname1,
                "class": $("#seladdsoftwareclass").val(),
                "sub_class": $("#seladdsoftwaresubclass").val()
            };

            $intellisoftwareService.getsoftwareattrlist(softgetattr).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        $scope.getswattrlist = res.data;
                        console.log($scope.getswattrlist);

                        if ((typeof $scope.getswattrlist) == "string") {
                            $scope.getattrlistary = [$scope.getswattrlist.replace(/'/g, "")];
                            console.log($scope.getattrlistary);
                        } else {
                            $scope.getattrlistary = $scope.getswattrlist.attribute;
                            console.log($scope.getattrlistary);
                        }
                        $scope.addviewattribute = true;
                        $scope.noaddviewattribute = false;
                    }else{
                        $scope.addviewattribute = false;
                        $scope.noaddviewattribute = true;
                    }
                }
            });

        };

        //update modal data get data view modal
        $scope.btnsoftwareupdatemodal = function (value) {

            for (var i = 0; i < $scope.getswsdetlist.length; i++) {
                if ($scope.getswsdetlist[i].software_id == value) {
                    $scope.updateviewmod = $scope.getswsdetlist[i];
                    for (var key in $scope.updateviewmod.attribute) {
                        if (key === "password") {
                            $scope.value = CryptoJS.AES.decrypt($scope.updateviewmod.attribute.password, "pass").toString(CryptoJS.enc.Utf8);
                            console.log($scope.value);
                            $scope.updateviewmod.attribute.password = $scope.value;
                        }
                    }
                    console.log($scope.updateviewmod);
                }
            }
            $("#modelsoftwareupdatedet").modal('toggle');
        };

        // password toggle function
        $scope.passtoggle = function () {
            var xp = document.getElementsByClassName("txtsoftwarepass");
            if (xp[0].type === "password") {
                xp[0].type = "text";
            } else {
                xp[0].type = "password";
            }
        };

        // update Software list details
        $scope.btnswupdatedet = function (swremed) {


            if ($('#updatesoftwareForm').valid()) {
                var supattr;
                var attrtxtupval = [];
                for (var key in  $scope.updateviewmod.attribute) {
                    if ($scope.updateviewmod.attribute.hasOwnProperty(key)) {
                        if (key == "password") {
                            supattr = $("input[data-key=" + key + "]").val();
                            var ctObj = CryptoJS.AES.encrypt(supattr, "pass");
                            var ctStr = ctObj.toString();
                            attrtxtupval.push({key: ctStr});
                        } else {
                            supattr = $("input[data-key=" + key + "]").val();
                            attrtxtupval.push({key: supattr});
                        }

                    }
                }
                console.log(attrtxtupval);

                // array obeject to object convertion
                var objupattr = Object.assign({},attrtxtupval);

                var softupgetdet = {
                    "type": $scope.addtxtswname1,
                    "name": $("#txtupdatesoftwarename").val(),
                    "class": $("#selupdatesoftwareclass").val(),
                    "sub_class": $("#selupdatesoftwaresubclass").val(),
                    "remediate": $("#sleupdatesoftwareremediate").val(),
                    "attribute": objupattr,
                };

                $intellisoftwareService.upsoftwarelist(softupgetdet).then(function (res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        $rootScope.showSpinner = false;
                        if (res.result == "success") {
                            notie.alert(1, res.data, config.notify_delay);
                            for (var i = 0; i < $scope.getswsdetlist.length; i++) {
                                if ($scope.getswsdetlist[i].software_name == softupgetdet.name) {
                                    $scope.getswsdetlist[i].software_name = softupgetdet.name;
                                    $scope.getswsdetlist[i].software_class = softupgetdet.class;
                                    $scope.getswsdetlist[i].software_subclass = softupgetdet.sub_class;
                                    $scope.getswsdetlist[i].remediate = softupgetdet.remediate;
                                    $scope.getswsdetlist[i].attribute = softupgetdet.attribute;
                                    break;
                                }
                            }
                            $("#btnswupdatemodalcancel").trigger("click");
                        } else {
                            notie.alert(3, res.data, config.notify_delay);
                        }
                    }
                });
            }


        };

        // software details row list delete function

        $scope.btnsoftwaredelete = function (ame) {
            var detswrow = {
                "type": $scope.addtxtswname1,
                "name": ame
            };
            $.confirm({
                title: 'Delete Software',
                type: 'blue',
                backgroundDismiss: true,
                content: 'Do you want to delete this software ?',
                buttons: {
                    "Cancel": function () {

                    },
                    "Confirm": function () {
                        $rootScope.showSpinner = true;
                        $intellisoftwareService.deletswdet(detswrow).then(function (res) {
                            if(res == config.service_unavailable){
                                notie.alert(3, res, config.notify_delay);
                                $rootScope.showSpinner = false;
                            }else{ 
                                $rootScope.showSpinner = false;
                                if (res.result == "success") {
                                    notie.alert(1, res.data, config.notify_delay);
                                    for (var i = 0; i < $scope.getswsdetlist.length; i++) {
                                        if ($scope.getswsdetlist[i].software_name == detswrow.name) {
                                            $scope.getswsdetlist.splice(i, 1);
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
        };


        function init_event() {

            // software details add form validation function

            $('#addsoftwareForm').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    txtaddsoftwarename: {required: true},
                    seladdsoftwareclass: {required: true},
                    seladdsoftwaresubclass: {required: true},
                    sleaddsoftwareremidate: {required: true},
                },
                messages: {
                    txtaddsoftwarename: {
                        required: 'Please enter the software name'
                    },
                    seladdsoftwareclass: {
                        required: 'Please enter the software class'
                    },
                    seladdsoftwaresubclass: {
                        required: 'Please enter the software sub class',
                    },
                    sleaddsoftwareremidate: {
                        required: 'Please enter the Remediate',
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

            $('#updatesoftwareForm').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    txtupdatesoftwarename: {required: true},
                    selupdatesoftwareclass: {required: true},
                    selupdatesoftwaresubclass: {required: true},
                    sleaddsoftwareremidate: {required: true},
                },
                messages: {
                    txtupdatesoftwarename: {
                        required: 'Please enter the software name'
                    },
                    selupdatesoftwareclass: {
                        required: 'Please enter the software class'
                    },
                    selupdatesoftwaresubclass: {
                        required: 'Please enter the software sub class',
                    },
                    sleaddsoftwareremidate: {
                        required: 'Please enter the Remediate',
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

            $("#btnsoftwaredetadd").click(function () {
                if ($('#addsoftwareForm').valid()) {

                    // console.log($scope.remedcheckval);
                    var tempname ;
                    var sattr;
                    var attrtxtval = [];
                    for (var i = 0; i < $scope.getattrlistary.length; i++) {
                        if ($scope.getattrlistary[i] == "password") {
                            sattr = $("input[data-key=" + $scope.getattrlistary[i] + "]").val();
                            var ctObj = CryptoJS.AES.encrypt(sattr, "pass");
                            var ctStr = ctObj.toString();
                            tempname = $scope.getattrlistary[i];
                            attrtxtval.push({ tempname : ctStr});
                        } else {
                            sattr = $("input[data-key=" + $scope.getattrlistary[i] + "]").val();
                            console.log(sattr);
                            tempname = $scope.getattrlistary[i];
                            attrtxtval.push({tempname : sattr});
                        }


                    }

                    // array obeject to object convertion
                    var objattr = Object.assign({}, attrtxtval);

                    // console.log(attrtxtval);

                    var softgetdet = {
                        "type": $scope.addtxtswname1,
                        "name": $("#txtaddsoftwarename").val(),
                        "class": $("#seladdsoftwareclass").val(),
                        "sub_class": $("#seladdsoftwaresubclass").val(),
                        "remediate": $("#sleaddsoftwareremidate").val(),
                        "attribute": objattr,
                    };

                    // console.log(softgetattr);

                    $intellisoftwareService.addsoftwarelist(softgetdet).then(function (res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{ 
                            $rootScope.showSpinner = false;
                            if (res.result == "success") {
                                notie.alert(1, res.data, config.notify_delay);
                                $scope.getswsdetlist.push({
                                    "type": $scope.addtxtswname1,
                                    "software_id": $scope.getswsdetlist.length + 1,
                                    "software_name": $("#txtaddsoftwarename").val(),
                                    "software_class": $("#seladdsoftwareclass").val(),
                                    "software_subclass": $("#seladdsoftwaresubclass").val(),
                                    "remediate": $scope.remedcheckval,
                                    "attribute": objattr,
                                });
                                // console.log($scope.getswsdetlist);
                                $("#btnsoftwareaddmodalcancel").trigger("click");
                                document.getElementById("addsoftwareForm").reset();
                            } else {
                                notie.alert(3, res.data, config.notify_delay);
                            }
                        }

                    });
                }
                return false;
            });


            // software detail add modal view 
            $(".btnsoftwarenewadddet").click(function () {
                document.getElementById("addsoftwareForm").reset();
                $("label.error").css("display", "none");
                $("input, select").removeClass("form_error");
                $scope.addviewattribute = false;
                $scope.noaddviewattribute = false;
                $("#modeladdsoftwaredet").modal('toggle');
                // return false;
            });

        }




        // row attribute list view modal
        $scope.attributemodelview = function (sw_name) {

            for (var i = 0; i < $scope.getswsdetlist.length; i++) {
                if (sw_name == $scope.getswsdetlist[i].software_name) {
                    $scope.attrmodleval = $scope.getswsdetlist[i];
                }
            }
            $("#modelsoftwareattrdet").modal('toggle');
            console.log($scope.attrmodleval);
            return false;
        };


        $scope.init = function () {
            
        };



        $rootScope.$on('CMDBTabChange', function (event, args) {
            if (args["tabname"] == "Software") {
                if (!bpageloaded) {
                    bpageloaded = true;
                    init_event();
                    $scope.selectsoftwareclasslist();
                    $scope.selectsoftwaresubclasslist();
                    $scope.getsoftwaredetlistfn();
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