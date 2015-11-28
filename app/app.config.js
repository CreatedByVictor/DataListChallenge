(function() {
    angular.module('app').config(configure);
    configure.$inject = ['$stateProvider', '$urlRouterProvider', '$rootScopeProvider'];

    function configure($stateProvider, $urlRouterProvider, $rootScopeProvider) {
        var admin;
        var adminEditDeadlines;
        var adminEditDepartments;
        var adminEditProjects;
        var adminEditResources;
        var adminDataset;

        var coreViewFilepath = "app/core/core.listview.host.html";
        var deadlines;
        var deadlinesResources;
        var departments;
        var departmentsResources;
        var projects;
        var projectsResources;

        var project;
        //////////////////////////////////////
        admin = {
            name:"admin",
            url:"/admin",
            views:{
                'root':{
                    templateUrl:'app/admin/admin-host-page.html',
                    controller: 'adminPageController',
                    controllerAs:'vm'
                }
            }
        };
        adminEditDeadlines = {
            name:'admin.editDeadlines',
            url:"/deadlines",
            views:{
                "adminView":{
                    templateUrl:'app/admin/admin-templates/admin-edit-deadlines.html',
                    controller: 'adminPageController',
                    controllerAs:'vm'
                }
            }
        };
        adminEditDepartments = {
            name:'admin.editDepartments',
            url:"/departments",
            views:{
                "adminView":{
                    templateUrl:'app/admin/admin-templates/admin-edit-departments.html',
                    controller: 'adminPageController',
                    controllerAs:'vm'
                }
            }
        };
        adminEditProjects = {
            name:'admin.editProjects',
            url:"/projects",
            views:{
                "adminView":{
                    templateUrl:'app/admin/admin-templates/admin-edit-projects.html',
                    controller: 'adminPageController',
                    controllerAs:'vm'
                }
            }
        };
        adminEditResources = {
            name:'admin.editResources',
            url:"/resources",
            views:{
                "adminView":{
                    templateUrl:'app/admin/admin-templates/admin-edit-resources.html',
                    controller: 'adminPageController',
                    controllerAs:'vm'
                }
            }
        };
        adminDataset = {
            name:'admin.dataset',
            url:"/dataset",
            views:{
                "adminView":{
                    templateUrl:'app/admin/admin-templates/admin-dataset.html',
                    controller: 'adminPageController',
                    controllerAs: 'vm'
                }
            }
        }


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

        //$rootScopeProvider.digestTtl(100); //Hack.

        $urlRouterProvider.otherwise('/departments');
        $urlRouterProvider.when('/admin', '/admin/projects');
        $stateProvider
          .state(admin)
          .state(adminEditDeadlines)
          .state(adminEditDepartments)
          .state(adminEditProjects)
          .state(adminEditResources)
          .state(adminDataset)
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
