(function() {
    'use strict';

    angular
        .module('modals')
        .controller('itemRemovalController', itemRemovalController);

    itemRemovalController.$inject = ['item', 'type', '$uibModalInstance'];

    /* @ngInject */
    function itemRemovalController(item, type, $uibModalInstance) {
        var vm = this;

        vm.item = item;
        vm.type = type;

        vm.body = item.date || item.name;

        vm.no 	= no;
        vm.yes 	= yes;

        ////////////////

        function no(){
        	$uibModalInstance.dismiss();
        };

        function yes(){
        	$uibModalInstance.close();
        };

    }
})();