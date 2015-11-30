(function() {
    'use strict';

    angular
        .module('core')
        .factory('sortingService', sortingService);

    sortingService.$inject = ['dataService','$log','$filter'];

    /* @ngInject */
    function sortingService(dataService, $log, $filter) {

        // global defaults
        var orderDeadlineSort 	= "date";
        var orderDepartmentSort = "name";
        var orderProjectSort 	= "name";
        var orderResourceSort 	= "name";

        var service = {
        	
        	dataSorter:dataSorter,
            setSort:setSort,
/*
            sortedDeadlines:sortedDeadlines,
            sortedDepartments:sortedDepartments,
            sortedProjects:sortedProjects,
            sortedResources:sortedResources,
*/
        };
        return service;

        ////////////////

		function dataSorter(dataType){

			var dataType 		= dataType.toUpperCase();
			var _deadlineSort 	= orderDeadlineSort.toUpperCase();
			var _departmentSort = orderDepartmentSort.toUpperCase();
			var _projectSort 	= orderProjectSort.toUpperCase();
			var _resourceSort 	= orderResourceSort.toUpperCase();

			//sorting Predicates
			function adminOrderDeadlines(rawDeadline){
				if (_deadlineSort == "ID"){
					return rawDeadline.id;
				}
				else if (_deadlineSort == "DATE"){ 
					return dataService.getDeadlineFull(rawDeadline.id).timestamp;;
				}
				else if (_deadlineSort == "PROJECTCOUNT"){
					return 0 - dataService.getDeadlineFull(rawDeadline.id).projectIds.length;
				}
				else if (_deadlineSort == "DEPARTMENTCOUNT"){
					return 0 - dataService.getDeadlineFull(rawDeadline.id).departmentIds.length;
				}
				else if (_deadlineSort == "RESOURCECOUNT"){
					return 0 - dataService.getDeadlineFull(rawDeadline.id).resourceIds.length;
				}
			};
			function adminOrderDepartments(rawDepartment){
				if (_departmentSort == "ID"){
					return rawDepartment.id;
				}
				else if (_departmentSort == "NAME"){
					var name = rawDepartment.name;
					return "-"+name;
				}
				else if (_departmentSort == "PROJECTCOUNT"){
					return 0 - dataService.getDepartmentFull(rawDepartment.id).projectIds.length;
				}
				else if (_departmentSort == "DEADLINECOUNT"){
					return 0 - dataService.getDepartmentFull(rawDepartment.id).deadlineIds.length;
				}
				else if (_departmentSort == "RESOURCECOUNT"){
					return 0 - dataService.getDepartmentFull(rawDepartment.id).resourceIds.length;
				}
			};
			function adminOrderProjects(rawProject){
				if (_projectSort == "ID"){
					return rawProject.id;
				}
				else if (_projectSort == "NAME" || _projectSort == "TITLE"){
					var name = rawProject.name;
					return "-"+name;
				}
				else if (_projectSort == "DEPARTMENTNAME"){
					var name = dataService.getDepartment(rawProject.departmentId).name;
					return "-" + name;
				}
				else if (_projectSort == "DEADLINEDATE"){
					var timestamp = dataService.getDeadline(rawProject.deadlineId).timestamp;
					return 0 - timestamp;
				}
				else if (_projectSort == "RESOURCECOUNT"){
					return 0 - rawProject.resources.length;
				}
			};
			function adminOrderResources(rawResource){
				if (_resourceSort == "ID"){
					return rawResource.id;
				}
				else if (_resourceSort == "NAME"){
					var name = rawResource.name;
					return "-"+name;
				}
				else if (_resourceSort == "PROJECTCOUNT"){
					return 0 - dataService.getResourceFull(rawResource.id).projectIds.length;
				}
				else if (_resourceSort == "DEADLINECOUNT"){
					return 0 - dataService.getResourceFull(rawResource.id).deadlineIds.length;
				}
				else if (_resourceSort == "DEPARTMENTCOUNT"){
					return 0 - dataService.getResourceFull(rawResource.id).departmentIds.length;
				}
			};

			//Handler
			if (dataType == 'DEADLINE'){
				return adminOrderDeadlines;
			} else if (dataType == 'DEPARTMENT'){
				return adminOrderDepartments;
			} else if (dataType == 'PROJECT'){
				return adminOrderProjects;
			} else if (dataType == 'RESOURCE'){
				return adminOrderResources;
			} else { // final catch;
				$log.error("sortingService.dataSorter: datatype not found.");
				return;
			}
        };
        function setSort(dataType, sort){
        	var dataType = dataType.toUpperCase();
        	var sort = sort.toUpperCase();

        	if(dataType == "DEADLINE"){
          		orderDeadlineSort = sort;
        	}else if(dataType == "DEPARTMENT"){   
        		orderDepartmentSort = sort;
        	}else if(dataType == "PROJECT"){
         		orderProjectSort = sort;
        	}else if(dataType == "RESOURCE"){
          		orderResourceSort = sort;
        	}
        };
    }
})();