
(function() {

    /**
     * hotModule Module
     *
     * Description
     */
    var listModule = angular.module('doubanApp.listModule', ['ngRoute','doubanApp.service']);

    listModule.config(['$routeProvider',function($routeProvider) {
        $routeProvider.
            when('/:category/:page?', {
                templateUrl: 'list/list.html',
                controller: 'ListController'
            })
    }]);
   listModule.controller('ListController', ['$scope', '$http','JsonpService','$routeParams','$route','$rootScope','appConfig', function($scope, $http,JsonpService,$routeParams,$route,$rootScope,appConfig) {
       //console.log($routeParams.category)
       $rootScope.category = $routeParams.category;
       //$rootScope.search = function(){
       //    $route.updateParams({category:'search',q:$rootScope.input});
       //}
       var count= appConfig.pageCount;
        //当前页码
       var currentPage = parseInt($routeParams.page || 1);
       $scope.currentPage = currentPage;
        //从第几条开始显示
       var start = (currentPage -1) * count;

       // 跨域
       JsonpService.jsonp(appConfig.listUrl+$routeParams.category,{count:count,start:start,q:$rootScope.input},function(res){
           $scope.subjects = res.subjects;
           //数据的总条数
           $scope.total = res.total;

           $scope.title = res.title;
           //共有几页
           $scope.totalPage = Math.ceil($scope.total/count);

           //配置分页,数据请求完毕pageConfig才有值
           $scope.pageConfig = {
               total:$scope.totalPage,
               show:9,
               current:currentPage,
               click:function(index){
                   //index = Math.min(Math.max(index,1),$scope.totalPage);
                   $route.updateParams({page:index});
                   //$route.reload();
               },
           };

           $scope.$apply();

           //$scope.hundlePage = function(page){
           //    page = Math.min(Math.max(page,1),$scope.totalPage);
           ////更改路由参数,需要用到$route这个参数
           ////    $route.updateParams({page:page});
           //}
       //
       })



   }])




})()
// 此种方式污染了全局环境
// function fun(data) {
// 	console.log(data)
// }

