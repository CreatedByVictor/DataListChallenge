(function() {
    'use strict';

    angular
        .module('modals')
        .controller('deadlineEditInstanceController', deadlineEditInstanceController);

    deadlineEditInstanceController.$inject = ['utilityService','dataService', '$uibModalInstance', 'deadline', 'utilityService'];

    /* @ngInject */
    function deadlineEditInstanceController(utilityService, dataService, $uibModalInstance, deadline, Util) {
        var vm = this;

        vm.addResource              = addResource;

        vm.deadline                 = deadline;

        vm.getDeadline              = getDeadline;
        vm.getDeadlineFull          = getDeadlineFull;
        vm.getDepartment            = getDepartment;
        vm.getResource              = getResource;

        vm.isCalendarOpen           = false;
        vm.isMobile                 = Util.isMobilePortraitMode;

        vm.listDeadlines            = dataService.listDeadlines();
        vm.listDepartments          = dataService.listDepartments();
        vm.listResources            = dataService.listResources();

        vm.resourceToAdd            = null;
        vm.resourceSorter           = resourceSorter;

        vm.sendCancel               = sendCancel;
        vm.sendDelete               = sendDelete;
        vm.sendOk                   = sendOk;

        vm.toggleCalendar           = toggleCalendar;

        vm.unassignedResourceIds    = unassignedResourceIds;
        vm.unassignResource         = unassignResource;

        vm.deadlineModel            = deadlineModel;

        ////////////////

        function deadlineModel(){

            var dm = {};

            Object.defineProperty(dm, "timestamp",{
                get:function(){
                    var convertedDate = Date.parse(deadline.date);
                    return convertedDate;
                },
                set:function(input){
                    deadline.date = utilityService.formatDateObjectToText(new Date(input));
                }
            });

            Object.defineProperty(dm, "dateObject",{
                get:function(){
                    return new Date(deadline.date);
                },
                set:function(input){
                    deadline.date = utilityService.formatDateObjectToText(new Date(input));
                }
            });

            return dm;
        }



        function addResource(){
            if (vm.resourceToAdd){
                vm.project.resources.push(vm.resourceToAdd);
            }
            //vm.unassignedResourceIds = unassignedResourceIds(project.resources);
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
        function getResource(id){
            return dataService.getResource(id);
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

        function toggleCalendar(){
            vm.isCalendarOpen = !vm.isCalendarOpen;
        };

        function unassignedResourceIds(projectResoures){
            return dataService.listOfUnassignedResourceIds(projectResoures);
        };

        function unassignResource(resourceIndex){
            vm.project.resources.splice(resourceIndex, 1);
        };

        function resourceSorter(resourceId){
            var resource = getResource(resourceId);
            return resource.name;
        }

    }
})();