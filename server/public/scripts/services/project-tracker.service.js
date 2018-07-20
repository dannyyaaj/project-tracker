app.service('ProjectTrackerService', ['$http', function ($http) {
  let self = this;
  console.log('ProjectTrackerService has started');

  self.entries = {
    list: []
  }

  // Get all entires
  self.getEntries = function () {
    $http.get('/entry')
      .then((response) => {
        self.entries.list = response.data;
        console.log(response.data);
      })
      .catch(function (error) {
        console.log('error on function getEntries', error);
      })
  }

   // Add a new entry
   self.addEntry = function (entryToAdd) {
     $http({
       method: 'POST',
       url: '/entry',
       data: entryToAdd
     }).then((response) => {
       self.getEntries();
     }).catch((error) => {
       console.log('error making entry get request', error);
       alert('Something went wrong! Check the server.');
     });
   }


  self.getEntries();
}])