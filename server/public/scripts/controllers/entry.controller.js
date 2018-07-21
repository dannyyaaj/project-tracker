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

  self.addEntry = ProjectTrackerService.addEntry;

  self.removeEntry = function (entryId) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this entry!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          ProjectTrackerService.removeEntry(entryId);
        }
      });
  }
  self.getEntries = ProjectTrackerService.getEntries;
}]);