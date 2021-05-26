angular.module('pages').controller('automationReportsController', [
    '$scope',
    '$timeout',
    '$rootScope',
    'intelliautoReportService',
    function ($scope, $timeout, $rootScope, $intelliautoReportService) {

        // var bpageloaded = false;
    
        // init Event Function
        function init_event() {

            // Date Picker Function
            $('.datepicker').datetimepicker({
                format: 'YYYY-MM-DD HH:mm'
            });

            // Form Valication Submission 
            $('#formAutomationReports').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    txtarstartdate: {required: true},
                    txtbdendate: {required: true},
                },
                messages: {
                    txtarstartdate: {
                        required: 'Please enter the StartDate',
                    },
                    txtbdendate: {
                        required: 'Please enter the EndDate',
                    },
                },
                highlight: function (element) {
                    $(element).closest('input').addClass("form_error");
                },
                unhighlight: function (element) {
                    $(element).closest('input').removeClass("form_error");
                },
                errorPlacement: function (error, element) {
                    $(element).closest('div').append(error);
                }
            });

            // $scope.pdfpage = false;
            
            // Automation Report Details Get Function
            $scope.btngetaireportfn = function(){
                if ($('#formAutomationReports').valid()) {
                    var dataset={
                        "username": sessionStorage.getItem("username"),
                        "startdatetime": $('#txtarstartdate').val(),
                        "enddatetime": $('#txtarendate').val()
                    }
                    $rootScope.showSpinner = true;
                    $intelliautoReportService.postaireportserv(dataset).then(function(res){
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{
                            if(res.result == "success"){
                                $scope.getAIReportVal = res.data;
                                $rootScope.showSpinner = false;
                                csvfn($scope.getAIReportVal, "Report")
                            }else{
                                $rootScope.showSpinner = false;
                                notie.alert(3, res.data, config.notify_delay);
                            }
                        }
                    })
                }
            }

            // CSV Function
            function csvfn(urlData, fileName) {
                var link = document.createElement('a');
                var d = new Date().getTime();
                var fl = 'Nxtgen-Bandwidth-' + fileName + d +'.csv';
                link.id = 'download-csv';
                link.setAttribute('href', urlData);
                link.setAttribute('download', fl);
                link.click();
            }
        }

        // Tab CLick Function
        $rootScope.$on('AutomationTabChange', function (event, args) {
            if (args["tabname"] == "AutomationReports") {
                // if (!bpageloaded) {
                    // bpageloaded = true;
                    init_event();
                // }
            }
        });
    }
]);