(function() {
    'use strict';

    angular
        .module('modals')
        .factory('modalService', modalService);

    modalService.$inject = ['$uibModal', '$log', 'dataService'];

    /* @ngInject */
    function modalService($uibModal, $log, dataService) {
        var service = {
            openProjectEditModal: openProjectEditModal

        };
        return service;

        ////////////////

        function openProjectEditModal(projectData){

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
                    $log.info('Modal was closed without successful result.');
                    $log.info('errorData:', errorData);
                    angular.copy(backup, projectData); //reset to backup.
                }
            );
        }

    }
})();