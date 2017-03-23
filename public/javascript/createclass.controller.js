/**
 * Created by ericxiao on 2017-03-23.
 */
/**
 * Created by ericxiao on 2017-02-09.
 */
'use strict';

angular.module('app.createclass', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/createclass', {
            templateUrl: 'views/create-class.html',
            controller: 'createClassCtrl',
            controllerAs:'vm',
            resolve:{
                "check":function($location,$rootScope){
                    if($rootScope.currentUser.role == 2){
                        //Do something
                    }else{
                        $location.path('/');    //redirect user to home.
                        alert("You don't have access here");
                    }
                }
            }
        });
    }])

    .controller('createClassCtrl', createClassCtrl);

function createClassCtrl ($rootScope){
    //variables

    //functions

}