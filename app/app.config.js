(function () {

	angular
		.module('app')
		.config(configure);

	configure.$inject = 
		['$stateProvider', '$urlRouterProvider'];

	function configure ($stateProvider, $urlRouterProvider){

		$urlRouterProvider.otherwise('/departments');

		var deadlines;
		var deadlinesResources;

		var departments;
		var departmentsResources;

		var projects;
		var projectsResources;

		var project;

		//////////////////////////////////////


		deadlines = {
			name:'deadlines',
			url:'/deadlines',
			templateUrl:'app/deadlines/deadlines-host.html',
			controller:'',
			controllerAs:'vm',
		};

		deadlinesResources = {
			name:'deadlines.resources',
			url:'/resources',
			templateUrl:'',
			controller:'',
			controllerAs:'vm',
		};

		departments = {
			name:'departments',
			url:'/departments',
			views:{
				'root':{	
					templateUrl:'app/departments/departments-host.html',
					controller:'departmentsController',
					controllerAs:'vm',
				},
				'listViewArea@departments':{
					templateUrl:'app/departments/departments-list.html',
					controller:'departmentsController',
					controllerAs:'vm',
				}
			}

		};

		departmentsResources = {
			name:'departments.resources',
			url:'/resources',
			views:{

				"listViewArea":{
					templateUrl:'app/departments/departments-list.html',
					controller:'departmentsController',
					controllerAs:'vm',
				}

			}

		};

		projects = {
			name:'projects',
			url:'/projects',
			templateUrl:'app/projects/projects-host.html',
			controller:'',
			controllerAs:'vm',
		};

		projectsResources = {
			name:'projects.resources',
			url:'/resources',
			templateUrl:'',
			controller:'',
			controllerAs:'vm',
		};

		project = function(parentName){
			return {
				parent:parentName.name,
				name:parentName.name+".project",
				url:"/project",
				controller:'ProjectController',
				controllerAs:'vm',
			};
		};


		//////////////////////////////////////

		$stateProvider
			.state(deadlines)
			.state(deadlinesResources)

			.state(departments)
			.state(departmentsResources)

			.state(projects)
			.state(projectsResources)

			.state(project(deadlines))
			.state(project(deadlinesResources))
			.state(project(departments))
			.state(project(departmentsResources))
			.state(project(projects))
			.state(project(projectsResources));



	};
	
})()