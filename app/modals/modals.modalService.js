(function() {
    'use strict';

    angular
        .module('modals')
        .factory('modalService', modalService);

    modalService.$inject = ['$uibModal', '$log', 'dataService', '$state'];

    /* @ngInject */
    function modalService($uibModal, $log, dataService, $state) {
        var service = {
            

            isDeleting              : isDeleting,
            isEditing               : isEditing,

            newDeadlineModal        : newDeadlineModal,
            newDepartmentModal      : newDepartmentModal,
            newProjectModal         : newProjectModal,
            newResourceModal        : newResourceModal,

            openDeadlineEditModal   : openDeadlineEditModal,
            openDepartmentEditModal : openDepartmentEditModal,
            openProjectEditModal    : openProjectEditModal,
            openResourceEditModal   : openResourceEditModal,

            removeModal             : removeModal,

        };
        return service;

        ////////////////

        var _editIdStorage = null;
        var _deleteIdStorage = null;

        function isDeleting(testId){
            return _deleteIdStorage === testId;
        };

        function isEditing(testId){
            return _editIdStorage === testId;
        };

        //
        // ---------- New:
        //

        function newDeadlineModal(){
            var todayDate = new Date()
            todayDate.setSeconds(0);
            var newDeadline = dataService.addDeadline(todayDate);

            var openModal = $uibModal.open({
                animation:false,
                templateUrl:'app/modals/templates/modals.deadlineEdit.html',
                controller:'deadlineEditInstanceController',
                controllerAs:'vm',
                resolve:{
                    deadline:function(){
                        _editIdStorage = newDeadline.id;
                        return newDeadline;
                    }
                }
            });

            openModal.result.then(
                function(resultData){
                    if(angular.isDefined(resultData)){
                          dataService.assignDeadlineDate(resultData.id,new Date(resultData.timestamp));                     
                    }
                     _editIdStorage = null;
                },
                function(errorData){
                    dataService.removeDeadline(newDeadline.id);
                    _editIdStorage = null;
                });
        }; // TODO : Test.
        function newDepartmentModal(){
            var newDepartmentName="";
            var newDepartment = dataService.addDepartment(newDepartmentName);

            var openModal = $uibModal.open({
                animation:false,
                templateUrl:'app/modals/templates/modals.departmentEdit.html',
                controller:'departmentEditInstanceController',
                controllerAs:'vm',
                resolve:{
                    department:function(){
                        _editIdStorage = newDepartment.id;
                        return newDepartment;
                    }
                }
            });

            openModal.result.then(
                function(resultData){
                        if(angular.isDefined(resultData)){
                                dataService.updateDepartment(resultData.id,resultData);
                        }
                        _editIdStorage = null;
                },
                function(errorData){
                    dataService.removeDepartment(newDepartment.id);
                    _editIdStorage = null;
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
                animation:false,
                templateUrl:'app/modals/templates/modals.projectEdit.html',
                controller:'projectEditInstanceController',
                controllerAs:'vm',
                resolve:{
                    project:function(){
                        _editIdStorage = newProject.id;
                        return newProject;
                    }
                }
            });

            openModal.result.then(
                function(resultData){
                    _editIdStorage = null;
                    dataService.updateProject(resultData.id,resultData);
                },
                function(errorData){
                    _editIdStorage = null;
                    dataService.removeProject(newProject.id);
                });
        }; // Fine
        function newResourceModal(){
            var newResourceName = "";
            var newResource = dataService.addResource(newResourceName);

            var openModal = $uibModal.open({
                animation:false,
                templateUrl:'app/modals/templates/modals.resourceEdit.html',
                controller:'resourceEditInstanceController',
                controllerAs:'vm',
                resolve:{
                    resource:function(){
                        //backup = angular.copy(projectData); //make a backup
                        _editIdStorage = newResource.id;
                        return newResource;
                    }
                }
            });

            openModal.result.then(
                function(resultData){
                        _editIdStorage = null;
                        if(angular.isDefined(resultData)){
                                dataService.updateResource(resultData.id,resultData);       
                        }
                },
                function(errorData){
                    _editIdStorage = null;
                    dataService.removeResource(newResource.id);
                });
        }; // TODO : Test.

        //
        // --------- Open:
        //

        function openDeadlineEditModal(deadlineData){

            var backup = {};

            var openModal = $uibModal.open({
                animation:false,
                templateUrl:'app/modals/templates/modals.deadlineEdit.html',
                controller:'deadlineEditInstanceController',
                controllerAs:'vm',
                resolve:{
                    deadline:function(){
                        backup = angular.copy(deadlineData); //make a backup
                        _editIdStorage = deadlineData.id;
                        //console.log("deadlineData:", deadlineData);
                        return deadlineData;
                    },
                }
            });

            openModal.result.then(
                function(resultData){
                    //$log.info("Result Data:", resultData);
                    if (angular.isDefined(resultData)){
                        dataService.assignDeadlineDate(resultData.id, new Date(resultData.timestamp));                         
                    }
                    _editIdStorage = null;
                },
                function(errorData){
                    if (errorData == "delete"){
                        //dataService.removeDeadline(deadlineData.id);
                        removeModal(deadlineData, "deadline");
                        //$log.info("Removed Deadline");
                    }
                    else{
                        $log.info('Modal was closed without successful result.');
                        $log.info('errorData:', errorData);
                        angular.copy(backup, deadlineData); //reset to backup.
                    }
                     _editIdStorage = null;
                }
            );
        }; // TODO: Test.
        function openDepartmentEditModal(departmentData){

            var backup = {};

            var openModal = $uibModal.open({
                animation:false,
                templateUrl:'app/modals/templates/modals.departmentEdit.html',
                controller:'departmentEditInstanceController',
                controllerAs:'vm',
                resolve:{
                    department:function(){
                        backup = angular.copy(departmentData); //make a backup
                        _editIdStorage = departmentData.id;
                        return departmentData;
                    }
                }
            });

            openModal.result.then(
                function(resultData){
                    //$log.info("Result Data:", resultData);
                    if(angular.isDefined(resultData)){
                        dataService.updateProject(resultData.id, resultData);                           
                    }
                    _editIdStorage = null;
                },
                function(errorData){
                    _editIdStorage = null;
                    if (errorData == "delete"){
                        //dataService.removeDepartment(departmentData.id);
                        removeModal(departmentData,"department");
                        //$log.info("Removed Department");
                    }
                    else{
                        $log.info('Modal was closed without successful result.');
                        $log.info('errorData:', errorData);
                        angular.copy(backup, departmentData); //reset to backup.
                       _editIdStorage = null;
                    }
                }
            );
        }; // Fine
        function openProjectEditModal(projectData, jumpBackState){

            var backup = {};

            var openModal = $uibModal.open({
                animation:false,
                templateUrl:'app/modals/templates/modals.projectEdit.html',
                controller:'projectEditInstanceController',
                controllerAs:'vm',
                resolve:{
                    project:function(){
                        backup = angular.copy(projectData); //make a backup
                        _editIdStorage = projectData.id;
                        return projectData;
                    }
                }
            });

            openModal.result.then(
                function(resultData){
                    //$log.info("Result Data:", resultData);
                    dataService.updateProject(resultData.id, resultData);
                    _editIdStorage = null;
                },
                function(errorData){
                    if (errorData == "delete"){
                        //dataService.removeProject(projectData.id);
                        removeModal(projectData,"project", jumpBackState);
                        //$log.info("Removed Project");
                    }
                    else{
                        $log.info('Modal was closed without successful result.');
                        $log.info('errorData:', errorData);
                        angular.copy(backup, projectData); //reset to backup.
                    }
                     _editIdStorage = null;
                }
            );
        }; // Fine
        function openResourceEditModal(resourceData){

            var backup = {};

            var openModal = $uibModal.open({
                animation:false,
                templateUrl:'app/modals/templates/modals.resourceEdit.html',
                controller:'resourceEditInstanceController',
                controllerAs:'vm',
                resolve:{
                    resource:function(){
                        backup = angular.copy(resourceData); //make a backup
                        _editIdStorage = resourceData.id;
                        return resourceData;
                    }
                }
            });

            openModal.result.then(
                function(resultData){
                    //$log.info("Result Data:", resultData);
                    if (angular.isDefined(resultData)){
                        dataService.updateResource(resultData.id, resultData);
                    }
                    _editIdStorage = null;
                },
                function(errorData){
                    if (errorData == "delete"){
                        //dataService.removeResource(resourceData.id);
                        //$log.info("Removed Resource");
                        removeModal(resourceData,"resource")
                    }
                    else{
                        $log.info('Modal was closed without successful result.');
                        $log.info('errorData:', errorData);
                        angular.copy(backup, resourceData); //reset to backup.
                    }
                     _editIdStorage = null;
                }
            );
        }; // TODO: Test.

        function removeModal(inputItem, type, jumpBackState){
            var backup = {};
            var openModal = $uibModal.open({
                animation:false,
                templateUrl:'app/modals/templates/modals.delete.html',
                controller:'itemRemovalController',
                controllerAs:'vm',
                resolve:{
                    item:function(){
                        _deleteIdStorage = inputItem.id;
                        return inputItem;
                    },
                    type:function(){
                        return type;
                    }
                }
            });

            openModal.result.then(
                function(_){
                    //Delete the Item.

                    var testType = type.toUpperCase()
                    var id = inputItem.id;

                    if      (testType === "PROJECT"){
                        dataService.removeProject(id);
                    }
                    else if (testType === "RESOURCE"){
                        dataService.removeResource(id);
                    }
                    else if (testType === "DEADLINE"){
                        dataService.removeDeadline(id);
                    }
                    else if (testType === "DEPARTMENT"){
                        dataService.removeDepartment(id);
                    }
                    else{
                        $log.error("I do not know how to remove a", type);
                    }
                    _deleteIdStorage = null;
                    _editIdStorage = null;
                    if(jumpBackState != undefined){
                            $state.go(jumpBackState);
                    }


            },
                function(_){
                    //Don't delete the item.
                    _deleteIdStorage = null;
                    _editIdStorage = null;
            });

        };

    }
})();