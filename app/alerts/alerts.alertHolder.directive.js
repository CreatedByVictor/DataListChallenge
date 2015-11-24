(function() {
    'use strict';

    angular
        .module('alerts')
        .directive('alertHolder', alertHolder);

    alertHolder.$inject = [];

    /* @ngInject */
    function alertHolder() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: alertController,
            controllerAs: 'vm',
            link: link,
            restrict: 'A',
            scope: {
            }
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    /* @ngInject */
    function alertController() {

    }
})();