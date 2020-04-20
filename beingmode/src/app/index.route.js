(function () {
    'use strict';

    angular
        .module('app')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true);
        $stateProvider

            // Home route
            .state('home', {
                url: '/',
                templateUrl: 'app/home/home.view.html',
                controller: 'HomeController',
                controllerAs: 'home',
                data: {}
            })

        $urlRouterProvider.otherwise('/login');
    }

})();
