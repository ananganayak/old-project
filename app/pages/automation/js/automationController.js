angular.module('pages').controller('automationController', [
    '$scope',
    '$http',
    '$rootScope',
    function($scope, $http, $rootScope) {


        function automation_display_menu() {
            if (sessionStorage["access_control"]) {
                // $(".automationcontainer .nav-tabs li").hide();
                $(".top_menu_cmdb").closest("li").show();
                var access_control = JSON.parse(sessionStorage["access_control"]);                
                var permisson_menu = access_control[sessionStorage["role_name"]];

                // console.log(access_control);
                $.each(permisson_menu,function(inx,ele){
                    if(ele.tab_name){
                       var menu_name = ele.tab_name;                       
                       if(menu_name == "Automation_Catalogue"){
                           $("#deployment_tab_1").closest("li").show();
                       }else if(menu_name == "Automation_Designer"){ 
                           $("#workflow_tab_1").closest("li").show();
                       }else if(menu_name == "Automation_Review"){
                           $("#review_tab_1").closest("li").show();
                       }else if(menu_name == "Automation_Dashboard"){
                        $("#dashboard_tab_1").closest("li").show();
                    }
                    }
                });
                if($("#dashboard_tab_1").closest("li").css('display') == 'block'){
                    $("#automation_tab_menu li").removeClass("active");
                    $("#automation_tab_content div").removeClass("active");
                    $("#dashboard_tab_1").closest("li").addClass("active");
                    $("#tab_dashboard").addClass("active in");
                } else if($("#deployment_tab_1").closest("li").css('display') == 'block'){
                    $("#automation_tab_menu li").removeClass("active");
                    $("#automation_tab_content div").removeClass("active");
                    $("#deployment_tab_1").closest("li").addClass("active");
                    $("#tab_deployment").addClass("active in");
                }else if($("#workflow_tab_1").closest("li").css('display') == 'block'){
                    $("#automation_tab_menu li").removeClass("active");
                    $("#automation_tab_content div").removeClass("active");
                    $("#workflow_tab_1").closest("li").addClass("active");
                    $("#tab_workflow").addClass("active in");
                }else if($("#review_tab_1").closest("li").css('display') == 'block'){
                    $("#automation_tab_menu li").removeClass("active");
                    $("#automation_tab_content div").removeClass("active");
                    $("#review_tab_1").closest("li").addClass("active");
                    $("#tab_review").addClass("active in");
                }
            }
        }

        $scope.init = function() {
            automation_display_menu();
            $('.nav-tabs a').click(function() {
                var stabname = $(this).attr("data-tabname");
                console.log(stabname);
                $rootScope.$broadcast('AutomationTabChange', {"tabname" : stabname});
                $(this).tab('show');
                return false;
            });

        };
        $rootScope.$on('UserloggedIn', function(event, args) {
            automation_display_menu();
        });
    }
]);