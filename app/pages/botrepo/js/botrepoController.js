angular.module('pages').controller('botrepoController', [
    '$scope',
    '$http',
    '$rootScope',
    'intelliBotrepoService',
    function($scope, $http, $rootScope, $intelliBotrepoService) {

        var cache_li_ele;
        var editor;

        var current_branch_id;

        $scope.bot_lang = [];
        $scope.bot_platform = [];
        $scope.bot_ostype = [];

        $scope.bot_files_list = [];

        var bot_os_type = {};

        var sel_platform = "";
        var fileid = "";

        function unflatten(arr) {
            var tree = [],
                    mappedArr = {},
                    arrElem,
                    mappedElem;

            // First map the nodes of the array to an object -> create a hash table.
            for (var i = 0, len = arr.length; i < len; i++) {
                arrElem = arr[i];
                mappedArr[arrElem.bot_id] = arrElem;
                mappedArr[arrElem.bot_id]['children'] = [];
            }


            for (var id in mappedArr) {
                if (mappedArr.hasOwnProperty(id)) {
                    mappedElem = mappedArr[id];
                    // If the element is not at the root level, add it to its parent array of children.
                    if (mappedElem.parent_id) {
                        mappedArr[mappedElem['parent_id']]['children'].push(mappedElem);
                    }
                    // If the element is at the root level, add it to first level elements array.
                    else {
                        tree.push(mappedElem);
                    }
                }
            }
            return tree;
        }

        function addCategories(obj)
        {
            var htmlBuilder = "";
            for (var i = 0; i < obj.length; i++)
            {
                htmlBuilder += '<li>';

                htmlBuilder += '<span data-id="' + obj[i].bot_id + '">' + obj[i].name + '</span>';
                //console.log(obj[i].children.length);
                if (obj[i].children.length > 0)
                {
                    htmlBuilder += '<ul>';
                    htmlBuilder += addCategories(obj[i].children);
                    htmlBuilder += '</ul>';
                }
                htmlBuilder += '</li>';
            }
            return htmlBuilder;
        }

        function load_dropdown_list() {
            $rootScope.showSpinner = true;
            $intelliBotrepoService.botmasterData().then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        $scope.bot_lang = res.data["bot_lang"];
                        $scope.bot_platform = res.data["platform_type"];
                        bot_os_type = res.data["os_type"];
                    }
                }
            });
        }

        function load_bot_files(itreeid) {
            $rootScope.showSpinner = true;
            //var itreeid = 1;
            $intelliBotrepoService.botfilesList(itreeid).then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        var data_arr = res.data.slice(1);
                        $scope.bot_files_list = data_arr;
                    } else {
                        $scope.bot_files_list = [];
                    }
                }
            });
        }

        function load_bot_category() {
            $rootScope.showSpinner = true;
            $intelliBotrepoService.bottreeList({}).then(function(res) {
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{ 
                    $rootScope.showSpinner = false;
                    if (res.result == "success") {
                        var data_arr = res.data.slice(1);
                        var jsonarr = [];
                        $(data_arr).each(function(inx, ele) {
                            var iparentid = (ele[3] == "") ? 0 : parseInt(ele[3]);
                            var tempjson = {
                                'bot_id': ele[0],
                                'name': ele[1],
                                parent_id: iparentid
                            };
                            jsonarr.push(tempjson);
                        });
                        var treeobj = unflatten(jsonarr);
                        $("#expList").html(addCategories(treeobj));

                        $('#expList').find('li:has(ul)').addClass('collapsed');
                        $('.collapsed').addClass('expanded');
                        $('.collapsed').children().show('medium');
                        $("#expList > li:first-child > span").addClass('selected_span');
                        current_branch_id = $("#expList > li:first-child > span").attr("data-id");
                        console.log(current_branch_id);
                        load_bot_files(0);
                    } else {

                    }
                }
            });
        }

        function validate_folder() {
            var berror = true;
            $("#txtfoldername").removeClass("form_error");
            if (!$("#txtfoldername").val()) {
                $("#txtfoldername").addClass("form_error");
                berror = false;
            }
            return berror;
        }

        function validate_rename_folder() {
            var berror = true;
            $("#txtfolderrename").removeClass("form_error");
            if (!$("#txtfolderrename").val()) {
                $("#txtfolderrename").addClass("form_error");
                berror = false;
            }
            return berror;
        }

        function validate_boteditor() {
            var berror = true;
            $("#txtbotname,#txtbotcomponent").removeClass("form_error");
            if (!$("#txtbotname").val()) {
                $("#txtbotname").addClass("form_error");
                berror = false;
            }
            if (!$("#txtbotcomponent").val()) {
                $("#txtbotcomponent").addClass("form_error");
                berror = false;
            }
            return berror;
        }

        function clear_botrepo_form() {
            $("#model_botrepo input,#model_botrepo select,#model_botrepo textarea").val("");
            fileid = "";
            editor.setValue("");
            editor.session.setValue("");
        }

        function init_event() {

            var dataarg = [];
            dataarg.push({"action": "#/admin", "name": "Admin"});
            dataarg.push({"action": "", "name": "Bots Repo"});
            $rootScope.$broadcast('ShowBreadcrumb', dataarg);

            $(".bots_folder_menu_popup").hide();

            var iheight = $(window).height() - 195;
            $(".botrepolistrow").css({"height": iheight + "px"});
            var imenuheight = $(window).height() - 130;
            $(".botrepo-side-menu-col .menu-block").css({"height": imenuheight + "px"});

            //$(".slimscroll").slimScroll();

            editor = ace.edit("editor");
            editor.setTheme("ace/theme/twilight");
            editor.session.setNewLineMode("unix");
            //editor.session.setMode("ace/mode/javascript");
            //editor.session.setMode("ace/mode/yaml");

            $("#expList").on('click', 'li', function(event) {
                $("#expList li span").removeClass("selected_span");
                $(this).find("span:eq(0)").addClass("selected_span");
                //console.log($(this).find("span:eq(0)").text());
                if ($(this).find("ul").length != 0) {
                    $(this).toggleClass('expanded');
                    $(this).children('ul').toggle('medium');
                }
                var branch_id = $(this).find("span:eq(0)").attr("data-id");
                //console.log(branch_id);
                load_bot_files(branch_id);
                return false;
            });

            $("#expList").on('mouseenter', 'span', function() {
                $("#expList li .righticons").remove();
                var template_str = "<div class='righticons'>" +
                        "<i class='icon ion-android-more-horizontal'></i>" +
                        "</div>";
                $(this).append(template_str);
            });

            $("#expList").on('mouseleave', 'span', function() {
                if (!$(this).hasClass("selected_node")) {
                    $("#expList li .righticons").remove();
                }
            });

            $("#expList").on('click', '.righticons', function(e) {
                $("#expList li span").removeClass("selected_node");
                $(this).closest("span").addClass("selected_node");
                cache_li_ele = $(this).closest("li");
                var itop = Math.round(e.pageY - $(".page-content").offset().top) + 4,
                        ileft = Math.round(e.pageX - $(".page-content").offset().left) - 15;
                $(".bots_folder_menu_popup").css({
                    top: itop + "px",
                    left: ileft + "px"
                });
                $(".bots_folder_menu_popup").show();
                return false;
            });

            $(document).click(function() {
                $(".bots_folder_menu_popup").hide();
            });

            $(document).on('click', '.bots_folder_menu_popup', function(e) {
                e.stopPropagation();
            });

            $(".menu_new_folder").click(function() {
                $(".bots_folder_menu_popup").hide();
                $("#txtfoldername").removeClass("form_error");
                $("#txtfoldername").val("");
                $("#category-form-modal").modal('toggle');
                return false;
            });

            $(".menu_new_file").click(function() {
                $(".bots_folder_menu_popup").hide();
                clear_botrepo_form();
                $(".model_botrepo").modal('toggle');
                return false;
            });

            $(".menu_new_delete").click(function() {
                $(".bots_folder_menu_popup").hide();
                $.confirm({
                    title: 'Delete Folder',
                    type: 'blue',
                    backgroundDismiss: true,
                    content: 'Do you want to delete folder?',
                    buttons: {
                        Cancel: function() {
                        },
                        "Confirm": function() {
                            var branch_id = cache_li_ele.find("span:eq(0)").attr("data-id");
                            $rootScope.showSpinner = true;
                            $intelliBotrepoService.deletebotTree(branch_id).then(function(res) {
                                if(res == config.service_unavailable){
                                    notie.alert(3, res, config.notify_delay);
                                    $rootScope.showSpinner = false;
                                }else{ 
                                    $rootScope.showSpinner = false;
                                    notie.alert(1, "Branch deleted successfully", config.notify_delay);
                                    var parent_ul = cache_li_ele.closest("ul");
                                    var parent_li = parent_ul.closest("li");
                                    cache_li_ele.remove();
                                    if (parent_ul.find("li").length == 0) {
                                        parent_ul.remove();
                                    }
                                    if (parent_li.find("li").length == 0) {
                                        parent_li.removeClass("collapsed");
                                        parent_li.removeClass("expanded");
                                    }
                                }
                            });
                        }
                    }
                });
                return false;
            });

            $(".menu_new_rename").click(function() {
                $(".bots_folder_menu_popup").hide();
                var sname = cache_li_ele.find("span:eq(0)").text();
                $("#txtfolderrename").val(sname);
                $("#rename-form-modal").modal('toggle');
                return false;
            });

            $("#btnfoldersave").click(function() {
                if (validate_folder()) {
                    var sfoldername = $("#txtfoldername").val();
                    var cat_id = cache_li_ele.find("span:eq(0)").attr("data-id");
                    var data_arr = {
                        "name": sfoldername,
                        "type": "d",
                        "parent_id": cat_id
                    };
                    $rootScope.showSpinner = true;
                    $intelliBotrepoService.createbotTree(data_arr).then(function(res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{ 
                            $rootScope.showSpinner = false;
                            if (res.result == "success") {
                                var stemplate = "";
                                if (cache_li_ele.find("ul").length != 0) {
                                    stemplate = '<li><span class="selected_node" data-id="' + res.data + '">' + sfoldername + '</span></li>';
                                    cache_li_ele.append(stemplate);
                                } else {
                                    cache_li_ele.addClass("collapsed expanded");
                                    stemplate = '<ul><li><span class="selected_node" data-id="' + res.data + '">' + sfoldername + '</span></li></ul>';
                                    cache_li_ele.append(stemplate);
                                }
                                $("#category-form-modal").modal('toggle');
                                notie.alert(1, "Branch created successfully", config.notify_delay);
                            }
                        }
                    });
                }
                return false;
            });

            $("#btnrefolder").click(function() {
                if (validate_rename_folder()) {
                    var cat_id = cache_li_ele.find("span:eq(0)").attr("data-id");
                    var snewfolder = $("#txtfolderrename").val();
                    $rootScope.showSpinner = true;
                    $intelliBotrepoService.renamebotTree(cat_id, snewfolder).then(function(res) {
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{ 
                            $rootScope.showSpinner = false;
                            cache_li_ele.find("span:eq(0)").text($("#txtfolderrename").val());
                            $("#rename-form-modal").modal('toggle');
                            notie.alert(1, "Branch Renamed successfully", config.notify_delay);
                        }
                    });
                }
                return false;
            });

            $("#btnbotsave").click(function() {
                if (validate_boteditor()) {
                    var data_arr = {
                        "bot_type": "R",
                        "bot_name": $("#txtbotname").val(),
                        "bot_description": $("#txtbotdesc").val(),
                        "bot_language": $("#selbotlang").val(),
                        "bot_script": editor.getValue(),
                        "platform_type": $("#selbotplatform").val(),
                        "os_type": $("#selostype").val(),
                        "component": $("#txtbotcomponent").val(),
                        "botargs": $("#txtbotargs").val()
                    };
                    if (fileid != "") {
                        $rootScope.showSpinner = true;
                        $intelliBotrepoService.botfileupdateContent(fileid, data_arr).then(function(res) {
                            if(res == config.service_unavailable){
                                notie.alert(3, res, config.notify_delay);
                                $rootScope.showSpinner = false;
                            }else{ 
                                $rootScope.showSpinner = false;
                                for (var i = 0; i < $scope.bot_files_list.length; i++) {
                                    var row = $scope.bot_files_list[i];
                                    if (row[0] == fileid) {
                                        row[1] = $("#txtbotname").val();
                                        row[2] = $("#txtbotdesc").val();
                                        $scope.bot_files_list[i] = row;
                                        $scope.$apply();
                                        break;
                                    }
                                }
                                $(".model_botrepo").modal('toggle');
                                notie.alert(1, res.data, config.notify_delay);
                            }
                        });
                    } else {
                        var cat_id = cache_li_ele.find("span:eq(0)").attr("data-id");
                        $rootScope.showSpinner = true;
                        $intelliBotrepoService.botfileupnewContent(cat_id, data_arr).then(function(res) {
                            if(res == config.service_unavailable){
                                notie.alert(3, res, config.notify_delay);
                                $rootScope.showSpinner = false;
                            }else{ 
                                $rootScope.showSpinner = false;
                                var scurdate = new Date().toString('d/M/yyyy h:s');
                                var temp_arr = [res.data, $("#txtbotname").val(), $("#txtbotdesc").val(), scurdate];
                                $scope.bot_files_list.push(temp_arr);
                                $(".model_botrepo").modal('toggle');
                                notie.alert(1, "BOT created successfully", config.notify_delay);
                            }
                        });
                    }
                }
                return false;
            });

            $(".botrepolistrow").on('click', '.bots_edit', function(e) {
                clear_botrepo_form();
                fileid = $(this).attr("data-id");
                $rootScope.showSpinner = true;
                $intelliBotrepoService.botfileContent(fileid).then(function(res) {
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{ 
                        $rootScope.showSpinner = false;
                        if (res.result == "success") {
                            var res_arr = res.data[0];
                            $("#txtbotname").val(res_arr["bot_name"]);
                            $("#selbotlang").val(res_arr["bot_language"]);
                            $("#selbotplatform").val(res_arr["platform_type"]);
                            $("#selbotplatform").trigger("change");
                            $("#selostype").val(res_arr["os_type"]);
                            $("#txtbotcomponent").val(res_arr["component"]);
                            $("#txtbotdesc").val(res_arr["bot_description"]);
                            $("#txtbotargs").val(res_arr["botargs"]);
                            editor.setValue(res_arr["bot_script"]);
                            editor.session.setValue(res_arr["bot_script"]);
                            $(".model_botrepo").modal('toggle');
                        }
                    }
                });
                return false;
            });


            $(".botrepolistrow").on('click', '.bots_delete', function(e) {
                var cache_ele = $(this).closest(".file-box");
                var fileid = $(this).attr("data-id");
                $.confirm({
                    title: 'Delete BOT',
                    type: 'blue',
                    backgroundDismiss: true,
                    content: 'Do you want to delete BOT?',
                    buttons: {
                        Cancel: function() {

                        },
                        "Confirm": function() {
                            $rootScope.showSpinner = true;
                            $intelliBotrepoService.botfileupdeleteContent(fileid).then(function(res) {
                                if(res == config.service_unavailable){
                                    notie.alert(3, res, config.notify_delay);
                                    $rootScope.showSpinner = false;
                                }else{ 
                                    $rootScope.showSpinner = false;
                                    for (var i = 0; i < $scope.bot_files_list.length; i++) {
                                        var row = $scope.bot_files_list[i];
                                        if (row[0] == fileid) {                                        
                                            $scope.bot_files_list.splice(i, 1);
                                            $scope.$apply();
                                            break;
                                        }
                                    }
                                    cache_ele.hide("slow", function() {
                                        cache_ele.remove();
                                    });
                                    notie.alert(1, res.data, config.notify_delay);
                                }
                            });
                        }
                    }
                });
                return false;
            });


            $("#selbotplatform").change(function() {
                if (sel_platform != $(this).val()) {
                    sel_platform = $(this).val();
                    var temp_arr = bot_os_type[sel_platform];
                    $scope.bot_ostype = temp_arr;
                    $scope.$apply();
                }
            });
        }

        $scope.init = function() {
            init_event();
            load_dropdown_list();
            load_bot_category();
        };

    }
]);