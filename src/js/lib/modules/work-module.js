/**
 * Created by Jackie.Wu on 16/10/11.
 */
// 项目里所有页面所用的公共方法
export function watch($scope,watchName, callback) {
    return $scope.$watch(watchName, (value, oldValue)=> {
        value !== oldValue && callback && callback(value, oldValue);
    })
}
export function popModule($scope, $modal, url, show) {
    return $modal({
        scope: $scope,
        templateUrl: url,
        show: show
    })
}
export function notifyObj(type, time) {
    return {
        position: 'top',
        type: type || 'info',
        duration: time || 3000,
        sticky: false
    }
}