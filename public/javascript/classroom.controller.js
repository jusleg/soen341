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
    vm.classId = $routeParams.classId.toUpperCase();
    vm.className = ""
    vm.messages = []; //get msgs in DB and assign them here
    vm.m = "";
    vm.professor = "";
    vm.classroom = ""
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

    //activate classroom once everything is ready.
    active();

    /*--------------------
     |   FUNCTIONS DEF   |
     -------------------*/
    function active(){
        $http.get('api/messages/'+vm.classId).then(function success(response){
            vm.messages = response.data[0].chat;
            vm.professor = response.data[0].professor;
            vm.classroom = response.data[0].classroom;
            vm.className = response.data[0].name;

            //Make it accessible on rootScope
            $rootScope.currentClassId = vm.classId;
            $rootScope.currentProf = vm.professor;
            $rootScope.currentClassroom = vm.classroom;
            $rootScope.currentClassName = vm.className;
        }, function failure(err){

        })
    }

    function sendMsg(){
        var room = vm.classId;
        var msgObj = {'class':room, '_id': 'hardCodedEmail@hotmail.com','time': new Date().getTime().toString(), 'name':'HardCodedUser', 'message':vm.m};
        $http.post('api/message/'+vm.classId, msgObj).then(function success(response){
            console.log(msgObj)
            $rootScope.socket.emit('userMessage', msgObj);
            vm.m ='';
        });
        return false;
    }

    //when the client receives an emit (new message) from server
    $rootScope.socket.on(vm.classId, function(msg){
        vm.messages.push(msg)
        $scope.$apply();
        // $('#messages').append($('<li>').text(msg.user +' :    '+msg.message));
    });
}