'use strict';

angular.module('app.homepage', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/homepage.html'
    });
}]);