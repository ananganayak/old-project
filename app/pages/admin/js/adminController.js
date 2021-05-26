angular.module('pages').controller('adminController', [
    '$scope',
    '$http',
    '$rootScope',     
    function($scope, $http, $rootScope) {

        function admin_display_menu() {
            if (sessionStorage["access_control"]) {
                // $(".admincontainer .icon-grid .case-wrapper").hide();
                $(".top_menu_cmdb").closest("li").show();
                var access_control = JSON.parse(sessionStorage["access_control"]);                
                var permisson_menu = access_control[sessionStorage["role_name"]];

                // console.log(access_control);
                $.each(permisson_menu,function(inx,ele){
                    if(ele.tab_name){
                       var menu_name = ele.tab_name;                       
                        if(menu_name == "Admin_Users"){
                            $("#user_tab").show();
                        }else if(menu_name == "Admin_Roles"){ 
                            $("#roles_tab").show();
                        }else if(menu_name == "Admin_SMTP"){
                            $("#smtp_tab").show();
                        }else if(menu_name == "Admin_LDAP"){
                            $("#ldap_tab").show();
                        }else if(menu_name == "Admin_BOT Repo"){
                            $("#bots_tab").show();
                        }else if(menu_name == "Admin_Policy Engine"){
                            $("#pe_tab").show();
                        }else if(menu_name == "Admin_CS Mapping"){
                            $("#csm_tab").show();
                        }else if(menu_name == "Admin_ARCON"){
                            $("#arcon_tab").show();
                        }else if(menu_name == "Admin_License"){
                            $("#license_tab").show();
                        }else if(menu_name == "Admin_IntelliDMS"){
                            $("#Intel_DCM_tab").show();
                        }
                    }
                });
            }
        }

        function init_event() {
            
        }

        $scope.init = function() {
            init_event();
            admin_display_menu();
        };

    }
]);