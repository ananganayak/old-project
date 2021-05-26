angular.module('widgets').directive('intelliReview', function() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'app/widgets/review/template/review.html',
        link: function(scope, element) {            
        }
    };
});