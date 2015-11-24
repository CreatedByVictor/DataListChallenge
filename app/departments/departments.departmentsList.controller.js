(function(){

	angular
		.module('departments')
		.controller('departmentsListController', departmentsListController);

	departmentsListController.$inject = ['dataService', '$state'];

	function departmentsListController(dataService, $state){
		var vm = this;

		vm.departments = dataService.listDepartmentsFull();
		
		vm.getDeadline = getDeadline;

		vm.getProject = getProject;
		
		vm.getResource = getResource;

		vm.projectSortPredicate = projectSortPredicate;

		vm.pageTitle = "Department Projects";

		vm.sortingStateA = "departments"; // deadline View
		vm.sortingStateB = "departments.resources";

		vm.sortingNameA = "Deadline Date";
		vm.sortingNameB = "Resource Count"; 

		///////////////////////////

		function getDeadline(id){
			return dataService.getDeadline(id);
		};

		function getProject(id){
			return dataService.getProject(id);
		};

		function getResource(id){
			return dataService.getResource(id);
		};

		function projectSortPredicate(inputProject){
			if ($state.is(vm.sortingStateA)){
				return dataService.getDeadline(inputProject.deadlineId).timestamp;
			}
			else if($state.is(vm.sortingStateB)) { 
				return -inputProject.resources.length;
			}
		};
	}
})()