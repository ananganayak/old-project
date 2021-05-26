angular.module('pages').controller('reportEdgeuplinkController', [
    '$scope',
    '$timeout',
    '$rootScope',
    'intellireportEdgeuplinkService',
    function ($scope, $timeout, $rootScope, $intellireportEdgeuplinkService) {

        // var bpageloaded = false;
        
        $scope.getedgeval = [];


        // get report period function
        // $scope.getreportperiodfn = function(){
        //     $rootScope.showSpinner = true;

        //     $intellireportEdgeuplinkService.getreportperiodserv().then(function(res){
        //         if(res == config.service_unavailable){
        //             notie.alert(3, res, config.notify_delay);
        //             $rootScope.showSpinner = false;
        //         }else{
        //             $scope.getperiodval = res;
        //             console.log($scope.getperiodval);
        //             $rootScope.showSpinner = false;
        //         }
        //     })
        // }


        // get edge details function
        $scope.getreportedgedetfn = function(){
            $rootScope.showSpinner = true;
            $intellireportEdgeuplinkService.getreportedgedetserv().then(function(res){
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{
                    if(res.result == "success"){
                        $scope.getedgeval = res.data.slice(1);
                        // console.log($scope.getedgeval);
                        $rootScope.showSpinner = false;
                    }else{
                        $rootScope.showSpinner = false;
                        // notie.alert(3, res.data, config.notify_delay);
                    }
                }
            })
        }


        function init_event() {
            $('.datepicker').datetimepicker({
                format: 'DD-MM-YYYY HH:mm'
            });

            $('#FormEdgeuplink').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    seleuedge: {required: true},
                    seleureportpreriod: {required: true},
                    txteustartdate: {required: true},
                    txteuendate: {required: true},
                },
                messages: {
                    seleuedge: {
                        required: 'Please enter the Edge',
                    },
                    seleureportpreriod: {
                        required: 'Please enter the Period',
                    },
                    txteustartdate: {
                        required: 'Please enter the StartDate',
                    },
                    txteuendate: {
                        required: 'Please enter the EndDate',
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
            
            var hight = window.innerHeight;
            document.getElementById("tableheight").style.height = (hight - 300) + "px";

            $scope.edgegridview = false;
            $scope.btngetedgeuplinkfn = function(){
                if ($('#FormEdgeuplink').valid()) {
                    var selidval = $("#seleuedge").val();
                    var selval = $("#seleureportpreriod").val();
                    for (var i = 0; i < $scope.getedgeval.length; i++) {
                        if(selidval == $scope.getedgeval[i][1]){
                            $scope.eid = $scope.getedgeval[i][0];
                            $scope.oid = $scope.getedgeval[i][1];
                            $scope.ename = $scope.getedgeval[i][2];
                            break;
                        }
                    }
                    if(selval == 'Custom Period'){
                        var dataset = {"id": $scope.eid, "oid": $scope.oid, "name": $scope.ename, "Time Zone": sessionStorage.getItem("user_tz"), "date": $("#seleureportpreriod").val(), "extra" : {"sdate":$("#txteustartdate").val(), "edate":$("#txteuendate").val()}}
                    }
                    else{
                        var dataset = {"id": $scope.eid, "oid": $scope.oid, "name": $scope.ename, "Time Zone": sessionStorage.getItem("user_tz"), "date": $("#seleureportpreriod").val()}
                    }
                    // console.log(dataset);
                    $rootScope.showSpinner = true;
                    $intellireportEdgeuplinkService.postedgedet(dataset).then(function(res){
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{
                            if(res.result == "success"){
                                $scope.edgegridview = true;
                                $scope.gridedgeval = res;
                                console.log($scope.gridedgeval);
                                $rootScope.showSpinner = false;
                                // notie.alert(1, res.data, config.notify_delay);
                            }else{
                                $scope.edgegridview = false;
                                $scope.gridedgeval = "";
                                $rootScope.showSpinner = false;
                                notie.alert(3, res.data, config.notify_delay);
                            }   
                        }
                    })  
                }
            }

            $scope.btnpdfedgeuplinkfn = function(){
                var d = new Date().getTime();
                html2canvas(document.getElementById('tablegenrate'), {
                    onrendered: function (canvas) {
                        var data = canvas.toDataURL();
                        var docDefinition = {
                            content: [{
                                image: data,
                                width: 500,
                            }]
                        };
                        pdfMake.createPdf(docDefinition).download("Edge-Report-"+d+".pdf");
                    }
                });                
            }

            // csv Gerenate function
            $scope.btncsvedgeuplinkfn = function(val){
                $("#tablegenrate").tableToCSV();
            }

        }
        

        $scope.init = function () {
            init_event();
            // $scope.getreportperiodfn();
            $scope.getreportedgedetfn();
        }



        // $rootScope.$on('CMDBTabChange', function (event, args) {
        //     if (args["tabname"] == "Application") {
        //         if (!bpageloaded) {
        //             bpageloaded = true;
        //             init_event();
        //             $scope.selectapplicationclasslist();
        //             $scope.selectapplicationsubclasslist();
        //             $scope.getapplicationdetlistfn();
        //         }
        //     }
        // });

       

    }
]);