// 配置路由机制
export default ($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider, $datepickerProvider)=> {
    // 重新配置javascript:void(0)
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
    const stateConfig = (url, template)=> ({
        url: url,
        templateUrl: template
    });
    // console.log(window.menuList)
    // $urlRouterProvider.otherwise("/index");
    $stateProvider
        // 首页
        .state('/index/cpc', stateConfig('/index/cpc', '../route-tpl/template/index/cpc/cpc-index.html'))

    ;
    window.angular.extend($datepickerProvider.defaults, {
        dateFormat: 'yyyy-MM-dd',
        startWeek: 1
    });
}
