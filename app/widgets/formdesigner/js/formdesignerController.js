angular.module('widgets').controller('formdesignerController', [
    '$scope',
    '$rootScope',
    function($scope, $rootScope) {
        'use strict';

        $scope.form_list = [];

        var form_type = "";
        var formBuilder;
        
        var bpageloaded = false;

        function init_form_designer() {
            var fbTemplate = document.getElementById('build-wrap');
            var options = {
                disableFields: ['autocomplete', 'button', 'file', 'hidden', 'paragraph'],
                disabledAttrs: ['access'],
                controlOrder: ['header', 'text', 'number', 'date', 'textarea', 'select', 'checkbox-group', 'radio-group'],
                disabledActionButtons: ['clear', 'data', 'save'],
                typeUserAttrs: {
                    "checkbox-group": {
                        input_variable: {
                            label: 'Input Variable'
                        },
                        output_variable: {
                            label: 'Output Variable'
                        }
                    },
                    "date": {
                        input_variable: {
                            label: 'Input Variable'
                        },
                        output_variable: {
                            label: 'Output Variable'
                        }
                    },
                    "header": {
                        input_variable: {
                            label: 'Input Variable'
                        },
                        output_variable: {
                            label: 'Output Variable'
                        }
                    },
                    "number": {
                        input_variable: {
                            label: 'Input Variable'
                        },
                        output_variable: {
                            label: 'Output Variable'
                        }
                    },
                    "radio-group": {
                        input_variable: {
                            label: 'Input Variable'
                        },
                        output_variable: {
                            label: 'Output Variable'
                        }
                    },
                    "select": {
                        input_variable: {
                            label: 'Input Variable'
                        },
                        output_variable: {
                            label: 'Output Variable'
                        }
                    },
                    "text": {
                        input_variable: {
                            label: 'Input Variable'
                        },
                        output_variable: {
                            label: 'Output Variable'
                        }
                    },
                    "textarea": {
                        input_variable: {
                            label: 'Input Variable'
                        },
                        output_variable: {
                            label: 'Output Variable'
                        }
                    }
                }
            };
            formBuilder = $(fbTemplate).formBuilder(options);
        }

        function validate_form() {
            $("#form_designer_container .form_error").removeClass("form_error");
            var berror = true;
            /*if (!$("#txtprocessversion").val()) {
                $("#txtprocessversion").addClass("form_error");
                berror = false;
            }*/
            if (!$("#txtprocessid").val()) {
                $("#txtprocessid").addClass("form_error");
                berror = false;
            }
            if (form_type == "task" && !$("#txttaskid").val()) {
                $("#txttaskid").addClass("form_error");
                berror = false;
            }
            return berror;
        }

        function open_formdesigner() {
            $("#form_list_container").removeClass().addClass("animated fadeOutLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $(this).removeClass().hide();
                $("#form_designer_container").removeClass().addClass("animated fadeInLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    $(this).removeClass();
                    $(this).off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
                }).show();
            });
        }

        function clear_formdesigner() {
            $("#form_designer_container .form_error").removeClass("form_error");
            $("#txtprocessid").val("");
            $("#txtprocessversion").val("");
            formBuilder.actions.clearFields();
        }

        function init_event() {

            $("#btncreateprocess").click(function() {
                form_type = "process";
                $(".task_field").hide();
                clear_formdesigner();
                open_formdesigner();
                return false;
            });

            $("#btncreatetask").click(function() {
                form_type = "task";
                $(".task_field").show();
                clear_formdesigner();
                open_formdesigner();
                return false;
            });

            $("#btndesignerback").click(function() {
                console.log("btndesignerback");
                $("#form_designer_container").removeClass().addClass("animated fadeOutLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    $(this).removeClass().hide();
                    $("#form_list_container").removeClass().addClass("animated fadeInLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                        $(this).removeClass();
                    }).show();
                });
                return false;
            });

            $("#btnformsave").click(function() {
                if (validate_form()) {
                    var sformdesigner = formBuilder.actions.getData();
                    for(var i=0;i<sformdesigner.length;i++){
                        if(!sformdesigner[i].input_variable){
                          sformdesigner[i].input_variable = "";  
                        }
                        if(!sformdesigner[i].output_variable){
                          sformdesigner[i].output_variable = "";  
                        }
                    }
                    var data_arr = {
                        formType: form_type,
                        processid: $("#txtprocessid").val(),
                        //processversion: $("#txtprocessversion").val(),
                        formcontent: JSON.stringify(sformdesigner)
                    };
                    if (form_type == "task") {
                        data_arr["taskid"] = $("#txttaskid").val();
                    }
                    //console.log(sformdesigner);
                    //console.log(JSON.stringify(data_arr));
                    $rootScope.showSpinner = true;
                    $.ajax({
                        url: config.urls.storeform,
                        type: "POST",
                        async: true,
                        data: JSON.stringify(data_arr),
                        beforeSend: function(request) {
                            request.setRequestHeader("Content-Type", "application/json");
                        },
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        success: function(res) {
                            $rootScope.showSpinner = false;
                            $scope.$apply();
                            $("#btndesignerback").trigger("click");
                            notie.alert(1, "Form saved successfully", config.notify_delay);
                        },
                        error: function(data) {
                            $rootScope.showSpinner = false;
                            console.log(data);
                        },
                        cache: false
                    });
                }
                return false;
            });

            //var editformdata = {"isProcessForm": true, "processid": "12", "processversion": "12", "formcontent": "[{\"type\":\"header\",\"subtype\":\"h3\",\"label\":\"Reset Password\"},{\"type\":\"text\",\"subtype\":\"email\",\"required\":true,\"label\":\"Email Id\",\"className\":\"form-control\",\"name\":\"text-1531212387475\"},{\"type\":\"text\",\"required\":true,\"label\":\"Password\",\"className\":\"form-control\",\"name\":\"text-1531212388668\",\"subtype\":\"text\"},{\"type\":\"text\",\"required\":true,\"label\":\"Confirm Password\",\"className\":\"form-control\",\"name\":\"text-1531212399781\",\"subtype\":\"text\"}]"};

            $(".tbl_form_list").on('click', '.form_edit', function(e) {
                var surl = $(this).attr("data-link");
                $.get(surl, function(res) {
                    // console.log(res);
                    var data_arr = res.response;
                    $("#form_designer_container .form_error").removeClass("form_error");
                    $("#txtprocessid").val(data_arr.processid);
                    $("#txtprocessversion").val(data_arr.processversion);
                    formBuilder.actions.setData(data_arr.formcontent);
                    form_type = data_arr.formType;
                    if (data_arr.formType == "process") {
                        $(".task_field").hide();
                    } else {
                        $(".task_field").show();
                    }
                    open_formdesigner();
                });
                /*$("#form_designer_container .form_error").removeClass("form_error");
                 $("#txtprocessid").val(editformdata.processid);
                 $("#txtprocessversion").val(editformdata.processversion);
                 formBuilder.actions.setData(editformdata.formcontent);
                 open_formdesigner();*/
                return false;
            });

        }

        function load_form_list() {
            $rootScope.showSpinner = true;
            $.get(config.urls.listforms, function(res) {
                $rootScope.showSpinner = false;
                if (res.status == "success") {
                    $scope.form_list = res.response;
                }
                $scope.$apply();
            });
        }

        $scope.generate_edit_link = function(row) {
            var sformeditlink = config.urls.editform + row.processid;
            if (row.taskid) {
                sformeditlink = sformeditlink + "/" + row.taskid;
            }
            return sformeditlink;
        }

        $scope.init = function() {
            //init_form_designer();
            //load_form_list();
            //init_event();
        }
        
        $rootScope.$on('AutomationTabChange', function(event, args) {
            if (args["tabname"] == "Form Designer") {
                if (!bpageloaded) {
                    bpageloaded = true;  
                    init_form_designer();  
                    load_form_list();
                    init_event();
                }
            }
        });

    }
]);