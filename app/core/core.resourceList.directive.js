(function() {
    'use strict';

    angular
        .module('core')
        .directive('coreResourceList', resourceList);

    resourceList.$inject = ['dataService'];

    /* @ngInject */
    function resourceList(dataService) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,

            controller: ResourceListController,
            controllerAs: 'vm',
 
            templateUrl: 'app/core/directive-templates/resource-list.html',

            link: link,
            restrict: 'E',
            scope: {
            	projectId          : "=id",
                projectObject      : "=target",
                resourceList       : "=resources",
                isCount            : "=isCount",
                isList             : "=isList"
            }
        };
        return directive;

        function link(scope, element, attrs) {
        	scope.projectId        = attrs.id;
            scope.projectObject    = attrs.target;
            
            scope.resourceList     = attrs.resources;

            scope.isCount          = attrs.isCount;
            scope.isList           = attrs.isList;
        }
    }

    /* @ngInject */
    function ResourceListController(dataService) {
    	var vm = this;
        var projectResources = undefined;

        if(this.resourceList){
            projectResources = this.resourceList;
        }
        else if (this.projectId){
            projectResources = dataService.getProject(this.projectId).resources;
        }
        if (projectResources){
            
    	vm.id  			= this.projectId;
        vm.resources    = projectResources;

        vm.isCount      = this.isCount;
        vm.isList       = this.isList;

        vm.getResource  = dataService.getResource; 
        }
    	///////////////

    }
})();