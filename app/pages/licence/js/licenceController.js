angular.module('pages').controller('licenceController', [
    '$scope',
    '$http',
    '$rootScope',
    'licenceService',
    function($scope, $http, $rootScope, $licenceService) {

        $scope.licencekey_dis = true;
        $scope.licencekeyvalue = [];

        // value copy function
        $scope.mycopy = function() {
            var copyText = document.getElementById("licencekeyvalue");
            copyText.select();
            document.execCommand("copy");
            
            var tooltip = document.getElementById("myTooltip");
            tooltip.innerHTML = "Copied: " + copyText.value;
        };

        function outFunc() {
            var tooltip = document.getElementById("myTooltip");
            tooltip.innerHTML = "Copy to clipboard";
        }

        // key get function
        function getlicencekey(){
            $rootScope.showSpinner = true;
            $licenceService.get_keylicence().then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        $scope.licencekeyvalue = res.data[0].license_str;
                        console.log( $scope.licencekeyvalue);
                    }
                }
            });
        };

        function init_event() {

            // breadcrumb function
            var dataarg = [];
            dataarg.push({"action" : "#/admin","name" : "Admin"});             
            dataarg.push({"action" : "","name" : "Licences"});
            $rootScope.$broadcast('ShowBreadcrumb', dataarg);


            // key update Function
            $("#updatekey").click(function() {
                var copyinputText ={
                    "key" : $("#licencekeyvalue").val()
                } 
                
                $licenceService.update_keylicence(copyinputText).then(function(res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        $rootScope.showSpinner = false;
                        if (res.result == "success") {
                            notie.alert(1, res.data, config.notify_delay);
                        } else {
                            notie.alert(3, res.Message, config.notify_delay);
                        }
                    }
                });
            });

            // edit button function
            $("#editkey").click(function(){
                $scope.licencekey_dis = !$scope.licencekey_dis;
            })
            
        }

        $scope.init = function() {
            init_event();
            getlicencekey();
        };


    }
]);