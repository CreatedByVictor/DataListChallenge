(function(){

	angular
		.module('projects')
		.controller('singleProjectController', singleProjectController);

	singleProjectController.$inject = ['dataService', '$state', '$stateParams'];

	function singleProjectController(dataService, $state, $stateParams){
		var vm = this;

		vm.project = dataService.getProjectFull($stateParams.id);
		
		vm.getDeadline = getDeadline;

		vm.getDepartment = getDepartment;
		
		vm.getResource = getResource;

		vm.hideSubtitle = true;

		vm.projectSortPredicate = projectSortPredicate;

		vm.pageTitle = vm.project.name;

		vm.sortingStateA = ""; // deadline View
		vm.sortingStateB = "";

		vm.sortingNameA = "";
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