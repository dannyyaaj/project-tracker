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
        console.log(response.data, 'entries');
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
        self.getEntries();
        self.getProjects();
      })
      .catch((error) => {
        console.log('error making entry post request', error);
        alert('Something went wrong! Check the server.');
      });
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
  self.getProjects();
  self.getEntries();
}])