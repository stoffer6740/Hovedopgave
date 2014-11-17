/**
 * Created by Christoffer on 17-11-2014.
 */

var app = angular.module('hovedopgave-app', ['ngMaterial']);

app.directive('imports', function () {
   return {
       restrict: 'E',
       templateUrl: '../directives/imports.html'
   }
});

app.controller('test', function ($scope, $mdSidenav) {
    $scope.title1 = 'Button';
    $scope.title4 = 'Warn';
    $scope.isDisabled = true;

    $scope.googleUrl = 'http://google.com';

    $scope.leftMenu = function() {
        $mdSidenav('left').toggle();
    };
});

