(function() {
    'use strict';

    angular
        .module('admin')
        .controller('adminPageController', adminPageController);

    adminPageController.$inject = ['dataService', 'modalService'];

    /* @ngInject */
    function adminPageController(dataService, modalService) {
        var vm = this;

        vm.editDeadline         = editDeadline;
        vm.editDepartment       = editDepartment;
        vm.editProject          = editProject;
        vm.editResource         = editResource;

        vm.getDeadline 			= getDeadline;
        vm.getDeadlineFull		= getDeadlineFull;
        vm.getDepartment 		= getDepartment;
        vm.getDepartmentFull 	= getDepartmentFull;
        vm.getProject 			= getProject;
        vm.getProjectFull		= getProjectFull;
        vm.getResource 			= getResource;
        vm.getResourceFull 		= getResourceFull;

        vm.listDeadlines 		= listDeadlines;
        vm.listDeadlinesFull 	= listDeadlinesFull;
        vm.listDepartments 		= listDepartments;
        vm.listDepartmentsFull 	= listDepartmentsFull;
        vm.listProjects 		= listProjects;
        vm.listProjectsFull 	= listProjectsFull;
        vm.listResources 		= listResources;
        vm.listResourcesFull 	= listResourcesFull;

        vm.newDeadline          = newDeadline;
        vm.newDepartment        = newDepartment;
        vm.newProject           = newProject;
        vm.newResource          = newResource;

        ////////////////
        function editDeadline(deadline){
            modalService.openDeadlineEditModal(deadline);
        };
        function editDepartment(department){
            modalService.openDepartmentEditModal(department);
        };
        function editProject(project){
            modalService.openProjectEditModal(project);
        };
        function editResource(resource){
            modalService.openResourceEditModal(resource);
        };

        function getDeadline(id){
        	return dataService.getDeadline(id);
        };
        function getDeadlineFull(id){
        	return dataService.getDeadlineFull(id);
        };
        function getDepartment(id){
        	return dataService.getDepartment(id);
        };
        function getDepartmentFull(id){
        	return dataService.getDepartmentFull(id);
        };
        function getProject(id){
        	return dataService.getProject(id);
        };
        function getProjectFull(id){
        	return dataService.getProjectFull(id);
        };
        function getResource(id){
        	return dataService.getResource(id);
        };
        function getResourceFull(id){
        	return dataService.getResourceFull(id);
        };

        function listDeadlines(){
        	return dataService.listDeadlines();
        };
        function listDeadlinesFull(){
        	return dataService.listDeadlinesFull();
        };
        function listDepartments(){
        	return dataService.listDepartments();
        };
        function listDepartmentsFull(){
        	return dataService.listDepartmentsFull();
        };
        function listProjects(){
        	return dataService.listProjects();
        };
        function listProjectsFull(){
        	return dataService.listProjectsFull();
        };
        function listResources(){
        	return dataService.listResources();
        };
        function listResourcesFull(){
        	return dataService.listResourcesFull();
        };

        function newDeadline(){
            return modalService.newDeadlineModal();
        };
        function newDepartment(){
            return modalService.newDepartment();
        };
        function newProject(){
            return modalService.newProjectModal();
        };
        function newResource(){
            return modalService.newResourceModal();
        };

    }
})();

