
(function() {

    /**
     * hotModule Module
     *
     * Description
     */
    var top250Module = angular.module('doubanApp.top250Module', ['doubanApp.service']);
    top250Module.controller('Top250Controller', ['$scope', '$http','JsonpService','$routeParams','$route','$rootScope', function($scope, $http,JsonpService,$routeParams,$route,$rootScope) {
        $rootScope.category = 'top';
        //ÿҳ��ʾ������
        var count = 10;
        //��ǰҳ��
        var currentPage = parseInt($routeParams.page || 1);
        $scope.currentPage = currentPage;
        //�ӵڼ�����ʼ��ʾ
        var start = (currentPage -1) * count;

        // ����
        JsonpService.jsonp('https://api.douban.com/v2/movie/top25',{count:count,start:start},function(res){
            $scope.subjects = res.subjects;
            //���ݵ�������
            $scope.total = res.total;

            $scope.title = res.title;
            //���м�ҳ
            $scope.totalPage = Math.ceil($scope.total/count);

            $scope.$apply();

            $scope.hundlePage = function(page){
                //if(page <1 || page > $scope.totalPage){
                //    return;
                //}
                page = Math.min(Math.max(page,1),$scope.totalPage);
                //����·�ɲ���,��Ҫ�õ�$route�������
                $route.updateParams({page:page});
            }
        })

    }])




})()
// ���ַ�ʽ��Ⱦ��ȫ�ֻ���
// function fun(data) {
// 	console.log(data)
// }

