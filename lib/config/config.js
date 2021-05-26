var config = {};
var envirounment_type = "dev";

// var app_brand = "autointelli"; // Default Autointelli 

var app_brand = "nxtgen"; //  nxtgen  

// var app_brand = "kpmg"; // kpmg 

// // SFL
// var envirounment_ip = "http://172.16.1.10:";
// var envirounment_port="8000";

// var envirounment_ip = "https://oikotechno.autointelli.com:";

// var envirounment_port = "443";

// Demo Server
// var envirounment_port = "4006";

// var envirounment_port = "3008";

// Nxtgen
var envirounment_ip;

var eip = sessionStorage.getItem("envirounment_ip");

var envirounment_port = "443";

if(eip == "https://r2d22.nxtgen.com:"){
    envirounment_ip = "https://r2d22.nxtgen.com:";
}else if(eip == "https://r2d23.nxtgen.com:"){
    envirounment_ip = "https://r2d23.nxtgen.com:";
}else if(eip == "https://r2d21.nxtgen.com:"){
    envirounment_ip = "https://r2d21.nxtgen.com:";
}else{
    envirounment_ip = "https://r2d2.nxtgen.com:";
}

// automation catalog status image
var automationiframeip = "172.16.1.106:";
var automationiframeport = "8085";

// Jbpm Port 
// var envirounmentjbpm_port = "20180";

var envirounmentjbpm_port = "8080";

// message Socket port 
var envirounmentmsgscoket_port = "3891";

// environment IP Address

// var envirounment_ip = "https://r2d2.nxtgen.com:";

// Demo Server
// var envirounment_ip = "http://95.216.28.228:";


var aiconsoleip = "http://95.216.28.228:";

var aiconsoleport = "3001";

var servicebaseurl = envirounment_ip + envirounment_port + "/ui/api1.0/";

var eventmgmturl = envirounment_ip + envirounment_port + "/evm/api1.0/";

var jbpmbaseurl = envirounment_ip + envirounmentjbpm_port + "/orchapi/api/v3/";

var cmdbbaseurl = envirounment_ip + envirounment_port + "/cmdb/";

var dashboard_url = envirounment_ip + envirounment_port + "/dashboard/api1.0/";

var dropevents_url = envirounment_ip + envirounment_port + "/evm/api1.0/dropped_events/";

var borrepo_url = envirounment_ip + envirounment_port + "/bot/api1.0/";

if (envirounment_type == "live") {
    servicebaseurl = envirounment_ip + envirounment_port + "/ui/api1.0/";
    eventmgmturl = envirounment_ip + envirounment_port + "/evm/api1.0/";
}

var brand_config = [];

if (app_brand == "kpmg") {
    brand_config = {
        "name" : "ZANTRA | KPMG",
        "logo": "app/img/kpmg-logo.png",
        "logo_240": "app/img/kpmg-240.png",
        "fav_icon": "app/img/kpmg-fav-icon.png",
        "copyright" : "© 2019 KPMG"
    }
}else if(app_brand == "autointelli"){
    brand_config = {
        "name" : "AutoIntelli",
        "logo": "app/img/auto-intelli-logo.png",
        "logo_240": "app/img/auto-intelli-240.png",
        "fav_icon": "app/img/ai-logo-brain-60x60.png",
        "copyright" : "2020 © AutoIntelli Systems Inc."
    }
}else if(app_brand == "nxtgen"){
    brand_config = {
        "name" : "NxtGen",
        "logo": "app/img/nextgen-240-60.png",
        "logo_240": "app/img/nextgen-240-60.png",
        "fav_icon": "app/img/nextgen-240-60.png",
        "copyright" : "2020 © AutoIntelli Systems Inc."
    }
}

