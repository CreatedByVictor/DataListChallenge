(function() {
    'use strict';

    angular
        .module('admin')
        .controller('adminPageController', adminPageController);

    adminPageController.$inject = ['dataService', 'modalService', '$filter', 'sortingService'];

    /* @ngInject */
    function adminPageController(dataService, modalService, $filter, sortingService) {
        var vm = this;
        var localEditingIndex = -1;
        var _currentSort = "initial";

        vm.currentSort          = currentSort();

        vm.dataset              = dataService.rawDataset;

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

        vm.isSort               = isSort;
        vm.isEditing            = modalService.isEditing;
        vm.isDeleting           = modalService.isDeleting

        vm.listDeadlines 		= listDeadlines;
        vm.listDeadlinesFull 	= listDeadlinesFull;
        vm.listDepartments 		= listDepartments;
        vm.listDepartmentsFull 	= listDepartmentsFull;
        vm.listProjects 		= listProjects;
        vm.listProjectsFull 	= listProjectsFull;
        vm.listResources 		= listResources;
        vm.listResourcesFull 	= listResourcesFull;

        //vm.sortedDeadlines      = $filter('orderBy')(dataService.listDeadlines(),   sortingService.dataSorter('deadline'),      sortingService.isReverse());
        //vm.sortedDepartments    = $filter('orderBy')(dataService.listDepartments(), sortingService.dataSorter('department'),    sortingService.isReverse());
        //vm.sortedProjects       = $filter('orderBy')(dataService.listProjects(),    sortingService.dataSorter('project'),       sortingService.isReverse());
        //vm.sortedResources      = $filter('orderBy')(dataService.listResources(),   sortingService.dataSorter('resource'),      sortingService.isReverse());

        vm.sorter               = sortingService.dataSorter;

        vm.newDeadline          = newDeadline;
        vm.newDepartment        = newDepartment;
        vm.newProject           = newProject;
        vm.newResource          = newResource;

        /*vm.orderDeadlines       = orderDeadlines;
        vm.orderDeadlineSort    = "date";
        vm.orderDepartments     = orderDepartments;
        vm.orderDepartmentSort  = "name";
        vm.orderProjects        = orderProjects;
        vm.orderProjectSort     = "name";
        vm.orderResources       = orderResources;
        vm.orderResourceSort    = "name";*/

        vm.setSort              = setSort;

        vm.reverse              = false;

        //vm.setDeadlineOrder     = setDeadlineOrder;
        //vm.setDepartmentOrder   = setDepartmentOrder;
        //vm.setProjectOrder      = setProjectOrder;
        //vm.setResourceOrder     = setResourceOrder;

        // vm.toggleReverse        = toggleReverse;

        ////////////////

        function currentSort(){
            return _currentSort;
        };

        function isSort(test){
            //console.log(test, _currentSort, "=",test === _currentSort);
            return test === _currentSort;
        };

// Modal        
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
// get
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
// list
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
// new
        function newDeadline(){
            var today = new Date();
            today.setSeconds(0);
            var newDeadline = dataService.addDeadline(today);
            console.log("newDeadline:", newDeadline);
            editDeadline(newDeadline);
            //return modalService.newDeadlineModal();
        };
        function newDepartment(){
            return modalService.newDepartmentModal();
        };
        function newProject(){
            return modalService.newProjectModal();
        };
        function newResource(){
            return modalService.newResourceModal();
        };

        function setSort(type, sort){

            if (_currentSort == 'initial'){
                sortingService.setSort(type,sort);
                _currentSort = sort;
                vm.reverse = true;
            } else if (_currentSort !== sort){
                sortingService.setSort(type, sort);
                vm.reverse = false;
                _currentSort = sort;
            } else {
                _currentSort = sort;
                toggleReverse();
            }

        };
        function toggleReverse(){
            vm.reverse = !vm.reverse;
        };
    
// conditionals

    }
})();

