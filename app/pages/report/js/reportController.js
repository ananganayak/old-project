angular.module('pages').controller('reportController', [
    '$scope',
    '$http',
    '$rootScope',     
    function($scope, $http, $rootScope) {

        function reports_display_menu() {
            if (sessionStorage["access_control"]) {
                // $(".reportcontainer .nav-tabs li").hide();
                $(".top_menu_cmdb").closest("li").show();
                var access_control = JSON.parse(sessionStorage["access_control"]);                
                var permisson_menu = access_control[sessionStorage["role_name"]];
                $("#report_myTabs_1 li").removeClass("active");
                $("#reportTabContent_1 tab-pane").removeClass("active");
                // console.log(access_control);
                $.each(permisson_menu,function(inx,ele){
                    if(ele.tab_name){
                       var menu_name = ele.tab_name;                       
                        if(menu_name == "Reports_Edge Uplink In/Out"){
                            $("#report_edge_tab").closest("li").show();
                        }
                        // else if(menu_name == "Reports_Bandwidth Report"){ 
                        //     $("#report_bandwidth_tab").closest("li").show();
                        //     $("#report_myTabs_1 li").removeClass("active");
                        //     $("#reportTabContent_1 div").removeClass("active");
                        //     $("#report_bandwidth_tab").addClass("active");
                        //     $("#report-tab-2").addClass("active");
                        // }
                        else if(menu_name == "Reports_Performance Report Old"){ 
                            $("#report_performance_old_tab").closest("li").show();                           
                        }else if(menu_name == "Reports_Performance Report New"){ 
                            $("#report_performances_new_tab").closest("li").show();
                        }else if(menu_name == "Reports_VM Summary"){ 
                            $("#report_vm_summary_tab").closest("li").show();
                        }
                    }
                });
                
                if($("#report_edge_tab").closest("li").css('display') == 'block'){
                    $("#report_myTabs_1 li").removeClass("active");
                    $("#reportTabContent_1 div").removeClass("active");
                    $("#report_edge_tab").closest("li").addClass("active");
                    $("#report-tab-1").addClass("active in");
                }else if($("#report_performance_old_tab").closest("li").css('display') == 'block'){
                    $("#report_myTabs_1 li").removeClass("active");
                    $("#reportTabContent_1 div").removeClass("active");
                    $("#report_performance_old_tab").closest("li").addClass("active");
                    $("#report-tab-3").addClass("active in");
                }else if($("#report_performances_new_tab").closest("li").css('display') == 'block'){
                    $("#report_myTabs_1 li").removeClass("active");
                    $("#reportTabContent_1 div").removeClass("active");
                    $("#report_performances_new_tab").closest("li").addClass("active");
                    $("#report-tab-4").addClass("active in");
                }else if($("#report_vm_summary_tab").closest("li").css('display') == 'block'){
                    $("#report_myTabs_1 li").removeClass("active");
                    $("#reportTabContent_1 div").removeClass("active");
                    $("#report_vm_summary_tab").closest("li").addClass("active");
                    $("#report-tab-5").addClass("active in");
                }
            }
        }

        $scope.init = function() {
            reports_display_menu();
            $('.nav-tabs a').click(function() {
                var stabname = $(this).text();                
                $rootScope.$broadcast('ReportTabChange', {"tabname" : stabname});        
                $(this).tab('show');
                return false;
            });
        };
        
        $rootScope.$on('UserloggedIn', function(event, args) {
            reports_display_menu();
        });

    }
]);