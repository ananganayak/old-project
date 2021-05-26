angular.module('widgets').controller('groupController', [
    '$scope',
    '$timeout',
    '$rootScope',
    'intelliGroupService',
    function ($scope, $timeout, $rootScope, $intelliGroupService) {

        var bpageloaded = false;

        $scope.getgrpdetlist = [];

        // group details list get function

        $scope.getgroupdetlistfn = function () {
            $rootScope.showSpinner = true;
            $intelliGroupService.getgroupdetlst({}).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        $scope.getgrpdetlist = res.data.slice(1);
                        // console.log($scope.getgrpdetlist);
                    }
                }
            });
        };

        // get machine list details function

        $scope.getmachinelistfn = function(){
            $rootScope.showSpinner = true;
            $intelliGroupService.getmachinelst({}).then(function(res){
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if(res.result = "success"){
                        $scope.getmachinedetlst = res.data.slice(1);
                        // console.log($scope.getmachinedetlst)
                    }
                }
            })
        };




        function init_event() {

            // add form validaition
            $(".slimscroll").slimScroll();

            $('#addgroupform').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    grp_name: {required: true},
                    grp_description: {required: true}
                    // txtrolename: {required: true, minlength: 3}
                },
                messages: {
                    grp_name: {
                        required: 'Please enter the Group Name',
                    },
                    grp_description: {
                        required: 'Please enter the Group Description',
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

            // update form validaition

            $('#upgroupform').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    update_grp_name: {required: true},
                    update_grp_description: {required: true}
                    // txtrolename: {required: true, minlength: 3}
                },
                messages: {
                    grp_nupdate_grp_nameame: {
                        required: 'Please enter the Group Name',
                    },
                    update_grp_description: {
                        required: 'Please enter the Group Description',
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

            // add modal function 
            $(".btngroupadddet").click(function (){
                $("#model_group_add").modal('toggle');
                $scope.getmachinelistfn();
                $("label.error").css("display", "none");
                $("input, select").removeClass("form_error");
                // return false;
            })

            // update modal function
            $scope.updatemodalbtn = function (id){
                var mid = id;
                // $scope.getmachinelistfn();
                $intelliGroupService.getgruplst(mid).then(function(res){
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        $rootScope.showSpinner = false;
                        if(res.result = "success"){
                            $scope.getupdetlst = res.data;
                            $scope.getupmachinedetlst = res.data.machines.slice(1);
                            // console.log($scope.getupdetlst)
                            $("#modelupdategrp").modal('toggle');
                            $scope.getgroupdetlistfn();
                        }else{
                            notie.alert(3, res.data, config.notify_delay);
                        }
                    }
                })
            }

            //group save function 
            $("#btngruoupsave").click(function(){
                if ($('#addgroupform').valid()) {
                    var mycheckval = [];
                    for (var i = 0; i < $scope.getmachinedetlst.length; i++) {
                        var checkedval = $("input:checkbox[name=chkval"+i+"]").is(':checked'); 
                        if(checkedval == true){
                            mycheckval.push($scope.getmachinedetlst[i][0]);
                        }
                    }
                    if(mycheckval.length > 0){
                        var datar = {
                            "machine_ids": mycheckval,
                            "group_name": $("#grp_name").val(),
                            "group_description": $("#grp_description").val(),
                        }
                        $rootScope.showSpinner = true;
                        $intelliGroupService.postgroupdetlst(datar).then(function(res){
                            if(res == config.service_unavailable){
                                notie.alert(3, res, config.notify_delay);
                                $rootScope.showSpinner = false;
                            }else{ 
                                $rootScope.showSpinner = false;
                                if(res.result == "success"){
                                    notie.alert(1, res.data, config.notify_delay);
                                    $scope.getgroupdetlistfn();
                                    $("#btnclsaddmodal").trigger("click");

                                }else{
                                    notie.alert(3, res.data, config.notify_delay);
                                }
                            }
                        })
                    }else{
                        $scope.msg = 'Please choose an option';
                        notie.alert(3, $scope.msg, config.notify_delay);
                    };
                    
                }
            });


            // group update function
            $("#btnupdategroupfunctn").click(function(){
                if($("#upgroupform").valid()){
                    $scope.getmachinelistfn();
                    var myupcheckval = [];
                    for (var i = 0; i < $scope.getupmachinedetlst.length; i++) {
                        var upcheckedval = $("input:checkbox[name=update_chkval"+i+"]").is(':checked'); 
                        if(upcheckedval == true){
                            myupcheckval.push($scope.getupmachinedetlst[i][0]);
                        }
                    }
                    // console.log(myupcheckval);
                    var updatar =  {
                        "group_id": $("#update_grp_id").val(),
                        "group_name": $("#update_grp_name").val(),
                        "group_description": $("#update_grp_description").val(),
                        "machine_ids" : myupcheckval,
                    }
                    // console.log(updatar);

                    $intelliGroupService.putupdategroupdetlst(updatar).then(function(res){
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{ 
                            $rootScope.showSpinner = false;
                            if(res.result == "success"){
                                notie.alert(1, res.data, config.notify_delay);
                                for (var i = 0; i < $scope.getgrpdetlist.length; i++) {
                                    if($scope.getgrpdetlist[i][0] == updatar.group_id ){
                                        $scope.getgrpdetlist[i].push(
                                            $scope.getgrpdetlist[i][0] = parseInt(updatar.group_id),
                                            $scope.getgrpdetlist[i][1] = updatar.group_name,
                                            $scope.getgrpdetlist[i][2] = updatar.group_description
                                        );
                                        break;
                                    }
                                }
                                // console.log($scope.getgrpdetlist)
                                
                                // $scope.getgroupdetlistfn();
                                $("#btnclsupdatemodal").trigger("click");
                            }else{
                                notie.alert(3, res.data, config.notify_delay);
                                // $scope.getgroupdetlistfn();
                            }
                        }
                    })
                }
            })

            // group delete function  
            $scope.deletegroupval = function(id){
                var mid = id;
                var surl = config.urls.hddm_groupdet_get +"/"+ mid;
                // $rootScope.showSpinner = true;
                $.confirm({
                    title: 'Delete Group',
                    type: 'blue',
                    backgroundDismiss: true,
                    content: 'Do you want to delete this Group ?',
                    buttons: {
                        "Cancel": function () {
    
                        },
                        "Confirm": function () {
                            $rootScope.showSpinner = true;
                            $intelliGroupService.deletegroupval(surl).then(function(res) {
                                if(res == config.service_unavailable){
                                    notie.alert(3, res, config.notify_delay);
                                    $rootScope.showSpinner = false;
                                }else{ 
                                    $rootScope.showSpinner = false;
                                    if (res.result == "success") {

                                        notie.alert(1, res.data, config.notify_delay);

                                        for (var i = 0; i < $scope.getgrpdetlist.length; i++) {
                                            // console.log($scope.getgrpdetlist[i]);
                                            if ($scope.getgrpdetlist[i][0] == mid) {
                                                $scope.getgrpdetlist.splice(i, 1);
                                                $scope.$apply();
                                                break;
                                            }
                                        }

                                    }else{
                                        notie.alert(3, res.data, config.notify_delay);
                                    }
                                }
                            });
                        }
                    }
                });
                return false;
            }
        }


        $rootScope.$on('CMDBTabChange', function (event, args) {
            if (args["tabname"] == "Group") {
                if (!bpageloaded) {
                    bpageloaded = true;
                    init_event();
                    $scope.getgroupdetlistfn();
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