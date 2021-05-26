angular.module('widgets').controller('hypervisorController', [
    '$scope',
    '$timeout',
    '$rootScope',
    'intelliHypervisorService',
    function ($scope, $timeout, $rootScope, $intelliHypervisorService) {


        var bpageloaded = false;

        $scope.hypergrid = true;
        $scope.hyperdetgrid = false;
        $scope.hypkvcusgrid = false;
        $scope.hypkvmvmsgrid = false;
        $scope.hyperdetfwgrid = false;
        $scope.hypkvmhostsgrid = false;
        $scope.hyperkvmgrid = false;
        $scope.hypingrid = false;

        $scope.hyper_grid_res = "";
        $scope.hypkid = "";
        $scope.hyp_id = "";

        $scope.btnhyperdetail = function(val, val1){
            if(val1 == "OnApp KVM"){
                $rootScope.showSpinner = true;
                $intelliHypervisorService.gethyperkvmtot().then(function (res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        $rootScope.showSpinner = false;
                        if (res.result == "success") {
                            console.log(res.data);
                            $scope.hyperkvm_ingrid_res = res.data;
                            $scope.hypergrid = false;
                            $scope.hyperdetgrid = false;
                            $scope.hyperdetfwgrid = false;
                            $scope.hyperkvmgrid = true;
                        }else{
                            notie.alert(3, res.data, config.notify_delay);
                        }
                    }
                });
            }else if(val1 == "Firewall"){
                $rootScope.showSpinner = true;
                $intelliHypervisorService.gethyperfwtot(val).then(function (res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        $rootScope.showSpinner = false;
                        if (res.result == "success") {
                            console.log(res.data);
                            $scope.hyperfw_ingrid_res = res.data.splice(1);
                            $scope.hypergrid = false;
                            $scope.hyperdetgrid = false;
                            $scope.hyperkvmgrid = false;
                            $scope.hyperdetfwgrid = true;
                        }else{
                            notie.alert(3, res.data, config.notify_delay);
                        }
                    }
                });
            }else if(val1 == "Switch"){
                $rootScope.showSpinner = true;
                $intelliHypervisorService.gethyperswtot(val).then(function (res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        $rootScope.showSpinner = false;
                        if (res.result == "success") {
                            console.log(res.data);
                            $scope.hyperfw_ingrid_res = res.data.splice(1);
                            $scope.hypergrid = false;
                            $scope.hyperdetgrid = false;
                            $scope.hyperkvmgrid = false;
                            $scope.hyperdetfwgrid = true;
                        }else{
                            notie.alert(3, res.data, config.notify_delay);
                        }
                    }
                });
            }else if(val1 == "Router"){
                $rootScope.showSpinner = true;
                $intelliHypervisorService.gethyperswrouter(val).then(function (res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        $rootScope.showSpinner = false;
                        if (res.result == "success") {
                            console.log(res.data);
                            $scope.hyperfw_ingrid_res = res.data.splice(1);
                            $scope.hypergrid = false;
                            $scope.hyperdetgrid = false;
                            $scope.hyperkvmgrid = false;
                            $scope.hyperdetfwgrid = true;
                        }else{
                            notie.alert(3, res.data, config.notify_delay);
                        }
                    }
                });
            }else if(val1 == "Load Balancer"){
                $rootScope.showSpinner = true;
                $intelliHypervisorService.gethyperlbtot(val).then(function (res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        $rootScope.showSpinner = false;
                        if (res.result == "success") {
                            console.log(res.data);
                            $scope.hyperfw_ingrid_res = res.data.splice(1);
                            $scope.hypergrid = false;
                            $scope.hyperdetgrid = false;
                            $scope.hyperkvmgrid = false;
                            $scope.hyperdetfwgrid = true;
                        }else{
                            notie.alert(3, res.data, config.notify_delay);
                        }
                    }
                });
            }else{
                $scope.hyp_id = val;
                $rootScope.showSpinner = true;
                $intelliHypervisorService.gethyperingriddet($scope.hyp_id).then(function (res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        $rootScope.showSpinner = false;
                        if (res.result == "success") {
                            console.log(res.data);
                            $scope.hyper_ingrid_res = res.data;
                            $scope.hypergrid = false;
                            $scope.hyperdetgrid = true;
                            $scope.hyperkvmgrid = false;
                            $scope.hyperdetfwgrid = false;
                        }else{
                            notie.alert(3, res.data, config.notify_delay);
                        }
                    }
                });
            }
        }

        var intFrameHeight = window.innerHeight;
        document.getElementById("hyperfwingrid").style.height= (intFrameHeight - 250)  + "px";

        $scope.gethypkvmgrid = function(val){
            $rootScope.showSpinner = true;
            $scope.kvmval = val;
            
            $scope.hypkvcusgrid = false;
            $scope.hypkvmhostsgrid = false;
            $scope.hypkvmvmsgrid = false;
            
            $intelliHypervisorService.gethyperkvmgirdsl($scope.kvmval).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        console.log(res.data);
                        if($scope.kvmval =="customers"){
                            $scope.hyper_kvm_cus = res.data.slice(1);
                            $scope.hypkvcusgrid = true;
                            $scope.hypkvmhostsgrid = false;
                            $scope.hypkvmvmsgrid = false;
                            document.getElementById("hypkvcusgrid").style.height= (intFrameHeight - 305)  + "px";
                        }else if($scope.kvmval =="hosts"){
                            $scope.hyper_kvm_host = res.data.slice(1);
                            $scope.hypkvcusgrid = false;
                            $scope.hypkvmhostsgrid = true;
                            $scope.hypkvmvmsgrid = false;
                            document.getElementById("hypkvmhostsgrid").style.height= (intFrameHeight - 305)  + "px";
                        }else if($scope.kvmval =="vms"){
                            $scope.hyper_kvm_vms = res.data.slice(1);
                            $scope.hypkvcusgrid = false;
                            $scope.hypkvmvmsgrid = true;
                            $scope.hypkvmhostsgrid = false;
                            document.getElementById("hypkvmvmsgrid").style.height= (intFrameHeight - 305)  + "px";
                        }
                        $scope.hyper_kvm_ingrid = res.data;
                        $scope.hypergrid = false;
                        $scope.hyperdetgrid = false;
                        $scope.hypingrid = false;
                        $scope.hyperkvmgrid = true;
                    }else{
                        notie.alert(3, res.data, config.notify_delay);
                    }
                }
            });
        }

        $scope.gethypkeyfn = function(){
            $scope.hypkeys = $("#seldefval").val();
            // alert($scope.hypkeys);
            for (var key in $scope.hyper_ingrid_res) {
                if($scope.hypkeys == key){
                    // console.log($scope.hyper_ingrid_res[key]);
                    $scope.selbtnval = $scope.hyper_ingrid_res[key];
                }else if($scope.hypkeys == ''){
                    $scope.selbtnval = '';
                }
            }
        }

        $scope.hypingrid = false;

        
        $scope.gethypkeydet = function(val){
            $scope.hypvals = val;
            var intFrameHeight = window.innerHeight;
            document.getElementById("hyperingrid").style.height= (intFrameHeight - 305)  + "px";
            var dataset = {"hypervisor_id": $scope.hyp_id, "dc_name": $scope.hypkeys,"obj_type": val}
            $rootScope.showSpinner = true;
            $intelliHypervisorService.posthyperingrid(dataset).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        console.log(res.data);
                        $scope.hyper_ingrid_det = res.data.slice(1);
                        // notie.alert(1, res, config.notify_delay);
                        $scope.hypingrid = true;
                    }else{
                        notie.alert(3, res.data, config.notify_delay);
                    }
                }
            });
        }


        $scope.btnbackfn = function(){
            $scope.selbtnval = '';
            $scope.hypergrid = true;
            $scope.hyperdetgrid = false;
            $scope.hypkvcusgrid = false;
            $scope.hypkvmvmsgrid = false;
            $scope.hypkvmhostsgrid = false;
            $scope.hyperkvmgrid = false;
            $scope.hypingrid = false;
            $scope.hyperdetfwgrid = false;
        }

        function load_hyper_grid() {
            $rootScope.showSpinner = true;
            $intelliHypervisorService.hyperGird().then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        console.log(res.data);
                        $scope.hyper_grid_res = res.data.slice(1);
                    }else{
                        $scope.hyper_grid_res = res.data;
                    }
                }
            });
        }

        function load_hyper_cred() {
            $rootScope.showSpinner = true;
            $intelliHypervisorService.hyperCred().then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        console.log(res.data);
                        $scope.hyper_cred_res = res.data.slice(1);
                    }
                }
            });
        }

        function init_event() {

            $('#hypervisorForm').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    txthypname: {required: true},
                    txthypip: {required: true},
                    selhyptype: {required: true},
                    selhypcred: {required: true},
                },
                messages: {
                    txthypname: {
                        required: 'Please Enter the Name'
                    },
                    txthypip: {
                        required: 'Please Enter the IP'
                    },
                    selhyptype: {
                        required: 'Please Select the Hypervisor Type'
                    },
                    selhypcred: {
                        required: 'Please Select the Hypervisor Credential'
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


            $("#btnaddhyper").click(function(){
                if($scope.hypkid == ""){
                    if ($('#hypervisorForm').valid()) {

                        var dataval = {
                            "hypervisor_name": $("#txthypname").val(), 
                            "hypervisor_ip_address": $("#txthypip").val(), 
                            "hypervisor_type": $("#selhyptype").val(),
                            "hypervisor_cred": $("#selhypcred").val()
                        };

                        console.log(dataval);
    
                        $rootScope.showSpinner = true;
                        
                        $intelliHypervisorService.addhyperdet(dataval).then(function(res){
                            if(res == config.service_unavailable){
                                notie.alert(3, res, config.notify_delay);
                                $rootScope.showSpinner = false;
                            }else{ 
                                $rootScope.showSpinner = false;
                                if (res.result == "success") {
                                    console.log(res.data);
                                    notie.alert(1, res.data, config.notify_delay);
                                    $scope.hyper_grid_res.push({
                                        0 : res.pk_hypervisor_id,
                                        1 : $("#txthypname").val(),
                                        2 : $("#txthypip").val(),
                                        3 : $("#selhyptype").val(),
                                        4 : $("#selhypcred").val(),
                                        5 : "N",
                                    })
                                    $("#model_hyp_add").modal('toggle');
                                    document.getElementById("hypervisorForm").reset();
                                }else{
                                    notie.alert(3, res.data, config.notify_delay);
                                }
                                $rootScope.showSpinner = false;
                            }
                        })
                    }
                }else{
                    if ($('#hypervisorForm').valid()) {
                        var dataval = {
                            "hypervisor_name": $("#txthypname").val(), 
                            "hypervisor_ip_address": $("#txthypip").val(), 
                            "hypervisor_type": $("#selhyptype").val(),
                            "hypervisor_cred": $("#selhypcred").val()
                        };
                        $intelliHypervisorService.updatehyperdet(dataval, $scope.hypkid).then(function(res){
                            if(res == config.service_unavailable){
                                notie.alert(3, res, config.notify_delay);
                                $rootScope.showSpinner = false;
                            }else{ 
                                $rootScope.showSpinner = false;
                                if (res.result == "success") {
                                    console.log(res.data);
                                    notie.alert(1, res.data, config.notify_delay);
                                    for (var i = 0; i < $scope.hyper_grid_res.length; i++) {
                                       if($scope.hypkid == $scope.hyper_grid_res[i][0]){
                                        $scope.hyper_grid_res[i][0] = $scope.hyper_grid_res[i][0];
                                        $scope.hyper_grid_res[i][1] = $("#txthypname").val();
                                        $scope.hyper_grid_res[i][2] = $("#txthypip").val();
                                        $scope.hyper_grid_res[i][3] = $("#selhyptype").val();
                                        $scope.hyper_grid_res[i][4] = $("#selhypcred").val();
                                        $scope.hyper_grid_res[i][5] = $scope.hyper_grid_res[i][5];
                                        break;
                                       }
                                    }
                                    $scope.hypkid = "";
                                    load_hyper_cred();
                                    $("#model_hyp_add").modal('toggle');
                                    document.getElementById("hypervisorForm").reset();
                                }else{
                                    notie.alert(3, res.data, config.notify_delay);
                                }
                                $rootScope.showSpinner = false;
                            }
                        })
                    }
                }

                
            })

            $scope.btnhyperedit =  function(val){
                $("#txthypname").val(val[1]);
                $("#txthypip").val(val[2]);
                $("#selhyptype").val(val[3]);
                $("#selhypcred").val(val[4]);
                $("#model_hyp_add").modal('toggle');   
                $scope.hypkid = val[0]
                $scope.addheader = false;
                $scope.updateheader = true;
            }
            $scope.btnaddmodal= function(){
                $("#model_hyp_add").modal('toggle'); 
                document.getElementById("hypervisorForm").reset();
                $("label.error").css("display", "none");
                $("input, select").removeClass("form_error");
                $scope.addheader = true;
                $scope.updateheader = false;
                $scope.hypkid = "";
            }
            $scope.btnhyperdel = function(val){
                $scope.hypk_id = val;
                $.confirm({
                    title: 'Delete Hypervisor',
                    type: 'blue',
                    backgroundDismiss: true,
                    content: 'Do you want to delete this Hypervisor ?',
                    buttons: {
                        "Cancel": function () {
    
                        },
                        "Confirm": function () {
                            $rootScope.showSpinner = true;
                            $intelliHypervisorService.delethyperdet($scope.hypk_id ).then(function(res) {
                                if(res == config.service_unavailable){
                                    notie.alert(3, res, config.notify_delay);
                                    $rootScope.showSpinner = false;
                                }else{ 
                                    $rootScope.showSpinner = false;
                                    if (res.result == "success") {
                                        notie.alert(1, res.data, config.notify_delay);
                                        for (var i = 0; i < $scope.hyper_grid_res.length; i++) {
                                            if ($scope.hypk_id == $scope.hyper_grid_res[i][0]) {
                                                $scope.hyper_grid_res.splice(i, 1);
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


            // # Table Download CSV
            $scope.btncsvkvmcusfn = function(){
                $("#hypkvcusgrid").tableToCSV();
            }

            $scope.btncsvkvmhostfn = function(){
                $("#hypkvmhostsgrid").tableToCSV();
            }

            $scope.btncsvkvmvmsfn = function(){
                $("#hypkvmvmsgrid").tableToCSV();
            }

            $scope.btncsvfwfn = function(){
                $("#hyperfwingrid").tableToCSV();
            }

            $scope.btncsvhypfn = function(){
                $("#hyperingrid").tableToCSV();
            }

        }   


        $rootScope.$on('CMDBTabChange', function (event, args) {
            if (args["tabname"] == "Application") {
                if (!bpageloaded) {
                    bpageloaded = true;
                    init_event();
                    load_hyper_grid();
                    load_hyper_cred();
                }
            }
        });

    }
]).filter('split', function() {
    return function(input, splitChar, splitIndex) {
        // do some bounds checking here to ensure it has that index
        return input.split(splitChar)[splitIndex];
    }
});