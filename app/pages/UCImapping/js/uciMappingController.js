angular.module('pages').controller('uciMappingController',['$scope','$timeout','$rootScope','uciMappingservices', 
    function($scope, $timeout, $rootScope, $uciMappingservices){
    
        $scope.getucialldataval = [];
        $scope.getuciallusdataval = [];
        $scope.getuciallcindataval = [];
        $scope.selectedusername = [];
        $scope.selecteduserid = [];
        $scope.getuciuserdataval = [];


        $scope.getucialldata = function(){
            $rootScope.showSpinner = true;
            $uciMappingservices.getucialldataserv().then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    // console.log(res);
                    if (res.result == "success") {
                        $scope.getucialldataval = res.data;
                        $scope.getuciallusdataval = $scope.getucialldataval.users.slice(1);
                        $scope.getuciallcindataval = $scope.getucialldataval.cinames.slice(1);
                        console.log($scope.getucialldataval);
                    }
                }
            });
        } 

        $scope.getuciuserdet = function(id, name){
            $scope.selecteduserid = id;
            $scope.selectedusername = name;
            
            console.log($scope.selecteduserid, $scope.selectedusername)
            $rootScope.showSpinner = true;
            $uciMappingservices.getuciuserdetserv($scope.selectedusername).then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    // console.log(res);
                    if (res.result == "success") {
                        $scope.getuciuserdataval = res.data.ci_name;
                        $('input:checkbox').prop('checked', false);
                        for (var i = 0; i < $scope.getuciallcindataval.length; i++) {
                            $.each($scope.getuciuserdataval, function(inx, row) {
                                if(row == $scope.getuciallcindataval[i][1]){
                                    // $scope.getuciallcindataval[i].push(true)
                                    $("input[name='checkbox" + row + "']").prop('checked', true);
                                }else{
                                    // $("input[name='checkbox" + row + "']").prop('checked', false);
                                }
                            })
                        }
                        console.log($scope.getuciallcindataval);
                    }else{
                        // notie.alert(3, res.data, config.notify_delay);
                        $('input:checkbox').prop('checked', false);
                    }
                }
            });
        }


        function init_event() {

            var dataarg = [];
            dataarg.push({"action": "#/admin", "name": "Admin"});
            dataarg.push({"action": "", "name": "UCI Mapping"});
            $rootScope.$broadcast('ShowBreadcrumb', dataarg);
            
            $scope.cidata_save = function(){
                $scope.selectedLists = [];
                $("input:checkbox[type=checkbox]:checked").each(function(){
                    // var key = $(this).val()
                    $scope.selectedLists.push($(this).val());
                });
                var finalval = {
                    "user" : $scope.selecteduserid,
                    "cis" : $scope.selectedLists
                }
                console.log(finalval);
                $uciMappingservices.submitcival(finalval).then(function(res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        $rootScope.showSpinner = false;
                        // console.log(res);
                        if (res.result == "success") {
                            notie.alert(1, res.data, config.notify_delay);
                        }else{
                            notie.alert(3, res.data, config.notify_delay);
                        }
                    }
                });
            }

        }

        $scope.init = function() {
            init_event();
            $scope.getucialldata();
            $scope.getuciuserdet(sessionStorage.getItem("userid"), sessionStorage.getItem("username"));
        };
    }
])