angular.module('pages').controller('evmController', [
    '$scope',
    '$http',
    '$rootScope',
    function($scope, $http, $rootScope) {

        function evm_display_menu() {
            if (sessionStorage["access_control"]) {
                // $(".evmcontainer .nav-tabs li").hide();
                $(".top_menu_cmdb").closest("li").show();
                var access_control = JSON.parse(sessionStorage["access_control"]);                
                var permisson_menu = access_control[sessionStorage["role_name"]];

                // console.log(access_control);
                $.each(permisson_menu,function(inx,ele){
                    if(ele.tab_name){
                        var menu_name = ele.tab_name;                       
                        if(menu_name == "Event Management_Alerts"){
                            $("#Evm_tab_alerts").closest("li").show();
                        }else if(menu_name == "Event Management_Events"){ 
                            $("#Evm_tab_events").closest("li").show();
                        }else if(menu_name == "Event Management_Drop_Events"){
                            $("#Evm_tab_drop_events").closest("li").show();
                        }else if(menu_name == "Event Management_Report"){
                            $("#Evm_tab_drop_events").closest("li").show();
                        }
                    }
                });
            }
        }

        $scope.init = function() {
            evm_display_menu()
            $('.nav-tabs a').click(function() {
                
                var stabname = $(this).text();                
                $rootScope.$broadcast('EVMTabChange', {"tabname" : stabname});        
                $(this).tab('show');
                return false;
            });
            
        };

        $rootScope.$on('UserloggedIn', function(event, args) {
            evm_display_menu();
        });
    }
]);