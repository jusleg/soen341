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
    $rootScope.currentClassId = vm.classId;
    vm.className = ""
    vm.messages = []; //get msgs in DB and assign them here
    vm.m = "";
    vm.professor = "";
    vm.classroom = "";
    vm.recentMsgFromUser = '';
    /*---------------
    |   FUNCTIONS   |
     ---------------*/
    vm.sendMsg = sendMsg;

    /*---------------
     |    SOCKET    |
     ---------------*/
    //disconnect current socket to go to another classroom and recreate new socket
    //This fixes bug where swapping class room causes multiple line

    if($rootScope.socket){
        console.log('Disconnect from previous class');
        $rootScope.socket.disconnect(); //disconnect last chat
        console.log('Connect to '+vm.classId);
        $rootScope.socket = io.connect(); //reconnect socket
        $("#className").html("");
    }else{
        console.log('Connect To '+vm.classId);
        $rootScope.socket = io.connect(); //reconnect socket
    }
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

            var height = 0;
            vm.messages.forEach(function() {
                height += 55;
            })
            setTimeout(function() {
                $(".window").animate({ scrollTop: height}, 0);
            }, 0);
            $(document).ready(function(){
                $('[data-toggle="tooltip"]').tooltip();
            });

            $("#className").html("<span class='animated bounceInDown' style='font-weight: 800;'>" + vm.classId + " </span><span class='animated bounceInDown responsive_class_name' style='color:#706d6d; font-size: 16px;'>- " + vm.className + "</span>");

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
        var msgObj = {'class':room, '_id': $rootScope.currentUser.email,'time': new Date().getTime().toString(), 'name': $rootScope.currentUser.username, 'message':vm.m};
        if(msgObj.message == ""){
            return false;
        }else{
            $http.post('api/message/'+vm.classId, msgObj).then(function success(response){
                $rootScope.socket.emit('userMessage', msgObj);
                vm.m ='';
            });
            return false;
        }
    }

    //when the client receives an emit (new message) from server
    $rootScope.socket.on(vm.classId, function(msg){
        vm.messages.push(msg);
        $scope.$apply();
        vm.recentMsgFromUser = msg.name;
        console.log(vm.recentMsgFromUser);
        var height = 0;
        vm.messages.forEach(function() {
            height += 55;
        })
        $(".window").animate({ scrollTop: height}, 200);
        // $('#messages').append($('<li>').text(msg.user +' :    '+msg.message));
    });
}