(function(){

	angular
		.module('projects')
		.controller('projectsListController', projectsListController);

	projectsListController.$inject = ['dataService', '$state'];

	function projectsListController(dataService, $state){
		var vm = this;

		vm.projects = dataService.listProjects();
		
		vm.getDeadline = getDeadline;

		vm.getDepartment = getDepartment;
		
		vm.getResource = getResource;

		vm.projectSortPredicate = projectSortPredicate;

		vm.pageTitle = "Projects";

		vm.sortingStateA = "projects"; // deadline View
		vm.sortingStateB = "projects.resources";

		vm.sortingNameA = "Name";
		vm.sortingNameB = "Resource Count"; 

		///////////////////////////

		function getDeadline(id){
			return dataService.getDeadline(id);
		};

		function getDepartment(id){
			return dataService.getDepartment(id);
		};

		function getResource(id){
			return dataService.getResource(id);
		};

		function projectSortPredicate(inputProject){
			if ($state.is(vm.sortingStateA)){
				return inputProject.name;
			} 
			else if ($state.is(vm.sortingStateB)){
				return -inputProject.resources.length;
			}
		};
	}
})()