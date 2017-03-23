/**
 * Created by Ethan on 3/22/2017.
 */
angular.module('app.homepage', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/homepage.html',
        });
    }])
