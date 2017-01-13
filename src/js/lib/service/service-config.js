export default (()=> {
    angular.module('angular.service', [])
        .service('Ajax', ['$http', '$q', 'ngNotify', 'mePageLoading', ($http, $q, ngNotify, mePageLoading)=> {
            return (method, url, data)=> {
                let defered = $q.defer();
                let config = {
                    url: url
                };
                if (method === 'POST') {
                    if(window.location.href.includes('localhost')){
                        config.method = 'GET';
                        config.params = data;
                    } else {
                        config.method = 'POST';
                        config.data = data;
                    }
                } else if ('GET' === method) {
                    config.params = data;
                }
                $http(config).success((data)=> {
                    defered.resolve(data);

                }).error((err)=> {
                    defered.reject(err);
                    console.log(err);
                    ngNotify.set('请求返回异常,请重试', {
                        position: 'top',
                        type: 'error',
                        duration: 5000,
                        sticky: false
                    });
                    mePageLoading.hide();
                });
                return defered.promise;
            }
        }])
        .factory('movies', ['$http', '$q', ($http, $q)=> {
            const getByrRequest = (method, url, data)=> {
                let canceller = $q.defer();

                let cancel = function (reason) {
                    canceller.resolve(reason);
                };
                let config = {
                    method: method,
                    url: url,
                    timeout: canceller.promise
                };
                if (method === 'POST') {
                    config.data = data;
                } else if ('GET' === method) {
                    config.params = data;
                }

                let promise = $http(config);

                return {
                    promise: promise,
                    cancel: cancel
                };
            };

            return {
                getByrRequest: getByrRequest
            };
        }])
})()

