
(function() {

    /**
     * hotModule Module
     *
     * Description
     */
    var top250Module = angular.module('doubanApp.top250Module', ['doubanApp.service']);
    top250Module.controller('Top250Controller', ['$scope', '$http','JsonpService','$routeParams','$route','$rootScope', function($scope, $http,JsonpService,$routeParams,$route,$rootScope) {
        $rootScope.category = 'top';
        //每页显示的条数
        var count = 10;
        //当前页码
        var currentPage = parseInt($routeParams.page || 1);
        $scope.currentPage = currentPage;
        //从第几条开始显示
        var start = (currentPage -1) * count;

        // 跨域
        JsonpService.jsonp('https://api.douban.com/v2/movie/top25',{count:count,start:start},function(res){
            $scope.subjects = res.subjects;
            //数据的总条数
            $scope.total = res.total;

            $scope.title = res.title;
            //共有几页
            $scope.totalPage = Math.ceil($scope.total/count);

            $scope.$apply();

            $scope.hundlePage = function(page){
                //if(page <1 || page > $scope.totalPage){
                //    return;
                //}
                page = Math.min(Math.max(page,1),$scope.totalPage);
                //更改路由参数,需要用到$route这个参数
                $route.updateParams({page:page});
            }
        })

    }])




})()
// 此种方式污染了全局环境
// function fun(data) {
// 	console.log(data)
// }

