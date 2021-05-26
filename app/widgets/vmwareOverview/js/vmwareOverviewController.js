angular.module('widgets').controller('vmwareOverviewController', [
    '$scope',
    '$timeout',
    '$rootScope',
    'intellivmwareoverviewService',
    function ($scope, $timeout, $rootScope, $intellivmwareoverviewService) {



        // $scope.selvmovvcenter = 'All';
        // $scope.selvmovcluster = 'All';

        $scope.vsphereoverviewpanel = false;
        $scope.clusteroverviewpanel = false;
        $scope.clustercpuusagepanel = false;


        $scope.loadtimestampfn = function(){
            $rootScope.showSpinner = true;
            $intellivmwareoverviewService.getlovtimestampserv().then(function(res){
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{
                    if(res.result == "success"){
                        console.log(res, "TimeStamp list")
                        $scope.gettimstampval = res.data;
                        $rootScope.showSpinner = false;
                    }else{
                        $rootScope.showSpinner = false;
                        notie.alert(3, res.data, config.notify_delay);
                    }
                }
            })
        }

        $scope.loadlistvCentersfn = function(){
            $rootScope.showSpinner = true;
            $intellivmwareoverviewService.getlovlistvCentersserv().then(function(res){
                if(res == config.service_unavailable){
                    notie.alert(3, res, config.notify_delay);
                    $rootScope.showSpinner = false;
                }else{
                    if(res.result == "success"){
                        console.log(res, "Vcenter List")
                        $scope.getlistvcenterval = res.data;
                        $rootScope.showSpinner = false;
                    }else{
                        $rootScope.showSpinner = false;
                        notie.alert(3, res.data, config.notify_delay);
                    }
                }
            })
        }


        // Vmware Cpu Usage chart
        function draw_vmovCpuUsage(ele_id, dataset) {
            Pace.restart();            
            var dataseries = [];
            var datalegend = [];
            var dataxaxis = [];
            // console.log(res_arr);
            for (var [key, value] of Object.entries(dataset.data)) {
                datalegend.push(key)
                dataseries.push({
                    name: key,
                    type: 'line',
                    data: value.map(function (item) {
                        return item[1];
                    }),
                    hoverAnimation: false,
                    symbolSize: 6,
                    markPoint: {
                        data: [
                            {type: 'max', name: 'High'},
                        ]
                    },
                    showSymbol: false
                })
            }
            for (var [key, value] of Object.entries(dataset.data)) {
                for (let i = 0; i < value.length; i++) {
                    dataxaxis.push(value[i][0]);
                }
                break;
            }
            
            var myChart = echarts.init(document.getElementById(ele_id));
            var option = {
                // title: {
                //     text: $scope.interfaceval+'__'+$scope.selperflist,
                //     textStyle: {
                //         fontSize: 14
                //     },
                // },
                color: ['#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#00bcd4', '#4caf50', '#cddc39'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        animation: false,
                        label: {
                            backgroundColor: '#ccc',
                            borderColor: '#aaa',
                            borderWidth: 1,
                            shadowBlur: 0,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            color: '#222'
                        }
                    },
                    formatter: function (params) {
                        var val =[];
                        for (var i = 0; i < params.length; i++) {
                            val.push(params[i].seriesName + ' : ' +params[i].value);
                        }
                        return val;
                        // return params[0].seriesName +':'+params[0].value+ '<br/>'+ params[1].seriesName +':'+ params[1].value+ '<br/>'+ params[2].seriesName +':'+ params[2].value;
                    }
                },
                dataZoom: [{
                    type: 'inside'
                }, {
                    type: 'slider'
                }],
                grid: {
                    top: '20%',
                    left: '10%%',
                    right: '10%',
                    bottom: '15%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: dataxaxis,
                    axisLabel: {
                        // interval: 20,
                        rotate: 0 //If the label names are too long you can manage this by rotating the label.
                    },
                    splitLine: {
                        show: true
                    },
                    boundaryGap: true
                },
                yAxis: {
                    name: dataset['y-axis'],
                    axisLabel: {
                        formatter: function (val) {
                            return (val);
                        }
                    },
                    splitNumber: 3,
                    splitLine: {
                        show: true
                    }
                },
                legend: {
                    data: datalegend,
                    center: 20
                },
                toolbox: {
                    show: true,
                    feature: {
                        saveAsImage: {show: true, title: 'Save As JPG'},
                        magicType: {show: true, type: ['line', 'bar'], title: 'Chart Type'},
                    }
                },
                series: dataseries,
            };
            myChart.setOption(option, true);
        }


        function init_event() {

            $scope.selvmovtimestamp = "6h";
            
            $scope.timestampbasedgetfn = function(){
                $scope.vspheredetgetfn();
                $scope.clusteroverviewdetgetfn();
            }

            $scope.clusterbaseddetfn = function(){
                $scope.clusteroverviewdetgetfn();
            }

            // vSphere Detail Get Function
            $scope.vspheredetgetfn = function(){
                $rootScope.showSpinner = true;
                console.log($scope.selvmovvcenter, $scope.selvmovtimestamp);
                $intellivmwareoverviewService.getvspheredetserv($scope.selvmovvcenter, $scope.selvmovtimestamp).then(function(res){
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{
                        if(res.result == "success"){
                            $scope.getvsphereval = res;
                            console.log($scope.getvsphereval, "vSphere List")
                            $scope.vsphereoverviewpanel = true;
                            $rootScope.showSpinner = false;
                        }else{
                            $rootScope.showSpinner = false;
                            notie.alert(3, res.data, config.notify_delay);
                        }
                    }
                })
            }

            // Cluster Overview Detail get Function
            $scope.clusteroverviewdetgetfn = function(){
                $rootScope.showSpinner = true;
                console.log($scope.selvmovvcenter, $scope.selvmovtimestamp, $scope.selvmovcluster);
                $intellivmwareoverviewService.getclusteroverviewserv($scope.selvmovvcenter, $scope.selvmovtimestamp, $scope.selvmovcluster).then(function(res){
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{
                        if(res.result == "success"){
                            $scope.getclusteroverviewval = res;
                            console.log($scope.getclusteroverviewval, "Cluster Value List")
                            $scope.clusteroverviewpanel = true;
                            $rootScope.showSpinner = false;
                        }else{
                            $rootScope.showSpinner = false;
                            notie.alert(3, res.Message, config.notify_delay);
                        }
                    }
                })
            }

            // Cluster CPU Usage Detail get Function
            $scope.clustercpudetgetfn = function(){
                $rootScope.showSpinner = true;
                console.log($scope.selvmovvcenter, $scope.selvmovtimestamp);
                $intellivmwareoverviewService.getclustercpuserv($scope.selvmovvcenter, $scope.selvmovtimestamp).then(function(res){
                    if(res == config.service_unavailable){
                        notie.alert(3, res, config.notify_delay);
                        $rootScope.showSpinner = false;
                    }else{
                        if(res.result == "success"){
                            $scope.getclustercpuval = res;
                            console.log($scope.getclustercpuval, "Cluster CPU Usage");
                            draw_vmovCpuUsage("vmOvCpuUsageChart", $scope.getclustercpuval);
                            $scope.clustercpuusagepanel = true;
                            $rootScope.showSpinner = false;
                        }else{
                            $rootScope.showSpinner = false;
                            notie.alert(3, res.Message, config.notify_delay);
                        }
                    }
                })
            }
            

            $scope.vcenterbasedgetfn = function(){
              
                if($scope.selvmovvcenter == ''){
                    notie.alert(3, "Select the vCenter", config.notify_delay);
                }else{
                    $scope.vspheredetgetfn();
                    $scope.clustercpudetgetfn();
                    $rootScope.showSpinner = true;
                    $intellivmwareoverviewService.getlovlistClustersserv($scope.selvmovvcenter).then(function(res){
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{
                            if(res.result == "success"){
                                console.log(res, "Clusters List")
                                $scope.getlistClustersval = res.data;
                                $rootScope.showSpinner = false;
                            }else{
                                $rootScope.showSpinner = false;
                                notie.alert(3, res.data, config.notify_delay);
                            }
                        }
                    })
                    $rootScope.showSpinner = true;
                    $intellivmwareoverviewService.getlovlistEsxisserv($scope.selvmovvcenter).then(function(res){
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{
                            if(res.result == "success"){
                                console.log(res, "ESxis List")
                                $scope.getlistEsxisval = res.data;
                                $rootScope.showSpinner = false;
                            }else{
                                $rootScope.showSpinner = false;
                                notie.alert(3, res.data, config.notify_delay);
                            }
                        }
                    })
                    $rootScope.showSpinner = true;
                    $intellivmwareoverviewService.getlovlistDatastoresserv($scope.selvmovvcenter).then(function(res){
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{
                            if(res.result == "success"){
                                console.log(res, "Datastore List")
                                $scope.getlistDatastoresval = res.data;
                                $rootScope.showSpinner = false;
                            }else{
                                $rootScope.showSpinner = false;
                                notie.alert(3, res.data, config.notify_delay);
                            }
                        }
                    })
                    $rootScope.showSpinner = true;
                    $intellivmwareoverviewService.getlovlistVMsserv($scope.selvmovvcenter).then(function(res){
                        if(res == config.service_unavailable){
                            notie.alert(3, res, config.notify_delay);
                            $rootScope.showSpinner = false;
                        }else{
                            if(res.result == "success"){
                                console.log(res, "VMs List")
                                $scope.getlistVMsval = res.data;
                                $rootScope.showSpinner = false;
                            }else{
                                $rootScope.showSpinner = false;
                                notie.alert(3, res.data, config.notify_delay);
                            }
                        }
                    })
                }
            }

        }

        $scope.init = function () {
            init_event();
            $scope.loadtimestampfn();
            $scope.loadlistvCentersfn();
            $scope.vspheredetgetfn();
        }


    }
])