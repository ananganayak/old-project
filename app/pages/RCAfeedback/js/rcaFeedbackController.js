angular.module('pages').controller('rcaFeedbackController',['$scope','$timeout','$rootScope','rcaFeedbackservices', 
    function($scope, $timeout, $rootScope, $rcaFeedbackservices){
    

        $scope.btngetalertlistfun = function(sval){
            $scope.alertval = {
                "alert":sval
            };
            $rootScope.showSpinner = true;
            $rcaFeedbackservices.get_rcaAlartval($scope.alertval).then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                        console.log( res);
                        $scope.bindalertval = res.Feedback;
                }
            });
        };

        $scope.btndatarefresh = function(){
            $route.reload();
        }

        function init_event() {

            var dataarg = [];
            dataarg.push({"action": "#/admin", "name": "Admin"});
            dataarg.push({"action": "", "name": "RCA-Feedback"});
            $rootScope.$broadcast('ShowBreadcrumb', dataarg);

            // $scope.selectedList = {};
            $scope.selectedLists = [];

            $scope.btnrcavalsubmit = function () {
                // angular.forEach($scope.selectedList, function (selected, key, value) {
                //     if (selected) {
                //         console.log(key);
                //         $scope.selectedLists.push({key});
                //     }
                // });
                $("input:checkbox[name=type]:checked").each(function(){
                        var key = $(this).val()
                        $scope.selectedLists.push(key);

                });
                console.log($scope.selectedLists);
                $rcaFeedbackservices.send_rcaAlartval($scope.selectedLists).then(function(res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        $rootScope.showSpinner = false;
                        if(res.Result ==  "Success"){
                            console.log( res);
                            $scope.returngetop = res.Feedback;
                            notie.alert(1, res.Output, config.notify_delay);
                            // $scope.btngetalertlistfun();
                        }
                    }
                });
            };

        }

        $scope.init = function() {
            init_event();
            // $scope.btngetalertlistfun();
        };
    }
])