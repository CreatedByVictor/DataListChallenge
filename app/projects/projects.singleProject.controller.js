(function(){

	angular
		.module('projects')
		.controller('singleProjectController', singleProjectController);

	singleProjectController.$inject = ['dataService', '$state', '$stateParams', 'modalService'];

	function singleProjectController(dataService, $state, $stateParams, modalService){
		var vm = this;

		vm.project = dataService.getProjectFull($stateParams.id);
		
		vm.getDeadline = getDeadline;

		vm.getDepartment = getDepartment;
		
		vm.getResource = getResource;

		vm.hideSubtitle = true;

		vm.edit = modalService.openProjectEditModal;

		vm.projectSortPredicate = projectSortPredicate;

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