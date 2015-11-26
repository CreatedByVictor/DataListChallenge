(function(){

	angular
		.module('projects')
		.controller('singleProjectController', singleProjectController);

	singleProjectController.$inject = ['dataService', '$state', '$stateParams', 'modalService'];

	function singleProjectController(dataService, $state, $stateParams, modalService){
		var vm = this;
		
		vm.edit = modalService.openProjectEditModal;

		vm.getDeadline = getDeadline;

		vm.getDepartment = getDepartment;
		
		vm.getResource = getResource;

		vm.hideSubtitle = true;

		vm.project = dataService.getProjectFull($stateParams.id);

		vm.projectSortPredicate = projectSortPredicate;

		vm.state = $state;

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