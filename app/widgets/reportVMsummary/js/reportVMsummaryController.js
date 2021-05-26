angular.module('pages').controller('reportVMsummaryController', [
    '$scope',
    '$timeout',
    '$rootScope',
    'intellireportVMsummaryService',
    function ($scope, $timeout, $rootScope, $intellireportVMsummaryService) {

        var userid = sessionStorage.getItem("userid");
        
        // Get VM Customer Lov
        $scope.getrepocustlov = function(){
            $rootScope.showSpinner = true;
            $intellireportVMsummaryService.getrepocustserv($scope.selrepotech).then(function(res){
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{
                    if(res.result == "success"){
                        $scope.getrepocustval = res.data.slice(1);
                        console.log($scope.getrepocustval);
                        $rootScope.showSpinner = false;
                        $("#selrepocustid").select2();
                    }else{
                        $rootScope.showSpinner = false;
                        notie.alert(3, res.data, config.notify_delay);
                    }
                }
            })
        }

        // Grid Load Function
        $scope.getGridFunction = function(){
            $rootScope.showSpinner = true;
            $intellireportVMsummaryService.postrepocustgridserv(userid).then(function(res){
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{
                    if(res.result == "success"){
                        $scope.getrepocustgrid = res.data.slice(1);
                        console.log($scope.getrepocustgrid);
                        $rootScope.showSpinner = false;
                    }else{
                        $rootScope.showSpinner = false;
                        notie.alert(3, res.data, config.notify_delay);
                    }
                }
            })
        }
        

        function init_event() {

            // Initialize Date Event Function
            $('.datepickers').datetimepicker({
                format: 'YYYY-MM-DD HH:mm'
            });

            // Validate Form Function
            $('#Formreportvmummary').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    selrepotech: {required: true},
                    selrepocustid: {required: true},
                    txtrepocuststartdate: {required: true},
                    txtrepocustsendate: {required: true},
                },
                messages: {
                    selrepotech: {
                        required: 'Please Select the Technology',
                    },
                    selrepocustid: {
                        required: 'Please Select the Customer',
                    },
                    txtrepocuststartdate: {
                        required: 'Please Enter Start Date',
                    },
                    txtrepocustsendate: {
                        required: 'Please Enter End Date',
                    },
                },
                highlight: function (element) {
                    $(element).closest('select').addClass("form_error");
                },
                unhighlight: function (element) {
                    $(element).closest('select').removeClass("form_error");
                },
                errorPlacement: function (error, element) {
                    $(element).closest('div').append(error);
                }
            });


            // Generate CSV download link Function
            $scope.btnpostvmsumfn = function(){
                // console.log(id);
                if($('#Formreportperformances').valid()){
                    var id = $scope.selrepocustid.split("::");
                    var dataset = {
                        "technology": $scope.selrepotech, 
                        "accountid": id[1],
                        "startdate" : $("#txtrepocuststartdate").val(),
                        "enddate" : $("#txtrepocustsendate").val(),
                        "user_id" : userid
                    }
                    // console.log(dataset);
                    $rootScope.showSpinner = true;
                    $intellireportVMsummaryService.postrepocustcsvserv(dataset).then(function(res){
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{
                            if(res.result == "success"){
                                // $scope.getrepocustcsv = res.data;
                                console.log(res.data);
                                notie.alert(1, res.data, config.notify_delay);
                                $scope.getGridFunction();
                                $rootScope.showSpinner = false;
                            }else{
                                $rootScope.showSpinner = false;
                                notie.alert(3, res.data, config.notify_delay);
                            }
                        }
                    })
                }
            }


            // Download CSV File FUnction
            $scope.getCSVDownload = function(link){
                var url = link
                var link = document.createElement('a'); 
                link.href = url; 
                link.setAttribute('download', link); 
                document.body.appendChild(link); 
                link.click();
            }
            var autoref ;
            var dereg = $rootScope.$on('$locationChangeSuccess', function() {
                console.log("Function Stopped")
                clearInterval(autoref);
                dereg();
            });
            
            autoref = setInterval(function(){ $scope.getGridFunction(); }, 120000);

        }

        $scope.init = function () {
            init_event();
            $scope.getGridFunction();
            
        }    

    }
]);