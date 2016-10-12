/**
 * Created by Administrator on 2016/9/28.
 */
(function(){
    var detailModule = angular.module('doubanApp.detailModule', ['ngRoute','doubanApp.service']);
    detailModule.config(['$routeProvider',function($routeProvider) {
        $routeProvider.
            when('/subject/:id?', {
                templateUrl: 'detail/detail.html',
                controller: 'DetailController'
            })
    }]);

    detailModule.controller('DetailController', ['$scope', '$http','JsonpService','$routeParams','$route','$rootScope','appConfig',function($scope, $http,JsonpService,$routeParams,$route,$rootScope,appConfig){
        $scope.loading = false;
        JsonpService.jsonp(appConfig.detailUrl + $routeParams.id,{}, function(res){
            $scope.movie = res;
            $scope.summary = res.summary;
            $scope.loading = true;
            $scope.$apply();

        });
    }]);
})();