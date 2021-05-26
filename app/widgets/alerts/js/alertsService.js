angular.module('widgets').service('intelliAlertsService', [
    'APIService', '$q',
    function (APIService, $q) {
        'use strict';

        var alertsList = function (param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.alertslist + "/" + param["filter"] + "/" + param["start"] + "/" + param["offset"] + "/" +
                    param["search_filter_key"] + "/" + param["search_fitler_val"] + "/" + param["search_sorting"];
            console.log(surl);
            APIService.doApiCall(surl, "GET", param).then(function (result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var alertsSummary = function (param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.alertssummary, "GET", param).then(function (result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var automationTimeline = function (param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.automationtimeline + param["alertid"];
            APIService.doApiCall(surl, "GET", param).then(function (result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var triageList = function (param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.traigecrud + "/" + param["alertid"];
            APIService.doApiCall(surl, "GET", param).then(function (result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        }

        var triageDetails = function (param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.traigecrud + "/" + param["traige_name"] + "/" + param["alertid"];
            APIService.doApiCall(surl, "GET", param).then(function (result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        }

        var tcktformvalget = function (param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.automationticketform + param["status_value"];
            APIService.doApiCall(surl, "GET", param).then(function (result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var triageExecute = function (param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.traigecrud;
            APIService.doApiCall(surl, "POST", param).then(function (result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var load_tickerform_masterdata = function (param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.tickerform_masterdata;
            APIService.doApiCall(surl, "GET", param).then(function (result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var load_ticket_subcategory = function (param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.ticket_subcategory + "/" + param["category_id"];
            APIService.doApiCall(surl, "GET", param).then(function (result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var ticket_save_form = function (param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.ticket_saveform + param["action_cmd"];
            APIService.doApiCall(surl, "POST", param).then(function (result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };
        
        var load_triage_history = function (param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.triage_history + "/" + param["alert_id"];
            APIService.doApiCall(surl, "GET", param).then(function (result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        // get customer details
        var getcustdetserv = function () {
            // param = APIService.headerTokens(param);
            var deferred = $q.defer();
            APIService.doApiCall(config.urls.alertcustomerdetget, "GET").then(function (result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        var alertsCsvService = function (param) {
            param = APIService.headerTokens(param);
            var deferred = $q.defer();
            var surl = config.urls.alertscsvdownload + "/" + param["filter"] + "/" + param["start"] + "/" + param["offset"] + "/" +
                    param["search_filter_key"] + "/" + param["search_fitler_val"] + "/" + param["search_sorting"];
            console.log(surl);
            APIService.doApiCall(surl, "GET", param).then(function (result) {
                deferred.resolve(result);
            },
            function() {
                deferred.resolve(config.service_unavailable);
            });
            return deferred.promise;
        };

        return {
            "alertsList": alertsList,
            "alertsSummary": alertsSummary,
            "automationTimeline": automationTimeline,
            "tcktformvalget": tcktformvalget,
            "triageList": triageList,
            "triageDetails": triageDetails,
            "triageExecute": triageExecute,
            "load_tickerform_masterdata": load_tickerform_masterdata,
            "load_ticket_subcategory": load_ticket_subcategory,
            "ticket_save_form" : ticket_save_form,
            "load_triage_history" : load_triage_history,
            "getcustdetserv" : getcustdetserv,
            "alertsCsvService" : alertsCsvService
        };
    }
]);