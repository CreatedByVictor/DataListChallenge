(function(){

	angular
		.module('deadlines')
		.controller('deadlinesListController', deadlinesListController);

	deadlinesListController.$inject = ['dataService', '$state'];

	function deadlinesListController(dataService, $state){
		var vm = this;

		vm.deadlines = dataService.listDeadlinesFull();
		vm.getDepartment = getDepartment;
		vm.getProject = getProject;
		vm.getResource = getResource;
		vm.projectSortPredicate = projectSortPredicate;

		vm.pageTitle = "Deadline Projects";
		vm.sortingNameA = "Department Name";
		vm.sortingNameB = "Resource Count"; 
		vm.sortingStateA = "deadlines"; // department name View
		vm.sortingStateB = "deadlines.resources";

		///////////////////////////

		function getDepartment(id){
			return dataService.getDepartment(id);
		};

		function getProject(id){
			return dataService.getProject(id);
		};

		function getResource(id){
			return dataService.getResource(id);
		};

		function projectSortPredicate(projectId){
			var inputProject = dataService.getProject(projectId);
			if ($state.is(vm.sortingStateA)){
				return dataService.getDepartment(inputProject.departmentId).name;
			} 
			else if($state.is(vm.sortingStateB)){ 
				return -inputProject.resources.length;
			}
		};
	}
})()