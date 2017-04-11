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
