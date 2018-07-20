app.controller('EntryController', ['ProjectTrackerService','$http', function (ProjectTrackerService, $http) {
  let self = this;
  console.log('Inside EntryController');

  self.entries = ProjectTrackerService.entries;

  self.getEntries = ProjectTrackerService.getEntries;
}]);