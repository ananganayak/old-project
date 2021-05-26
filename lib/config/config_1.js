var config = {};
var envirounment_type = "live";

var servicebaseurl = "http://95.216.28.228:50005/ui/api1.0/";

var eventmgmturl = "http://95.216.28.228:50006/evm/api1.0/";

var jbpmbaseurl = "http://95.216.28.228:500001/orchapi/api/v1/";

var cmdbbaseurl = "http://95.216.28.228:8000/cmdb/";

var dashboard_url = "http://95.216.28.228:5008/dashboard/api1.0/";

if (envirounment_type == "live") {
    servicebaseurl = "http://95.216.28.228:50005/ui/api1.0/";
    eventmgmturl = "http://95.216.28.228:50006/evm/api1.0/";
}

config = {
    "version": "0.0.1",
    "notify_delay": 3,
    "urls": {
        //"login": "app/widgets/login/json/loginmock.json",
        "login" : servicebaseurl + "login",
        //"userlist":  "app/pages/admin/json/usermock.json",
        "userlist": servicebaseurl + "users",
        "userroles": servicebaseurl + "roles",
        "timezones": servicebaseurl + "zones",
        "createuser": servicebaseurl + "users",
        "rolelist": servicebaseurl + "rolemappers",
        "roleDetails": servicebaseurl + "rolemappers/",
        "tablist": servicebaseurl + "tabs",
        "createrole": servicebaseurl + "roles",
        "deleterole": servicebaseurl + "roles/",
        "updaterole": servicebaseurl + "roles/",
        //"alertslist":  "app/widgets/alerts/json/alertsmock.json",        
        "alertslist": eventmgmturl + "alerts",
        "createworkflow" : jbpmbaseurl + "process/create/",
        "listworkflow" : "http://95.216.28.228:500001/orchapi/api/v1/process/list/IT",
        "jpbmdesigner" : "http://95.216.28.228:500001/kie-wb?standalone=&path=git://master@",
        "deployprocess" : "http://95.216.28.228:500001/orchapi/api/v1/project/deploy",
        "eventslist": eventmgmturl + "events",
        "deploymentlist": "http://95.216.28.228:500001/orchapi/api/v1/runbook/list/CRM",
        "workflowexcute": "http://95.216.28.228:500001/orchapi/api/v1/runbook/start/CRM/",
        "workflowresult": "http://95.216.28.228:500001/orchapi/api/v1/runbook/instances/",
        "eventsuppresionperc": "http://95.216.28.228:5008/dashboard/api1.0/suppressionpercent",
        "suppression30days": "http://95.216.28.228:5008/dashboard/api1.0/suppression30days",
        "weeklyheatmap" : "http://95.216.28.228:5008/dashboard/api1.0/weeklyheatmap",
        "cmdbsummary" : cmdbbaseurl + "getHostStats",
        "cmdbdevicelist" : cmdbbaseurl + "getAllData",
        "cmdbsavedevice" : cmdbbaseurl + "insert",
        "listforms" : "http://95.216.28.228:50000/api/v1/autointelli/listforms",
        "storeform" : "http://95.216.28.228:50000/api/v1/autointelli/storeform",
        "editform" : "http://95.216.28.228:50000/api/v1/autointelli/edit/",
        "tasklist" : "http://95.216.28.228:50000/orchapi/api/v1/tasks/kieserver",
        "taskexecute" : "http://95.216.28.228:50000/orchapi/api/v1/tasks/complete/CRM/",
        "dash_baord_automation_summary" : dashboard_url + "automationstats",
        "dashboard_top3alertcomponent" : dashboard_url + "top3alertcomponent",
        "dashboard_top5ci" : dashboard_url + "top5ci",
        "dashboard_alertbyseverity" : dashboard_url + "alertbyseverity",
        "dashboard_severitytrend1week" : dashboard_url + "severitytrend1week"
    }
};



