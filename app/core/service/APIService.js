'use strict';
angular.module('services').factory('APIService', ['$http', '$q', function($http, $q) {
        return {
            doApiCall: function(url, method, payload) {
                var deferred = $q.defer();
                var xhr = null;
                
                var header_obj = {};
                
                header_obj["Content-Type"] = "application/json";
                
                if(sessionStorage["session_id"]){
                  header_obj["sessionkey"] = sessionStorage["session_id"];
                }
                
                xhr = $http({
                    method: method,
                    url: url,
                    headers: header_obj,
                    data: payload,
                    transformRequest: function(obj) {
                        return JSON.stringify(obj);
                    }
                });
                
                xhr.success(function(result) {
                    //console.log($.parseJSON(result));
                    deferred.resolve(result);
                });
                xhr.error(function(error) {
                    console.log(error);
                    deferred.reject(error);
                });
                return deferred.promise;
            },
            headerTokens: function(param) {
                return param;
            },
            doApiAjaxCall : function(url, method, payload) {
                var deferred = $q.defer();
                var jsondata = JSON.stringify(payload);
                $.ajax({
                    url: url,
                    type: method,
                    data: jsondata,
                    contentType: "application/json",
                    dataType: "json",
                    async: true,
                    success: function(data) {
                        deferred.resolve(data);
                    },
                    error: function(data) {
                        deferred.reject(data);
                    },
                    cache: false
                });
                return deferred.promise;
            }
        };
    }]);