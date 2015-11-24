(function() {
    'use strict';

    angular
        .module('alerts')
        .controller('alertController', alertController);

    alertController.$inject = [];

    /* @ngInject */
    function alertController() {
        var vm = this;
        vm.alerts = [
        	{ type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
    		{ type: 'success', msg: 'Well done! You successfully read this important alert message.' }
        ];
        vm.title = 'Controller';
        vm.text = text;
        vm.addAlert = addAlert; //("alert Type", "message") > an alert is added with that type and message
        vm.closeAlert = closeAlert;

        ////////////////

        function addAlert(alertType, text){
        	alerts.push({type:alertType, msg:text});
        };
        function closeAlert(index){
        	alerts.splice(index,1);
        };

    }
})();