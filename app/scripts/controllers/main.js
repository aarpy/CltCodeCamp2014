'use strict';

var app = angular.module('cltCodeCamp2014App');

app.controller('MainCtrl', function ($scope, $http, toastr, socket) {
  // Constants
  var MAX_MESSAGES = 50;
  // Quotes from https://www.pinterest.com/sbletnitsky/random-sayings-quotes/
  var RANDOM_QUOTES = [
    'I Love Charlotte',
    'A moment of patience in a moment of anget saves you a hundred moments of regret',
    'If you cant be kind, be quiet!',
    'A few nice words can help a person a lot more than you think',
    'A book is a device to ignite the imagination',
    'Your attitude determines your direction',
    'Caffeine is foundation of my food pyramid',
    'Make it simple but significant',
  ];

  // Initialization
  $scope.connected = false;
  $scope.newmessage = '';
  $scope.usercount = 1;
  $scope.username = 'Guest';
  $scope.servername = '...';
  $scope.servernames = [];
  $scope.servernamesDisplay = '';
  $scope.messages = [];

  // Socket implementation
  socket.on('init', function(data) {
    $scope.username = data.username;
    $scope.usercount  = data.usercount;
    $scope.servername = data.servername;
    $scope.servernames = data.servernames;
    $scope.servernamesDisplay = $scope.servernames.join(', ');

    $scope.connected = true;
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

  socket.on('server:join', function(data) {
    $scope.servernames.push(data.servername);
    $scope.servernamesDisplay = $scope.servernames.join(', ');
    toastr.info(data.servername + ' server added', 'Information', {
      'timeOut': '30000',
      'positionClass': 'toast-bottom-right'
    });
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
      toastr.error('Enter a message to send', 'Error', {
        'timeOut': '1000',
        'positionClass': 'toast-bottom-right'
      });
      return;
    }
    content = content.replace(/[^\w\s\.!,]/gi, '');

    console.log('sendMessage: ' + content);
    socket.emit('message', { content: content });
    toastr.info('Your message is queued', 'Information', {
      'timeOut': '1000',
      'positionClass': 'toast-bottom-right'
    });
  }
});
