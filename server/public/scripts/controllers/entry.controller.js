app.controller('EntryController', ['ProjectTrackerService', function (ProjectTrackerService) {
  let self = this;
  console.log('Inside EntryController');

  self.entries = ProjectTrackerService.entries;
  self.projects = ProjectTrackerService.projects;

  self.entryToAdd = {
    description: '',
    project_id: '',
    date: '',
    start_time: '',
    end_time: ''
  };


  self.addEntry = function (newEntry) {
    ProjectTrackerService.addEntry(newEntry);
  }
  self.getEntries = ProjectTrackerService.getEntries;
}]);