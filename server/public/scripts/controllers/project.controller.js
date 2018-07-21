app.controller('ProjectController', ['ProjectTrackerService', function (ProjectTrackerService) {
  let self = this;
  console.log('Inside ProjectController');

  self.projects = ProjectTrackerService.projects;

  self.getProjects = ProjectTrackerService.getProjects;

  self.addProject = ProjectTrackerService.addProject;
}]);