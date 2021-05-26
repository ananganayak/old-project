angular.module('widgets').controller('deploymentController', [
    '$scope',
    '$rootScope',
    '$location',
    '$state',
    '$filter',
    '$sce',
    function ($scope, $rootScope, $location, $state, $filter, $sce) {
        'use strict';
        
        var bpageloaded = false;
        $scope.category_list = [];

        $scope.deployment_list = [];
        $scope.filter_deployment_list = [];

        $scope.category_list_filter = 'all';
        $scope.searchKeywords = "";

        $scope.instancenumPerPage = 5;
        $scope.instancecurrentPage = 1;
        $scope.instance_list = [];
        $scope.currentInstancePageHistory = [];

        var proc_id;

        var img_path = "app/img/catalog/general/";
        var icon_path = "app/img/catalog/menu/";
        
        var common_catelog_img = {
            'Active Directory': img_path + 'active_directory.png',
            'Microsoft Exchange': img_path + 'microsoft-exchange.png',
            'CENTOS / RHEL': img_path + 'centos.png',
            'Linux': img_path + 'centos.png',
            'Microsoft Windows': img_path + 'microsoft-windows.png',
            'MySQL': img_path + 'mysql.png',
            'POSTGRES': img_path + 'postgres.png',
            'PROXMOX': img_path + 'proxmox.png',
            'Virtualization': img_path + 'proxmox.png',
            'Mongo': img_path + 'mongodb.png',
        };
        
        var common_catelog_icon = {
            'Active Directory': icon_path + 'active_directory.png',
            'Microsoft Exchange': icon_path + 'microsoft-exchange.png',
            'CENTOS / RHEL': icon_path + 'centos.png',
            'Linux': icon_path + 'centos.png',
            'Microsoft Windows': icon_path + 'microsoft-windows.png',
            'MySQL': icon_path + 'mysql.png',
            'POSTGRES': icon_path + 'postgres.png',
            'PROXMOX': icon_path + 'proxmox.png',
            'Virtualization': icon_path + 'proxmox.png',
            'Mongo': icon_path + 'mongodb.png',
        };
        
        var customer_id = "autointelli";
        var tenant_id = "internal";
        $scope.cuser_id = sessionStorage["username"];
       
        function load_deployment_category(val) {
            $rootScope.showSpinner = true;
            if(val == 0){
                var curl = config.urls.automationsharecatelog + customer_id +"/"+ tenant_id + "/categories/" + $scope.cuser_id;
            }else{
                var curl = config.urls.automationsharecatelog + customer_id +"/"+ tenant_id + "/shared/categories/" + $scope.cuser_id;
            }            
            $.ajax({
                url: curl,
                type: "GET",
                dataType: "json",
                async: false,
                success: function (res) {
                    $rootScope.showSpinner = false;
                    if (res.status == "success") {
                        var data_arr = res.response["categories"];
                        var final_arr = [];
                        $.each(data_arr, function (inx, ele) {
                            var sicon_url = "app/img/catalog/menu/active_directory.png";
                            if (common_catelog_icon[ele]) {
                                sicon_url = common_catelog_icon[ele];
                            }
                            //console.log(sicon_url);
                            final_arr.push({
                                "icon": sicon_url,
                                "name": ele
                            })
                        });
                        //console.log(final_arr);
                        $scope.category_list = final_arr;
                        console.log($scope.category_list);
                    }
                },
                error: function (err) {
                    $rootScope.showSpinner = false;
                },
                cache: false
            });
        }

        $scope.clrclass = "activeclr";

        $scope.load_deployment_list = function(bloader) {
            if ($scope.clrclass === "activeclr"){
                load_deployment_category(0);
                $scope.clrclass = "defaultclr";
                $scope.deployment_list = "";
                var surl = config.urls.automationcatelog + customer_id + "/" + tenant_id + "/list/" + $scope.cuser_id;
            }else{
                load_deployment_category(1);
                $scope.clrclass = "activeclr";
                $scope.deployment_list = "";
                var surl = config.urls.automationsharecatelog + customer_id + "/" + tenant_id + "/shared/list/" + $scope.cuser_id;
            }
            var bajaxloader = bloader || true;
            if (bajaxloader) {
                $rootScope.showSpinner = true;
            }
            
            $.ajax({
                url: surl,
                type: "GET",
                dataType: "json",
                async: false,
                success: function (res) {
                    if (bajaxloader) {
                        $rootScope.showSpinner = false;
                    }
                    //console.log(res);
                    if (res.status == "success") {
                        var final_arr = [];
                        if (res.response["process-list"]) {
                            var data_arr = res.response["process-list"];
                            console.log(data_arr);
                            $.each(data_arr, function (inx, ele) {
                                var proc_name = ele["process-id"].split(".")[1];
                                var temp_arr = [];
                                temp_arr["process-id"] = ele["process-id"];
                                temp_arr["process-version"] = ele["process-version"];
                                temp_arr["process-name"] = ele["process-name"];
                                temp_arr['organization'] = 'AutoIntelli';
                                temp_arr['department'] = 'Autointelli';
                                temp_arr['project_name'] = proc_name;
                                temp_arr['description'] = ele["description"];
                                temp_arr['total_execution'] = ele["totalExecutions"];
                                temp_arr['category'] = ele["category"];
                                var simgurl = "app/img/catalog/ad/AD-User-Creation.png";
                                if (ele["imgurl"] != "/image/url") {
                                    simgurl = ele["imgurl"] || simgurl;
                                } else if (common_catelog_img[ele["category"]]) {
                                    simgurl = common_catelog_img[ele["category"]];
                                    //console.log(ele["imgurl"]);
                                    //console.log(simgurl);                                
                                }
                                temp_arr['logo'] = simgurl;
                                final_arr.push(temp_arr);
                            });
                            $scope.deployment_list = final_arr;
                            console.log($scope.deployment_list);
                            // $scope.$apply();
                        }
                    }
                },
                error: function (err) {
                    $rootScope.showSpinner = false;
                    console.log(err);
                },
                cache: false
            });
        }

        function run_process(param) {
            var surl = config.urls.workflowexcute + customer_id + "/" + tenant_id + "/start/"+ $scope.cuser_id+"/" + proc_id;
            $rootScope.showSpinner = true;
            $scope.$apply();
            $.ajax({
                url: surl,
                type: "POST",
                async: true,
                data: JSON.stringify(param),
                beforeSend: function (request) {
                    request.setRequestHeader("Content-Type", "application/json");
                },
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (res) {
                    $rootScope.showSpinner = false;
                    if ($("body").hasClass("modal-open")) {
                        $("#btnformclose").trigger("click");
                    }
                    if (res.status == "success") {
                        for (var i = 0; i < $scope.deployment_list.length; i++) {
                            if ($scope.deployment_list[i]['process-id'] == proc_id) {
                                $scope.deployment_list[i]['total_execution'] = parseInt($scope.deployment_list[i]['total_execution']) + 1;
                            }
                        }
                        notie.alert(1, "Workflow Executed successfully!", config.notify_delay);
                    }
                    $scope.$apply();
                },
                error: function (data) {
                    console.log(data);
                },
                cache: false
            });
        }

        function init_event() {



            $(window).scroll(function () {
                if ($(this).scrollTop() > 56) {
                    $(".automation_left_panel").addClass("stick");
                } else {
                    $(".automation_left_panel").removeClass("stick");
                }
            });
            
            $scope.btnWorkflowInstanceViewFn = function(val){
                proc_id = val;
                // alert(proc_id);
                var surl = config.urls.workflowresult + customer_id + "/" + tenant_id + "/instances/" + proc_id;
                $rootScope.showSpinner = true; 
                // $scope.$apply();
                $.ajax({
                    url: surl,
                    type: "GET",
                    dataType: "json",
                    async: false,
                    success: function (res) {
                        console.log(res);
                        $rootScope.showSpinner = false;
                        if (res.status == "success") {
                            $scope.instance_list = res.response["process-instances"];
                            $scope.instance_list = $filter('orderBy')($scope.instance_list, '-processinstanceid');
                            $scope.instancepageselect($scope.instancecurrentPage);
                            $(".workflow_result_popup").modal('toggle');
                        } else {
                            $scope.instance_list = [];
                            $(".workflow_result_popup").modal('toggle');
                        }
                        // $scope.$apply();
                    },
                    cache: false
                });
                return false;
            }
            // $(".automation_catalog_content").on('click', '.workflow_instance_view', function (e) {
            //     var proc_id = $(this).attr("data-id");
            //     alert(proc_id);
            //     var surl = config.urls.workflowresult + customer_id + "/" + tenant_id + "/instances/" + proc_id;
            //     $rootScope.showSpinner = true; 
            //     $scope.$apply();
            //     $.ajax({
            //         url: surl,
            //         type: "GET",
            //         dataType: "json",
            //         async: false,
            //         success: function (res) {
            //             console.log(res);
            //             $rootScope.showSpinner = false;
            //             if (res.status == "success") {
            //                 $scope.instance_list = res.response["process-instances"];
            //                 $scope.instance_list = $filter('orderBy')($scope.instance_list, '-processinstanceid');
            //                 $scope.instancepageselect($scope.instancecurrentPage);
            //                 $(".workflow_result_popup").modal('toggle');
            //             } else {
            //                 $scope.instance_list = [];
            //                 $(".workflow_result_popup").modal('toggle');
            //             }
            //             $scope.$apply();
            //         },
            //         cache: false
            //     });
            //     return false;
            // });
            var pro_name ;
            $scope.btnWorkflowInstanceExecuteFn = function(dataid, dataver, dataname){
                proc_id = dataid;
                var proc_version = dataver;
                pro_name = dataname;

                var today = new Date();
                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date+' '+time;
                //console.log(pro_name);
                //var checkformurl = "http://35.190.156.182:8000/api/v2/autointelli/edit/" + proc_id + "/" + proc_version;
                var checkformurl = config.urls.editform + customer_id + "/" + tenant_id + "/process/" + proc_id;
                //console.log(checkformurl);
                $.get(checkformurl, function (res) {
                    if (res.status == "failure") { 
                        $.confirm({
                            title: 'Run Process ?',
                            type: 'blue',
                            backgroundDismiss: true,
                            content: pro_name + " - " + dateTime,
                            buttons: {
                                "Cancel": function () {
                                },
                                "Confirm": function () {
                                    run_process({});
                                }
                            }
                        });
                    } else {
                        var data_arr = res.response;
                        if (data_arr.formcontent.length > 0) {
                            $("#workflow_form_popup_name").text(pro_name);
                            $(".workflow_form_popup").modal('toggle');
                            $('#workflow_form_builder').formRender({
                                formData: data_arr.formcontent
                            });
                        } else {
                            run_process({});
                        }
                    }
                    // processregfn();
                });
                return false;
            }
            // $("#workflow_instance_execute").click(function () {
            //     console.log($(this));
                
            // });

            $scope.terminateRowval = function(id){
                $rootScope.showSpinner = true; 
                var surl = config.urls.workflowterminateprocssdel + customer_id + "/" + tenant_id + "/stop/"+$scope.cuser_id +"/"+ proc_id +"/"+id;
                $.ajax({
                    url: surl,
                    type: "DELETE",
                    dataType: "json",
                    async: false,
                    // data : JSON.stringify(dataset),
                    // headers : {"sessionkey" : sessionStorage["session_id"]},
                    success: function (res) {
                        if (res.result == "success") {
                            // $scope.susop = res.data;
                            notie.alert(1, res.data, config.notify_delay);
                            $rootScope.showSpinner = false; 
                            console.log($scope.suserlst);
                        } else {
                            notie.alert(3, res.response, config.notify_delay);
                            $rootScope.showSpinner = false; 
                        }
                    }
                });
            }

            // Process Registration Function
            // function processregfn(){
            //     var dataset = {"user_id": customer_id, "process_id": proc_id}
            //     $.ajax({
            //         url: config.urls.getshareuserlistreg,
            //         type: "POST",
            //         dataType: "json",
            //         async: false,
            //         data : JSON.stringify(dataset),
            //         headers : {"sessionkey" : sessionStorage["session_id"]},
            //         success: function (res) {
            //             if (res.result == "success") {
            //                 // $scope.susop = res.data;
            //                 notie.alert(1, res.data, config.notify_delay);
            //                 console.log($scope.suserlst);
            //             } else {
            //                 notie.alert(3, res.data, config.notify_delay);
            //             }
            //         }
            //     });
            // }

            $(".tbl_workflow_result").on('click', '.icon_alert', function (e) {
                var cache_ele = $(this);
                e.stopImmediatePropagation();
                var cache_tr_panel = cache_ele.closest("tr").next();
                cache_ele.closest("tr").find(".icon_ticket i").addClass("fa-plus-square-o");
                if (cache_ele.find("i").hasClass("fa-plus-square-o")) {
                    cache_ele.find("i").removeClass("fa-plus-square-o");
                    cache_ele.find("i").addClass("fa-minus-square-o");
                    cache_tr_panel.find(".row_log").show();
                    cache_tr_panel.find(".row_image").hide();
                    cache_tr_panel.fadeIn('slow');
                    cache_tr_panel.find(".row_image").removeClass("showdiv"); 
                } else {
                    cache_ele.find("i").removeClass("fa-minus-square-o");
                    cache_ele.find("i").addClass("fa-plus-square-o");
                    cache_tr_panel.fadeOut('slow');
                }
                return false;
            });

            // Get Process flow result get chart based on id.
            $scope.getIframeSrc = function (pro_name, pro_id) {
                var proname = pro_name.toLowerCase();
                console.log('http://kieserver:kieserver1!@'+ automationiframeip +automationiframeport +'/kie-server/services/rest/server/containers/cont_autointelli_internal_'+proname+'/images/processes/instances/'+ pro_id)
                return $sce.trustAsResourceUrl('http://kieserver:kieserver1!@'+ automationiframeip + automationiframeport +'/kie-server/services/rest/server/containers/cont_autointelli_internal_'+proname+'/images/processes/instances/'+ pro_id);
                // return $sce.trustAsResourceUrl('http://kieserver:kieserver1!@172.16.1.106:8085/kie-server/services/rest/server/containers/cont_autointelli_internal_oikoadmin_create_insurance_quote_through_db/images/processes/instances/59');
                // document.getElementById("frameid").contentWindow.location.href
            };

            // Get Process flow result Chart Show function
            $(".tbl_workflow_result").on('click', '.btnshowprocessmap', function(e){
                var cache_ele = $(this);
                e.stopImmediatePropagation();
                var che = cache_ele.closest("td")
                var cache_tr_panel = cache_ele.closest("tr").next();
                cache_tr_panel.find(".row_log").hide();
                cache_tr_panel.find(".row_image").show();
                if(cache_tr_panel.find(".row_image").hasClass("showdiv")== false){
                    cache_tr_panel.find(".row_image").addClass("showdiv");  
                    cache_tr_panel.fadeIn('slow');
                }else{
                    cache_tr_panel.find(".row_image").removeClass("showdiv"); 
                    cache_tr_panel.fadeOut('slow');
                    cache_tr_panel.find(".row_image").hide();
                }
            })

            // Service form submit and Run function
            $scope.btndeplymentformsave = function(){
                var forminputs = {};
                var today = new Date();
                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date+' '+time;
                $("#workflow_form_builder input[input_variable],#workflow_form_builder select[input_variable],#workflow_form_builder textarea[input_variable]").each(function (inx, ele) {
                    var cache_ele = $(ele);
                    forminputs[cache_ele.attr("input_variable")] = "";
                    if (cache_ele.attr("type") == "radio" || cache_ele.attr("type") == "checkbox") {
                        var temp_name = cache_ele.attr("name");
                        forminputs[cache_ele.attr("input_variable")] = $("input[name='" + temp_name + "']:checked").val();
                    } else {
                        forminputs[cache_ele.attr("input_variable")] = cache_ele.val();
                    }
                });
                console.log(forminputs);
                $.confirm({
                    title: 'Run Process ?',
                    type: 'blue',
                    backgroundDismiss: true,
                    content:pro_name  + " - " + dateTime,
                    buttons: {
                        "Cancel": function () {
                        },
                        "Confirm": function () {
                            run_process(forminputs);
                        }
                    }
                });
                return false;
            }

            $(".automation_left_panel").on('click', '.droplink', function (e) {
                var cache_ele = $(this);
                var sname = cache_ele.attr("data-name");
                if (sname == "patch_automation") {
                    console.log("patch_automation");
                    $state.go("patch");   
                } else {
                    $(".automation_left_panel .droplink").removeClass("active");
                    cache_ele.addClass("active");
                    $scope.category_list_filter = sname;
                    $scope.$apply();
                }
                return false;
            });


            // Get User List function
            $scope.shareserval = [];
            $scope.getservuserapi = function(val){
                $scope.shareserval = val;
                console.log($scope.shareserval); 
                $.ajax({
                    url: config.urls.getshareuserlist,
                    type: "GET",
                    dataType: "json",
                    async: false,
                    headers : {"sessionkey" : sessionStorage["session_id"]},
                    success: function (res) {
                        if (res.result == "success") {
                            $scope.suserlst = res.data;
                            console.log($scope.suserlst);
                        } else {
                            notie.alert(3, res, config.notify_delay);
                        }
                    },
                    cache: false
                });
                var surl = config.urls.deployprocess+customer_id+"/"+tenant_id+"/sharedwith/list/"+$scope.shareserval['process-id']
                $.ajax({
                    url: surl,
                    type: "GET",
                    dataType: "json",
                    async: false,
                    // headers : {"sessionkey" : sessionStorage["session_id"]},
                    success: function (res) {
                        if (res.status == "failure") {
                            notie.alert(3, res, config.notify_delay);
                        } else {
                            $scope.shareuser = res.response.users;
                            // console.log($scope.shareuser);
                            setTimeout(function(){ 
                                for (let i = 0; i < $scope.shareuser.length; i++) {
                                    for (let j = 0; j < $scope.suserlst.length; j++) {
                                        var uid = $scope.suserlst[j].user_id.split('@')[0]
                                        if($scope.shareuser[i] == uid){
                                            var id = "#"+uid
                                            $(id).attr('checked',true)
                                            break;
                                        }
                                    }
                                }  
                            }, 100);
                        }
                    },
                    cache: false
                });
                return false;
            }

            $("#btnformservshare").click(function(){
                var checkboxes = document.getElementsByName("userid");
                var checkval = [];
                for (let i = 0; i < checkboxes.length; i++) {
                    if(checkboxes[i].checked){
                        checkval.push(checkboxes[i].value)
                    }
                }
                console.log(checkval);
                var dataset ={
                    "imgUrl": $scope.shareserval.logo,
                    "processName": $scope.shareserval["process-name"],
                    "description": $scope.shareserval.description,
                    "category": $scope.shareserval.category,
                    "users" : checkval
                }
                console.log(dataset);
                var surl = config.urls.deployprocess+"share/"+customer_id+"/"+tenant_id+"/"+$scope.shareserval['process-id']
                $.ajax({
                    url: surl,
                    type: "POST",
                    dataType: "json",
                    async: false,
                    // data : JSON.stringify(dataset),
                    data : JSON.stringify(dataset),
                    contentType: "application/json",
                    // headers : {"sessionkey" : sessionStorage["session_id"]},
                    success: function (res) {
                        if (res.status == "failure") {
                            notie.alert(3, res.status, config.notify_delay);
                            console.log(res);
                        } else {
                            console.log(res);
                            notie.alert(1, res.status, config.notify_delay);
                            $('#shared_user_modal').modal('toggle')
                        }
                    },
                    cache: false
                });
                return false;
            
            })

        }


        $scope.init = function () {
            // init_event();
            load_deployment_category(0);
            $scope.load_deployment_list();
            //$('[data-toggle="tooltip"]').tooltip();
                  
        }

        $scope.filterDeployment = function (process_row) {
            var bcategoryfilter = true;
            if ($scope.category_list_filter != "all") {
                if ($scope.category_list_filter != process_row['category']) {
                    bcategoryfilter = false;
                }
            }
            //console.log(process_row['description']);
            if ($scope.searchKeywords) {
                var sname = process_row['process-name'] || "";
                var sdesc = process_row['description'] || "";
                if ((sname.toLowerCase().indexOf($scope.searchKeywords.toLowerCase()) !== -1 ||
                        sdesc.toLowerCase().indexOf($scope.searchKeywords.toLowerCase()) !== -1) && bcategoryfilter) {
                    return process_row;
                }
            } else {
                if (bcategoryfilter) {
                    return process_row;
                }
            }
        }

        $scope.instancepageselect = function (page) {
            var end, start;
            start = (page - 1) * $scope.instancenumPerPage;
            end = start + $scope.instancenumPerPage;
            return $scope.currentInstancePageHistory = $scope.instance_list.slice(start, end);
        }

        $scope.$watch(function () {
            $scope.filter_deployment_list = $scope.$eval("deployment_list | filter:filterDeployment");
            // console.log($scope.filter_deployment_list);
        }); 

        $scope.deployment_finish_render = function () {
            $('[data-toggle="tooltip"]').tooltip();
        };
        
        $rootScope.$on('AutomationTabChange', function (event, args) {
            if (args["tabname"] == "Catalog") {
                // if (!bpageloaded) {
                    // bpageloaded = true;
                    init_event();
                    // load_deployment_category(0);
                    // $scope.load_deployment_list();
                    // $scope.clrclass = "activeclr";
                // }
            }
        });

    }
])