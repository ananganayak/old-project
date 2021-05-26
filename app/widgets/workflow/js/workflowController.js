angular.module('widgets').controller('workflowController', [
    '$scope',
    '$rootScope',
    'intelliWorkflowService',
    function ($scope, $rootScope, $intelliWorkflowService) {
        'use strict';
        $scope.workflow_list = [];
        $scope.currentWorkflowPageHistory = [];
        var currentroworkflowdata = [];
        $scope.workflowcurrentPage = 1;
        $scope.workflownumPerPage = 10;
        $scope.filter_workflow_list = [];
        $scope.totalPages = 1;

        $scope.task_list = [];


        var form_type = "";
        var formBuilder;
        var formaction = "";
        var form_content = "";

        var stempprocessname = "";

        var selprocessname = "";
        var selprojectname = "";

        var bpageloaded = false;

        var cache_logo_menu;

        var customer_id = "autointelli";
        var tenant_id = "internal";

        var form_meta_data;

        var lastsel;

        function load_category_data() {
            var surl = config.urls.automationsharecatelog + customer_id +"/"+ tenant_id + "/categories/__all__";
            console.log(surl);
            $rootScope.showSpinner = true;
            $.ajax({
                url: surl,
                type: "GET",
                async: true,
                success: function (res) {
                    $rootScope.showSpinner = false;
                    $scope.catlist = res.response.categories;
                    console.log($scope.catlist);
                },
                error: function (data) {
                    console.log(data);
                },
                cache: false
            });
        }

        $scope.calculateTotalPages = function () {
            var totalPages = $scope.usernumPerPage < 1 ? 1 : Math.ceil($scope.filter_workflow_list.length / $scope.workflownumPerPage);
            return Math.max(totalPages || 0, 1);
        };
        $scope.noPrevious = function () {
            return $scope.workflowcurrentPage === 1;
        };
        $scope.noNext = function () {
            return $scope.workflowcurrentPage === $scope.totalPages;
        };
        $scope.filterWorkflow = function (workflow_row) {
            return workflow_row;
        }

        $scope.workflowpageselect = function (page) {
            var end, start;
            start = (page - 1) * $scope.workflownumPerPage;
            end = start + $scope.workflownumPerPage;
            var sendtext = end;
            if (end > $scope.filter_workflow_list.length) {
                sendtext = $scope.filter_workflow_list.length;
            }
            $scope.span_page_status = (start + 1) + " - " + parseInt(sendtext);
            $scope.span_total_count = $scope.filter_workflow_list.length;
            
            return $scope.currentWorkflowPageHistory = $scope.filter_workflow_list.slice(start, end);
        }

        $scope.selectPage = function (page) {
            if ($scope.workflowcurrentPage !== page && page > 0 && page <= $scope.totalPages) {
                $scope.workflowcurrentPage = page;
                $scope.$apply();
            }
        };

        $scope.$watch(function () {
            $scope.filter_workflow_list = $scope.$eval("workflow_list | filter:filterWorkflow");
            $scope.totalPages = $scope.calculateTotalPages();
            $scope.workflowpageselect($scope.workflowcurrentPage);
        });

        $scope.generate_edit_link = function (row) {
            var repo_name = customer_id + "_" + tenant_id;
            var sprocess_name = sessionStorage["username"] + "_" + row.process_name;
            var sjpbmdesigner = config.urls.jpbmdesigner + repo_name + "/" + row.project_name + "/src/main/resources/" + sprocess_name + ".bpmn2";
            return sjpbmdesigner;
        }

        $scope.generate_formedit_link = function (row) {
            var sformeditlink = config.urls.editform + customer_id + "/" + tenant_id + "/process/" + row.processid;
            if (row.taskid) {
                sformeditlink = config.urls.editform + customer_id + "/" + tenant_id + "/task/edit/" + row.processid + "/" + row.taskid;
            }
            return sformeditlink;
        }

        $scope.generate_formdelete_link = function (row) {
            var sformeditlink = config.urls.editform + customer_id + "/" + tenant_id + "/process/" + row.processid;
            if (row.taskid) {
                sformeditlink = config.urls.editform + customer_id + "/" + tenant_id + "/task/" + row.processid + "/" + row.taskid;
            }
            return sformeditlink;
        }

        function init_form_designer(inputobj, outputobj, bshowform) {
            $("#build-wrap").empty();
            var inputvar = {
                label: 'Input Variable',
                options: inputobj

            };
            var outputvar = {};
            if (form_type == "task") {
                outputvar = {
                    label: 'Output Variable',
                    // label: 'Input Variable',
                    options: outputobj

                };
            } else {
                outputvar = {
                    label: 'Output Variable'
                };
            }
            var fbTemplate = document.getElementById('build-wrap');
            var options = {
                disableFields: ['autocomplete', 'button', 'file', 'paragraph'],
                disabledAttrs: ['access'],
                controlOrder: ['header', 'text', 'number', 'date', 'textarea', 'select', 'checkbox-group', 'radio-group'],
                disabledActionButtons: ['clear', 'data', 'save'],
                typeUserAttrs: {
                    "checkbox-group": {
                        selectOption: {
                            label: 'Select Option',
                            options: {
                              ' ': '-- select --',
                              'input': 'Input',
                              'output': 'Output',
                            }
                        },
                        input_variable: inputvar,
                        output_variable: outputvar
                    },
                    "date": {
                        selectOption: {
                            label: 'Select Option',
                            options: {
                              ' ': '-- select --',
                              'input': 'Input',
                              'output': 'Output',
                            }
                        },
                        input_variable: inputvar,
                        output_variable: outputvar
                    },
                    "header": {
                        selectOption: {
                            label: 'Select Option',
                            options: {
                              ' ': '-- select --',
                              'input': 'Input',
                              'output': 'Output',
                            }
                        },
                        input_variable: inputvar,
                        output_variable: outputvar
                    },
                    "number": {
                        selectOption: {
                            label: 'Select Option',
                            options: {
                              ' ': '-- select --',
                              'input': 'Input',
                              'output': 'Output',
                            }
                        },
                        input_variable: inputvar,
                        output_variable: outputvar
                    },
                    "radio-group": {
                        selectOption: {
                            label: 'Select Option',
                            options: {
                              ' ': '-- select --',
                              'input': 'Input',
                              'output': 'Output',
                            }
                        },
                        input_variable: inputvar,
                        output_variable: outputvar
                    },
                    "select": {
                        selectOption: {
                            label: 'Select Option',
                            options: {
                              ' ': '-- select --',
                              'input': 'Input',
                              'output': 'Output',
                            }
                        },
                        input_variable: inputvar,
                        output_variable: outputvar,
                    },
                    "text": {
                        selectOption: {
                            label: 'Select Option',
                            options: {
                              ' ': '-- select --',
                              'input': 'Input',
                              'output': 'Output',
                            }
                        },
                        input_variable: inputvar,
                        output_variable: outputvar
                    },
                    "textarea": {
                        selectOption: {
                            label: 'Select Option',
                            options: {
                              ' ': '-- select --',
                              'input': 'Input',
                              'output': 'Output',
                            }
                        },
                        input_variable: inputvar,
                        output_variable: outputvar
                    }
                }, 
                typeUserEvents : {
                    "select" : {
                        onadd : function(fld){
                            var input = $('input_variable-wrap', fld);
                            var output = $('output_variable-wrap', fld);
                            $('#'+input.context.id + ' .'+input.selector).hide();
                            $('#'+output.context.id + ' .'+output.selector).hide();
                            fld.querySelector(".fld-selectOption").onchange = function(e){
                                if(e.target.value === 'input'){
                                    $('#'+input.context.id + ' .'+input.selector).show();
                                    $('#'+output.context.id + ' .'+output.selector).hide();
                                }else if(e.target.value === 'output'){
                                    $('#'+input.context.id + ' .'+input.selector).hide();
                                    $('#'+output.context.id + ' .'+output.selector).show();
                                }else{
                                    $('#'+input.context.id + ' .'+input.selector).hide();
                                    $('#'+output.context.id + ' .'+output.selector).hide();
                                }
                            }
                        }
                    },
                    "checkbox-group" : {
                        onadd : function(fld){
                            var input = $('input_variable-wrap', fld);
                            var output = $('output_variable-wrap', fld);
                            $('#'+input.context.id + ' .'+input.selector).hide();
                            $('#'+output.context.id + ' .'+output.selector).hide();
                            fld.querySelector(".fld-selectOption").onchange = function(e){
                                if(e.target.value === 'input'){
                                    $('#'+input.context.id + ' .'+input.selector).show();
                                    $('#'+output.context.id + ' .'+output.selector).hide();
                                }else if(e.target.value === 'output'){
                                    $('#'+input.context.id + ' .'+input.selector).hide();
                                    $('#'+output.context.id + ' .'+output.selector).show();
                                }else{
                                    $('#'+input.context.id + ' .'+input.selector).hide();
                                    $('#'+output.context.id + ' .'+output.selector).hide();
                                }
                            }
                        }
                    },
                    "date" : {
                        onadd : function(fld){
                            var input = $('input_variable-wrap', fld);
                            var output = $('output_variable-wrap', fld);
                            $('#'+input.context.id + ' .'+input.selector).hide();
                            $('#'+output.context.id + ' .'+output.selector).hide();
                            fld.querySelector(".fld-selectOption").onchange = function(e){
                                if(e.target.value === 'input'){
                                    $('#'+input.context.id + ' .'+input.selector).show();
                                    $('#'+output.context.id + ' .'+output.selector).hide();
                                }else if(e.target.value === 'output'){
                                    $('#'+input.context.id + ' .'+input.selector).hide();
                                    $('#'+output.context.id + ' .'+output.selector).show();
                                }else{
                                    $('#'+input.context.id + ' .'+input.selector).hide();
                                    $('#'+output.context.id + ' .'+output.selector).hide();
                                }
                            }
                        }
                    },
                    "header" : {
                        onadd : function(fld){
                            var input = $('input_variable-wrap', fld);
                            var output = $('output_variable-wrap', fld);
                            $('#'+input.context.id + ' .'+input.selector).hide();
                            $('#'+output.context.id + ' .'+output.selector).hide();
                            fld.querySelector(".fld-selectOption").onchange = function(e){
                                if(e.target.value === 'input'){
                                    $('#'+input.context.id + ' .'+input.selector).show();
                                    $('#'+output.context.id + ' .'+output.selector).hide();
                                }else if(e.target.value === 'output'){
                                    $('#'+input.context.id + ' .'+input.selector).hide();
                                    $('#'+output.context.id + ' .'+output.selector).show();
                                }else{
                                    $('#'+input.context.id + ' .'+input.selector).hide();
                                    $('#'+output.context.id + ' .'+output.selector).hide();
                                }
                            }
                        }
                    },
                    "number" : {
                        onadd : function(fld){
                            var input = $('input_variable-wrap', fld);
                            var output = $('output_variable-wrap', fld);
                            $('#'+input.context.id + ' .'+input.selector).hide();
                            $('#'+output.context.id + ' .'+output.selector).hide();
                            fld.querySelector(".fld-selectOption").onchange = function(e){
                                if(e.target.value === 'input'){
                                    $('#'+input.context.id + ' .'+input.selector).show();
                                    $('#'+output.context.id + ' .'+output.selector).hide();
                                }else if(e.target.value === 'output'){
                                    $('#'+input.context.id + ' .'+input.selector).hide();
                                    $('#'+output.context.id + ' .'+output.selector).show();
                                }else{
                                    $('#'+input.context.id + ' .'+input.selector).hide();
                                    $('#'+output.context.id + ' .'+output.selector).hide();
                                }
                            }
                        }
                    },
                    "radio-group" : {
                        onadd : function(fld){
                            var input = $('input_variable-wrap', fld);
                            var output = $('output_variable-wrap', fld);
                            $('#'+input.context.id + ' .'+input.selector).hide();
                            $('#'+output.context.id + ' .'+output.selector).hide();
                            fld.querySelector(".fld-selectOption").onchange = function(e){
                                if(e.target.value === 'input'){
                                    $('#'+input.context.id + ' .'+input.selector).show();
                                    $('#'+output.context.id + ' .'+output.selector).hide();
                                }else if(e.target.value === 'output'){
                                    $('#'+input.context.id + ' .'+input.selector).hide();
                                    $('#'+output.context.id + ' .'+output.selector).show();
                                }else{
                                    $('#'+input.context.id + ' .'+input.selector).hide();
                                    $('#'+output.context.id + ' .'+output.selector).hide();
                                }
                            }
                        }
                    },
                    "text" : {
                        onadd : function(fld){
                            var input = $('input_variable-wrap', fld);
                            var output = $('output_variable-wrap', fld);
                            $('#'+input.context.id + ' .'+input.selector).hide();
                            $('#'+output.context.id + ' .'+output.selector).hide();
                            fld.querySelector(".fld-selectOption").onchange = function(e){
                                if(e.target.value === 'input'){
                                    $('#'+input.context.id + ' .'+input.selector).show();
                                    $('#'+output.context.id + ' .'+output.selector).hide();
                                }else if(e.target.value === 'output'){
                                    $('#'+input.context.id + ' .'+input.selector).hide();
                                    $('#'+output.context.id + ' .'+output.selector).show();
                                }else{
                                    $('#'+input.context.id + ' .'+input.selector).hide();
                                    $('#'+output.context.id + ' .'+output.selector).hide();
                                }
                            }
                        }
                    },
                    "textarea" : {
                        onadd : function(fld){
                            var input = $('input_variable-wrap', fld);
                            var output = $('output_variable-wrap', fld);
                            $('#'+input.context.id + ' .'+input.selector).hide();
                            $('#'+output.context.id + ' .'+output.selector).hide();
                            fld.querySelector(".fld-selectOption").onchange = function(e){
                                if(e.target.value === 'input'){
                                    $('#'+input.context.id + ' .'+input.selector).show();
                                    $('#'+output.context.id + ' .'+output.selector).hide();
                                }else if(e.target.value === 'output'){
                                    $('#'+input.context.id + ' .'+input.selector).hide();
                                    $('#'+output.context.id + ' .'+output.selector).show();
                                }else{
                                    $('#'+input.context.id + ' .'+input.selector).hide();
                                    $('#'+output.context.id + ' .'+output.selector).hide();
                                }
                            }
                        }
                    }
                }
            };
            // $('#build-wrap .fld-input_variable').hide();
            // $('#build-wrap .fld-output_variable').hide();
            formBuilder = $(fbTemplate).formBuilder(options);
            //debugger;
            if (formaction == "") {
                formBuilder.promise.then(function (fb) {
                    fb.actions.setData(form_content);
                });
            }
            if (bshowform) {
                $("#workflow_list_container").removeClass().addClass("animated fadeOutLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function (e) {
                    $(this).removeClass().hide();
                    $("#form_designer_container").removeClass().addClass("animated fadeInLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function (ee) {
                        $(this).removeClass();
                        $(this).off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
                        console.log("designer inside");
                    }).show();
                    $(this).off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
                    console.log("open_formdesigner end");
                });
            }
        }
        
        function open_formdesigner(sprocess_id) {
            var surl = config.urls.formmetadata + customer_id + "/" + tenant_id + "/variables/" + sprocess_id;
            console.log(surl);
            $rootScope.showSpinner = true;
            $scope.$apply();
            $.ajax({
                url: surl,
                type: "GET",
                async: true,
                success: function (res) {
                    $rootScope.showSpinner = false;
                    $rootScope.$apply();
                    console.log(res);
                    if (res.status == "success") {
                        var result = res.response;
                        form_meta_data = result;
                        var proc_obj = {};
                        var task_inobj = {};
                        var task_outobj = {};
                        var main_task = [];

                        for (var key in result.ProcessVariables) {
                            proc_obj[key] = key;
                        }
                        if (Object.keys(proc_obj).length > 0) {
                            if (form_type == "process") {
                                init_form_designer(proc_obj, {}, true);
                            } else {
                                var temp_arr = [];
                                $(result.ProcessTasks).each(function (inx, ele) {
                                    //console.log(ele);
                                    temp_arr.push(ele["task-name"]);
                                });
                                if(currentroworkflowdata.length > 0 && currentroworkflowdata.length != temp_arr.length){
                                    for (let i = 0; i < currentroworkflowdata.length; i++) {
                                        for (let j = 0; j < temp_arr.length; j++) {
                                            if(currentroworkflowdata[i].taskid != temp_arr[j]){
                                                main_task.push(temp_arr[j]);
                                            }
                                        }
                                    }
                                }else if(currentroworkflowdata.length == temp_arr.length){
                                    notie.alert(3, "No Task variable available in the workflow designer!", config.notify_delay);
                                }else{
                                    for (let j = 0 ; j < temp_arr.length; j++) {
                                        main_task.push(temp_arr[j]);
                                    }
                                    // main_task.push(temp_arr);
                                }
                                // for (let i = 0; i < currentroworkflowdata.length; i++) {
                                //     for (let j = 0; j < temp_arr.length; j++) {
                                //         if(currentroworkflowdata[i].taskid != temp_arr[j]){
                                //             main_task.push(temp_arr[j]);
                                //         }
                                //     }
                                // }
                                console.log(main_task);
                                if (main_task.length > 0) {
                                    for (let i = 0; i < result.ProcessTasks.length; i++) {
                                        if(main_task[0] == result.ProcessTasks[i]["task-name"]){
                                            for (var keys in result.ProcessTasks[i]["task-outputs-variables"]) {
                                                task_inobj[keys] = keys;
                                            }
                                            for (var keys in result.ProcessTasks[i]["task-input-variables"]) {
                                                task_outobj[keys] = keys;
                                            }
                                        }
                                    }
                                    console.log(task_outobj, task_inobj)
                                }
                                if (Object.keys(main_task).length > 0) {
                                    $scope.task_list = main_task;
                                    $scope.$apply();
                                    // init_form_designer(proc_obj, task_obj, true);
                                    init_form_designer(task_inobj, task_outobj, true);
                                }else{
                                    notie.alert(3, "No Task available in the workflow!", config.notify_delay);
                                }
                            }
                        } else {
                            notie.alert(3, "No workflow variable found in the designer!", config.notify_delay);
                        }

                    } else {
                        notie.alert(3, "No workflow variable found in the designer!", config.notify_delay);
                    }
                },
                error: function (data) {
                    console.log(data);
                },
                cache: false
            });
        }

        function clear_formdesigner() {
            formaction = "";
            $("#form_designer_container .form_error").removeClass("form_error");
            $("#txtprocessid").val("");
            $("#txtprocessversion").val("");
            //formBuilder.actions.clearFields();
        }

        function validate_form() {
            $("#form_designer_container .form_error").removeClass("form_error");
            var berror = true;
            if (!$("#txtprocessid").val()) {
                $("#txtprocessid").addClass("form_error");
                berror = false;
            }
            if (form_type == "task" && !$("#seltaskid").val()) {
                $("#seltaskid").addClass("form_error");
                berror = false;
            }
            return berror;
        }




        function init_event() {


            $(".slimscroll").slimScroll();

            var imodelcontentheight = $(window).height() - ($("#tab_workflow .modal-header").outerHeight() + $("#tab_workflow .modal-footer").outerHeight());
            $("#tab_workflow .modal-body").css({"height": imodelcontentheight + "px", "overflow-y": "auto"});

            var iheight = $(window).height() - 75;
            $("#iframeworkflowdesigner").css({"height": iheight + "px"});

            $("#workflow_list_container .pagination_dropdown a").click(function () {
                var selnum = $(this).text();
                $("#workflow_list_container .span_pagination_text").text(selnum);
                $scope.workflowcurrentPage = 1;
                $scope.workflownumPerPage = parseInt(selnum);
                $scope.$apply();
            });

            $.validator.addMethod("regex", function (value, element, regexp) {
                var re = new RegExp(regexp);
                return this.optional(element) || re.test(value);
            }, "Please Provide valid details");


            $('#formworkflow').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    txtprocessname: {required: true, minlength: 3, regex: /^\S*$/},
                    selprocesscatagory: {required: true},
                    txtprocesscatagory: {required: true},
                    txtmanualeffort: {required: true},
                    txtcosthour: {required: true}
                },
                messages: {
                    txtprocessname: {
                        required: 'Please enter the process name',
                        minlength: 'Please enter valid process name',
                        regex: 'Please enter the process name without space'
                    },
                    selprocesscatagory: {
                        required: 'Please Select the Category name',
                    },
                    txtprocesscatagory: {
                        required: 'Please Enter the new Category name',
                    },
                    txtmanualeffort: {
                        required: 'Please Enter the Manual Effort',
                    },
                    txtcosthour: {
                        required: 'Please Enter the Cost/Hour',
                    }
                },
                highlight: function (element) {
                    $(element).closest('input').addClass("error");
                    $(element).closest('select').addClass("error");
                },
                unhighlight: function (element) {
                    $(element).closest('input').removeClass("error");
                    $(element).closest('select').removeClass("error");
                },
                errorPlacement: function (error, element) {
                    $(element).closest('div').append(error);
                }
            });

            $(".tbl_workflow_list").on("click", ".icon_arrow", function (e) {
                e.stopImmediatePropagation();
                var cache_ele = $(this);
                var cache_tr_panel = cache_ele.closest("tr").next();
                if (cache_ele.find("i").hasClass("fa-chevron-right")) {
                    cache_ele.find("i").removeClass("fa-chevron-right");
                    cache_ele.find("i").addClass("fa-chevron-down");
                    cache_tr_panel.fadeIn('slow');
                } else {
                    cache_ele.find("i").removeClass("fa-chevron-down");
                    cache_ele.find("i").addClass("fa-chevron-right");
                    cache_tr_panel.fadeOut('slow');
                }
                return false;
            });

            $(".tbl_workflow_list").on('click', '.workflow_edit_link', function (e) {
                var proc_name = $(this).attr("data-name");
                var surl = $(this).attr("data-link");
                $(".span_project_name").text(proc_name);
                stempprocessname = proc_name;
                $("#iframeworkflowdesigner").attr("src", surl);
                $("#workflow_list_container").removeClass().addClass("animated fadeOutLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $(this).removeClass().hide();
                    $("#workflow_designer_container").removeClass().addClass("animated fadeInLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $(this).removeClass();
                        $(this).off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
                    }).show();
                    $(this).off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
                });
                return false;
            });

            $(".tbl_workflow_list").on('click', '.workflow_delete_link', function (e) {
                var cache_ele = $(this);
                var processname = cache_ele.attr("data-name");
                $.confirm({
                    title: 'Delete Workflow',
                    type: 'blue',
                    backgroundDismiss: true,
                    content: 'Do you want to delete this workflow ?',
                    buttons: {
                        "Cancel": function () {
                        },
                        "Confirm": function () {
                            $rootScope.showSpinner = true;
                            $scope.$apply();
                            var surl = config.urls.deployprocess + customer_id + "/" + tenant_id + "/delete/" + processname +"/"+sessionStorage["username"];
                            $.ajax({
                                url: surl,
                                type: "POST",
                                async: true,
                                success: function (res) {
                                    $rootScope.showSpinner = false;
                                    $scope.$apply();
                                    notie.alert(1, res.response, config.notify_delay);
                                    if (res.status == "success") {
                                        for (var i = 0; i < $scope.workflow_list.length; i++) {
                                            if ($scope.workflow_list[i].process_name == processname) {
                                                $scope.workflow_list.splice(i, 1);
                                                $scope.$apply();
                                                break;
                                            }
                                        }
                                    }
                                },
                                error: function (data) {
                                    console.log(data);
                                },
                                cache: false
                            });
                        }
                    }
                });
                return false;
            });

            $(".tbl_workflow_list").on('click', '.create_process_form', function (e) {
                var cache_ele = $(this).closest("td");
                selprocessname = cache_ele.attr("data-procname");
                selprojectname = cache_ele.attr("data-projname");
                var cprocessid = cache_ele.attr("data-formname");
                $scope.processfunction = "true";
                // var sprocess_id = selprojectname + "." + sessionStorage["username"] + "_" +selprocessname;
                for (var i = 0; i < $scope.currentWorkflowPageHistory.length; i++) {
                    if($scope.currentWorkflowPageHistory[i].process_name == selprocessname){
                        for (var j = 0; j < $scope.currentWorkflowPageHistory[i].forms.length; j++) {
                            if($scope.currentWorkflowPageHistory[i].forms[j].formType == "process"){
                                $scope.processfunction = "false";
                            }
                        }
                        
                    }
                }
                form_type = "process";
                if($scope.processfunction == "false"){
                    notie.alert(3, "Process Form Already Created", config.notify_delay);
                }else{
                    $(".task_field").hide();
                    clear_formdesigner();
                    // $("#txtprocessid").val(sprocess_id);
                    $("#txtprocessid").val(cprocessid);
                    formaction = "new";
                    open_formdesigner(cprocessid);
                }
                
            });
            

            $(".tbl_workflow_list").on('click', '.create_task_form', function (e) {
                var cache_ele = $(this).closest("td");
                selprocessname = cache_ele.attr("data-procname");
                selprojectname = cache_ele.attr("data-projname");
                var cprocessid = cache_ele.attr("data-formname");
                currentroworkflowdata = [];
                for (var i = 0; i < $scope.currentWorkflowPageHistory.length; i++) {
                    if($scope.currentWorkflowPageHistory[i].process_name == selprocessname){
                        for (var j = 0; j < $scope.currentWorkflowPageHistory[i].forms.length; j++) {
                            if($scope.currentWorkflowPageHistory[i].forms[j].formType == "task"){
                                currentroworkflowdata.push($scope.currentWorkflowPageHistory[i].forms[j]);
                            }
                        }
                        
                    }
                }

                // var sprocess_id = selprojectname + "." + selprocessname;

                form_type = "task";

                $(".task_field").show();
                clear_formdesigner();
                $("#txtprocessid").val(cprocessid);
                formaction = "new";
                open_formdesigner(cprocessid);
            });

            $("#btndesignerback").click(function () {
                console.log("btndesignerback");
                $("#form_designer_container").removeClass().addClass("animated fadeOutLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $(this).removeClass().hide();
                    $("#workflow_list_container").removeClass().addClass("animated fadeInLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $(this).removeClass();
                    }).show();
                });
                return false;
            });

            $("#btnformsave").click(function () {
                console.log(formaction);
                if (validate_form()) {
                    var sformdesigner = formBuilder.actions.getData();
                    for (var i = 0; i < sformdesigner.length; i++) {
                        if (!sformdesigner[i].input_variable) {
                            sformdesigner[i].input_variable = "";
                        }
                        if (!sformdesigner[i].output_variable) {
                            sformdesigner[i].output_variable = "";
                        }
                    }
                    var data_arr = {
                        formType: form_type,
                        processid: $("#txtprocessid").val(),
                        formcontent: JSON.stringify(sformdesigner)
                    };
                    if (form_type == "task") {
                        data_arr["taskid"] = $("#seltaskid").val();
                    }
                    var surl = config.urls.storeform + customer_id + "/" + tenant_id + "/store";
                    $rootScope.showSpinner = true;
                    $scope.$apply();
                    $.ajax({
                        url: surl,
                        type: "POST",
                        async: true,
                        data: JSON.stringify(data_arr),
                        beforeSend: function (request) {
                            request.setRequestHeader("Content-Type", "application/json");
                        },
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        success: function (res) {
                            $rootScope.showSpinner = false;

                            if (formaction == "new") {
                                for (var i = 0; i < $scope.workflow_list.length; i++) {
                                    if ($scope.workflow_list[i].project_name == selprojectname && $scope.workflow_list[i].process_name == selprocessname) {
                                        //console.log("workflow_list");
                                        var temp_arr = {
                                            formType: form_type,
                                            processid: $("#txtprocessid").val(),
                                            taskid: $("#seltaskid").val()
                                        };
                                        $scope.workflow_list[i].forms.push(temp_arr);
                                    }
                                }
                            }
                            $scope.$apply();
                            $("#btndesignerback").trigger("click");
                            notie.alert(1, "Form saved successfully", config.notify_delay);
                        },
                        error: function (data) {
                            $rootScope.showSpinner = false;
                            console.log(data);
                        },
                        cache: false
                    });
                }
                return false;
            });


            
            $('#build-wrap').on('select', '.fld-selectOption', function(){
                console.log("hi")
                console.log($(this).val());
                var cache_ele =  $(this).closest('.form-group').next().find('.fld-input_variable')[0].id;   
                    console.log(cache_ele);  
                if($(this).val() == 'input'){
                    var cache_ele =  $(this).closest('.form-group').next().find('.fld-input_variable')[0].id;   
                    console.log(cache_ele);     
                    var outPutVariableID = document.getElementById(cache_ele);
                    outPutVariableID.show();
                }else if($(this).val() == 'output'){
                    var cache_ele =  $(this).closest('.form-group').next().next().find('.fld-output_variable')[0].id; 
                    console.log(cache_ele);         
                    var outPutVariableID = document.getElementById(cache_ele);
                    outPutVariableID.show();
                }else{
                    $('.fld-input_variable, .fld-output_variable').hide();
                }
            })

            // $('#build-wrap').on('click', '.fld-input_variable', function(){
            //     if($(this).val() != ''){
            //         var cache_ele =  $(this).closest('.form-group').next().find('.fld-output_variable')[0].id; 
            //         // console.log(cache_ele);         
            //         var outPutVariableID = document.getElementById(cache_ele);
            //         outPutVariableID.setAttribute('disabled','disabled');
            //         outPutVariableID.setAttribute('placeholder','Output variable disabled');
            //     }else{
            //         var cache_ele =  $(this).closest('.form-group').next().find('.fld-output_variable')[0].id;       
            //         var outPutVariableID = document.getElementById(cache_ele);
            //         outPutVariableID.removeAttribute('disabled');
            //         outPutVariableID.setAttribute('placeholder','');
            //     }   
            // });

            // $('#build-wrap').on('click', '.fld-output_variable', function(){
            //     if($(this).val() != ''){
            //         var cache_ele =  $(this).closest('.form-group').prev().find('.fld-input_variable')[0].id;       
            //         var outPutVariableID = document.getElementById(cache_ele);
            //         outPutVariableID.setAttribute('disabled','disabled');
            //         outPutVariableID.setAttribute('placeholder','Input variable disabled');
            //     }else{
            //         var cache_ele =  $(this).closest('.form-group').prev().find('.fld-input_variable')[0].id; 
            //         console.log(cache_ele);    
            //         var outPutVariableID = document.getElementById(cache_ele);
            //         outPutVariableID.removeAttribute('disabled');
            //         outPutVariableID.setAttribute('placeholder','');
            //     }
            // });

            $(".tbl_workflow_list").on('click', '.form_edit', function (e) {
                var surl = $(this).attr("data-link");
                $.get(surl, function (res) {
                    var data_arr = res.response;
                    console.log(data_arr);
                    formaction = "";
                    $("#form_designer_container .form_error").removeClass("form_error");
                    $("#txtprocessid").val(data_arr.processid);
                    $("#txtprocessversion").val(data_arr.processversion);
                    form_content = data_arr.formcontent;
                    form_type = data_arr.formType;
                    if (data_arr.formType == "process") {
                        $(".task_field").hide();
                    } else {
                        $("#seltaskid").val(data_arr.taskid);
                        $(".task_field").show();
                    }
                    open_formdesigner(data_arr.processid);
                });
                return false;
            });

            $(".tbl_workflow_list").on('click', '.form_delete', function (e) {
                var cache_ele = $(this);
                var surl = cache_ele.attr("data-link");
                var spid = cache_ele.attr("data-pid");
                var stid = cache_ele.attr("data-tid");
                var sftype = cache_ele.attr("data-ftype");
                $.confirm({
                    title: 'Delete Form',
                    type: 'blue',
                    backgroundDismiss: true,
                    content: 'Do you want to delete this form ?',
                    buttons: {
                        "Cancel": function () {},
                        "Confirm": function () {
                            $rootScope.showSpinner = true;
                            $scope.$apply();
                            $.ajax({
                                url: surl,
                                type: "DELETE",
                                async: true,
                                success: function (res) {
                                    $rootScope.showSpinner = false;
                                    $scope.$apply();
                                    notie.alert(1, res.response, config.notify_delay);
                                    if (res.status == "success") {
                                        for (var i = 0; i < $scope.workflow_list.length; i++) {
                                            var form_arr = $scope.workflow_list[i].forms;
                                            for (var j = 0; j < form_arr.length; j++) {
                                                var staskid = form_arr[j].taskid;
                                                if (staskid == undefined) {
                                                    staskid = "";
                                                }
                                                if (form_arr[j].processid == spid && staskid == stid && form_arr[j].formType == sftype) {
                                                    $scope.workflow_list[i].forms.splice(j, 1);
                                                    $scope.$apply();
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                },
                                error: function (data) {
                                    console.log(data);
                                },
                                cache: false
                            });
                        }
                    }
                });
                return false;
            });

            $(".workflow_full_screen").click(function () {
                $(".workflow_full_screen").hide();
                $(".workflow_exit_screen").show();
                $('.workflowController').addClass("workflow_fullscreen");
                return false;
            });

            $(".workflow_exit_screen").click(function () {
                $(".workflow_exit_screen").hide();
                $(".workflow_full_screen").show();
                $('.workflowController').removeClass("workflow_fullscreen");
                return false;
            });


            $(".image-add-btn").show();
            $(".image-remove-btn").hide();
            $(".showicon").hide();

            $('.image-add-btn').click(function () {
                $(".img-modal-lg").modal('toggle');
                return false;
            });

            $('.image-remove-btn').click(function () {
                $scope.sleiconval = "";
                $(".image-add-btn").show();
                $(".image-remove-btn").hide();
                $(".showicon").hide();
            });

            $("#seltaskid").click(function () {
                lastsel = $("#seltaskid option:selected");
            });

            $("#seltaskid").change(function () {
                var selval = $(this).val();
                var _open_form_designer = function () {
                    var proc_obj = {};
                    var task_inobj = {};
                    var task_outobj = {};
                    if (form_type == "process") {
                        for (var key in form_meta_data.ProcessVariables) {
                            proc_obj[key] = key;
                        }
                        init_form_designer(proc_obj, {}, true);
                    } else {
                        var task_obj = {};
                        $(form_meta_data.ProcessTasks).each(function (inx, ele) {
                            if (ele["task-name"] == selval) {
                                // for (var key in ele["task-variables"]) {
                                //     task_obj[key] = key;
                                // }
                                // for (var key in ele["task-variables"]) {
                                //     task_obj[key] = key;
                                // }
                                for (var keys in ele["task-outputs-variables"]) {
                                    task_inobj[keys] = keys;
                                }
                                for (var keys in ele["task-input-variables"]) {
                                    task_outobj[keys] = keys;
                                }
                            }
                        });
                        init_form_designer(task_inobj, task_outobj, true);
                    }                    
                };
                if (formBuilder.actions.getData().length == 0) {
                    _open_form_designer();
                } else {
                    console.log("element found!");
                    $.confirm({
                        title: 'Delete Form Elements',
                        type: 'blue',
                        backgroundDismiss: true,
                        content: 'Do you want to clear this form elements ?',
                        buttons: {
                            "Cancel": function () {
                                lastsel.prop("selected", true);
                            },
                            "Confirm": function () {
                                _open_form_designer();
                            }
                        }
                    });
                }
                return false; 
            }); 
            
        }

        $scope.create_workflow = function () {
            //load_catalog_logo();
            // alert("HI");
            $(".side-form-modal-lg").modal('toggle');
            $("label.error").css("display", "none");
            $("input, select").removeClass("form_error");
            // $(".side-form-modal-lg").modal('toggle');

            // return false;
        }

        function load_catalog_logo() {
            $.ajax({url: 'lib/config/automation_catalog.js'}).done(function (data) {
                $scope.imgsrc = JSON.parse(data);
            });
        }

        function load_workflow_list() {
            var workflow_arr = [];
            var surl = config.urls.listworkflow + customer_id + "/" + tenant_id + "/list/" + sessionStorage["username"];
            $rootScope.showSpinner = true;
            $scope.$apply();
            $.ajax({
                url: surl,
                type: "GET",
                async: true,
                success: function (res) {
                    $rootScope.showSpinner = false;
                    $rootScope.$apply();
                    console.log(res);
                    if (res.status == "success") {
                        var data_arr = res.response;
                        /*for (var key in data_arr) {
                            var proc_arr = data_arr[key];

                            var temp_str = proc_arr["processs"][0];
                            var proc_name = temp_str.split(".")[0];
                            var temp_arr = [];
                            temp_arr['organization'] = 'AutoIntelli';
                            temp_arr['department'] = 'Automation';
                            temp_arr['project_name'] = key;
                            temp_arr['process_name'] = proc_name;
                            temp_arr['forms'] = proc_arr["forms"];
                            workflow_arr.push(temp_arr);
                        }
                        //console.log(workflow_arr);
                        $scope.workflow_list = workflow_arr;*/
                        for (var key in data_arr) {
                            var proc_arr = data_arr[key];
                            var temp_arr = [];
                            temp_arr['organization'] = 'AutoIntelli';
                            temp_arr['department'] = 'Automation';
                            temp_arr['project_name'] = key;
                            temp_arr['process_name'] = proc_arr["processName"];
                            temp_arr['cprocess_id'] = proc_arr["processId"];
                            temp_arr['forms'] = proc_arr["forms"];
                            workflow_arr.push(temp_arr);
                        }
                        $scope.workflow_list = workflow_arr;
                    }
                    $scope.$apply();
                },
                error: function (data) {
                    console.log(data);
                },
                cache: false
            });
        }

        $scope.init = function () {
            //init_event();
            //load_workflow_list();
        }

        // icon select value function
        $scope.imgvalget = function (selval) {
            $scope.sleiconval = selval;
            $(".image-add-btn").hide();
            $(".image-remove-btn").show();
            $(".showicon").show();
            $("#btnimgmodalclose").trigger("click");
        }

        function exec_deploy_process(sversion) {
            var dataarr = {
                "version": sversion,
                "organization": "autointelli",
                "process": stempprocessname,
                "repository": "automation"
            };

            var surl = config.urls.deployprocess;
            $rootScope.showSpinner = true;
            $scope.$apply();
            $.ajax({
                url: surl,
                type: "POST",
                async: true,
                data: JSON.stringify(dataarr),
                beforeSend: function (request) {
                    request.setRequestHeader("Content-Type", "application/json");
                },
                //dataType: 'json',
                //contentType: 'application/json',
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (res) {
                    $rootScope.showSpinner = false;
                    $scope.$apply();
                    console.log(res);
                    if (res.status == "success") {
                        $scope.$emit("workflowSaveTrigger", {});
                        notie.alert(1, res.response["msg"], config.notify_delay);
                    } else {
                        notie.alert(3, res.response, config.notify_delay);
                    }
                },
                error: function (data) {
                    console.log(data);
                },
                cache: false
            });
            //}
        }


        $scope.workflow_process_deploy = function (prescname) {
            stempprocessname = prescname;
            // console.log(stempprocessname);
            $scope.deploy_process();
        }

        $scope.deploy_process = function () {
            /*var surl = config.urls.processversion + stempprocessname;
             $.ajax({
             url: surl,
             type: "GET",
             async: true,
             success: function (res) {
             if (res.status == "success") {
             var version = prompt("Current Deployed Version :", res.response);
             if (version) {
             exec_deploy_process(version);
             }
             } else {
             notie.alert(3, res.response, config.notify_delay);
             }
             },
             error: function (data) {
             console.log(data);
             },
             cache: false
             });*/
            console.log("deploy_process");
            var dataarr = {
                "process": stempprocessname
            };
            var surl = config.urls.deployprocess + customer_id + "/" + tenant_id + "/deploy/"+ sessionStorage["username"];
            $rootScope.showSpinner = true;
            $scope.$apply();
            $.ajax({
                url: surl,
                type: "POST",
                async: true,
                data: JSON.stringify(dataarr),
                beforeSend: function (request) {
                    request.setRequestHeader("Content-Type", "application/json");
                },
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (res) {
                    $rootScope.showSpinner = false;
                    $scope.$apply();
                    if (res.status == "success") {
                        $scope.$emit("workflowSaveTrigger", {});
                        notie.alert(1, res.response, config.notify_delay);
                    } else {
                        notie.alert(3, res.response, config.notify_delay);
                    }
                },
                error: function (data) {
                    console.log(data);
                },
                cache: false
            });
        }

        $scope.save_workflow = function () {
            if ($('#formworkflow').valid()) {
                //var sdep_name = $("#seldepartment").val();
                //var srepo_name = $("#txtprojectname").val();
                var srepo_name = customer_id + "_" + tenant_id;
                var sprocess_name = $("#txtprocessname").val();
                var sproject_name = "project_" + sprocess_name;
                stempprocessname = sprocess_name;
                $(".span_project_name").text(sprocess_name);
                var screateworkflowurl = config.urls.createworkflow + customer_id + "/" + tenant_id + "/" + sessionStorage["username"];
                var sjpbmdesigner = config.urls.jpbmdesigner + srepo_name + "/" + sproject_name.toLowerCase() + "/src/main/resources/" + sprocess_name + ".bpmn2";
                if($scope.selprocesscatagory == "New Category"){
                    var dataarr = {
                        //"organization": "autointelli",
                        //"repository": srepo_name,
                        "workflowId": sprocess_name,
                        "description": $("#txtprocesdesc").val(),
                        "tower": $("#txtprocesscatagory").val(),
                        "manual_effort": $("#txtmanualeffort").val(),
                        "cost_per_hour": $("#txtcosthour").val(),
                        // "imgurl": $("#selprocessicon").val()
                        "imgurl": $scope.sleiconval
                    };
                }else{
                    var dataarr = {
                        //"organization": "autointelli",
                        //"repository": srepo_name,
                        "workflowId": sprocess_name,
                        "description": $("#txtprocesdesc").val(),
                        "tower": $("#selprocesscatagory").val(),
                        // "imgurl": $("#selprocessicon").val()
                        "manual_effort": $("#txtmanualeffort").val(),
                        "cost_per_hour": $("#txtcosthour").val(),
                        "imgurl": $scope.sleiconval
                    };  
                }

                console.log(JSON.stringify(dataarr));
                //console.log(surl);
                $rootScope.showSpinner = true;
                $.ajax({
                    url: screateworkflowurl,
                    type: "POST",
                    data: JSON.stringify(dataarr),
                    async: true,
                    contentType: "application/json",
                    dataType: "json",
                    success: function (res) {
                        $rootScope.showSpinner = false;
                        $rootScope.$apply();
                        console.log(res);
                        if (res.status == "success") {
                            var temp_arr = [];
                            //temp_arr['organization'] = 'AutoIntelli';
                            //temp_arr['department'] = 'Automation';
                            temp_arr['project_name'] = sproject_name;
                            temp_arr['process_name'] = sprocess_name;
                            temp_arr['forms'] = [];
                            $scope.workflow_list.push(temp_arr);
                            $scope.$apply();
                            $("#btnworkflowclose").trigger("click");
                            notie.alert(1, res.response, config.notify_delay);
                            // $("#iframeworkflowdesigner").attr("src", sjpbmdesigner);
                            // $("#workflow_list_container").removeClass().addClass("animated fadeOutLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                            //     $(this).removeClass().hide();
                            //     $("#workflow_designer_container").removeClass().addClass("animated fadeInLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                            //         $(this).removeClass();
                            //         $(this).off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
                            //     }).show();
                            // });
                        } else {
                            notie.alert(3, res.response, config.notify_delay);
                        }
                    },
                    error: function (data) {
                        console.log(data);
                    },
                    cache: false
                });
            }
            return false;
        }

        $scope.back_workflow_list = function () {
            $("#workflow_designer_container").removeClass().addClass("animated fadeOutLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $(this).removeClass().hide();
                $("#workflow_list_container").removeClass().addClass("animated fadeInLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $(this).removeClass();
                }).show();
            });
            $(".workflow_exit_screen").hide();
            $(".workflow_full_screen").show();
            $('.workflowController').removeClass("workflow_fullscreen");
            return false;
        }
        
        $scope.workflow_finish_render = function () {
            $('[data-toggle="tooltip"]').tooltip();
        };

        $rootScope.$on('AutomationTabChange', function (event, args) {
            if (args["tabname"] == "Designer") {
                // if (!bpageloaded) {
                //     bpageloaded = true;
                    init_event();
                    load_category_data();
                    load_workflow_list();
                    //init_form_designer();
                    load_catalog_logo();
                // }
            }
        });

    }
]);
