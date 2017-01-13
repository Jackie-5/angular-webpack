window.angular.module('angularWebpack', [])
    .controller(
        'indexController', ['$scope','mePageLoading',($scope,mePageLoading)=> {
                mePageLoading.show('Frame it');
                mePageLoading.hide();

                
            }]);
