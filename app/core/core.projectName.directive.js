(function() {
    'use strict';

    angular
        .module('core')
        .directive('coreProjectName', projectName);

    projectName.$inject = ['dataService'];

    /* @ngInject */
    function projectName(dataService) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,

            controller: ProjectNameController,
            controllerAs: 'vm',
 
            templateUrl: 'app/core/directive-templates/project-name.html',

            link: link,
            restrict: 'E',
            scope: {
            	projectId:"=id",
                projectObject:"=target"
            }
        };
        return directive;

        function link(scope, element, attrs) {
        	scope.projectId = attrs.id;
            scope.projectObject = attrs.target;
        }
    }

    /* @ngInject */
    function ProjectNameController(dataService) {
    	var vm = this;
    	
    	var project = dataService.getProject(this.projectId) || this.projectObject;

        if(project){
            vm.id           = this.projectId;
            vm.name         = project.name;        
        }


    	///////////////

    }
})();