angular.module('pages').controller('machineLearningController', [
    '$scope',
    '$http',
    '$rootScope',
    function($scope, $http, $rootScope) {

        function ml_display_menu() {
            if (sessionStorage["access_control"]) {
                // $(".mlcontainer .nav-tabs li").hide();
                $(".top_menu_cmdb").closest("li").show();
                var access_control = JSON.parse(sessionStorage["access_control"]);                
                var permisson_menu = access_control[sessionStorage["role_name"]];

                // console.log(access_control);
                $.each(permisson_menu,function(inx,ele){
                    if(ele.tab_name){
                       var menu_name = ele.tab_name;                       
                        if(menu_name == "Machine Learning_Anomaly"){
                            $("#ml_tab_alerts").closest("li").show();
                        }
                    }
                });
            }
        }

        $scope.init = function() {
            ml_display_menu();
            $('.nav-tabs a').click(function() {
                var stabname = $(this).text();                
                $rootScope.$broadcast('MLTabChange', {"tabname" : stabname});        
                $(this).tab('show');
                return false;
            });
            
        };
        $rootScope.$on('UserloggedIn', function(event, args) {
            ml_display_menu();
        });
    }
]);