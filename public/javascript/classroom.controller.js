/**
 * Created by ericxiao on 2017-02-09.
 */
'use strict';

angular.module('app.classroom', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/class/:classId', {
            templateUrl: 'views/classroom.html',
            controller: 'classCtrl',
            controllerAs:'vm'
        });
    }])

    .controller('classCtrl', classCtrl);

function classCtrl ($http, $routeParams, $rootScope, $scope){
    /*---------------
     |   VARIABLES  |
     ---------------*/
    var vm = this;
    vm.classId = $routeParams.classId;
    vm.messages = []; //get msgs in DB and assign them here
    vm.m = "";
    /*---------------
    |   FUNCTIONS   |
     ---------------*/
    vm.sendMsg = sendMsg;

    /*---------------
     |    SOCKET    |
     ---------------*/
    //disconnect current socket to go to another classroom and recreate new socket
    //This fixes bug where swapping class room causes multiple line

    $rootScope.socket.disconnect(); //disconnect last chat
    $rootScope.socket = io.connect(); //reconnect socket
    //join current room
    $rootScope.socket.emit('join room',vm.classId);


    /*--------------------
     |   FUNCTIONS DEF   |
     -------------------*/
    function sendMsg(){
        var room = vm.classId;
        var msgObj = {'class': vm.classId, 'user':'Eric', 'message':vm.m};
        $rootScope.socket.emit('userMessage', msgObj);
        vm.m ='';
        return false;
    }

    //when the client receives an emit (new message) from server
    $rootScope.socket.on(vm.classId, function(msg){
        vm.messages.push(msg)
        $scope.$apply();
        // $('#messages').append($('<li>').text(msg.user +' :    '+msg.message));
    });
}