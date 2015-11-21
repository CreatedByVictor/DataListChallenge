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
			templateUrl:'departments-noraml.html',
			controller:'DeadlinesController',
			controllerAs:'vm',
		};

		deadlinesResources = {
			name:'deadlines.resources',
			url:'/resources',
			templateUrl:'',
			controller:'deadlinesController',
			controllerAs:'vm',
		};

		departments = {
			name:'departments',
			url:'/departments',
			templateUrl:'app/departments/departments-normal.html',
			controller:'departmentsController',
			controllerAs:'vm',
		};

		departmentsResources = {
			name:'departments.resources',
			url:'/resources',
			templateUrl:'',
			controller:'departmentsController',
			controllerAs:'vm',
		};

		projects = {
			name:'projects',
			url:'/projects',
			templateUrl:'',
			controller:'ProjectsController',
			controllerAs:'vm',
		};

		projectsResources = {
			name:'projects.resources',
			url:'/resources',
			templateUrl:'',
			controller:'ProjectsController',
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