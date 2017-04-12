'use strict';

angular.module('app.createclass', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/createclass', {
        templateUrl: 'views/create-class.html',
        controller: 'createClassCtrl',
        controllerAs: 'vm',
        resolve: {
            "check": function check($location, $rootScope, $http) {
                $http.get('/currentUser').then(function (res, err) {
                    if ($rootScope.currentUser.role == 2) {} else {
                        $location.path('/'); //redirect user to home.
                        alert("You don't have access here");
                    }
                });
            }
        }
    });
}]).controller('createClassCtrl', createClassCtrl);

function createClassCtrl($scope, $http, $rootScope) {
    //variables
    var vm = this;
    vm.class = {
        Code: "",
        Name: "",
        Location: "",
        Hours: "",
        Tas: ""
    };
    //sets which url is active
    $rootScope.createClass = true;
    $rootScope.currentClassId = '';
    vm.submitCreateClass = submitCreateClass;

    //functions
    function submitCreateClass() {
        var valid = true;
        var file = $('#studentList').get(0).files[0];
        var errorMsg = "\n";
        if (TAFieldValid(vm.class.Tas) !== true) {
            $scope.createClassForm.Tas.$setValidity("Tas", false);
            valid = false;
            errorMsg += "TAs field must follow the format 'email@addr:name,email@addr:name', etc.\n";
        }
        if (validClassCode(vm.class.Code)) {
            $scope.createClassForm.Code.$setValidity("Code", false);
            valid = false;
            errorMsg += "Class Code field must 4 alphabetic characters, 3 digits, and optional extra alphabetic characters, e.g. 'ABCD123'.\n";
        }
        if (file == undefined) {
            valid = false;
        }

        if (valid) {
            // Prepare payload; send file as data
            var formData = new FormData();
            formData.append('classcode', vm.class.Code);
            formData.append('classname', vm.class.Name);
            formData.append('hours', vm.class.Hours);
            formData.append('location', vm.class.Location);
            formData.append('TAs', vm.class.Tas);
            formData.append('studentList', file, file.name);

            var req = {
                method: 'POST',
                url: '/createclass',
                headers: {
                    'Content-Type': undefined
                },
                data: formData
            };

            $http(req).then(function success(response) {
                if (response.data.indexOf("Class already exists") > -1) {
                    alert("Error: That class already exists.");
                } else {
                    alert("Class successfully created.");
                }
                window.location.href = "/home";
            }, function faillure(err) {
                $.notify("Failed to Create Class: That class already exists", { position: "bottom-right", className: "error" });
            });
        } else {
            $.notify("Failed to Create Class: " + errorMsg, { position: "bottom-right", className: "error" });
        }
    };
    function validClassCode(val) {
        return val.match(/^([A-Za-z]{4})[ ]?([0-9]{3,4})([ -]?([a-zA-Z]{1,2}([-][a-zA-Z])?))?$/) == null;
    }

    function isEmpty(val) {
        return val.match(/^ *$/) !== null;
    }
    // Does each TA subfield have a valid email address?
    function TAFieldValid(val) {
        return val.split(',').every(function (e) {
            return validEmail(e.split(":")[0]) && !isEmpty(e.split(":")[1] || "");
        });
    };

    function validEmail(email) {
        return email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm) !== null;
    };
}