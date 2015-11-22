(function(){

	angular
		.module('core')
		.controller('departmentsController', departmentsController);

	departmentsController.$inject = ['dataService', '$state'];

	function departmentsController(dataService, $state){
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

		vm.subtitleA = "sorting by Deadline Date.";
		vm.subtitleB = "sorting by Resource Count.";

		///////////////////////////

		function getDeadline(id){
			return dataService.getDeadline(id);
		};

		function getDepartment(id){
			return dataService.getDepartment(id);
		};

		function getProject(id){
			return dataService.getProject(id);
		};

		function getResource(id){
			return dataService.getResource(id);
		};

		function projectSortPredicate(inputProject){
			if ($state.is('departments')){
				return dataService.getDeadline(inputProject.deadlineId).timestamp;
			} else { 
				return -inputProject.resources.length;
			}
		};
	}
})()