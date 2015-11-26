(function() {
    'use strict';

    angular
        .module('modals')
        .factory('modalService', modalService);

    modalService.$inject = ['$uibModal', '$log', 'dataService', '$state'];

    /* @ngInject */
    function modalService($uibModal, $log, dataService, $state) {
        var service = {
            
            newDeadlineModal        : newDeadlineModal,
            newDepartmentModal      : newDepartmentModal,
            newProjectModal         : newProjectModal,
            newResourceModal        : newResourceModal,

            openDeadlineEditModal   : openDeadlineEditModal,
            openDepartmentEditModal : openDepartmentEditModal,
            openProjectEditModal    : openProjectEditModal,
            openResourceEditModal   : openResourceEditModal,

        };
        return service;

        ////////////////
        //
        // ---------- New:
        //

        function newDeadlineModal(){
            var emptyDeadline = {
                "id": undefined,
                "name": undefined,
                "deadlineId": undefined,
                "departmentId": undefined,
                "resources":[]
            };
            var newDeadline = dataService.addDeadline(emptyDeadline);

            var openModal = $uibModal.open({
                animation:true,
                templateUrl:'app/modals/templates/modals.deadlineEdit.html',
                controller:'deadlineEditInstanceController',
                controllerAs:'vm',
                resolve:{
                    deadline:function(){
                        //backup = angular.copy(projectData); //make a backup
                        if ( $state.includes('admin') ){
                            return newDeadline;
                        }
                        else{
                            return newDeadline;
                        }
                    }
                }
            });

            openModal.result.then(
                function(resultData){
                    dataService.updateDeadline(resultData.id,resultData);
                },
                function(errorData){
                    dataService.removeDeadline(newDeadline.id);
                });
        }; // TODO : Test.
        function newDepartmentModal(){
            var emptyDepartment = {
                "id": undefined,
                "name": undefined,
            };
            var newDepartment = dataService.addDepartment(emptyDepartment);

            var openModal = $uibModal.open({
                animation:true,
                templateUrl:'app/modals/templates/modals.departmentEdit.html',
                controller:'departmentEditInstanceController',
                controllerAs:'vm',
                resolve:{
                    department:function(){
                        //backup = angular.copy(projectData); //make a backup
                        if ( $state.includes('admin') ){
                            return newDepartment;
                        }
                        else{
                            return newDepartment;
                        }
                    }
                }
            });

            openModal.result.then(
                function(resultData){
                    dataService.updateDepartment(resultData.id,resultData);
                },
                function(errorData){
                    dataService.removeDepartment(newDepartment.id);
                });
        }; // TODO : Test.
        function newProjectModal(){
            var emptyProject = {
                "id": undefined,
                "name": undefined,
                "deadlineId": undefined,
                "departmentId": undefined,
                "resources":[]
            };
            var newProject = dataService.addProject(emptyProject);

            var openModal = $uibModal.open({
                animation:true,
                templateUrl:'app/modals/templates/modals.projectEdit.html',
                controller:'projectEditInstanceController',
                controllerAs:'vm',
                resolve:{
                    project:function(){
                        //backup = angular.copy(projectData); //make a backup
                        if ( $state.includes('admin') ){
                            return newProject;
                        }
                        else{
                            return newProject;
                        }
                    }
                }
            });

            openModal.result.then(
                function(resultData){
                    dataService.updateProject(resultData.id,resultData);
                },
                function(errorData){
                    dataService.removeProject(newProject.id);
                });
        }; // Fine
        function newResourceModal(){
            var emptyResource = {
                "id": undefined,
                "name": undefined,
            };
            var newResource = dataService.addDeadline(emptyResource);

            var openModal = $uibModal.open({
                animation:true,
                templateUrl:'app/modals/templates/modals.resourceEdit.html',
                controller:'resourceEditInstanceController',
                controllerAs:'vm',
                resolve:{
                    resource:function(){
                        //backup = angular.copy(projectData); //make a backup
                        if ( $state.includes('admin') ){
                            return newResource;
                        }
                        else{
                            return newResource;
                        }
                    }
                }
            });

            openModal.result.then(
                function(resultData){
                    dataService.updateResource(resultData.id,resultData);
                },
                function(errorData){
                    dataService.removeResource(newResource.id);
                });
        }; // TODO : Test.

        //
        // --------- Open:
        //

        function openDeadlineEditModal(deadlineData){

            var backup = {};

            var openModal = $uibModal.open({
                animation:true,
                templateUrl:'app/modals/templates/modals.projectEdit.html',
                controller:'deadlineEditInstanceController',
                controllerAs:'vm',
                resolve:{
                    deadline:function(){
                        backup = angular.copy(deadlineData); //make a backup
                        return deadlineData;
                    }
                }
            });

            openModal.result.then(
                function(resultData){
                    //$log.info("Result Data:", resultData);
                    dataService.updateDeadline(resultData.id, resultData);
                },
                function(errorData){
                    if (errorData == "delete"){
                        dataService.removeDeadline(deadlineData.id);
                        $log.info("Removed Project");
                        if(jumpBackState != undefined){
                            $state.go(jumpBackState);
                        }
                    }
                    else{
                        $log.info('Modal was closed without successful result.');
                        $log.info('errorData:', errorData);
                        angular.copy(backup, deadlineData); //reset to backup.
                    }
                }
            );
        }; // TODO: Test.
        function openDepartmentEditModal(departmentData){

            var backup = {};

            var openModal = $uibModal.open({
                animation:true,
                templateUrl:'app/modals/templates/modals.departmentEdit.html',
                controller:'departmentEditInstanceController',
                controllerAs:'vm',
                resolve:{
                    department:function(){
                        backup = angular.copy(departmentData); //make a backup
                        return departmentData;
                    }
                }
            });

            openModal.result.then(
                function(resultData){
                    //$log.info("Result Data:", resultData);
                    dataService.updateProject(resultData.id, resultData);
                },
                function(errorData){
                    if (errorData == "delete"){
                        dataService.removeDepartment(departmentData.id);
                        $log.info("Removed Department");
                    }
                    else{
                        $log.info('Modal was closed without successful result.');
                        $log.info('errorData:', errorData);
                        angular.copy(backup, departmentData); //reset to backup.
                    }
                }
            );
        }; // Fine
        function openProjectEditModal(projectData, jumpBackState){

            var backup = {};

            var openModal = $uibModal.open({
                animation:true,
                templateUrl:'app/modals/templates/modals.projectEdit.html',
                controller:'projectEditInstanceController',
                controllerAs:'vm',
                resolve:{
                    project:function(){
                        backup = angular.copy(projectData); //make a backup
                        return projectData;
                    }
                }
            });

            openModal.result.then(
                function(resultData){
                    //$log.info("Result Data:", resultData);
                    dataService.updateProject(resultData.id, resultData);
                },
                function(errorData){
                    if (errorData == "delete"){
                        dataService.removeProject(projectData.id);
                        $log.info("Removed Project");
                        if(jumpBackState != undefined){
                            $state.go(jumpBackState);
                        }
                    }
                    else{
                        $log.info('Modal was closed without successful result.');
                        $log.info('errorData:', errorData);
                        angular.copy(backup, projectData); //reset to backup.
                    }
                }
            );
        }; // Fine
        function openResourceEditModal(resourceData){

            var backup = {};

            var openModal = $uibModal.open({
                animation:true,
                templateUrl:'app/modals/templates/modals.resourceEdit.html',
                controller:'resourceEditInstanceController',
                controllerAs:'vm',
                resolve:{
                    resource:function(){
                        backup = angular.copy(resourceData); //make a backup
                        return resourceData;
                    }
                }
            });

            openModal.result.then(
                function(resultData){
                    //$log.info("Result Data:", resultData);
                    dataService.updateResource(resultData.id, resultData);
                },
                function(errorData){
                    if (errorData == "delete"){
                        dataService.removeResource(resourceData.id);
                        $log.info("Removed Resource");
                    }
                    else{
                        $log.info('Modal was closed without successful result.');
                        $log.info('errorData:', errorData);
                        angular.copy(backup, resourceData); //reset to backup.
                    }
                }
            );
        }; // TODO: Test.

    }
})();