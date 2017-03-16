/**
 * Created by ericxiao on 2017-01-31.
 */
(function(){
    'use strict';
    // Declare app level module which depends on views, and components
    angular.module('app', [
        'ngRoute',
        'app.header',
        'app.classroom',
    ]).
    config(['$locationProvider', '$routeProvider','$httpProvider',
        function($locationProvider, $routeProvider,$httpProvider) {
            $locationProvider.hashPrefix(''); // or with '!'
            $routeProvider.otherwise({redirectTo: ''});
            // $httpProvider.defaults.useXDomain = true;
            // delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }])
        .controller('appCtrl', function($scope, $rootScope) {

        });
})();