angular.module('pages', []);
angular.module('widgets', []);
angular.module('services', []);
angular.module('constants', []);
angular.module('filters', []);
angular.module('factories', []);

angular.module('pages', [
    'ngRoute',
    'ngTouch',
    'ui.router',
    'ui.pagination'
]).config(function ($stateProvider, $urlRouterProvider, $routeProvider) {
    if(app_brand == "nxtgen"){
        if(sessionStorage.getItem("envirounment_ip") == "https://r2d23.nxtgen.com:"){
            sessionStorage.setItem("envirounment_ip", "https://r2d23.nxtgen.com:");
            // sessionStorage.setItem("envirounment_port", "443");
        }else if (sessionStorage.getItem("envirounment_ip") == "https://r2d22.nxtgen.com:"){
            sessionStorage.setItem("envirounment_ip", "https://r2d22.nxtgen.com:");
            // sessionStorage.setItem("envirounment_port", "443");
        }else if (sessionStorage.getItem("envirounment_ip") == "https://r2d21.nxtgen.com:"){
            sessionStorage.setItem("envirounment_ip", "https://r2d21.nxtgen.com:");
            // sessionStorage.setItem("envirounment_port", "443");
        }else{
            sessionStorage.setItem("envirounment_ip", "https://r2d2.nxtgen.com:");
            // sessionStorage.setItem("envirounment_port", "443");
        }
    }
    // else{
    //     sessionStorage.setItem("envirounment_ip", "http://172.16.1.101:");
    //     sessionStorage.setItem("envirounment_port", "8000");
    // }
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'app/pages/login/template/login.html',
        controller: 'loginController'
    }).state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/pages/dashboard/template/dashboard.html',
        controller: 'dashboardController'
    }).state('evm', {
        url: '/evm',
        templateUrl: 'app/pages/evm/template/evm.html',
        controller: 'evmController'
    }).state('automation', {
        url: '/automation',
        templateUrl: 'app/pages/automation/template/automation.html',
        controller: 'automationController'
    }).state('admin', {
        url: '/admin',
        templateUrl: 'app/pages/admin/template/admin.html',
        controller: 'adminController'
    }).state('users', {
        url: '/users',
        templateUrl: 'app/pages/users/template/users.html',
        controller: 'usersController'
    }).state('roles', {
        url: '/roles',
        templateUrl: 'app/pages/roles/template/roles.html',
        controller: 'rolesController'
    }).state('devicedetails', {
        url: '/devicedetails',
        templateUrl: 'app/pages/devicedetails/template/devicedetails.html',
        controller: 'devicedetailsController'
    }).state('itsmintegration', {
        url: '/itsmintegration',
        templateUrl: 'app/pages/itsmintegration/template/itsmintegration.html',
        controller: 'itsmintegrationController'
    }).state('policyengine', {
        url: '/policyengine',
        templateUrl: 'app/pages/policyengine/template/policyengine.html',
        controller: 'policyengineController'
    }).state('licence', {
        url: '/licence',
        templateUrl: 'app/pages/licence/template/licence.html',
        controller: 'licenceController'
    }).state('botrepo', {
        url: '/botrepo',
        templateUrl: 'app/pages/botrepo/template/botrepo.html',
        controller: 'botrepoController'
    }).state('cmdb', {
        url: '/cmdb',
        templateUrl: 'app/pages/cmdb/template/cmdb.html',
        controller: 'cmdbController'
    }).state('monitoring', {
        url: '/monitoring',
        templateUrl: 'app/pages/monitoring/template/monitoring.html',
        controller: 'monitoringController'
    }).state('patch', {
        url: '/patch',
        templateUrl: 'app/pages/patch/template/patch.html',
        controller: 'patchController'
    }).state('smtp', {
        url: '/smtp',
        templateUrl: 'app/pages/smtp/template/smtp.html',
        controller: 'smtpController'
    }).state('manageEngine', {
        url: '/manageEngine',
        templateUrl: 'app/pages/manageEngine/template/manageEngine.html',
        controller: 'manageEngineController'
    }).state('ldap', {
        url: '/ldap',
        templateUrl: 'app/pages/ldap/template/ldap.html',
        controller: 'ldapController'
    }).state('managedashboard', {
        url: '/managedashboard',
        templateUrl: 'app/pages/managedashboard/template/managedashboard.html',
        controller: 'managedashboardController'
    }).state('logout', {
        url: '/logout',
        controller: 'logoutController'
    }).state('rcaFeedback', {
        url: '/rcaFeedback',
        templateUrl:'app/pages/RCAfeedback/template/rcaFeedback.html',
        controller: 'rcaFeedbackController'
    }).state('uciMapping', {
        url: '/uciMapping',
        templateUrl:'app/pages/UCImapping/template/uciMapping.html',
        controller: 'uciMappingController'
    }).state('machine_learning', {
        url: '/machine_learning',
        templateUrl:'app/pages/machineLearning/template/machineLearning.html',
        controller: 'machineLearningController'
    }).state('CSMapping', {
        url: '/CSMapping',
        templateUrl:'app/pages/CSMapping/template/CSMapping.html',
        controller: 'CSMappingController'
    }).state('arcon', {
        url: '/arcon',
        templateUrl:'app/pages/arcon/template/arcon.html',
        controller: 'arconController'
    }).state('report', {
        url: '/report',
        templateUrl:'app/pages/report/template/report.html',
        controller: 'reportController'
    }).state('cloud_service', {
        url: '/cloud_service',
        templateUrl:'app/pages/cloudservices/template/cloudservices.html',
        controller: 'cloudservicesController'
    }).state('Intel_DCM', {
        url: '/Intel_DCM',
        templateUrl:'app/pages/intelDCM/template/intelDCM.html',
        controller: 'intelDCMController'
    }).state('vmwaremonitoring', {
        url: '/VMwareMonitoring',
        templateUrl:'app/pages/vmwaremonitoring/template/vmwaremonitoring.html',
        controller: 'vmwaremonitoringController'
    });

    $urlRouterProvider.otherwise('login');

}).run(['$rootScope', '$urlRouter', '$location', '$state', function ($rootScope, $urlRouter, $location, $state) {

        $rootScope.showHeader = false;
        $rootScope.showSideMenu = false;
        $rootScope.showBreadcrumb = false;
        $rootScope.username = "";

        var isloggedin = function () {
            var bloggedin = sessionStorage['loggedin'] || "";
            if (typeof bloggedin == "string") {
                bloggedin = intelliapp.utils.stringToBoolean(bloggedin);
            }
            return bloggedin;
        }
        $rootScope.isloggedin = isloggedin();

        if (isloggedin() == true) {

            $rootScope.showHeader = true;
            //$rootScope.showSideMenu = true;            
        }

        $rootScope.$on('$stateChangeSuccess', function (e, newUrl, oldUrl) {
            if (newUrl.templateUrl == "app/pages/login/template/login.html") {
                if (isloggedin()) {
                    // $location.path('/');
                    $rootScope.pageredirect();
                }
            } else {
                if (!isloggedin()) {
                    $location.path('/login');
                }
            }
        });

    }]);

