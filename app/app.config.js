(function() {
    angular.module('app').config(configure);
    configure.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configure($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/departments');
        var coreViewFilepath = "app/core/core.listview.host.html";
        var deadlines;
        var deadlinesResources;
        var departments;
        var departmentsResources;
        var projects;
        var projectsResources;
        
        var project;
        //////////////////////////////////////
        deadlines = {
            name: 'deadlines',
            url: '/deadlines',
            views: {
                'root': {
                    templateUrl: coreViewFilepath,
                    controller: 'deadlinesListController',
                    controllerAs: 'vm',
                },
                'listViewArea@deadlines': {
                    templateUrl: 'app/deadlines/deadlines-list.html',
                    controller: 'deadlinesListController',
                    controllerAs: 'vm',
                }
            }
        };
        deadlinesResources = {
            name: 'deadlines.resources',
            url: '/resources',
        };
        departments = {
            name: 'departments',
            url: '/departments',
            views: {
                'root': {
                    templateUrl: coreViewFilepath,
                    controller: 'departmentsListController',
                    controllerAs: 'vm',
                },
                'listViewArea@departments': {
                    templateUrl: 'app/departments/departments-list.html',
                    controller: 'departmentsListController',
                    controllerAs: 'vm',
                }
            }
        };
        departmentsResources = {
            name: 'departments.resources',
            url: '/resources',
        };
        projects = {
            name: 'projects',
            url: '/projects',
            views: {
                'root': {
                    templateUrl: coreViewFilepath,
                    controller: 'projectsListController',
                    controllerAs: 'vm',
                },
                'listViewArea@projects': {
                    templateUrl: 'app/projects/projects-list.html',
                    controller: 'projectsListController',
                    controllerAs: 'vm'
                }
            }
        };
        projectsResources = {
            name: 'projects.resources',
            url: '/resources',
        };
        project = function(parent, parentParent) {
            var ownName = parent.name + ".project"
            var projectViews = {};
            /*
            			projectViews['root'] = {
            				templateUrl:coreViewFilepath,
            				controller:'singleProjectController',
            				controllerAs:'vm',
            			};
            			*/
            if (angular.isUndefined(parentParent)) {
                projectViews['listViewArea@' + parent.name] = {
                    templateUrl: 'app/projects/single-project.html',
                    controller: 'singleProjectController',
                    controllerAs: 'vm'
                }
            } else {
                projectViews['listViewArea@' + parentParent.name] = {
                    templateUrl: 'app/projects/single-project.html',
                    controller: 'singleProjectController',
                    controllerAs: 'vm'
                }
            }
            return {
                parent: parent.name,
                name: ownName,
                url: "/project/{id:int}",
                views: projectViews,
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
        	.state(project(deadlinesResources, deadlines))
        	.state(project(departments))
        	.state(project(departmentsResources, departments))
        	.state(project(projects))
        	.state(project(projectsResources, projects));
    };
})()