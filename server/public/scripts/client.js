const app = angular.module('ProjectTrackerApp', ['ngRoute', 'ngMaterial', 'ngMessages', 'md.data.table']);

app.config(function ($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: '../views/entry.html',
      controller: 'EntryController as vm'
    })
    .when('/project', {
      templateUrl: '../views/project.html',
      controller: 'ProjectController as vm'
    })
    .when('/report', {
      templateUrl: '../views/report.html',
      controller: 'ReportController as vm'
    })
    .otherwise({
      template: '<h1>404</h1>'
    })
})

app.config(function ($mdThemingProvider) {
  $mdThemingProvider
    .theme('default')
    .primaryPalette('light-blue')
    .accentPalette('purple')
    .warnPalette('red')
    .backgroundPalette('grey');
  $mdThemingProvider.alwaysWatchTheme(true);
});