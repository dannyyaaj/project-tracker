app.controller('EntryController', ['ProjectTrackerService', '$mdToast', '$animate', function (ProjectTrackerService, $mdToast, $animate) {
  let self = this;
  self.entries = ProjectTrackerService.entries;
  self.projects = ProjectTrackerService.projects;
  self.showEdit = false;

  //initialize new object to send
  self.entryToAdd = {
    description: '',
    project_id: '',
    date: '',
    start_time: '',
    end_time: '',
  };

  self.addEntry = function (entry) {
    if (entry.description == '' | entry.date == '' | entry.start_time == '' | entry.end_time == '') {
      swal({
        title: "Oops",
        text: "Please complete all inputs before continuing.",
        icon: "warning",
        button: "Try Again!",
      });
    } else {
      ProjectTrackerService.addEntry(entry);
    }
  }

  self.setUpEdit = function (entryToEdit) {
    self.showEdit = !self.showEdit;
    entryToEdit.showEdit = !entryToEdit.showEdit;
  }
  self.editEntry = function (entryToEdit) {
    entryToEdit.showEdit = !entryToEdit.showEdit;
    self.showEdit = !self.showEdit;
    self.updateEntry(entryToEdit);
  }

  self.updateEntry = function (entryToEdit) {

    ProjectTrackerService.updateEntry(entryToEdit);
  }

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