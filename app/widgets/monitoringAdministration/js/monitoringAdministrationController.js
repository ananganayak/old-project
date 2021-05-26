angular.module('widgets').controller('monitoringAdministrationController', [
    '$scope',
    '$rootScope',
    '$state',
    '$interval',
    'intellimonitoringAdministrationService',
    function($scope, $rootScope, $state, $interval, $intellimonitoringAdministrationService ) {
        'use strict';

        var bpageloaded = false;
        $scope.hostdetailsdiv = false;

        $scope.hostgrpadddiv = false;
        $scope.hostgrpgriddiv = true;

        $scope.hostgrpobjectlist = [];
        $scope.objselectlist = [];

        // add host list
        // $('.btnadaddhostgrp').click(function (){
        //     $scope.hostgrpadddiv = true;
        //     $scope.hostgrpgriddiv = false;
        // })

        $scope.accountdiv = false;

        $scope.btnadaddhostgrpfn = function(){
            $scope.hostgrpadddiv = true;
            $scope.hostgrpgriddiv = false;
            $scope.gettemplatelistfn();
            document.getElementById("formhostgroupadd").reset();
        }

        // back to host group grid
        $scope.btnadbackhostgrpfn = function (){
            $scope.hostgrpadddiv = false;
            $scope.hostgrpgriddiv = true;
        }

        // Update Member list
        $('.btnadaddmem').click(function(){
            $('#modeladaddmem').modal('toggle');
            return false;
        })

        // Template List Get Function 
        $scope.gettemplatelistfn = function(){
            $rootScope.showSpinner = true;
            $intellimonitoringAdministrationService.gettemplatelistserv().then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{
                    if(res.result == "failure"){
                        notie.alert(3, res.data, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{
                        $scope.hostgrptemplatelist = res.data.slice(1);
                        console.log($scope.hostgrptemplatelist);
                        $rootScope.showSpinner = false;
                    }
                }
            })
        }


        
        

        $scope.init_event = function() {

            $scope.gethostdetailsfn = function(){
                $scope.hostdetailsdiv = true;
            }

            // get account based get account list function
            $scope.getaccbsdetailsfn = function(){
                var accbs = $scope.chkadhstgrpaddaccbs;
                $rootScope.showSpinner = true;
                if(accbs == true){
                    var dataset = {"template_name": $scope.seladhstgrpaddtemp}
                    $intellimonitoringAdministrationService.getaccbsdetailsserv(dataset).then(function (res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{
                            if(res.result == "failure"){
                                notie.alert(3, res.data, config.notify_delay);
                                $rootScope.showSpinner = false;
                            }else{
                                $scope.accountdiv = true;
                                $scope.hostgrpacclist = res.data.slice(1);
                                console.log($scope.hostgrpacclist);
                                $rootScope.showSpinner = false;
                            }
                        }
                    })
                }
            }

            // get Unselected List Function 
            $scope.getunsellistfn = function(){
                var accbs = $scope.chkadhstgrpaddaccbs;
                var accval = $scope.seladhstgrpaddacc;
                var dataset;
                $rootScope.showSpinner = true;
                if(accbs == true){
                    dataset = {"template_name": $scope.seladhstgrpaddtemp, "account_name": accval.split(".")[0]}
                }else{
                    dataset = {"template_name": $scope.seladhstgrpaddtemp}
                }
                $intellimonitoringAdministrationService.getunsellistserv(dataset).then(function (res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{
                        if(res.result == "failure"){
                            notie.alert(3, res.data, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{
                            $scope.hostgrpobjectlist = res.data.vm_name;
                            console.log($scope.hostgrpobjectlist);
                            $rootScope.showSpinner = false;
                        }
                    }
                })
            }

            // select the object list
            $scope.selectobjectfn = function(val){
                for (var i = 0; i < $scope.hostgrpobjectlist.length; i++) {
                    if(val == $scope.hostgrpobjectlist[i]){
                        $scope.hostgrpobjectlist.splice(i, 1);
                        $scope.objselectlist.push(val);
                        break;
                    }
                    
                }
                console.log($scope.objselectlist);
            } 

            // Unselect The Object List
            $scope.unselectobjectfn = function(val){
                for (var i = 0; i < $scope.objselectlist.length; i++) {
                    if(val == $scope.objselectlist[i]){
                        $scope.objselectlist.splice(i, 1);
                        $scope.hostgrpobjectlist.push(val);
                        break;
                    }
                    
                }
                console.log($scope.hostgrpobjectlist);
            }    
            
            // Save HostGroup Function
            $scope.postaddhostgroupfn = function(){
                var dataset = {"host_group_name": $scope.txtadhstgrpaddhostgp, "objects": $scope.objselectlist, "extra_search_info": {"template_name": $scope.seladhstgrpaddtemp, "account_name": $scope.seladhstgrpaddacc}}

                $intellimonitoringAdministrationService.postaddhostgrpserv(dataset).then(function (res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{
                        if(res.result == "failure"){
                            notie.alert(3, res.data, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{
                            $scope.accountdiv = true;
                            $scope.hostgrpacclist = res.data.slice(1);
                            console.log($scope.hostgrpacclist);
                            $rootScope.showSpinner = false;
                        }
                    }
                })
            }
        }

       
        $rootScope.$on('monitoringTabChange', function(event, args) {
            if (args["tabname"] == "Administration") {
                if (!bpageloaded) {
                    bpageloaded = true;
                    $scope.init_event();
                }
            }
        });

    }
]);