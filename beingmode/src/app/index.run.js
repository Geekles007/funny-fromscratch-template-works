(function () {
    'use strict';

    angular
        .module('app')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, $rootScope, $state) {
        $log.debug('runBlock end');

    }

})();
