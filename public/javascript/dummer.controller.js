'use strict';

angular.module('app.view1', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
        templateUrl: 'views/classroom.html',
        controller: 'view1Ctrl',
        controllerAs: 'vm'
    });
}]).controller('view1Ctrl', view1Ctrl);

function view1Ctrl($http) {
    var vm = this;
    vm.classroomNum = 1;
}