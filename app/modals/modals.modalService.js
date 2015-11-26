(function() {
    'use strict';

    angular
        .module('modals')
        .factory('modalService', modalService);

    modalService.$inject = ['$uibModal', '$log', 'dataService', '$state'];

    /* @ngInject */
    function modalService($uibModal, $log, dataService, $state) {
        var service = {
            openProjectEditModal: openProjectEditModal,
            newProjectModal:newProjectModal

        };
        return service;

        ////////////////

        function openProjectEditModal(projectData, jumpBackState){

            var backup = {};

            var openModal = $uibModal.open({
                animation:true,
                templateUrl:'app/modals/modals.projectEdit.html',
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
        };
        function newProjectModal(){
             var emptyProject = {
                "id": undefined,
                "name": undefined,
                "deadlineId": undefined,
                "departmentId": undefined,
                "resources":[]
            };
            var newProject = dataService.addProject(emptyProject);

            /*var openModal = $uibModal.open({
                animation:true,
                templateUrl:'app/modals/modals.projectEdit.html',
                controller:'projectEditInstanceController',
                controllerAs:'vm',
                resolve:{
                    project:function(){
                        var emptyProject = {
                            "id": undefined,
                            "name": undefined,
                            "deadlineId": undefined,
                            "departmentId": undefined,
                            "resources":[]
                        };
                        var newProject = dataService.addProject(emptyProject);
                        if ( !($state.includes('admin')) || !($state.includes('project')) ) {
                            $state.go('.project', { id : newProject.id });
                        }
                        return newProject;
                    }
                }
            });
*/
            var openModal = $uibModal.open({
                animation:true,
                templateUrl:'app/modals/modals.projectEdit.html',
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
        };

    }
})();