'use strict';

angular.module('app.header', []).controller('headerCtrl', headerCtrl);

function headerCtrl($rootScope) {
    var vm = this;
    //initialize variables
    vm.currentClassId = '';
    vm.currentClassRoom = '';
    vm.currentClassName = '';
    vm.currentProf = '';
    vm.currentUser = {};

    //watch for changes
    $rootScope.$watch('currentClassId', function () {
        vm.currentClassId = $rootScope.currentClassId;
        vm.currentClassRoom = $rootScope.currentClassroom;
        vm.currentClassName = $rootScope.currentClassName;
        vm.currentProf = $rootScope.currentProf;
    });
    $rootScope.$watch('currentUser', function () {
        vm.currentUser = $rootScope.currentUser;
    });
}