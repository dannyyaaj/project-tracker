app.controller('EntryController', ['ProjectTrackerService', function (ProjectTrackerService) {
  let self = this;
  self.entries = ProjectTrackerService.entries;
  self.projects = ProjectTrackerService.projects;
  self.editing = false;
  self.editing_id = 0;

  self.entryToAdd = {
    description: '',
    project_id: '',
    // date: '',
    start_time: '',
    end_time: ''
  };

  self.addEntry = function (entry) {
    if (self.editing) {
      ProjectTrackerService.editEntry(entry, self.editing_id);
      self.editing = false;
    }
    ProjectTrackerService.addEntry(entry);
  }

  self.editEntry = function (entryToEdit) {
    self.editing = true;
    self.editing_id = entryToEdit.id;
    //! need to check this, inputs are not updating when trying to edit
    self.entryToAdd.description = entryToEdit.description;
    self.entryToAdd.project_id = '' + entryToEdit.project_id;
    self.entryToAdd.date = '';
    self.entryToAdd.start_time = '';
    self.entryToAdd.end_time = '';
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