angular.module('mainApp', [
    'services',
    'pages',
    'widgets',
    'constants',
    'filters',
    'factories',
    'gridster',
    'ui.chart'
]).run(function ($rootScope) {
}).controller('mainController', function ($scope, $location, $state, $rootScope) {

    $rootScope.pageTitle = config.brand_name;
    $rootScope.brand_icon = config.brand_icon;
    $rootScope.dropevents_count = 0;

    $scope.go = function (path, params, options) {
        $state.go(path, params, options);
    };

    $scope.$on('loggedIn', function (event, args) {
        $rootScope.showHeader = true;
        //$rootScope.showSideMenu = true;
        $rootScope.username = sessionStorage["username"];
        $rootScope.$broadcast('UserloggedIn', args);
        
        $rootScope.pageredirect();
    });

    // window.onhashchange = function() {
    //     $scope.pageredirect();
    // }

    $rootScope.pageredirect = function(){
        if($(".top_menu_dashboard").closest("li").css('display') == 'block'){
            $state.go("dashboard");
            return
        }else if($(".top_menu_monitoring").closest("li").css('display')== 'block'){
            $state.go("monitoring");
            return
        }else if($(".top_menu_vmwaremonitoring").closest("li").css('display')== 'block'){
            $state.go("vmwaremonitoring");
            return
        }else if($(".top_menu_evm").closest("li").css('display') == 'block'){
            $state.go("evm");
            return
        }else if($(".top_menu_automation").closest("li").css('display') == 'block'){
            $state.go("automation");
            return
        }else if($(".top_menu_cmdb").closest("li").css('display') == 'block'){
            $state.go("cmdb");
            return
        }else if($(".top_menu_report").closest("li").css('display') == 'block'){
            $state.go("report");
            return
        }else if($(".top_menu_cloud_service").closest("li").css('display') == 'block'){
            $state.go("cloud_service");
            return
        }
        // else if($(".top_menu_review").closest("li").css('display') == 'block'){
        //     $state.go("dashboard");
        //     break;
        // }
        else if($(".top_menu_admin").closest("li").css('display') == 'block'){
            $state.go("admin");
            return
        }
    }

    /*if (location.protocol != 'https:')
    {
        location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
    }*/
    /*if ('serviceWorker' in navigator) {
     navigator.serviceWorker.register('sw.js').then(function () {
     console.log('Service Worker Registered');
     });
     }*/

}).controller('logoutController', function ($scope, $location, $state, $rootScope, $window) {

    $rootScope.showHeader = false;
    $rootScope.showSideMenu = false;
    $rootScope.showBreadcrumb = false;
    sessionStorage["loggedin"] = false;
    sessionStorage.clear();

    if(app_brand == "nxtgen"){
        $window.location.href = "https://r2d2.nxtgen.com/";
        // window.location.replace('https://r2d2.nxtgen.com/');
        sessionStorage.setItem("envirounment_ip", "https://r2d2.nxtgen.com:");
        sessionStorage.setItem("envirounment_port", "443");
    }else{
        $state.go("login");
    }
    // $window.location.reload();
}).directive('onFinishRender', ['$timeout', '$parse', function ($timeout, $parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                    if (!!attr.onFinishRender) {
                        $parse(attr.onFinishRender)(scope);
                    }
                });
            }
        }
    }
}])
// Right Click Disable Function
.directive('disableRightClick', function(){
    return{
        restrict : 'A',
        link : function(scope, element, attr){
            element.bind('contextmenu', function(e){
                e.preventDefault();
            })
        }
    }
});