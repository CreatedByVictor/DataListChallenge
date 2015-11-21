(function(){

	angular
		.module('core')
		.controller('departmentsController', departmentsController);

	departmentsController.$inject = ['dataService'];

	function departmentsController(dataService){
		var vm = this;

		vm.departments = dataService.listDepartments();
		vm.getDeadline = getDeadline;
		vm.getDepartment = getDepartment;
		vm.getProject = getProject;
		vm.getResource = getResource;
		vm.pageTitle = "All Departments";

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
	}

})()