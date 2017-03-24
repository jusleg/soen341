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
                "check":function($location,$rootScope,$http){
                    $http.get('/currentUser').then(function(res,err){
                        if($rootScope.currentUser.role == 2){

                        }else{
                            $location.path('/');    //redirect user to home.
                            alert("You don't have access here");
                        }
                    });
                }
            }
        });
    }])

    .controller('createClassCtrl', createClassCtrl);

function createClassCtrl ($rootScope, $http){
    //variables
    var vm = this;
    vm.submitCreateClass = submitCreateClass;
    vm.validClassCode = validClassCode;
    vm.TAFieldValid = TAFieldValid;
    vm.validEmail = validEmail;
    //functions
    function submitCreateClass() {
        $http.post('/createclass', formData).then(function success(response){
            alert("Class successfully created.");
            window.location.href = "/home";
        },function faillure(err) {
            alert("Invalid field data."); //TODO: Do this properly
        })
    };

    function validClassCode(val) {
        return val.match(/^ *$/) !== null;
    };

// Does each TA subfield have a valid email address?
    function TAFieldValid(val) {
        return val.split(',').every((e) => (validEmail(e.split(":")[0])) && !isEmpty(e.split(":")[1] || ""));
    };

    function validEmail(email) {
        return email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm) !== null;
    };
}