angular.module('pages').controller('cloudservicesController', [
    '$scope',
    '$http',
    '$rootScope',
    function ($scope, $http, $rootScope) {


        function cloudservices_display_menu() {
            if (sessionStorage["access_control"]) {
                // $(".cloudservicesController .nav-tabs li").hide();
                $(".top_menu_cmdb").closest("li").show();
                var access_control = JSON.parse(sessionStorage["access_control"]);                
                var permisson_menu = access_control[sessionStorage["role_name"]];

                // console.log(access_control);
                $.each(permisson_menu,function(inx,ele){
                    if(ele.tab_name){
                       var menu_name = ele.tab_name;                       
                        if(menu_name == "Cloud Services_Auto Scale"){
                            $("#cloudservices_Auto_Scale_tab").closest("li").show();
                        }else if(menu_name == "Cloud Services_Analytics"){
                            $("#cloudservices_Analytics_tab").closest("li").show();
                        }
                    }
                });
            }
        }


        if($rootScope.nsdash == "open"){
            $(".nav-tabs li").removeClass("active");
            $("#monitoring_dash_tab").removeClass("active", "in");
            document.getElementById("dash_2_tab").closest("li").classList.add("active");
            document.getElementById("monitoring_dash_2_tab").classList.add("active", "in");
        }

        $scope.init = function () {
            cloudservices_display_menu(); 
            $('.monitoringController .nav-tabs a').click(function () {
                var stabname = $(this).text();
                console.log(stabname);
                $rootScope.$broadcast('cloudserviceTabChange', {"tabname": stabname});
                $(this).tab('show');
                return false;
            });
        }
        $rootScope.$on('UserloggedIn', function(event, args) {
            cloudservices_display_menu();
        });

    }
]);