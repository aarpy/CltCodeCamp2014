'use strict';

var app = angular.module('cltCodeCamp2014App');

app.controller('MainCtrl', function ($scope, $http, socket) {
  // Constants
  var MAX_MESSAGES = 50;
  var RANDOM_QUOTES = [
    "Quote1",
    "Quote2",
    "Quote3",
    "Quote4",
    "Quote5",
    "Quote6",
    "Quote7",
  ];

  // Initialization
  $scope.newmessage = "";
  $scope.usercount = 1;
  $scope.username = "Guest";
  $scope.servername = "...";
  $scope.messages = [];

  // Socket implementation
  socket.on("init", function(data) {
    $scope.username = data.username;
    $scope.usercount  = data.usercount;
    $scope.servername = data.servername;

    addMessage({ type: "join", username: data.username });
  });

  socket.on("join", function(data) {
    $scope.usercount  = data.usercount;
    addMessage({ type: "join", username: data.username });
  });

  socket.on("message", function(data) {
    $scope.usercount  = data.usercount;
    addMessage({ type: "comment", username: data.username, content: data.content });
  });

  socket.on("left", function(data) {
    $scope.usercount  = data.usercount;
    addMessage({ type: "left", username: data.username });
  });

  // Angular event handlers
  $scope.sendMessage = function() {
    console.log("send message called: " + $scope.newmessage);
    sendMessage($scope.newmessage);
  };

  $scope.sendHelloCodeCamp = function() {
    console.log("sendHelloCodeCamp called");
    sendMessage("Hello Code Camp!");
  };

  $scope.sendRandomQuote = function() {
    console.log("sendRandomQuote called");

    var randomNumber = Math.floor((Math.random()*RANDOM_QUOTES.length));
    sendMessage(RANDOM_QUOTES[randomNumber]);
  };

  $scope.adduser = function() {
    console.log('calling adduser');
    $scope.usercount++;
  };

  // local helper functions
  function addMessage(message) {
    if ($scope.messages.length > MAX_MESSAGES) {
      $scope.messages.splice(0, $scope.messages.length - MAX_MESSAGES);
    }
    $scope.messages.push(message);
  }

  function sendMessage(content) {
    addMessage({ type: "comment", username: $scope.username, content: content });
    socket.emit("message", { content: content });
  }
});
