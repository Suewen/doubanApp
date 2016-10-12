
(function() {

    /**
     * hotModule Module
     *
     * Description
     */
    var willModule = angular.module('doubanApp.willModule', ['doubanApp.service']);
    willModule.controller('WillController', ['$scope', '$http','JsonpService','$routeParams','$route','$rootScope', function($scope, $http,JsonpService,$routeParams,$route,$rootScope) {
        $rootScope.category = 'will';
        //ÿҳ��ʾ������
        var count = 10;
        //��ǰҳ��
        var currentPage = parseInt($routeParams.page || 1);
        $scope.currentPage = currentPage;
        //�ӵڼ�����ʼ��ʾ
        var start = (currentPage -1) * count;

        // ����
        JsonpService.jsonp('https://api.douban.com/v2/movie/coming_soon',{count:count,start:start},function(res){
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

