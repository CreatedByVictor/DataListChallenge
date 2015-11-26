(function() {
    'use strict';

    angular
        .module('core')
        .directive('coreDeadlineDate', deadlineDate);

    deadlineDate.$inject = ['dataService'];

    /* @ngInject */
    function deadlineDate(dataService) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,

            controller: DeadlineDateController,
            controllerAs: 'vm',
 
            templateUrl: 'app/core/directive-templates/deadline-date.html',

            link: link,
            restrict: 'E',
            scope: {
            	deadlineId:"=id"
            }
        };
        return directive;

        function link(scope, element, attrs) {
        	scope.deadlineId = attrs.id;
        }
    }

    /* @ngInject */
    function DeadlineDateController(dataService) {
    	var vm = this;
    	
    	var deadline = dataService.getDeadline(this.deadlineId);

    	vm.id  			= this.deadlineId;
    	vm.date 		= deadline.date;
    	vm.timestamp 	= deadline.timestamp;

    	///////////////

    }
})();