angular.module('widgets').controller('reviewController', [
    '$scope',
    '$http',
    '$rootScope',
    function ($scope, $http, $rootScope) {

        'use strict';

        var bpageloaded = false;

        $scope.task_list = [];

        $scope.currentReviewPageHistory = [];
        $scope.reviewcurrentPage = 1;
        $scope.reviewnumPerPage = 5;
        $scope.filter_review_list = [];
        $scope.totalPages = 1;

        var proc_id, deploy_id, task_id, task_name;

        var customer_id = "autointelli";
        var tenant_id = "internal";
        var user_id = "kieserver";

        $scope.calculateTotalPages = function () {
            var totalPages = $scope.reviewnumPerPage < 1 ? 1 : Math.ceil($scope.filter_review_list.length / $scope.reviewnumPerPage);
            return Math.max(totalPages || 0, 1);
        };

        $scope.noPrevious = function () {
            return $scope.reviewcurrentPage === 1;
        };

        $scope.noNext = function () {
            return $scope.reviewcurrentPage === $scope.totalPages;
        };

        $scope.filterReview = function (review_row) {
            return review_row;
        }

        $scope.reviewpageselect = function (page) {
            var end, start;
            start = (page - 1) * $scope.reviewnumPerPage;
            end = start + $scope.reviewnumPerPage;
            var sendtext = end;
            if (end > $scope.filter_review_list.length) {
                sendtext = $scope.filter_review_list.length;
            }
            if (parseInt(sendtext) != 0) {
                $scope.span_page_status = (start + 1) + " - " + parseInt(sendtext);
            } else {
                $scope.span_page_status = "0 - " + parseInt(sendtext);
            }
            $scope.span_total_count = $scope.filter_review_list.length;
            return $scope.currentReviewPageHistory = $scope.filter_review_list.slice(start, end);
        }

        $scope.selectPage = function (page) {
            if ($scope.reviewcurrentPage !== page && page > 0 && page <= $scope.totalPages) {
                $scope.reviewcurrentPage = page;
                $scope.$apply();
            }
        };

        $scope.$watch(function () {
            $scope.filter_review_list = $scope.$eval("task_list | filter:filterReview");
            $scope.totalPages = $scope.calculateTotalPages();
            $scope.reviewpageselect($scope.reviewcurrentPage);
        });



        function load_task_list() {
            $rootScope.showSpinner = true;
            var surl = config.urls.tasklist + customer_id + "/" + tenant_id + "/" + sessionStorage["ai_username"];
            $.get(surl, function (res) {
                $rootScope.showSpinner = false;
                var data_arr = res;
                if (data_arr.status == "success") {
                    $scope.task_list = data_arr.response.Tasks;
                    $rootScope.task_count = data_arr.response.Tasks.length;
                } else {
                    $scope.task_list = [];
                }
                $scope.$apply();
            });
        }

        function run_process(param) {
            var surl = config.urls.taskexecute + customer_id + "/" + tenant_id + "/complete/" + sessionStorage["username"] +"/"+ proc_id + "/" + task_id;
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
                    $scope.$apply();
                    if ($("body").hasClass("modal-open")) {
                        //$("#btnformclose").trigger("click");
                        $(".review_form_popup").modal('toggle');
                    }
                    if (res.status == "success") {
                        notie.alert(1, res.response, config.notify_delay);
                        load_task_list();
                    }
                },
                error: function (data) {
                    console.log(data);
                },
                cache: false
            });
        }

        function init_event() {

            $(".reviewcontainer .pagination_dropdown a").click(function () {
                var selnum = $(this).text();
                $(".reviewcontainer .span_pagination_text").text(selnum);
                $scope.reviewcurrentPage = 1;
                $scope.reviewnumPerPage = parseInt(selnum);
                $scope.$apply();
            });

            $(".tbl_review_list").on('click', '.review_instance_execute', function (e) {
                proc_id = $(this).attr("data-id");
                //deploy_id  = $(this).attr("data-deploymentid");
                task_id = $(this).attr("data-taskId");
                task_name = $(this).attr("data-taskname");
                //var proc_version = $(this).attr("data-version");
                var pro_name = $(this).attr("data-name");
                //var checkformurl = "http://95.216.28.228:50000/api/v2/formdesigner/edit/" + proc_id + "/" + task_id;
                var checkformurl = config.urls.editform + customer_id + "/" + tenant_id + "/task/" + proc_id + "/" + task_name + "/" + task_id;
                console.log(checkformurl);
                $.get(checkformurl, function (res) {
                    console.log(res);
                    if (res.status == "failure") {
                        run_process({});
                        //notie.alert(3, res.response, config.notify_delay);
                    } else {
                        var data_arr = res.response;

                        if (data_arr.formcontent.length > 0) {
                            $("#review_form_popup_name").text(pro_name);
                            $(".review_form_popup").modal('toggle');
                            $('#review_form_builder').formRender({
                                formData: data_arr.formcontent
                            });
                        } else {
                            run_process({});
                        }
                        // notie.alert(1, res.response, config.notify_delay);
                    }
                });
                return false;
            });

            $("#btnreviewformsave").click(function () {
                var forminputs = {};
                $("#review_form_builder input[input_variable],#review_form_builder select[input_variable],#review_form_builder textarea[input_variable]").each(function (inx, ele) {
                    var cache_ele = $(ele);
                    forminputs[cache_ele.attr("input_variable")] = "";
                    //console.log(cache_ele.is("select"));
                    if (cache_ele.attr("type") == "radio" || cache_ele.attr("type") == "checkbox") {
                        var temp_name = cache_ele.attr("name");
                        forminputs[cache_ele.attr("input_variable")] = $("input[name='" + temp_name + "']:checked").val();
                    } else {
                        forminputs[cache_ele.attr("input_variable")] = cache_ele.val();
                    }
                });
                run_process(forminputs);
                return false;
            });

        }

        $scope.init = function () {
            load_task_list();
            // init_event();
        };

        $rootScope.$on('AutomationTabChange', function (event, args) {
            if (args["tabname"] == "Review") {
                if (!bpageloaded) {
                    bpageloaded = true;
                    init_event();
                    load_task_list();
                    // console.log('hi');
                }
            }
        });
    }
]).filter('split', function() {
    return function(input, splitChar, splitIndex) {
        return input.split(splitChar)[splitIndex];
    }
});