/**
 * Created by JackieWu on 16/3/23.
 */
import 'babel-polyfill';
import 'angular';
import 'angular-ui-router';
import 'ocLazyLoad';
import './lib/modules/ui-router-require-polyfill';
import './lib/service/service-config';
import '../../node_modules/isteven-angular-multiselect/isteven-multi-select';
import 'angular-sanitize';
import 'angular-animate';
import 'angular-resource';
import 'angular-touch';
import 'moment';
import 'angular-moment';
import './lib/modules/select-tpls';
import 'angular-smart-table';
import 'angular-cookies';
import './lib/modules/ng-notify';

import './lib/modules/angular-strap';
import 'angular-strap/dist/angular-strap.tpl';
// loading
import './lib/modules/me-pageloading';
import routeConfig from './lib/modules/route-config';
import header from './lib/header/header-controller';
import nav from './lib/nav/nav-controller';
import bulletin from './lib/bulletin/bulletin-controller';
window.echarts = require('echarts');

import '../../node_modules/ng-echarts/dist/ng-echarts';

// 再次确认弹窗
import 'sweetalert';
// 拖拽插件
import './lib/modules/angular-sortable-view';
import './lib/modules/sweet-alert';
import '../less/main.less';
// 将url赋值给window上保证全局都可以调用 

window.angular.module('angularWebpack', [ 'mgcrea.ngStrap',
    'ui.router', 'angular.service',
    'ui.router.requirePolyfill',
    'ngTouch', 'ngSanitize',
    'me-pageloading', 'ngNotify'])

    .controller('headerController', header).directive("aheader", () => {
        return {
            restrict: 'E',
            controller: 'headerController',
            template: require('../route-tpl/header/header.html'),
            transclude: true,
            replace: true
        }
    })
    .controller('navController', nav).directive("anav", () => {
        return {
            restrict: 'E',
            controller: 'navController',
            template: require('../route-tpl/nav/nav.html'),
            transclude: true,
            replace: true
        }
    })
    .controller('bulletinController', bulletin).directive("abullentin", () => {
        return {
            restrict: 'E',
            controller: 'bulletinController',
            template: require('../route-tpl/bulletin/bulletin.html'),
            transclude: true,
            replace: true
        }
    })

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider','$compileProvider', '$datepickerProvider',routeConfig]);

window.angular.bootstrap(document, ['angularWebpack']);
