(function() {
    'use strict';

    angular
        .module('admin')
        .controller('adminPageController', adminPageController);

    adminPageController.$inject = ['dataService', 'modalService', '$filter'];

    /* @ngInject */
    function adminPageController(dataService, modalService, $filter) {
        var vm = this;
        var localEditingIndex = -1;

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

        vm.newDeadline          = newDeadline;
        vm.newDepartment        = newDepartment;
        vm.newProject           = newProject;
        vm.newResource          = newResource;

        vm.orderDeadlines       = orderDeadlines;
        vm.orderDeadlineSort    = "date";
        vm.orderDepartments     = orderDepartments;
        vm.orderDepartmentSort  = "name";
        vm.orderProjects        = orderProjects;
        vm.orderProjectSort     = "name";
        vm.orderResources       = orderResources;
        vm.orderResourceSort    = "name";

        vm.reverse              = false;

        vm.setDeadlineOrder     = setDeadlineOrder;
        vm.setDepartmentOrder   = setDepartmentOrder;
        vm.setProjectOrder      = setProjectOrder;
        vm.setResourceOrder     = setResourceOrder;

        vm.toggleReverse        = toggleReverse;

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
            return modalService.newDepartmentModal();
        };
        function newProject(){
            return modalService.newProjectModal();
        };
        function newResource(){
            return modalService.newResourceModal();
        };

        function orderDeadlines(rawDeadline){
            if (vm.orderDeadlineSort == "id"){
                return rawDeadline.id;
            }
            else if (vm.orderDeadlineSort == "date"){ 
                return getDeadlineFull(rawDeadline.id).timestamp;;
            }
            else if (vm.orderDeadlineSort == "projectCount"){
                return 0 - getDeadlineFull(rawDeadline.id).projectIds.length;
            }
            else if (vm.orderDeadlineSort == "departmentCount"){
                return 0 - getDeadlineFull(rawDeadline.id).departmentIds.length;
            }
            else if (vm.orderDeadlineSort == "resourceCount"){
                return 0 - getDeadlineFull(rawDeadline.id).resourceIds.length;
            }
        };
        function orderDepartments(rawDepartment){
            if (vm.orderDepartmentSort == "id"){
                return rawDepartment.id;
            }
            else if (vm.orderDepartmentSort == "name"){
                var name = rawDepartment.name;
                return "-"+name;
            }
            else if (vm.orderDepartmentSort == "projectCount"){
                return 0 - getDepartmentFull(rawDepartment.id).projectIds.length;
            }
            else if (vm.orderDepartmentSort == "deadlineCount"){
                return 0 - getDepartmentFull(rawDepartment.id).deadlineIds.length;
            }
            else if (vm.orderDepartmentSort == "resourceCount"){
                return 0 - getDepartmentFull(rawDepartment.id).resourceIds.length;
            }
        };
        function orderProjects(rawProject){
            if (vm.orderProjectSort == "id"){
                return rawProject.id;
            }
            else if (vm.orderProjectSort == "name" || vm.orderProjectSort == "title"){
                var name = rawProject.name;
                return "-"+name;
            }
            else if (vm.orderProjectSort == "departmentName"){
                var name = getDepartment(rawProject.departmentId).name;
                return "-" + name;
            }
            else if (vm.orderProjectSort == "deadlineDate"){
                var timestamp = getDeadline(rawProject.deadlineId).timestamp;
                return 0 - timestamp;
            }
            else if (vm.orderProjectSort == "resourceCount"){
                return 0 - rawProject.resources.length;
            }
        };
        function orderResources(rawResource){
            if (vm.orderResourceSort == "id"){
                return rawResource.id;
            }
            else if (vm.orderResourceSort == "name"){
                var name = rawResource.name;
                return "-"+name;
            }
            else if (vm.orderResourceSort == "projectCount"){
                return 0 - getResourceFull(rawResource.id).projectIds.length;
            }
            else if (vm.orderResourceSort == "deadlineCount"){
                return 0 - getResourceFull(rawResource.id).deadlineIds.length;
            }
            else if (vm.orderResourceSort == "departmentCount"){
                return 0 - getResourceFull(rawResource.id).departmentIds.length;
            }

        };


        function setDeadlineOrder(target){
            if (vm.orderDeadlineSort === target){
                toggleReverse();
            }
            else{
                vm.orderDeadlineSort = target;
                vm.reverse = false;
            }
        };
        function setDepartmentOrder(target){
            if (vm.orderDepartmentSort === target){
                toggleReverse();
            }
            else{
                vm.orderDepartmentSort = target;
                vm.reverse = false;
            }
        };
        function setProjectOrder(target){
            if (vm.orderProjectSort === target){
                toggleReverse();
            }
            else{
                vm.orderProjectSort = target;
                vm.reverse = false;
            }
        };
        function setResourceOrder(target){
            if(vm.orderResourceSort === target){
                toggleReverse();
            }
            else{
                vm.orderResourceSort = target;
                vm.reverse = false;
            }
        };

        function toggleReverse(){
            vm.reverse = !vm.reverse;
        }

    }
})();

