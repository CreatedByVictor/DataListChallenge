(function() {
    'use strict';

    angular
        .module('modals')
        .controller('projectEditInstanceController', projectEditInstanceController);

    projectEditInstanceController.$inject = ['dataService', '$uibModalInstance', 'project', 'utilityService'];

    /* @ngInject */
    function projectEditInstanceController(dataService, $uibModalInstance, project, Util) {
        var vm = this;
        var _markedForRemoval = [];

        vm.addResource              = addResource;

        vm.deadlineSorter           = deadlineSorter;

        vm.getDeadline              = getDeadline;
        vm.getDepartment            = getDepartment;
        vm.getResource              = getResource;

        vm.isMarkedForRemoval       = isMarkedForRemoval;

        vm.listDeadlines            = dataService.listDeadlines();
        vm.listDepartments          = dataService.listDepartments();
        vm.listResources            = dataService.listResources();

        vm.markForRemoval           = markForRemoval;

        vm.project                  = project;

        vm.resourceToAdd            = null;
        vm.resourceSorter           = resourceSorter;

        vm.sendCancel               = sendCancel;
        vm.sendDelete               = sendDelete;
        vm.sendOk                   = sendOk;

        vm.unassignedResourceIds    = unassignedResourceIds;
        vm.unassignResource         = unassignResource;

        vm.unmarkForRemoval         = unmarkForRemoval; 

        ////////////////

        function addResource(){
            if (vm.resourceToAdd){
                vm.project.resources.push(vm.resourceToAdd);
            }
            //vm.unassignedResourceIds = unassignedResourceIds(project.resources);
        };

        function getDeadline(id){
            return dataService.getDeadline(id);
        };
        function getDepartment(id){
            return dataService.getDepartment(id);
        };
        function getResource(id){
            return dataService.getResource(id);
        };

        function isMarkedForRemoval(id){
            return _markedForRemoval.indexOf(id) >= 0;
        };

        function markForRemoval(id){
            _markedForRemoval.push(id);
        };

        function sendCancel(){
            $uibModalInstance.dismiss("canceled");
        };

        function sendDelete(){
            $uibModalInstance.dismiss("delete");
        };

        function sendOk(){
            $uibModalInstance.close(vm.project);
        };

        function unassignedResourceIds(projectResoures){
            return dataService.listOfUnassignedResourceIds(projectResoures);
        };

        function unassignResource(id){
            var index = vm.project.resources.indexOf(id);
            vm.project.resources.splice(index, 1);
            unmarkForRemoval(id);
        };

        function unmarkForRemoval(id){
            var index = _markedForRemoval.indexOf(id);
            if (index >= 0){
                _markedForRemoval.splice(index, 1);
            }
        };

        function resourceSorter(resourceId){
            var resource = getResource(resourceId);
            return resource.name;
        };
        function deadlineSorter(deadlineObject){
            // convert the text to a timestamp.

            var timestamp = Date.parse(deadlineObject.date);
            return timestamp;
        };

    }
})();