angular.module('pages').controller('serviceModelingController', [
    '$scope',
    '$http',
    '$rootScope',
    'intelliserviceModelingService',
    function ($scope, $http, $rootScope, $intelliserviceModelingService) {

        var bpageloaded = false;


        function init_event() {
            
            
           
   

        }


        
        // $(".btnnewsoftwaradd").click(function(){
        //     $("#modeladdsoftwaredet").modal('toggle');
        //     return false;
        // })

        
        // $(".btnsoftwareupdatemodal").click(function(){
        //     $("#modelsoftwareupdatedet").modal('toggle');
        //     // document.getElementById("credAdddetails").reset();
        //     return false;
        // })

        

        $scope.init = function () {
            init_event();
        }



        $rootScope.$on('CMDBTabChange', function (event, args) {
            if (args["tabname"] == "Resource") {
                if (!bpageloaded) {
                    bpageloaded = true;
                    init_event();
                }
            }
        });
       

    }
]);