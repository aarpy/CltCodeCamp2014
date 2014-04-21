'use strict';

var app = angular.module('cltCodeCamp2014App');

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

app.controller('MainCtrl', function ($scope, $http) {

    var MAX_MESSAGES = 10;
    var RANDOM_QUOTES = [
      "Quote1",
      "Quote2",
      "Quote3",
      "Quote4",
      "Quote5",
      "Quote6",
      "Quote7",
    ];

    $scope.newmessage = "";
    $scope.usercount = 1;
    $scope.username = "Ramu";
    $scope.servername = "localhost";
    $scope.messages = [
      { type: "join", user: "Ramu"},
      { type: "comment", user: "Ramu", content: "Hello Code Camp!"},
      { type: "comment", user: "Ramu", content: "Hello Code Camp!"},
      { type: "comment", user: "Ramu", content: "Hello Code Camp!"},
      { type: "left", user: "Ramu"},
      { type: "join", user: "Ramu"},
    ];

    $scope.sendMessage = function() {
      console.log("send message called: " + $scope.newmessage);
      addMessage({ type: "comment", user: $scope.username, content: $scope.newmessage });
    };

    $scope.sendHelloCodeCamp = function() {
      console.log("sendHelloCodeCamp called");
      addMessage({ type: "comment", user: $scope.username, content: "Hello Code Camp!"});
    };

    $scope.sendRandomQuote = function() {
      console.log("sendRandomQuote called");

      var randomNumber = Math.floor((Math.random()*RANDOM_QUOTES.length));
      addMessage({ type: "comment", user: $scope.username, content: RANDOM_QUOTES[randomNumber]});
    };

    $scope.adduser = function() {
      console.log('calling adduser');
      $scope.usercount++;
    };

    $scope.addmessage = function() {
      console.log('calling addmessage');
      addMessage({ type: "comment", user: "Test", content: "Hello Code Camp!"});
    };

    function addMessage(message) {
      if ($scope.messages.length > MAX_MESSAGES) {
        $scope.messages.splice(0, $scope.messages.length - MAX_MESSAGES);
      }
      $scope.messages.push(message);
    }
  });
