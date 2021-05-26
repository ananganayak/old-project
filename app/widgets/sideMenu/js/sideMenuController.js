angular.module('widgets').controller('sideMenuController', [
    '$scope',
    '$rootScope',
    '$location',
    '$timeout',
    function($scope, $rootScope, $location, $timeout) {
        'use strict';

        var admin_menu_arr = ['users', 'roles', 'smtp', 'ldap','manageEngine', 'itsmintegration', 'botrepo', 'policyengine', 'licence', 'rcaFeedback', 'CSMapping', 'arcon'];
        
        var automation_arr = ['patch'];
        
        var dashboard_arr = ['managedashboard'];

        var cloud_service_arr = ['autoscale'];

        var machine_learning_arr = ['anomaly'];

        var monitoring_arr = ['dashboard', 'monitoring', 'reports', 'performance', 'unknowns'];

        var cmdb_arr = ['credstore', 'discovery', 'machine', 'group', 'software', 'application', 'resource', 'hypervisor'];

        $scope.init = function() {

            $rootScope.$on('$stateChangeSuccess', function(e, newUrl, oldUrl) {
                Pace.restart();
                var page = newUrl.name;
                var smenuname = "top_menu_" + page;
                $rootScope.showSideMenu = false;
                $rootScope.showBreadcrumb = false;
                if (admin_menu_arr.indexOf(page) != -1) {
                    $(".top-menu .navbar-left a").removeClass("top_menu_active");
                    $(".top_menu_admin").addClass("top_menu_active");
                }else if(automation_arr.indexOf(page)!=-1){
                    $(".top-menu .navbar-left a").removeClass("top_menu_active");
                    $(".top_menu_automation").addClass("top_menu_active");
                }else if(dashboard_arr.indexOf(page)!=-1){
                    $(".top-menu .navbar-left a").removeClass("top_menu_active");
                    $(".top_menu_dashboard").addClass("top_menu_active");
                }else if(monitoring_arr.indexOf(page)!=-1){
                    $(".top-menu .navbar-left a").removeClass("top_menu_active");
                    $(".top_menu_monitoring").addClass("top_menu_active");
                }else if(cmdb_arr.indexOf(page)!=-1){
                    $(".top-menu .navbar-left a").removeClass("top_menu_active");
                    $(".top_menu_cmdb").addClass("top_menu_active");
                }else if(machine_learning_arr.indexOf(page)!=-1){
                    $(".top-menu .navbar-left a").removeClass("top_menu_active");
                    $(".top_menu_machine_learning").addClass("top_menu_active");
                }
                if ($("." + smenuname).length > 0) {
                    $(".top-menu .navbar-left a").removeClass("top_menu_active");
                    $("." + smenuname).addClass("top_menu_active");
                }
            });

        }

    }
]);