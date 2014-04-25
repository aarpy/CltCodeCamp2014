'use strict';

var app = angular.module('cltCodeCamp2014App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'toastr',
  'btford.socket-io'
]);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/main',
      controller: 'MainCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
    
  $locationProvider.html5Mode(true);
});

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

app.factory('socket', function (socketFactory) {
  return socketFactory();
});
