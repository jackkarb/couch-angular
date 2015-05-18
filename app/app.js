'use strict';

// Declare app level module which depends on views, and components jack
angular.module('myApp', [
  'ngRoute',
  'myApp.version'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'main.html',
            controller: 'mainCtrl'
        });
        $routeProvider.when('/a2000', {
            templateUrl: 'asap/a2000.html',
            controller: 'a2000Ctrl'
        });
      $routeProvider.otherwise({redirectTo: '/view1'});
}])
    .controller('mainCtrl', ['$scope', '$http',function($scope, $http) {
        $http.get('http://localhost:5984')
            .success(function (data) {
                $scope.data = data;

            });
        $http.get('http://localhost:5984/jacks_db')
            .success(function (dat2) {
                $scope.dat2 = dat2;
                $scope.props = Object.keys(dat2);

            });
    }])
    .controller('a2000Ctrl', ['$scope', '$http',function($scope, $http) {
        $http.get('http://localhost:5984/jacks_db/2c6749cf4d7fe47db91873337503368e')
            .success(function (data) {
                $scope.data = data.a2000;

            });
        /*
        $http.get('http://localhost:5984/jacks_db')
            .success(function (dat2) {
                $scope.dat2 = dat2;
                $scope.props = Object.keys(dat2);

            });
        */
    }]);
