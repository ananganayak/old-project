angular.module('pages').controller('usersController', [
    '$scope',
    '$timeout',
    '$rootScope',
    'intelliUsersService',
    function ($scope, $timeout, $rootScope, $intelliUsersService) {

        $scope.user_list = [];

        $scope.currentUserPageHistory = [];
        $scope.usercurrentPage = 1;
        $scope.usernumPerPage = 10;
        $scope.filter_user_list = [];
        $scope.upkid = "";
        $scope.upval = [];
        $scope.custmaplist = [];
        $scope.totalPages = 1;
        $scope.loginuserid = sessionStorage["username"];

        $scope.searchKeywords = "";
        $scope.saveactiontype = "";

        var customer_id = "autointelli";
        var tenant_id = "internal";

        $scope.calculateTotalPages = function () {
            var totalPages = $scope.usernumPerPage < 1 ? 1 : Math.ceil($scope.filter_user_list.length / $scope.usernumPerPage);
            return Math.max(totalPages || 0, 1);
        };

        $scope.noPrevious = function () {
            return $scope.usercurrentPage === 1;
        };

        $scope.noNext = function () {
            return $scope.usercurrentPage === $scope.totalPages;
        };

        $scope.filterUser = function (user_row) {
            return user_row;
        }

        $scope.userpageselect = function (page) {
            var end, start;
            start = (page - 1) * $scope.usernumPerPage;
            end = start + $scope.usernumPerPage;
            var sendtext = end;
            if (end > $scope.filter_user_list.length) {
                sendtext = $scope.filter_user_list.length;
            }
            $scope.span_page_status = (start + 1) + " - " + parseInt(sendtext);
            $scope.span_total_count = $scope.filter_user_list.length;
            return $scope.currentUserPageHistory = $scope.filter_user_list.slice(start, end);
        }

        $scope.selectPage = function (page) {
            if ($scope.usercurrentPage !== page && page > 0 && page <= $scope.totalPages) {
                $scope.usercurrentPage = page;
                $scope.$apply();
            }
        };

        $scope.$watch(function () {
            $scope.filter_user_list = $scope.$eval("user_list | filter:searchKeywords");
            $scope.totalPages = $scope.calculateTotalPages();
            $scope.userpageselect($scope.usercurrentPage);
        });

        function load_user_list() {
            var userid = sessionStorage["username"];
            $rootScope.showSpinner = true;
            $intelliUsersService.userList(userid).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        var resarr = res.data;
                        $scope.user_list = resarr;
                        console.log($scope.user_list)
                    }
                }
            });
        }




        $scope.viewuserdetail = true;
        $scope.viewcustomermapdetail = false;

        // Customer to User View Back Function
        $scope.viewuserdetafn = function(){
           $scope.viewuserdetail = true;
            $scope.viewcustomermapdetail = false;
        }

        // Customer Mapping Modal Function
        $scope.btncustomermap = function(uid){
            $scope.searchmaptxt = "";
            $scope.custmaplist = "";
            $scope.upkid = uid;
            $scope.viewcustomermapdetail = true;
            $scope.viewuserdetail = false;
            $rootScope.showSpinner = true;
            var icustheight = $(window).height();
            // var icustwidth = $(window).width();
            $(".viewcustomer").css({"height": icustheight  - 200 + "px"});
            $(".viewcustomer .panel .panel-body").css({"height": icustheight - 300 + "px", "overflow-y" : 'scroll'});
            $intelliUsersService.getcustomermapdet($scope.upkid).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    if (res.result == "success") {
                        $scope.custmaplist = res.data;
                        console.log($scope.custmaplist);
                        $scope.viewcustomermapdetail = true;
                        $scope.viewuserdetail = false;
                        $scope.viewcustomerdetail = false;
                        $rootScope.showSpinner = false;
                    }else{
                        notie.alert(3, res.data, config.notify_delay);
                        $scope.viewcustomermapdetail =false ;
                        $scope.viewuserdetail = true;
                        $scope.viewcustomerdetail = false;
                        $rootScope.showSpinner = false;
                    }
                }
            });
        }

        // customar mapping submit function
        $scope.submitcustmapdet = function(){
            var checkboxes = document.getElementsByName("cuscheckname");
                var checkboxesChecked = [];
                // loop over them all
                for (var i=0; i<checkboxes.length; i++) {
                    if (checkboxes[i].checked) {
                        $scope.cval = checkboxes[i].id.split();
                        checkboxesChecked.push(parseInt($scope.cval));
                    }else{
                        checkboxesChecked.push();
                    }
                }
            console.log(checkboxesChecked);
            $scope.cust_id = [];
            for (var i = 0; i < $scope.custmaplist.length; i++) {
                if ($scope.custmaplist[i].map == "Y") {
                    $scope.cust_id.push($scope.custmaplist[i].cid);
                }
            }
            var chckval = $scope.cust_id.concat(checkboxesChecked);
            console.log(chckval);

            var map = {
                "user_id": $scope.upkid,
                "customer_id": chckval,
            };

            // console.log(map);
            $intelliUsersService.postcustomermapdet(map).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    if (res.result == "success") {
                        notie.alert(1, res.data , config.notify_delay);
                    }else{
                        notie.alert(3, res.data, config.notify_delay);
                    }
                }
            });
        }

        // Create User Modal Function
        $scope.create_user = function () {
            $(".bs-example-modal-lg").modal('toggle');
            document.getElementById("formuser").reset();
            $("label.error").css("display", "none");
            $("input, select").removeClass("form_error");
            $scope.saveactiontype = "add";
            $scope.saveaddnew = true;
            $scope.updateval = false;
            // $("#txtfname").val("");
            // $("#txtfname").val("");
            // $("#txtmname").val("");
            // $("#txtlname").val("");
            // $("#txtemailid").val("");
            // $("#txtusername").val("");
            // $("#txtprimarynum").val("");
            // $("#seluserrole").val("");
            // $("#selusertype").val("");
            // $("#seltimezone").val("");
        }

        $scope.btnuserupdate = function (unam) {
            for (var i = 0; i < $scope.filter_user_list.length; i++) {
                if (unam == $scope.filter_user_list[i].user_id) {

                    $scope.upval = $scope.filter_user_list[i];
                    console.log($scope.upval);
                    var val = $scope.upval.timezone;
                    //$scope.timeval = val.slice('/');
                    //console.log($scope.timeval);
                    // for (var j = 0; j < $scope.timelist.length; j++) {
                    //     var stimename = $scope.timelist[j].time_zone + "--" +  $scope.timelist[j].gmt_offset;
                    //     if ($scope.upval.timezone == stimename) {
                    //         $scope.upval.timezone.push($scope.timelist[j].pk_zone_id);

                    //     }
                    // }
                    $scope.saveactiontype = "edit";
                    $(".bs-example-modal-lg").modal('toggle');
                    $scope.saveaddnew = false;
                    $scope.updateval = true;
                    $("#txtfname").val($scope.upval.first_name);
                    $("#txtmname").val($scope.upval.middle_name);
                    $("#txtlname").val($scope.upval.last_name);
                    $("#txtemailid").val($scope.upval.email_id);
                    $("#txtusername").val($scope.upval.user_id);
                    $("#txtprimarynum").val($scope.upval.phone_number);
                    $("#seluserrole").val($scope.upval.role_name);
                    $("#selusertype").val($scope.upval.user_type_desc);
                    $("#seltimezone").val($scope.upval.zone_id);

                }
            }


        }

        function load_roles_list() {
            $rootScope.showSpinner = true;
            $intelliUsersService.userRoles({}).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        var res_arr = res.data["role_name"];
                        $.each(res_arr, function (inx, key_val) {
                            $("#seluserrole").append("<option value='" + key_val + "'>" + key_val + "</option>");
                            $("#updateseluserrole").append("<option value='" + key_val + "'>" + key_val + "</option>");
                        });
                    }
                }
            });
        }

        function load_time_zones() {
            $rootScope.showSpinner = true;
            $intelliUsersService.timeZones({}).then(function (res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        var res_arr = res.data;
                        $scope.timelist = res_arr;
                        // console.log(res_arr);
                        for (var i = 0; i < res_arr.length; i++) {
                            var data_arr = res_arr[i];
                            var szonename = data_arr.country_code + " - " + data_arr.time_zone;
                            $("#seltimezone").append("<option value='" + data_arr.pk_zone_id + "'>" + szonename + "</option>");
                            $("#updateseltimezone").append("<option value='" + data_arr.pk_zone_id + "'>" + szonename + "</option>");
                        }
                    }
                }
            });
        }

        function create_orches_user() {
            var data_arr = {
                "userid": $("#txtusername").val(),
                "emaild": $("#txtemailid").val(),
                "roles": ["kieserver", "admin"]
            };
            var surl = config.urls.createorchesuser + customer_id + "/" + tenant_id;
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
                },
                error: function (data) {
                    console.log(data);
                },
                cache: false
            });
        }

        function init_event() {

            var dataarg = [];
            dataarg.push({"action": "#/admin", "name": "Admin"});
            dataarg.push({"action": "", "name": "Users"});
            $rootScope.$broadcast('ShowBreadcrumb', dataarg);


            $(".slimscroll").slimScroll();

            $(".pagination_dropdown a").click(function () {
                var selnum = $(this).text();
                $(".span_pagination_text").text(selnum);
                $scope.usercurrentPage = 1;
                $scope.usernumPerPage = parseInt(selnum);
                //$scope.userpageselect($scope.usercurrentPage);
                $scope.$apply();
            });

            var imodelcontentheight = $(window).height() - ($(".modal-header").outerHeight() + $(".modal-footer").outerHeight());
            $(".bs-example-modal-lg .modal-body").css({"height": imodelcontentheight + "px", "overflow-y": "auto"});
            $(".bs-customer-map-modal-lg .modal-body").css({"height": imodelcontentheight - 150 + "px", "overflow-y": "scroll"});

            //$(".admincontainer .slimscroll").slimScroll();

            $.validator.addMethod("regex", function (value, element, regexp) {
                var re = new RegExp(regexp);
                return this.optional(element) || re.test(value);
            }, "Please Provide valid details");

            $('#formuser').validate({
                onkeyup: false,
                errorClass: 'error',
                validClass: 'valid',
                rules: {
                    txtfname: {required: true, minlength: 3},
                    txtlname: {required: true},
                    txtemailid: {required: true, email: true},
                    txtusername: {required: true, minlength: 3},
                    // txtpassword: {required: true, minlength: 5},
                    // txtrepassword: {required: true, minlength: 5, equalTo: "#txtpassword"},
                    txtprimarynum: {required: true, regex: /^\d{5,20}$/},
                    seluserrole: {required: true},
                    selusertype: {required: true},
                    seltimezone: {required: true},
                },
                messages: {
                    txtfname: {
                        required: 'Please enter the first name',
                        minlength: 'Please enter valid first name'
                    },
                    txtlname: {
                        required: 'Please enter the last name'
                    },
                    txtemailid: {
                        required: 'Please enter your E-Mail ID',
                        email: 'Please enter valid E-Mail ID'
                    },
                    txtusername: {
                        required: 'Please enter the username',
                        minlength: 'Please enter valid username'
                    },
                    // txtpassword: {
                    //     required: 'Please enter the password',
                    //     minlength: 'Min {0} characters'
                    // },
                    // txtrepassword: {
                    //     required: "Please enter the confirm password",
                    //     minlength: "Min {0} characters",
                    //     equalTo: "Please re-enter the same password"
                    // },
                    txtprimarynum: {
                        required: "Please enter the primary number",
                        regex: 'Please enter valid primary number'
                    },
                    seluserrole: {
                        required: "Please select a role"
                    },
                    selusertype: {
                        required: "Please select a user type"
                    },
                    seltimezone: {
                        required: "Please select a time zone"
                    }
                },
                highlight: function (element) {
                    $(element).closest('input').addClass("error");
                },
                unhighlight: function (element) {
                    $(element).closest('input').removeClass("error");
                },
                errorPlacement: function (error, element) {
                    $(element).closest('div').append(error);
                }
            });


            $(".btn_user_save").click(function () {
                if ($('#formuser').valid()) {

                    // user password encryption
                    // var spwd = $('#txtpassword').val();

                    // var encrypass = CryptoJS.AES.encrypt(spwd, "@ut0!ntell!");

                    // var passStr = encrypass.toString();


                    $rootScope.showSpinner = true;
                    if ($scope.saveactiontype == "add") {
                        var data_arr = {
                            "user_id": $("#txtusername").val(),
                            // "user_password": " ",
                            "first_name": $("#txtfname").val(),
                            "middle_name": $("#txtmname").val(),
                            "last_name": $("#txtlname").val(),
                            "email_id": $("#txtemailid").val(),
                            "phone_number": $("#txtprimarynum").val(),
                            "time_zone": $("#seltimezone").val(),
                            "role": $("#seluserrole").val(),
                            "user_type": $("#selusertype").val()
                        };
                        $intelliUsersService.createUser(data_arr).then(function (res) {
                            if(res == config.service_unavailable){
                                notie.alert(3, res, config.notify_delay);
                                $rootScope.showSpinner = false;
                            }else{ 
                                $rootScope.showSpinner = false;
                                if (res.result == "success") {
                                    //Add user to the list..
                                    data_arr["role_name"] = $("#seluserrole").val();
                                    data_arr["zone_id"] = $("#seltimezone").val();
                                    data_arr["user_type_desc"] = $("#selusertype").val();
                                    $scope.user_list.push(data_arr);
                                    create_orches_user();
                                    $("#btnuserclose").trigger("click");
                                    notie.alert(1, "User added successfully!", config.notify_delay);
                                } else {
                                    notie.alert(3, res.data, config.notify_delay);
                                }
                            }
                        });

                    } else {

                        var up_data_arr = {
                            // "user_password": " ",
                            "first_name": $("#txtfname").val(),
                            "middle_name": $("#txtmname").val(),
                            "last_name": $("#txtlname").val(),
                            "email_id": $("#txtemailid").val(),
                            "phone_number": $("#txtprimarynum").val(),
                            "time_zone": $("#seltimezone").val(),
                            "role": $("#seluserrole").val(),
                            "user_type": $("#selusertype").val()
                        };

                        var usr_name = $("#txtusername").val();

                        var upUrls = config.urls.update_user_det + usr_name;

                        // console.log(usr_name, up_data_arr);

                        $intelliUsersService.updateUser(up_data_arr, upUrls).then(function (res) {
                            if(res == config.service_unavailable){
                                notie.alert(3, res, config.notify_delay);
                                $rootScope.showSpinner = false;
                            }else{ 

                                $rootScope.showSpinner = false;

                                if (res.result == "success") {

                                    for (var i = 0; i < $scope.filter_user_list.length; i++) {

                                        if (usr_name == $scope.filter_user_list[i].user_id) {
                                            $scope.filter_user_list[i].user_id = usr_name;
                                            $scope.filter_user_list[i].email_id = up_data_arr.email_id;
                                            $scope.filter_user_list[i].first_name = up_data_arr.first_name;
                                            $scope.filter_user_list[i].last_name = up_data_arr.last_name;
                                            $scope.filter_user_list[i].middle_name = up_data_arr.middle_name;
                                            $scope.filter_user_list[i].phone_number = up_data_arr.phone_number;
                                            $scope.filter_user_list[i].role_name = up_data_arr.role;
                                            $scope.filter_user_list[i].timezone = up_data_arr.time_zone;
                                            $scope.filter_user_list[i].user_type_desc = up_data_arr.user_type;
                                        }

                                    }

                                    $("#btnuserclose").trigger("click");

                                    notie.alert(1, res.data, config.notify_delay);

                                } else {
                                    notie.alert(3, res.data, config.notify_delay);
                                }
                            }

                        });
                    }

                }
                return false;
            });

        }

        $scope.deleteuserRowval = function (usrnme) {

            $.confirm({
                title: 'Delete User Credential',
                type: 'blue',
                backgroundDismiss: true,
                content: 'Do you want to delete this user credential ?',
                buttons: {
                    "Cancel": function () {

                    },
                    "Confirm": function () {
                        $rootScope.showSpinner = true;
                        $intelliUsersService.deletuserdet(usrnme).then(function (res) {
                            if(res == config.service_unavailable){
                                notie.alert(3, res, config.notify_delay);
                                $rootScope.showSpinner = false;
                            }else{ 
                                $rootScope.showSpinner = false;
                                if (res.result == "success") {
                                    notie.alert(1, res.data, config.notify_delay);
                                    for (var i = 0; i < $scope.user_list.length; i++) {
                                        if ($scope.user_list[i].user_id == usrnme) {
                                            $scope.user_list.splice(i, 1);
                                            $scope.$apply();
                                            break;
                                        }
                                    }
                                } else {
                                    notie.alert(3, res.data, config.notify_delay);
                                }
                            }
                        });
                    }
                }
            });
            return false;
        }

        $scope.init = function () {

            load_user_list();

            load_roles_list();

            load_time_zones();

            init_event();

            //$('[data-toggle="tooltip"]').tooltip();
        };

        $scope.user_finish_render = function () {
            $timeout(function () {
                angular.element(document).ready(function () {
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }, 100, false);
        }

    }
]);