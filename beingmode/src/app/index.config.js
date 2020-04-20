(function () {
    'use strict';

    angular
        .module('app')
        .config(config)

        .config(configInterceptors)

    function configInterceptors($httpProvider){
        $httpProvider.interceptors.push(['$q', '$rootScope', function ($q, $rootScope) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    return config;
                },
                'responseError': function (response) {
                    if (response.status === 401 || response.status === 403) {
                        // window.location = 'login';
                    }
                    return $q.reject(response);
                }
            };
        }]);
    }

    /** @ngInject */
    function config($logProvider) {

        // Autoriser les log en mode DEV
        $logProvider.debugEnabled(true);

        // config des lib ici
        // toastrConfig.allowHtml = true;
        // toastrConfig.timeOut = 3000;

        // toastrConfig.preventDuplicates = true;


    }

})();
