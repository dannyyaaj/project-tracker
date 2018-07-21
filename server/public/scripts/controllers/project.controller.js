app.controller('ProjectController', ['ProjectTrackerService', function (ProjectTrackerService) {
  let self = this;
  console.log('Inside ProjectController');

  self.projects = ProjectTrackerService.projects;

  self.getProjects = ProjectTrackerService.getProjects;

  self.removeProject = function (project) {
    if (project.all_entries > 0) {
      swal({
        title: "Warning!",
        text: "Please delete all project entries before deleting a project!",
        icon: "warning",
        button: "Continue...",
      })
    } else {
      swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this project!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            ProjectTrackerService.removeProject(project.id);
          }
        });
    }
  }

  self.addProject = ProjectTrackerService.addProject;
}]);