'use strict';

var app = angular.module('cltCodeCamp2014App');

app.controller('MainCtrl', function ($scope, $http, socket) {
  // Constants
  var MAX_MESSAGES = 50;
  var RANDOM_QUOTES = [
    'Quote1',
    'Quote2',
    'Quote3',
    'Quote4',
    'Quote5',
    'Quote6',
    'Quote7',
    'Quote8',
  ];

  // Initialization
  $scope.newmessage = '';
  $scope.usercount = 1;
  $scope.username = 'Guest';
  $scope.servername = '...';
  $scope.messages = [];

  // Socket implementation
  socket.on('init', function(data) {
    $scope.username = data.username;
    $scope.usercount  = data.usercount;
    $scope.servername = data.servername;
  });

  socket.on('join', function(data) {
    $scope.usercount  = data.usercount;
    addMessage({ type: 'join', username: data.username });
  });

  socket.on('message', function(data) {
    addMessage({ type: 'comment', username: data.username, content: data.content });
  });

  socket.on('left', function(data) {
    $scope.usercount  = data.usercount;
    addMessage({ type: 'left', username: data.username });
  });

  // Angular event handlers
  $scope.sendMessage = function() {
    sendMessage($scope.newmessage);
  };

  $scope.sendHelloCodeCamp = function() {
    sendMessage('Hello Code Camp!');
  };

  $scope.sendRandomQuote = function() {
    var randomNumber = Math.floor((Math.random()*RANDOM_QUOTES.length));
    sendMessage(RANDOM_QUOTES[randomNumber]);
  };

  $scope.adduser = function() {
    console.log('calling adduser');
    $scope.usercount++;
  };

  // local helper functions
  function addMessage(message) {
    if (message === null || message.length === 0) {
      return;
    }
    if ($scope.messages.length > MAX_MESSAGES) {
      $scope.messages.splice(0, $scope.messages.length - MAX_MESSAGES);
    }
    $scope.messages.push(message);
  }

  function sendMessage(content) {
    if (content === null || content.length === 0) {
      return;
    }
    console.log('sendMessage: ' + content);
    socket.emit('message', { content: content });
  }
});
