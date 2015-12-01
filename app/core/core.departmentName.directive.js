(function() {
    'use strict';

    angular
        .module('core')
        .directive('coreDepartmentName', departmentName);

    departmentName.$inject = ['dataService'];

    /* @ngInject */
    function departmentName(dataService) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,

            controller: DepartmentNameController,
            controllerAs: 'vm',
 
            templateUrl: 'app/core/directive-templates/department-name.html',

            link: link,
            restrict: 'E',
            scope: {
            	deptId:"=id"
            }
        };
        return directive;

        function link(scope, element, attrs) {
        	scope.deptId = attrs.id;
        }
    }

    /* @ngInject */
    function DepartmentNameController(dataService) {
    	var vm = this;
    	
    	var dept = dataService.getDepartment(this.deptId);
        if (dept){
            vm.id           = this.deptId;
            vm.name         = dept.name;
        }
        else{
            vm.id = null;
            vm.name = null;
        }

    	///////////////

    }
})();