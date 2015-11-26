(function() {
    "use strict";
    var ConvertedDataset = {
        "projects": [{
            "id": 1,
            "name": "Show Three Lists",
            "resources": [1, 2, 3, 4, 5, 6, 7],
            "deadlineId": 4,
            "departmentId": 1
        }, {
            "id": 2,
            "name": "Make Stepped List",
            "resources": [7],
            "deadlineId": 4,
            "departmentId": 2
        }, {
            "id": 3,
            "name": "Add UI-Router Rules",
            "resources": [3, 4, 5, 6],
            "deadlineId": 2,
            "departmentId": 5
        }, {
            "id": 4,
            "name": "Create Filters",
            "resources": [2, 6],
            "deadlineId": 1,
            "departmentId": 4
        }, {
            "id": 5,
            "name": "Sum Up Subtotals",
            "resources": [1],
            "deadlineId": 1,
            "departmentId": 5
        }],
        "departments": [{
            "id": 1,
            "name": "App Engineering"
        }, {
            "id": 2,
            "name": "Marketing"
        }, {
            "id": 3,
            "name": "DBAdmin"
        }, {
            "id": 4,
            "name": "SysOps"
        }, {
            "id": 5,
            "name": "Embedded"
        }, {
            "id": 6,
            "name": "GroceryOps"
        }],
        "deadlines": [{
            "id": 1,
            "date": "April 01, 2016 12:00:00"
        }, {
            "id": 2,
            "date": "March 15, 2016 12:00:00"
        }, {
            "id": 3,
            "date": "May 01, 2016 12:00:00"
        }, {
            "id": 4,
            "date": "January 01, 2016 12:00:00"
        }, {
            "id": 5,
            "date": "July 01, 2016 12:00:00"
        }, ],
        "resources": [{
            "id": 1,
            "name": "Kirk Middleton"
        }, {
            "id": 2,
            "name": "Spenser Estrada"
        }, {
            "id": 3,
            "name": "Kierra Buckner"
        }, {
            "id": 4,
            "name": "Hunter Luna"
        }, {
            "id": 5,
            "name": "Ahmad Justice"
        }, {
            "id": 6,
            "name": "Breana Medina"
        }, {
            "id": 7,
            "name": "Shelbie Cervantes"
        }]
    };
    angular.module('core').factory("dataService", dataService);
    dataService.$inject = ['utilityService', '$log'];

    function dataService(Util, $log) {
        var dataService = {
            // additions
            addDeadline                 : addDeadline,
            addDepartment               : addDepartment,
            addProject                  : addProject,
            addResource                 : addResource,
            // assignments
            assignDeadlineDate          : assignDeadlineDate,
            assignDepartmentName        : assignDepartmentName,
            assignProjectDeadlineId     : assignProjectDeadlineId,
            assignProjectDepartmentId   : assignProjectDepartmentId,
            assignProjectName           : assignProjectName,
            assignResourceIdToProject   : assignResourceIdToProject,
            assignResourceName          : assignResourceName,
            // Getters
            getDeadline                 : getDeadline,
            getDeadlineFull             : getDeadlineFull,
            getDepartment               : getDepartment,
            getDepartmentFull           : getDepartmentFull,
            getProject                  : getProject,
            getProjectFull              : getProjectFull,
            __getProjectSmart           : getProjectSmart, // Expiramental
            getResource                 : getResource,
            getResourceFull             : getResourceFull,
            //Lists:
            listDeadlines               : listDeadlines,
            listDeadlinesFull           : listDeadlinesFull,
            listDepartments             : listDepartments,
            listDepartmentsFull         : listDepartmentsFull,
            listOfUnassignedResourceIds : listOfUnassignedResourceIds,
            listProjects                : listProjects,
            listProjectsFull            : listProjectsFull,
            listResources               : listResources,
            listResourcesFull           : listResourcesFull,
            // Dataset:
            rawDataset                  : ConvertedDataset,
            // Removals
            removeDeadline              : removeDeadline,
            removeDepartment            : removeDepartment,
            removeProject               : removeProject,
            removeResource              : removeResource,
            // unnassignments
            unassignResourceIdToProject : unassignResourceIdToProject,
            updateProject               : updateProject,
        };
        return dataService;
        ///////////////////////////////////
        /*--------------------------
        *
        * Some Private Helpers
        *
        ----------------------------*/
        function _addOneToLargestIdIn(arrayName) {
            var output = 0;
            var arrayData = _getAllOf(arrayName);
            if (arrayData) {
                output = arrayData.reduce(function(lastValue, thisValue) {
                    if (lastValue.id > thisValue.id) {
                        return lastValue.id;
                    } else {
                        return thisValue.id;
                    }
                });
            }
            return output + 1;
        };

        function _getAllOf(arrayName) {
            var output;
            if (ConvertedDataset[arrayName]) {
                output = ConvertedDataset[arrayName];
            } else {
                $log.error("Could not retreve all of " + arrayName);
            }
            return output;
        };
        /*------------------------
        *
        * Private Deadline Getters
        *
        --------------------------*/
        function _getAllDeadlineDepartmentIds(id) {
            var output = [];
            var deadlineProjectIds = _getAllDeadlineProjectIds(id);
            deadlineProjectIds.map(function(projectId){
                output = Util.pushIfUnique(output, getProject(projectId).departmentId);
            });
            return output;
        };

        function _getAllDeadlineProjectIds(id) {
            var output = [];
            var projects = listProjects();
            projects.map(function(projectObject){
                var projectId = projectObject.id;
                if (projectObject.deadlineId == id){
                    output = Util.pushIfUnique(output, projectId);
                }
            });
            return output;
        };

        function _getAllDeadlineResourceIds(id) {
            var output = [];
            var deadlineProjectIds = _getAllDeadlineProjectIds(id);
            deadlineProjectIds.map(function(projectId){
                getProject(projectId).resources.map(function(resourceId){
                    output = Util.pushIfUnique(output, resourceId);
                });
            });
            return output;
        };
        /*--------------------------
        *
        * Private Department Getters
        *
        ----------------------------*/
        function _getAllDepartmentDeadlineIds(id) {
            var output = [];
            var deptProjectIds = _getAllDepartmentProjectIds(id);
            if (deptProjectIds) {
                for (var i = 0; i < deptProjectIds.length; i++) {
                    output = Util.pushIfUnique(output, getProject(deptProjectIds[i]).deadlineId);
                }
            }
            return output;
        };

        function _getAllDepartmentProjectIds(id) {
            var output = [];
            var projects = listProjects();
            if (projects) {
                for (var i = 0; i < projects.length; i++) {
                    if (projects[i].departmentId == id) {
                        output.push(projects[i].id);
                    }
                }
            }
            return output;
        };

        function _getAllDepartmentResourceIds(id) {
            var output = [];
            var deptProjectIds = _getAllDepartmentProjectIds(id);
            if (deptProjectIds) {
                for (var i = 0; i < deptProjectIds.length; i++) {
                    getProject(deptProjectIds[i]).resources.map(function(resourceId) {
                        output = Util.pushIfUnique(output, resourceId);
                    })
                }
            }
            return output;
        };
        /*--------------------------
        *
        * Private Resource Getters
        *
        ----------------------------*/
        function _getAllResourceDeadlineIds(id) {
            var output = [];
            var resourceProjectIds = _getAllResourceProjectIds(id);
            resourceProjectIds.map(function(projectId){
                output = Util.pushIfUnique(output, getProject(projectId).deadlineId);
            });
            return output;
        };

        function _getAllResourceDepartmentIds(id) {
            var output = [];
            var resourceProjectIds = _getAllResourceProjectIds(id);
            resourceProjectIds.map(function(projectId){
                output = Util.pushIfUnique(output, getProject(projectId).departmentId)
            })
            return output;
        };

        function _getAllResourceProjectIds(id) {
            var output = [];
            var projects = listProjects();
            projects.map(function(projectObject){
                var projectId = projectObject.id;
                projectObject.resources.map(function(resourceId){
                    if (resourceId == id){
                        output = Util.pushIfUnique(output, projectId);
                    }
                });
            });
            return output;
        };
        /*--------------------------
        *
        * More Private Helpers
        *
        ----------------------------*/
        function _getById(id, arrayName) {
            var output;
            var array = _getAllOf(arrayName);
            if (array) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i].id == id) {
                        output = array[i];
                        break;
                    }
                }
                if (!output) {
                    $log.error("Could not retreve Item with Id " + id + " from array " + arrayName)
                }
            }
            return output;
        };

        function _getIndexById(id, arrayName) {
            var output;
            //id = parseInt(id);
            var array = _getAllOf(arrayName);
            for (var i = 0; i < array.length; i++) {
                if (array[i].id == parseInt(id)) {
                    output = i;
                    break;
                }
            }
            if (!(output >= 0)) {
                $log.error("Could not find the index of the object with an id of " + id + " in the array named " + arrayName);
            }
            return output;
        };

        function _removeFrom(id, arrayName) {
            var index = _getIndexById(id, arrayName);
            if (index >= 0) {
                ConvertedDataset[arrayName].splice(index, 1);
                //$log.info("Index Deleted:", index, "Id:", id,  "ArrayName:", arrayName);
            } else {
                $log.error("Could not remove object with id " + id + " from array named " + arrayName);
            }
        };
        /*--------------------------
        *
        * Private Additions
        *
        ----------------------------*/
        function addDeadline(dateObject) {
            var newId = _addOneToLargestIdIn("deadlines");
            var newDate = Util.formatDateObjectToText(dateObject);
            if (newId) {
                if (newDate) {
                    var newDateObject = {
                        "id": newId,
                        "date": newDate
                    };
                    ConvertedDataset["deadlines"].push(newDateObject);
                    return getDeadline(newId); // for verification.
                }
            }
            return null;
        };

        function addDepartment(name) {
            var newId = _addOneToLargestIdIn("departments");
            if (newId) {
                var newDeptObject = {
                    "id": newId,
                    "name": name
                };
                ConvertedDataset["departments"].push(newDeptObject);
                return getDepartment(newId); //for verification.
            };
            return null;
        };

        function addProject(projectDataObject) {
            var newId = _addOneToLargestIdIn("projects");
            if (newId) {
                //this will strip out anything else we added to the project.
                var newProjectObject = {
                    "id": newId,
                    "name": projectDataObject.name,
                    "departmentId": projectDataObject.departmentId,
                    "deadlineId": projectDataObject.deadlineId,
                    "resources": projectDataObject.resources
                };
                ConvertedDataset["projects"].push(newProjectObject);
                return getProject(newId); //for verification
            };
            return null;
        };

        function addResource(name) {
            var newId = _addOneToLargestIdIn('resources');
            if (newId) {
                var newResourceObject = {
                    "id": newId,
                    "name": name
                }
                ConvertedDataset["resources"].push(newResourceObject);
                return getResource(newId); //for verification
            }
            return null;
        };
        /*--------------------------
        *
        * Public Assignments
        *
        ----------------------------*/
        function assignDeadlineDate(deadlineId, dateObject) {
            var index = _getIndexById(deadlineId, "deadlines");
            if (index) {
                var newDateText = Util.formatDateObjectToText(dateObject);
                if (newDateText) {
                    ConvertedDataset["deadlines"].date = newDateText;
                } else {
                    $log.error("DateObject was not able to be formatted, and thus was not assigned to that deadline id:" + deadlineId);
                    $log.error("dateObject:", dateObject);
                }
            } else {
                $log.error("Had an Error while trying to assign the date of the deadline with id " + deadlineId + " which does not exist.");
            }
        };

        function assignDepartmentName(departmentId, name) {
            var index = _getIndexById(departmentId, "departments");
            if (index) {
                ConvertedDataset["departments"][index].name = name;
            } else {
                $log.error("Had an Error when trying to assign the name of department with id " + departmentId + " Which does not exist.");
            }
        };

        function assignProjectDeadlineId(projectId, deadlineId) {
            var index = _getIndexById(projectId, "projects");
            if (index) {
                var newDeadline = getDeadline(deadlineId);
                if (newDeadline) {
                    ConvertedDataset["projects"][index].deadlineId = deadlineId;
                } else {
                    $log.error("deadlineId cannot be assigned to project as it does not exist.");
                    $log.error("deadlineId", deadlineId);
                }
            } else {
                $log.error("Had an Error when trying to assign deadlineId with project with id " + projectId + " Which does not exist.");
            }
        };

        function assignProjectDepartmentId(projectId, departmentId) {
            var index = _getIndexById(projectId, "projects");
            if (index) {
                var newDepartment = getDepartment(departmentId);
                if (newDepartment) {
                    ConvertedDataset["projects"][index].departmentId = departmentId;
                } else {
                    $log.error("departmentId cannot be assigned to that project as the department does not exist.");
                    $log.error("departmentId", departmentId);
                }
            } else {
                $log.error("Had an Error when trying to assign departmentId with project with id " + projectId + " Which does not exist.");
            }
        };

        function assignProjectName(projectId, name) {
            var index = _getIndexById(projectId, "projects");
            if (index) {
                ConvertedDataset["projects"][index].name = name;
            } else {
                $log.error("Had an Error when trying to assign the name of project with id " + projectId + " Which does not exist.");
            }
        };

        function assignResourceIdToProject(projectId, resourceId) {
            var index = _getIndexById(projectId, "projects");
            if (index) {
                var newResource = getResource(resourceId);
                if (newResource) {
                    ConvertedDataset["projects"][index].resources.push(resourceId);
                } else {
                    $log.error("Cannot assign that resource to that project as that resource does not exist.");
                    $log.error('resourceId', resourceId);
                }
            } else {
                $log.error("Had an Error when trying to assign the resourceID to the project with id " + projectId + " Which does not exist.");
            }
        };

        function assignResourceName(resourceId, name) {
            var index = _getIndexById(resourceId, "resources");
            if (index) {
                ConvertedDataset["resources"][index].name = name;
            } else {
                $log.error("Had an Error when trying to assign the name of the resource with id " + resourceId + " Which does not exist.");
            }
        };
        /*--------------------------
        *
        * Public Getters
        *
        ----------------------------*/
        function getDeadline(id) {
            var deadline = _getById(id, "deadlines");
            //deadline.timestamp = Date.parse(deadline.date);
            //Added a timestamp that is generated from, but not saved to the dataset.
            if (deadline){
                var newDeadline = {
                        "id":deadline.id,
                        "_dateHolder":deadline.date,
                        "date":deadline.date,
                        "_timestampHolder":undefined,
                        "timestamp":undefined,
                };
                Object.defineProperty(newDeadline,"timestamp",{
                	get:function(){
                		if (angular.isUndefined(this._dateHolder)){
                			this._dateHolder = this.date;
                		}
                		this._timestampHolder = Date.parse(this._dateHolder);
                		return this._timestampHolder;
                	},
                	set:function(input){

                            var newTextDate = Util.formatDateObjectToText(new Date(input));

                		    this._dateHolder = newTextDate;
                		    this.date = newTextDate;
                		    this._timestampHolder = Date.parse(this._timestampHolder);     
                	}
                });
                //Adds a dynamicly changing 'date' when the timestamp is changed.

            return newDeadline;
           }
           else{
                $log.error("could not get deadline with id:", id);
                return null;
           }
        };

        function getDeadlineFull(id) {
            var oldDeadline = getDeadline(id);
            if (oldDeadline){
                    var ownProjectIds = _getAllDeadlineProjectIds(id);
                    var ownDepartmentIds = _getAllDeadlineDepartmentIds(id);
                    var ownResourceIds = _getAllDeadlineResourceIds(id);
                    var ownProjects = [];
                    var ownDepartments = [];
                    var ownResources = [];

                    ownProjectIds.map(function(projectId) {
                        ownProjects.push(getProject(projectId));
                    });
                    ownDepartmentIds.map(function(departmentId) {
                        ownDepartments.push(getDepartment(departmentId));
                    });
                    ownResourceIds.map(function(resourceId) {
                        ownResources.push(getResource(resourceId));
                    });

                    var newDeadline = {};
                    newDeadline['id'] = oldDeadline.id;
                    newDeadline['date'] = oldDeadline.date;
                    newDeadline['timestamp'] = oldDeadline.timestamp;
                    newDeadline['projectIds'] = ownProjectIds;
                    newDeadline['departmentIds'] = ownDepartmentIds;
                    newDeadline['resourceIds'] = ownResourceIds;
                    //newDeadline['projects'] = ownProjects;
                    //newDeadline['departments'] = ownDepartments;
                    //newDeadline['resources'] = ownResources;

                    return newDeadline;
            }
            else{
                    return null;
            }
        };

        function getDepartment(id) {
            return _getById(id, "departments");
        };

        function getDepartmentFull(id) {
            var oldDepartment = getDepartment(id);
            var deptProjectIds = _getAllDepartmentProjectIds(id);
            var deptResourceIds = _getAllDepartmentResourceIds(id);
            var deptDeadlineIds = _getAllDepartmentDeadlineIds(id);
            var projects = deptProjectIds.map(function(p_id) {
                return getProject(p_id);
            });
            var resources = deptResourceIds.map(function(r_id) {
                return getResource(r_id);
            });
            var deadlines = deptDeadlineIds.map(function(d_id) {
                return getDeadline(d_id);
            });
            var newDept = {
                "id": oldDepartment.id,
                "name": oldDepartment.name,
                "projectIds": deptProjectIds,
                "projects": projects,
                "resourceIds": deptResourceIds,
                "resources": resources,
                "deadlineIds": deptDeadlineIds,
                "deadlines": deadlines,
            };
            return newDept;
        };

        function getProject(id) {
            return _getById(id, "projects");
        };

        function getProjectFull(id) {
            var oldProject = getProject(id);
            var resourceObjects = oldProject.resources.map(function(r_id) {
                return getResource(r_id);
            });
            var departmentObject = getDepartment(oldProject.departmentId);
            var deadlineObject = getDeadline(oldProject.deadlineId);
            var newProject = {
                "id": oldProject.id,
                "name": oldProject.name,
                "resources": oldProject.resources,
                "resource": resourceObjects,
                "departmentId": oldProject.departmentId,
                "department": departmentObject,
                "deadlineId": oldProject.deadlineId,
                "deadline": deadlineObject
            }
            return newProject;
        };

        function getProjectSmart(id) { // Warning: Highly Expiramental.
            var oldProject = getProject(id);
            var newProject = oldProject;
            Object.defineProperty(newProject, "resources", {
                get: function() {
                    ConvertedDataset["projects"][this.myIndex].resources = []; //Empty it.
                    return this.resources.map(function(id) {
                        return getResource(id);
                    });
                },
                set: function(newResourceIdArray) {
                    for (var i = 0; i < newResourceIdArray.length; i++) {
                        assignResourceIdToProject(newResourceIdArray[i]);
                    }
                }
            });
            Object.defineProperty(newProject, "timestamp", {
                get: function() {
                    //This is get only.
                    return getDeadline(this.deadlineId).timestamp;
                }
            });
            Object.defineProperty(newProject, "department", {
                get: function() {
                    return getDepartment(this.departmentId);
                },
                set: function(departmentId) {
                    assignProjectDepartmentId(this.id, departmentId);
                }
            });
            Object.defineProperty(newProject, "deadline", {
                get: function() {
                    return getDeadline(this.deadlineId);
                },
                set: function(newDeadlineId) {
                    assignProjectDeadlineId(this.id, newDeadlineId);
                }
            });
            Object.defineProperty(newProject, "myIndex", {
                get: function() {
                    return _getById(this.id, "projects");
                }
            });
            return newProject;
        };

        function getResource(id) {
            return _getById(id, "resources");
        };

        function getResourceFull(id) {
            var oldResource = getResource(id);
            var projectIds = _getAllResourceProjectIds(id);
            var departmentIds = _getAllResourceDepartmentIds(id);
            var deadlineIds = _getAllResourceDeadlineIds(id);
            var projects = projectIds.map(function(p_id) { //works
                return getProject(p_id);
            });
            var departments = departmentIds.map(function(dept_id) {
                return getDepartment(dept_id);
            });
            var deadlines = deadlineIds.map(function(dead_id) {
                return getDeadline(dead_id);
            });
            var newResource = {
                "id": oldResource.id,
                "name": oldResource.name,
                "projectIds": projectIds,
                "projects": projects,
                "departmentIds": departmentIds,
                "departments": departments,
                "deadlineIds": deadlineIds,
                "deadlines": deadlines,
            };
            return newResource;
        };
        /*--------------------------
        *
        * Public Listers
        *
        ----------------------------*/
        function listDeadlines() {
            var rawDeadlines = ConvertedDataset['deadlines'];
            /*var output = [];

            rawDeadlines.map(function(deadline){
                output.push(getDeadline(deadline.id)); //returns converted deadline.
            })*/

            return rawDeadlines;
        };

        function listOfUnassignedResourceIds(projectResources){
            var output = [];
            var resources = listResources();

            resources.map(function(resource){
                var isInProject = false;
                projectResources.map(function(p_resource){
                    if (resource.id === p_resource){
                        isInProject = true;
                    }
                });
                if (!isInProject){
                    output.push(resource.id);
                }
            });

            return output;
        }

        function listDeadlinesFull() {
            var output = [];
            listDeadlines().map(function(deadline){
                output.push(getDeadlineFull(deadline.id));
            });
            return output;
        };

        function listDepartments() {
            return ConvertedDataset['departments'];
        };

        function listDepartmentsFull() {
            var output = [];
            var departments = listDepartments();
            for (var i = 0; i < departments.length; i++) {
                var id = departments[i].id;
                output.push(getDepartmentFull(id));
            }
            return output;
        };

        function listProjects() {
            return ConvertedDataset['projects'];
        };

        function listProjectsFull() {
            return listProjects().map(function(project) {
                return getProjectFull(project.id)
            });
        };

        function listResources() {
            return ConvertedDataset['resources'];
        };

        function listResourcesFull() {
            var output = [];
            var resources = listResources();
            for (var i = 0; i < resources.length; i++) {
                var id = resources[i].id;
                output.push(getResourceFull(id));
            }
            return output;
        };
        /*--------------------------
        *
        * Public Removals
        *
        ----------------------------*/
        function removeDeadline(id) {
            var projectIdsWithDeadline = _getAllDeadlineProjectIds(id);
            if (projectIdsWithDeadline.length > 0) {
                projectIdsWithDeadline.map(function(p_id) {
                    index = _getIndexById(p_id, "projects");
                    ConvertedDataset["projects"][index].deadlineId = undefined;
                });
            }
            _removeFrom(id, "deadlines");
            var zombie = getDeadline(id);
            if (zombie) {
                $log.error("Did not successfully remove deadline, somehow...deadlineId:", deadlineId);
            }
        };

        function removeDepartment(id) {
            var projectIdsWithDept = _getAllDepartmentProjectIds(id);
            if (projectIdsWithDept.length > 0) {
                projectIdsWithDept.map(function(p_id) {
                    var index = _getIndexById(p_id, "projects");
                    ConvertedDataset["projects"][index].departmentId = undefined; //BAM!
                });
            }
            _removeFrom(id, "departments");
            var zombie = getDepartment(id);
            if (zombie) {
                $log.log("Could not remove departement Id... aparently... departmentId:", departmentId);
            }
        };

        function removeProject(id) {
            _removeFrom(id, "projects");
        };

        function removeResource(id) {
            var resourceProjectIds = _getAllResourceProjectIds(id);
            if (resourceProjectIds.length > 0) {
                for (var i = 0; i < resourceProjectIds.length; i++) {
                    unassignResourceIdToProject(resourceProjectIds[i], id); // Blammo.
                }
            }
            _removeFrom(id, "resources");
            var zombie = getResource(id);
            if (zombie) {
                $log.error("Could not remove resource from database... resourceId:" + id);
            }
        };
        /*--------------------------
        *
        * Public Unassignments
        *
        ----------------------------*/
        function unassignResourceIdToProject(projectId, resourceId) {
            var index = _getIndexById(projectId, "projects");
            var project = getProject(projectId);
            var rec_index;
            //get the resource index in the project.
            for (var i = 0; i < project.resources.length; i++) {
                if (project.resources[i] == resourceId) {
                    rec_index = i;
                    break;
                }
            };
            ConvertedDataset["projects"][index].resources.splice(rec_index, 1);
        };

        function updateProject(id, projectData){

            var index = _getIndexById(id, "projects");

            if (index >= 0){

                var updatedProject = {};

                updatedProject["id"] = id;
                updatedProject["name"] = projectData.name;
                updatedProject["deadlineId"] = projectData.deadlineId;
                updatedProject["departmentId"] = projectData.departmentId;
                updatedProject["resources"] = projectData.resources;

                ConvertedDataset["projects"][index] = updatedProject;

                //$log.info(" Updated Project ID:", id);
            }
            else{
                $log.error("Error:", projectData,"ID:",id);
            }

        };
    };
    ///	
})()