'use strict';

angular.module('cltCodeCamp2014App')
  .controller('MainCtrl', function ($scope, $http) {

    $scope.newmessage = "";
    $scope.username = "username";
    $scope.servername = "localhost";
    $scope.messages = [
      { type: "join", user: "Ramu"},
      { type: "left", user: "Ramu"},
      { type: "comment", user: "Ramu", content: "Hello Code Camp!"},
      { type: "comment", user: "Ramu", content: "Hello Code Camp!"},
      { type: "comment", user: "Ramu", content: "Hello Code Camp!"},
      { type: "join", user: "Ramu"},
      { type: "comment", user: "Ramu", content: "Hello Code Camp!"},
      { type: "comment", user: "Ramu", content: "Hello Code Camp!"},
      { type: "comment", user: "Ramu", content: "Hello Code Camp!"},
      { type: "comment", user: "Ramu", content: "Hello Code Camp!"},
      { type: "left", user: "Ramu"},
      { type: "comment", user: "Ramu", content: "Hello Code Camp!"},
      { type: "comment", user: "Ramu", content: "Hello Code Camp!"},
      { type: "comment", user: "Ramu", content: "Hello Code Camp!"},
      { type: "comment", user: "Ramu", content: "Hello Code Camp!"},
      { type: "left", user: "Ramu"},
      { type: "comment", user: "Ramu", content: "Hello RDA!"}
    ];

    $scope.sendMessage = function() {
      console.log("send message called: " + $scope.newmessage);
    };

    $scope.sendHelloCodeCamp = function() {
      console.log("sendHelloCodeCamp called");
    };

    $scope.sendRandomQuote = function() {
      console.log("sendRandomQuote called");
    };
  });
