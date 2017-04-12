(function(){
    'use strict';
    // Declare app level module which depends on views, and components
    angular.module('app', [
        'ui.bootstrap',
        'ngRoute',
        'app.header',
        'app.classroom',
        'app.createclass',
        'app.homepage',
    ]).
    config(['$locationProvider', '$routeProvider','$httpProvider',
        function($locationProvider, $routeProvider,$httpProvider) {
            $locationProvider.hashPrefix(''); // or with '!'
            $routeProvider.otherwise({redirectTo: ''});
            // $httpProvider.defaults.useXDomain = true;
            // delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }])
        .controller('appCtrl', function($scope, $rootScope, $http, $routeParams, $uibModal,$log) {
            var vm = this;
            vm.currentClassId = '';
            $http.get('/currentUser').then(function(res,err){
                $rootScope.currentUser = res.data
                vm.currentUser = $rootScope.currentUser;
                if(vm.currentUser.classMod.length > 0) {
                    insertClassModMenu();
                }
            });
            $rootScope.$watch('currentClassId',function(New){
                vm.currentClassId = New;
            });

            //USER MODAL
            vm.openUserModal = function (size, parentSelector) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'views/userModal.html',
                    controller: 'userModalInstanceCtrl',
                    controllerAs: 'vm',
                    size: size,
                });

                modalInstance.result.then(function (selectedItem) {
                    vm.selected = selectedItem;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };

            //CREATE CLASS FORM MODAL
            vm.openCreateClassModal = function (size, parentSelector) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'views/create-class.html',
                    controller: 'userModalInstanceCtrl',
                    controllerAs: 'vm',
                    size: size,
                });

                modalInstance.result.then(function (selectedItem) {
                    vm.selected = selectedItem;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
        });
    angular.module('app').controller('userModalInstanceCtrl', function ($uibModalInstance) {
        var vm = this;

        vm.ok = function () {
            $uibModalInstance.close();
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });

    
})();

function insertClassModMenu() {
    console.log("classMod detected");
    $("#menu_items").prepend("<div id='classTypeSelection'>" +
        "<div class='classTypeSelected' onclick='toggleUserSelection()' style='border-top-left-radius: 3px;border-bottom-left-radius: 3px;'>User</div>" +
        "<div onclick='toggleModSelection()'style='border-top-right-radius: 3px;border-bottom-right-radius: 3px; border-left: none'>Mod</div>" +
        "</div>");
}

function toggleUserSelection() {
    if(!$('#classTypeSelection div:first-child').hasClass('classTypeSelected')) {
        $('.classRoom').css('display', 'block');
        $('.classRoom2').css('display', 'none');
        $('#classTypeSelection div').removeClass('classTypeSelected');
        $('#classTypeSelection div:first-child').addClass('classTypeSelected');
    }
}

function toggleModSelection() {
    if($('#classTypeSelection div:first-child').hasClass('classTypeSelected')) {
        $('.classRoom').css('display', 'none');
        $('.classRoom2').css('display', 'block');
        $('#classTypeSelection div').removeClass('classTypeSelected');
        $('#classTypeSelection div:nth-child(2)').addClass('classTypeSelected');
    }
}