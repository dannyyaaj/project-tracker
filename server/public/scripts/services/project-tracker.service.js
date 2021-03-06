app.service('ProjectTrackerService', ['$http', function ($http) {
  let self = this;
  console.log('ProjectTrackerService has started');

  // list of entries
  self.entries = {
    list: []
  };
  // list of projects
  self.projects = {
    list: []
  };

  // Get all entires
  self.getEntries = function () {
    $http.get('/entry')
      .then((response) => {
        self.entries.list = response.data;
      })
      .catch(function (error) {
        console.log('error on function getEntries', error);
      })
  }

  // Add a new entry
  self.addEntry = function (entryToAdd) {
    console.log(entryToAdd, 'object to be posted');
    $http.post('/entry', entryToAdd)
      .then((response) => {
        entryToAdd.description = null;
        entryToAdd.date = null;
        entryToAdd.start_time = null;
        entryToAdd.end_time = null;
        swal({
          title: "Yay!",
          text: "Entry Added!",
          icon: "success",
          button: "Continue!",
        });
        self.getEntries();
        self.getProjects();
      })
      .catch((error) => {
        swal({
          title: "Oops",
          text: "There was an error with your request!",
          icon: "warning",
          button: "Try Again!",
        });
      });
  }

  self.removeEntry = function (entryId) {
    $http.delete(`/entry/${entryId}`)
      .then((response) => {
        swal("Your entry has been deleted!", {
          icon: "success",
        });
        self.getEntries();
        self.getProjects();
      })
      .catch((error) => {
        swal({
          title: "Oops",
          text: "There was an error with your request!",
          icon: "warning",
          button: "Try Again!",
        });
      })
  }

  self.getProjects = function () {
    $http.get('/project')
      .then((response) => {
        self.projects.list = response.data;
        console.log(response.data, 'projects')
      })
      .catch(function (error) {
        console.log('error on function getProjects', error);
      })
  }

  self.addProject = function (projectToAdd) {
    $http.post('/project', projectToAdd)
      .then((response) => {
        projectToAdd.name = null;
        swal({
          title: "Yay!",
          text: "Project Added!",
          icon: "success",
          button: "Continue!",
        });
        self.getProjects();
      }).catch((error) => {
        console.log('error making projects request', error);
        alert('Something went wrong!')
      })
  }

  self.removeProject = function (projectId) {
    $http.delete(`/project/${projectId}`)
      .then((response) => {
        swal("Your project has been deleted!", {
          icon: "success",
        });
        self.getProjects();
      })
      .catch((error) => {
        swal({
          title: "Oops",
          text: "There was an error with your request!",
          icon: "warning",
          button: "Try Again!",
        });
      })
  }

  self.updateEntry = function (entryToEdit) {
    // data to update  
    $http.put(`/entry/${entryToEdit.id}`, entryToEdit)
      .then((response) => {
        self.getEntries();
      })
      .catch((error) => {
        swal({
          title: "Oops",
          text: "There was an error with your request!",
          icon: "warning",
          button: "Try Again!",
        });
      })
  }

  self.getProjects();
  self.getEntries();
}])