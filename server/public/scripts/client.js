const app = angular.module('ProjectTrackerApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '../views/entry.html',
    controller: 'EntryController as vm'
  })
})