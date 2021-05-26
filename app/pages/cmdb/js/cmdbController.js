angular.module('pages').controller('cmdbController', [
    '$scope',
    '$http',
    '$rootScope',
    function ($scope, $http, $rootScope) {


        function cmdb_display_menu() {
            if (sessionStorage["access_control"]) {
                // $(".cmdbcontroller .nav-tabs li").hide();
                //$(".top_menu_cmdb").closest("li").show();
                var access_control = JSON.parse(sessionStorage["access_control"]);                
                var permisson_menu = access_control[sessionStorage["role_name"]];

                // console.log(access_control);
                $.each(permisson_menu,function(inx,ele){
                    if(ele.tab_name){
                       var menu_name = ele.tab_name;                       
                        if(menu_name == "HDDM_Cred Store"){
                            $("#hddm_cred_store_tab").closest("li").show();
                        }else if(menu_name == "HDDM_Discovery"){ 
                            $("#hddm_discovery_tab").closest("li").show();
                        }else if(menu_name == "HDDM_Machine"){
                            $("#hddm_machine_tab").closest("li").show();
                        }else if(menu_name == "HDDM_Group"){
                            $("#hddm_group_tab").closest("li").show();
                        }else if(menu_name == "HDDM_Application"){
                            $("#hddm_application_tab").closest("li").show();
                        }else if(menu_name == "HDDM_Cloud"){
                            $("#hddm_cloud_tab").closest("li").show();
                        }
                    }
                });


                if($("#hddm_cred_store_tab").closest("li").css('display') == 'block'){
                    $("#cmdb_tab li").removeClass("active");
                    $("#cmdb_content div").removeClass("active");
                    $("#hddm_cred_store_tab").closest("li").addClass("active");
                    $("#tab_credstore").addClass("active in");
                }else if($("#hddm_discovery_tab").closest("li").css('display') == 'block'){
                    $("#cmdb_tab li").removeClass("active");
                    $("#cmdb_content div").removeClass("active");
                    $("#hddm_discovery_tab").closest("li").addClass("active");
                    $("#tab_discovery").addClass("active in");
                }else if($("#hddm_machine_tab").closest("li").css('display') == 'block'){
                    $("#cmdb_tab li").removeClass("active");
                    $("#cmdb_content div").removeClass("active");
                    $("#hddm_machine_tab").closest("li").addClass("active");
                    $("#tab_machine").addClass("active in");
                }else if($("#hddm_group_tab").closest("li").css('display') == 'block'){
                    $("#cmdb_tab li").removeClass("active");
                    $("#cmdb_content div").removeClass("active");
                    $("#hddm_group_tab").closest("li").addClass("active");
                    $("#tab_group").addClass("active in");
                }else if($("#hddm_application_tab").closest("li").css('display') == 'block'){
                    $("#cmdb_tab li").removeClass("active");
                    $("#cmdb_content div").removeClass("active");
                    $("#hddm_application_tab").closest("li").addClass("active");
                    $("#tab_application").addClass("active in");
                }else if($("#hddm_cloud_tab").closest("li").css('display') == 'block'){
                    $("#cmdb_tab li").removeClass("active");
                    $("#cmdb_content div").removeClass("active");
                    $("#hddm_cloud_tab").closest("li").addClass("active");
                    $("#tab_cloud").addClass("active in");
                }


            }
        }

        $scope.init = function () {
            cmdb_display_menu();
            $('.cmdbcontroller .nav-tabs a').click(function () {
                var stabname = $(this).text();
                console.log(stabname);
                $rootScope.$broadcast('CMDBTabChange', {"tabname": stabname});
                $(this).tab('show');
                return false;
            });


        }
        $rootScope.$on('UserloggedIn', function(event, args) {
            cmdb_display_menu();
        });

    }
]);