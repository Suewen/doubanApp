(function () {

    /**
     * doubanApp Module
     *
     * Description
     */
    var doubanApp = angular.module('doubanApp', ['ngRoute','doubanApp.detailModule','doubanApp.listModule']);

    doubanApp.config(['$routeProvider',function($routeProvider) {
        $routeProvider.
            otherwise({
                redirectTo:'/in_theaters'
            })
    }]);

    doubanApp.constant('appConfig',{
        listUrl:'https://api.douban.com/v2/movie/',
        detailUrl:'https://api.douban.com/v2/movie/subject/',
        pageCount:5,
    });

    doubanApp.directive('search',['$route','$routeParams','$location','$timeout',function($route,$routeParams,$location,$timeout){
        return {
            replace:true,
            template:'<form ng-submit="search()" class="navbar-form navbar-right">\
        <input type="text" class="form-control" placeholder="Search..." ng-model="input">\
            </form>',
            link:function($scope,ele,attr){
                $scope.search = function(){
                    if($routeParams.category){
                        console.log($routeParams.category)
                        $route.updateParams({category:'search',q:$scope.input});
                    }else{
                        $location.path('search');
                        $timeout(function(){
                            $route.updateParams({category:'search',q:$scope.input});
                        },0);

                    }
                }
            }
        }

    }]);

    doubanApp.directive('page',[function(){
        return {
            replace:true,
            template:'<ul class="pagination">\
            <li ng-click="hundlePage(item)" ng-repeat="item in pages" ng-class="{active:item==current}"><a>{{item}}</a></li>\
            </ul>',
            link:function($scope,ele,attr){
                $scope.$watch('pageConfig',function(pageConfig){
                    if(pageConfig){
                        var total = pageConfig.total;
                        var show = pageConfig.show;
                        var current = pageConfig.current;
                        $scope.current = current;
                        var region = Math.floor(show/2);
                        var begin = current - region;
                        begin = Math.max(1,begin);
                        var end = begin +show;
                        if(end >total){
                            end = total + 1;
                            begin = end - show;
                            begin = Math.max(1,begin);
                        }
                        var pagination = ele[0];
                        var pages = [];
                        $scope.pages = pages;
                        $scope.hundlePage = function(index){
                            //调用控制器传递过来的方法
                            pageConfig.click(index);
                        }
                        for(var i =begin;i<end;i++){
                            pages.push(i);
                        }
                    }
                });
            }
        }
    }]);
})();