config = {
    "version": "3.0.0",
    "service_unavailable": "Service Unavailable",
    "ngs_admin_name": "nagiosadmin",
    "ngs_admin_pwd": "nagiosadmin",
    "monitorpagerefresh" : "15000",
    "brand_name" : brand_config.name,
    "brand_logo": brand_config.logo,
    "brand_logo_240": brand_config.logo_240,
    "brand_icon": brand_config.fav_icon,
    "brand_copyright": brand_config.copyright,
    "notify_delay": 3,
    "messagesocket": envirounment_ip + envirounmentmsgscoket_port + "/autointelli_async",
    "urls": {
        //"login": "app/widgets/login/json/loginmock.json",
        "login": servicebaseurl + "login",
        //"userlist":  "app/pages/admin/json/usermock.json",
        "userlist": servicebaseurl + "users",
        "deleteuserlist": servicebaseurl + "users/",
        "userroles": servicebaseurl + "roles",
        "timezones": servicebaseurl + "zones",
        "createuser": servicebaseurl + "users",
        "createorchesuser" : jbpmbaseurl + "usermgmt/add/",
        "rolelist": servicebaseurl + "rolemappers",
        "roleDetails": servicebaseurl + "rolemappers/",
        "tablist": servicebaseurl + "tabs",
        "createrole": servicebaseurl + "roles",
        "deleterole": servicebaseurl + "roles/",
        "updaterole": servicebaseurl + "roles/",
        //"alertslist":  "app/widgets/alerts/json/alertsmock.json",        
        "alertslist": eventmgmturl + "alerts",
        "alertscsvdownload": eventmgmturl + "alerts_download",
        "alertssummary": eventmgmturl + "alerts/status/groupby",
        "createworkflow": jbpmbaseurl + "workflow/create/",
        "listworkflow": jbpmbaseurl + "workflow/",
        "aiconsole": aiconsoleip + aiconsoleport + "/aiconsole/index.html?",
        "jpbmdesigner": envirounment_ip + envirounmentjbpm_port + "/kie-wb?standalone=&path=git://master@",
        //"deployprocess" : envirounment_ip +":8000/orchapi/api/v2/workflow/deploy",
        "deployprocess": jbpmbaseurl + "workflow/",
        "processversion": envirounment_ip + envirounment_port + "/orchapi/api/v2/workflow/version/automation/",
        "eventslist": eventmgmturl + "events",
        "eventssummary": eventmgmturl + "events/status/groupby",
        //"deploymentlist": envirounment_ip +":8000/orchapi/api/v1/runbook/list/CRM",
        "deploymentlist": envirounment_ip + envirounment_port + "/orchapi/api/v2/process/list",
        "automationcatelog": jbpmbaseurl + "process/",
        "automationsharecatelog": jbpmbaseurl + "workflow/",
        "automationcategory": envirounment_ip + envirounment_port + "/orchapi/api/v2/catalog/categories",
        "getautolisttotapi": envirounment_ip + envirounment_port + "/ui/api1.0/orches",
        "workflowexcute": jbpmbaseurl + "process/",
        "workflowresult": jbpmbaseurl + "process/",
        "workflowterminateprocssdel" : envirounment_ip + envirounment_port + "/orchapi/api/v3/process/",
        "eventsuppresionperc": envirounment_ip + envirounment_port + "/dashboard/api1.0/suppressionpercent/",
        "suppression30days": envirounment_ip + envirounment_port + "/dashboard/api1.0/suppression30days",
        "weeklyheatmap": envirounment_ip + envirounment_port + "/dashboard/api1.0/weeklyheatmap",
        "cmdbsummary": cmdbbaseurl + "getHostStats",
        "cmdbdevicelist": envirounment_ip + envirounment_port + "/admin/api/v2/cmdb/getAllData",
        "cmdbsavedevice": cmdbbaseurl + "insert",
        //"listforms" : envirounment_ip +":8000/api/v1/autointelli/listforms
        "listforms": envirounment_ip + envirounment_port + "/api/v2/formdesigner/listforms",
        "storeform": jbpmbaseurl + "formdesigner/",
        "editform": jbpmbaseurl + "formdesigner/",
        //"tasklist" : envirounment_ip +":8000/orchapi/api/v1/tasks/kieserver",
        "tasklist": jbpmbaseurl + "task/",
        "taskexecute": jbpmbaseurl + "task/",
        "formmetadata": jbpmbaseurl + "formdesigner/",
        "getshareuserlist": servicebaseurl + "users",
        "getshareuserlistreg": servicebaseurl + "orches/registerlog",
        "dash_baord_automation_summary": dashboard_url + "automationstats",
        "dashboard_top3alertcomponent": dashboard_url + "top3alertcomponent/",
        "dashboard_top5ci": dashboard_url + "top5ci/",
        "dashboard_alertbyseverity": dashboard_url + "alertbyseverity/",
        "dashboard_severitytrend1week": dashboard_url + "severitytrend1week",
        "dashboard_executivesummary": dashboard_url + "executiveheaders/",
        "dashboard_executivealertstatus": dashboard_url + "alertstatus/",
        "dashboard_executiveautomationstatus": dashboard_url + "automationstatus/",
        "dashboard_executiveticketstatus": dashboard_url + "ticketstatus/",
        "dashboard_executivetop5component": dashboard_url + "top5component/",
        "dashboard_executivetop5automation": dashboard_url + "top5automation/",
        "dashboard_executivesuppression30days": dashboard_url + "suppression30days/",
        "dashboard_executivealertseveritybc": dashboard_url + "alertseveritybc/",
        "dashboard_executiveautomationtypebc": dashboard_url + "automationtypebc/",
        "dashboard_executiveworkflowstatusbc": dashboard_url + "workflowstatusbc/",
        "dashboard_marstree": dashboard_url + "marstree",
        "dropeventslist": dropevents_url,
        "dropeventpromote": dropevents_url + "promote",
        "automationtimeline": envirounment_ip + envirounment_port + "/evm/api1.0/executionstage/",
        "bottreelist": borrepo_url + "bottree",
        "createbotTree": borrepo_url + "bottree/branch",
        "deletebotTree": borrepo_url + "bottree/branch/",
        "renamebotTree": borrepo_url + "bottree/branch/",
        "botfilesList": borrepo_url + "bottree/files",
        "botmasterData": borrepo_url + "bottree/masters",
        "botfileContent": borrepo_url + "bottree/filecontent/",
        "loadsmptDetails": envirounment_ip + envirounment_port + "/admin/api/v2/smtp",
        "savesmptDetails": envirounment_ip + envirounment_port + "/admin/api/v2/smtp/add",
        "smtpmasterData": envirounment_ip + envirounment_port + "/admin/api/v2/smtp/masters",
        "loadldapDetails": envirounment_ip + envirounment_port + "/admin/api/v2/ldap",
        "saveldapDetails": envirounment_ip + envirounment_port + "/admin/api/v2/ldap/add",
        "ldapmasterData": envirounment_ip + envirounment_port + "/admin/api/v2/ldap/masters",
        "loadotrsDetails": envirounment_ip + envirounment_port + "/itsm/admin/otrs/",
        "loadmanageengineDetails": envirounment_ip + envirounment_port + "/itsm/admin/sdp/",
        "saveotrsDetails": envirounment_ip + envirounment_port + "/itsm/admin/otrs/add",
        "savemanageengineDetails": envirounment_ip + envirounment_port + "/itsm/admin/sdp/add",
        "setotrsstatus": envirounment_ip + envirounment_port + "/itsm/admin/otrs/",
        "setmangeenginestatus": envirounment_ip + envirounment_port + "/itsm/admin/sdp/",
        "integrationmasterData": envirounment_ip + envirounment_port + "/admin/api/v2/itsm/masters",
        "cmdbchartdata": envirounment_ip + envirounment_port + "/admin/api/v2/cmdb/getHostUsage/",
        "loadpolicyengineList": envirounment_ip + envirounment_port + "/admin/api/v2/policies",
        "policy_masterdata": envirounment_ip + envirounment_port + "/admin/api/v2/policies/masters",
        "policy_add": envirounment_ip + envirounment_port + "/admin/api/v2/policies/add",
        "setpolicystatus": envirounment_ip + envirounment_port + "/admin/api/v2/policies/",
        "cmdbuserupdate": envirounment_ip + envirounment_port + "/admin/api/v2/cmdb/update/username",
        "cmdbpswupdate": envirounment_ip + envirounment_port + "/admin/api/v2/cmdb/update/password",
        "traigecrud": envirounment_ip + envirounment_port + "/ui/api1.0/triage",
        "automationticketform": envirounment_ip + envirounment_port + "/ui/api1.0/itsmform/nxtgen/",
        "discoverylist": envirounment_ip + envirounment_port + "/ui/api1.0/devicediscoverylist",
        "deletediscoverydet": envirounment_ip + envirounment_port + "/ui/api1.0/devicediscovery/",
        "devicecred": envirounment_ip + envirounment_port + "/ui/api1.0/devicecred/credentials",
        "devicecredadd": envirounment_ip + envirounment_port + "/ui/api1.0/devicecredentialmapper",
        "devicecreddeattach": envirounment_ip + envirounment_port + "/ui/api1.0/deattachcredentials",
        //machine 
        "getmachinelist": envirounment_ip + envirounment_port + "/admin/api/v2/cmdb/machine/getAllData",
        "getmachinemasterlist": envirounment_ip + envirounment_port + "/admin/api/v2/cmdb/masters",
        "getmachinescreeen": envirounment_ip + envirounment_port + "/ui/api1.0/triageremote/", 
        "updateremediateval": envirounment_ip + envirounment_port + "/admin/api/v2/cmdb/automationtype",
        "addmachineval": envirounment_ip + envirounment_port + "/admin/api/v2/cmdb/insert",
        "updatecredid": envirounment_ip + envirounment_port + "/admin/api/v2/cmdb/update/credentials",
        //software 
        "getsoftclass": envirounment_ip + envirounment_port + "/ui/api1.0/objectmaster/software_class",
        "getsoftsubclass": envirounment_ip + envirounment_port + "/ui/api1.0/objectmaster/software_subclass",
        "getsoftlist": envirounment_ip + envirounment_port + "/ui/api1.0/marstype/software",
        "getsoftattrlist": envirounment_ip + envirounment_port + "/ui/api1.0/attributes",
        "addsoftlist": envirounment_ip + envirounment_port + "/ui/api1.0/marstype",
        //application
        "getappclslist": envirounment_ip + envirounment_port + "/ui/api1.0/objectmaster/application_class",
        "getappsubclslist": envirounment_ip + envirounment_port + "/ui/api1.0/objectmaster/application_subclass",
        "getappdetlist": envirounment_ip + envirounment_port + "/ui/api1.0/marstype/application",
        //resource
        "getresclslist": envirounment_ip + envirounment_port + "/ui/api1.0/objectmaster/resource_class",
        "getresdetlist": envirounment_ip + envirounment_port + "/ui/api1.0/marstype/resource",
        // licence
        "getlicencekey": envirounment_ip + envirounment_port + "/ui/api1.0/license",
        "updatelicencekey": envirounment_ip + envirounment_port + "/ui/api1.0/license",
        "tickerform_masterdata": envirounment_ip + envirounment_port + "/ui/api1.0/itsmform/masters",
        "ticket_subcategory": envirounment_ip + envirounment_port + "/ui/api1.0/itsmform/masters/sub_category",
        "ticket_saveform": envirounment_ip + envirounment_port + "/ui/api1.0/itsm/sdp/",
        "alertcustomerdetget": envirounment_ip + envirounment_port + "/ui/api1.0/clients",
        "triage_history" : envirounment_ip + envirounment_port + "/ui/api1.0/triage/history",
        //admin
        "update_user_det": envirounment_ip + envirounment_port + "/ui/api1.0/users/",
        "dashbaord_classification" : envirounment_ip + envirounment_port + "/ui/api1.0/autoclassify",
        "hddm_groupdet_get" : envirounment_ip + envirounment_port + "/ui/api1.0/mgroup/mgroups",
        "hddm_machinedet_get" : envirounment_ip + envirounment_port + "/ui/api1.0/mgroup/machines",
        "monitoringet" : envirounment_ip + envirounment_port + "/ui/api1.0/mon_services/dp/hosts_new",
        "monitorinservget" : envirounment_ip + envirounment_port + "/monitoring/api/v1/data/servicelist/",
        "monitgetallapp" : envirounment_ip + envirounment_port + "/monitoring/getAllApplications",
        "monitoringgetallapp" : envirounment_ip + envirounment_port + "/ui/api1.0/mon_services/dp/hostgroups/",
        "monitorindashgetval" : envirounment_ip + envirounment_port + "/monitoring/dashboard/api/v1/data",
        "monitorindashhostlistgetval" : envirounment_ip + envirounment_port + "/monitoring/dashboard/api/v1/hostdashboard",
        "monitorindashservicelistgetval" : envirounment_ip + envirounment_port + "/monitoring/dashboard/api/v1/data/service",
        "monitorinchartget" : envirounment_ip + envirounment_port + "/monitoring/api/v1/getChart/",
        "monitoringperiodget" : envirounment_ip + envirounment_port + "/monitoring/api/v1/reports/masters",
        "monitoringavailgenereport" : envirounment_ip + envirounment_port + "/monitoring/api/v1/reports/availability",
        "monitoringavailreportget" : envirounment_ip + envirounment_port + "/monitoring/api/v1/reports/availability/grid",
        "monitoringdashval" : envirounment_ip + envirounment_port + "/ui/api1.0/mon_services_sev/",
        "monitoringdashchart" : envirounment_ip + envirounment_port + "/autointellireports/image?",
        "machinedelete" : envirounment_ip + envirounment_port + "/ui/api1.0/machines/",
        "machinedelinit" : envirounment_ip + envirounment_port + "/ui/api1.0/machines_initiate/",
        "dashboard_dyndash" : envirounment_ip + envirounment_port + "/dyndash/api1.0/",
        "dashboard_dyndash" : envirounment_ip + envirounment_port + "/dyndash/api1.0/",
        "Rcaalertgetval" : envirounment_ip + envirounment_port + "/api/V1/inference",
        "Rcaalertsendval" : envirounment_ip + envirounment_port + "/api/V1/feedback",
        "ucigetalldet" : envirounment_ip + envirounment_port + "/ui/api1.0/cin_user",
        "monperformreportget" : envirounment_ip + envirounment_port + "/dashboard/api1.0/getPerfIFrame",
        "anomalychartdetget" : envirounment_ip + envirounment_port + "/anomalygraph",
        // "anomalychartdetget" : envirounment_ip + envirounment_port + "/api/V1/anomaly",
        "anomalyhostgrpdetget" : envirounment_ip + envirounment_port + "/inv/api1.0/inv_receiver/bangalore",
        "admincustdetget" : envirounment_ip + envirounment_port + "/ui/api1.0/cust_service_map",
        "admincustmapdetget" : envirounment_ip + envirounment_port + "/ui/api1.0/user_cust_map",
        "custvmwaremapdetget" : envirounment_ip + envirounment_port + "/ui/api1.0/client_vms",
        "getarcmasterdata" : envirounment_ip + envirounment_port + "/admin/api/v2/arcon",
        "getmonitoringunknow" : envirounment_ip + envirounment_port + "/ui/api1.0/mon_hostservice/unknows",
        "getmonitoringservsort" : envirounment_ip + envirounment_port + "/ui/api1.0/mon_services",
        "postresetpwd" : envirounment_ip + envirounment_port + "/ui/api1.0/users/firstimeset",
        "getmonitoringhstgrp" : envirounment_ip + envirounment_port + "/ui/api1.0/mon_dashboard/overall",
        "postmonitoringhstgrpdet" : envirounment_ip + envirounment_port + "/ui/api1.0/mon_dashboard/typegrid",
        "gethypergriddet" : envirounment_ip + envirounment_port + "/ui/api1.0/hypervisor",
        "gethyperingriddet" : envirounment_ip + envirounment_port + "/ui/api1.0/hypervisor_tot/",
        "gethyperkvmtotal" : envirounment_ip + envirounment_port + "/ui/api1.0/hypervisorkvm_totsumm",
        "gethyperroutertotal" : envirounment_ip + envirounment_port + "/ui/api1.0/hypervisorrouter/",
        "gethyperlbtotal" : envirounment_ip + envirounment_port + "/ui/api1.0/hypervisorlb/",
        "gethyperfwtotal" : envirounment_ip + envirounment_port + "/ui/api1.0/hypervisorfirewall/",
        "gethyperswtotal" : envirounment_ip + envirounment_port + "/ui/api1.0/hypervisorswitch/",
        "gethyperkvmspl" : envirounment_ip + envirounment_port + "/ui/api1.0/hypervisorkvm_singleobject/",
        "posthyperingriddet" : envirounment_ip + envirounment_port + "/ui/api1.0/hypervisor_singleobject",
        // "getcustmaildet" : envirounment_ip + envirounment_port + "/ui/api1.0/customerservice/",
        "getcustmaildet" : envirounment_ip + envirounment_port + "/ui/api1.0/customerservice/email/",
        "sendcustmaildet" : envirounment_ip + envirounment_port + "/ui/api1.0/customerservice/email",
        "reportedgeget" : envirounment_ip + envirounment_port + "/ui/api1.0/nsxedge",
        "clouddetget" : envirounment_ip + envirounment_port + "/ui/api1.0/vmware/cloud/registry",
        "clouddetupdateput" : envirounment_ip + envirounment_port + "/ui/api1.0/vmware/cloud/registry",
        "cloudmapdet" : envirounment_ip + envirounment_port + "/ui/api1.0/vmware/cloud/map",
        "reportbandwidthget" : envirounment_ip + envirounment_port + "/ui/api1.0/kvmedge",
        "reportbanddetget" : envirounment_ip + envirounment_port + "/ui/api1.0/perfreport/network/router",
        "reportperflovget" : envirounment_ip + envirounment_port + "/ui/api1.0/perfreport/main/items",
        "reportperfdetpost" : envirounment_ip + envirounment_port + "/ui/api1.0/perfreport/main/items/sidelist",
        "reportperffwdetpost" : envirounment_ip + envirounment_port + "/ui/api1.0/perfreport/main/items/metriclist",
        "reportperfcdetpost" : envirounment_ip + envirounment_port + "/ui/api1.0/perfreport/all/decissue",
        "reportrepocustlovget" : envirounment_ip + envirounment_port + "/ui/api1.0/reports/vmsumm/getcustomers/",
        "reportrepocustcsvget" : envirounment_ip + envirounment_port + "/ui/api1.0/reports/vmsumm/download",
        "reportrepocustgridget"  : envirounment_ip + envirounment_port + "/ui/api1.0/reports/vmsumm/grid/", 
        "monitorashyplistget"  : envirounment_ip + envirounment_port + "/ui/api1.0/autoscale/hypervisormapping", 
        "monitoraslistget"  : envirounment_ip + envirounment_port + "/ui/api1.0/autoscale/autoscale", 
        "monitorashypvmwarelistget"  : envirounment_ip + envirounment_port + "/ui/api1.0/autoscale/vm2hypervisor", 
        "monitorashypvmwarepost"  : envirounment_ip + envirounment_port + "/ui/api1.0/autoscale/autoscale",
        "monitorastenantpost"  : envirounment_ip + envirounment_port + "/ui/api1.0/autoscale/tenants",
        "csanalyticschart1get"  : envirounment_ip + envirounment_port + "/ui/api1.0/autoscale/analytics1/",
        "csanalyticschart2get"  : envirounment_ip + envirounment_port + "/ui/api1.0/autoscale/analytics2/",
        "csanalyticschartcsvget"  : envirounment_ip + envirounment_port + "/ui/api1.0/autoscale/",
        "inteldcmctget" : envirounment_ip + envirounment_port + "/admin/api/v2/intelDCM",
        "vmovtimestampget" : envirounment_ip + envirounment_port + "/admin/api/v2/vmware/listTimeStamps",
        "vmovlistvcenterget" : envirounment_ip + envirounment_port + "/admin/api/v2/vmware/listvCenters",
        "vmovlistvmwaredetget" : envirounment_ip + envirounment_port + "/admin/api/v2/vmware/",
        "monitornetlatenget" : envirounment_ip + envirounment_port + "/admin/api/v2/networkLatency/",
        "monitoradhostgrpget" : envirounment_ip + envirounment_port + "/ui/api1.0/monitoring/"

    }
};